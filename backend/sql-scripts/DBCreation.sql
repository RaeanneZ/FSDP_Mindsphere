IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'Mindsphere')
BEGIN
    CREATE DATABASE Mindsphere;
    PRINT 'Database "Mindsphere" created.';
END
ELSE
BEGIN
    PRINT 'Database "Mindsphere" already exists. Skipping creation.';
END
GO

USE Mindsphere;
GO

-------------------------------------------------------------------------------------------------------------
if exists (select * from sysobjects where name='Bookings' and type='U')
    drop table Bookings
GO

if exists (select * from sysobjects where name='Meetings' and type='U')
    drop table Meetings
GO

if exists (select * from sysobjects where name='ProgrammeSchedule' and type='U')
    drop table ProgrammeSchedule
GO

if exists (select * from sysobjects where name='ProgrammeFeedback' and type='U')
    drop table ProgrammeFeedback
GO


if exists (select * from sysobjects where name='Payment' and type='U')
    drop table Payment
GO

if exists (select * from sysobjects where name='ProgrammeTier' and type='U')
    drop table ProgrammeTier
GO

if exists (select * from sysobjects where name='Programmes' and type='U')
    drop table Programmes
GO

if exists (select * from sysobjects where name='surveyForm' and type='U')
    drop table surveyForm
GO

if exists (select * from sysobjects where name='enquiryTimeline' and type='U')
    drop table enquiryTimeline
GO

if exists (select * from sysobjects where name='Businesses' and type='U')
    drop table Businesses
GO

if exists (select * from sysobjects where name='Children' and type='U')
    drop table Children
GO

if exists (select * from sysobjects where name='WhatsappUsers' and type ='U')
	drop table WhatsappUsers
go

if exists (select * from sysobjects where name='Newsletter' and type ='U')
	drop table Newsletter
go

if exists (select * from sysobjects where name='AccountVerification' and type ='U')
	drop table AccountVerification
go

if exists (select * from sysobjects where name='Account' and type='U')
    drop table Account
GO

if exists (select * from sysobjects where name='Roles' and type='U')
    drop table Roles
GO

if exists (select * from sysobjects where name='EmailTemplates' and type='U')
	drop table EmailTemplates
GO

if exists (select * from sysobjects where name='EmailLogs' and type='U')
	drop table EmailLogs
GO

if exists (select * from sysobjects where name='ScheduledEmails' and type='U')
	drop table ScheduledEmails
GO

if exists (select * from sysobjects where name='Drafts' and type='U')
	drop table Drafts
GO

IF EXISTS (SELECT * FROM sysobjects WHERE name = 'ProgrammeSlotSummary' AND xtype = 'V')
    DROP VIEW ProgrammeSlotSummary;
GO

IF EXISTS (SELECT * FROM sysobjects WHERE name = 'MembersAndNewsletterCount' AND xtype = 'V')
    DROP VIEW MembersAndNewsletterCount;
GO

IF EXISTS (SELECT * FROM sysobjects WHERE name = 'SalesRevenue' AND xtype = 'V')
    DROP VIEW SalesRevenue;
GO

IF EXISTS (SELECT * FROM sysobjects WHERE name = 'SalesPendingPayment' AND xtype = 'V')
    DROP VIEW SalesPendingPayment;
GO
-------------------------------------------------------------------------------------------------------------


-- Table for user roles
create table Roles (
	RoleID int not null,	
	Name varchar(50) default 'User',
	constraint PK_Roles primary key (RoleID)
)
go

-- Account table updated: Removed LinkedInID, added LinkedInSub for unique identifier
CREATE TABLE Account (
	AccID int not null IDENTITY(1,1),
	Name varchar(50) null,
	Email varchar(50) not null unique,
	ContactNo char(8) null unique,
	memberStatus char(10) null default 'Pending',
	memberExpiry datetime null,
	address varchar(255) null,
	dateOfBirth datetime null,
	relationshipToChild varchar(255) null,
	RoleID int null default 2,
	Salt varchar(255) null, 
	HashedPassword varchar(255) null, -- Linkedin Account Password will use the Unique Identifier 'Sub'
	constraint PK_Account primary key (AccID),
	constraint FK_Account_RoleID foreign key (RoleID) references Roles(RoleID),
	constraint CHK_MemberStatus check (memberStatus in ('Active','Inactive','Pending'))
)
go

-- Verification codes for email validation
CREATE TABLE AccountVerification (
	Email varchar(50) not null,
	verifCode int not null,
	constraint PK_AccountVerification primary key (Email)
)
go

-- Newsletter subscription table
CREATE TABLE Newsletter (
	Email varchar(50) not null,
	constraint PK_Newsletter primary key (Email)
);


CREATE TABLE WhatsappUsers (
	WsID int not null IDENTITY(1,1),
	Name varchar(50) not null,
	phoneNum varchar(50) not null,
	constraint PK_WsUsers primary key (WsID)
);


-- Children associated with user accounts
create table Children (
	ChildID int not null IDENTITY(1,1),
	GuardianEmail varchar(50) not null,
	Name varchar(50) not null,
	Gender char(1) not null,
	Dob datetime not null,
	Needs varchar(50) not null,
	School varchar(50) not null,
	Interests text null,
	constraint PK_Children primary key (ChildID),
	constraint FK_Children_GuardianEmail foreign key (GuardianEmail) references Account(Email),
	constraint CHK_Gender check (Gender in ('M', 'F'))
)
go

-- Business inquiries table
create table Businesses (
	BusinessID int not null identity(1,1),
	Name varchar(50) not null,
	ContactNo char(8) not null,
	Email varchar(50) not null,
	exNumOfDays int not null,
	groupSize int not null,
	orgName varchar(50) not null,
	helpText varchar(1000),
	callbackRequest datetime not null,
	enquiryStatus varchar(50) not null default ('New Enquiry'),
	proposalPdfURL varchar(255) null,
	createdAt DATETIME NOT NULL DEFAULT GETDATE(),
	constraint PK_Business primary key (BusinessID),
	constraint CHK_Status check (enquiryStatus in ('New Enquiry', 'In Progress', 'Confirmed', 'Completed'))
)
go

create table enquiryTimeline (
	TimelineID int not null identity(1,1),
	BusinessID int not null,
	Text varchar(255) not null,
	tag varchar(50) not null,
	linkToPDF varchar(255) null,
	originalEnquiryPDFlink varchar(255) null,
	createdDate datetime not null default getdate(),
	constraint PK_enquiryTimeline primary key (TimelineID),
	constraint FK_enquiryTimeline foreign key (BusinessID) references Businesses(BusinessID)
)
go


-- Feedback survey form
create table surveyForm (
	surveyID int not null identity(1,1),
	email varchar(50) null,
	howHear varchar(50) not null,
	expRating int not null,
	feedbackText varchar(1000) null,
	constraint PK_SurveyForm primary key (surveyID)
)
go

-- Programmes and their types
create table Programmes (
	ProgID int not null,
	Name varchar(50) not null,
	ProgIntro varchar(255) not null,
	ProgDesc varchar(255) not null,
	ProgType char(10) not null,
	constraint PK_Programmes primary key (ProgID),
	Constraint CHK_ProgType check (ProgType in ('Light','Regular','Premium'))
)
go

-- Programme tiers for customization
create table ProgrammeTier (
	TierID int not null,
	ProgID int not null,
	TierDesc varchar(255),
	Lunch varchar(50) not null,
	Level varchar(50) not null,
	Duration varchar(50) not null,
	ClassSize varchar(50) not null,
	AgeRange varchar(10) not null,
	Cost money not null,
	constraint PK_ProgrammeTier primary key (TierID),
	constraint FK_ProgrammeTier_ProgID foreign key (ProgID) references Programmes(ProgID),
	constraint CHK_Level check (Level in ('Beginner','Intermediate','Advanced'))
)
go

-- Payments table
create table Payment (
	TransacID int not null IDENTITY(1,1),
	Email varchar(50) not null,
	ProgID int not null,
	Quantity int not null,
	TotalCost money not null,
	PaidDate datetime null,
	TransacStatus varchar(10) default 'Pending',
	constraint PK_Payment primary key (TransacID),
	constraint FK_Payment_ProgID foreign key (ProgID) references Programmes(ProgID),
	constraint CHK_TransacStatus check (TransacStatus in ('Paid','Pending'))
)
go

-- Feedback for programmes
create table ProgrammeFeedback (
	FeedbackID int not null IDENTITY(1,1),
	ProgID int not null,
	AccID int not null,
	FdbkDesc varchar(255),
	constraint PK_ProgrammeFeedback primary key (FeedbackID),
	constraint FK_ProgFeedback_ProgID foreign key (ProgID) references Programmes(ProgID),
	constraint FK_AccID foreign key (AccID) references Account(AccID)
)
go

-- Programme schedules
create table ProgrammeSchedule (
	SchedID int not null IDENTITY(1,1),
	ProgID int not null,
	DateStart datetime not null,
	DateEnd datetime not null,
	Venue varchar(100) not null,
	TotalSeats int not null,
	constraint PK_ProgrammeSchedule primary key (SchedID),
	constraint FK_ProgSchedule_ProgID foreign key (ProgID) references Programmes(ProgID)
)
go

-- Bookings table for customer reservations
create table Bookings (
	BookingID int not null IDENTITY(1,1),
	Name varchar(50) not null,
	Email varchar(50) not null,
	ContactNo char(8) not null,
	TierID int not null,
	ProgID int not null,
	childrenDetails text not null,
	Diet varchar(50) not null,
	SchedID int not null,
	NumSeats int not null,
	SpecialReq varchar(50) null,
	TransacID int not null,
	BookingDate datetime not null,
	constraint PK_Bookings primary key (BookingID),
	constraint FK_Bookings_TierID foreign key (TierID) references ProgrammeTier(TierID),
	constraint FK_Bookings_ProgID foreign key (ProgID) references Programmes(ProgID),
	constraint FK_Bookings_SchedID foreign key (SchedID) references ProgrammeSchedule(SchedID),
	constraint FK_Bookings_TransacID foreign key (TransacID) references Payment(TransacID)
)
go

CREATE TABLE EmailTemplates (
    TemplateID INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(255) NOT NULL,
    Subject NVARCHAR(255) NOT NULL,
    Body NVARCHAR(MAX) NOT NULL,
    CreatedBy NVARCHAR(255) NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE()
);

CREATE TABLE Meetings (
    MeetingID VARCHAR(50) PRIMARY KEY,
    RoomURL VARCHAR(255) NOT NULL,
	HostRoomURL NVARCHAR(MAX) NOT NULL,
    StartTime DATETIME NOT NULL,
    EndTime DATETIME NOT NULL,
    UserEmail VARCHAR(50) NOT NULL,
    IsLocked BIT NOT NULL DEFAULT 1,
	CONSTRAINT FK_Meetings_UserEmail FOREIGN KEY (UserEmail) REFERENCES Account(Email)
);
go

-------------------------------------------------------------------------------------------------------------


CREATE TABLE EmailLogs (
    LogID INT IDENTITY(1,1) PRIMARY KEY,
    Recipient NVARCHAR(255) NOT NULL,
    Subject NVARCHAR(255) NOT NULL,
    Body NVARCHAR(MAX) NOT NULL,
    SentAt DATETIME DEFAULT GETDATE(),
    SentBy NVARCHAR(255) NOT NULL
);
go

CREATE TABLE ScheduledEmails (
    EmailID INT IDENTITY(1,1) PRIMARY KEY,
    Recipient NVARCHAR(255) NOT NULL,
    Subject NVARCHAR(255) NOT NULL,
    Body NVARCHAR(MAX) NOT NULL,
    SendAt DATETIME NOT NULL,
    Status NVARCHAR(50) DEFAULT 'Pending', -- Pending, Sent, Failed
    CreatedBy NVARCHAR(255) NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE()
);
go

CREATE TABLE Drafts (
    DraftID INT IDENTITY(1,1) PRIMARY KEY,
    Subject NVARCHAR(255),
    Body NVARCHAR(MAX),
    Recipient NVARCHAR(255),
    Attachment NVARCHAR(255),
    CreatedBy NVARCHAR(255) NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE()
);
go



CREATE VIEW ProgrammeSlotSummary AS
SELECT 
    P.ProgID,
    P.Name AS ProgrammeName,
    SUM(PS.TotalSeats) AS TotalSlots,
    COALESCE(SUM(B.NumSeats), 0) AS SlotsTaken,
    SUM(PS.TotalSeats) - COALESCE(SUM(B.NumSeats), 0) AS SlotsRemaining
FROM 
    Programmes P
LEFT JOIN ProgrammeSchedule PS ON P.ProgID = PS.ProgID
LEFT JOIN Bookings B ON PS.SchedID = B.SchedID
GROUP BY 
    P.ProgID, P.Name;

go

CREATE VIEW MembersAndNewsletterCount AS
SELECT 
    (SELECT COUNT(*) FROM Account) AS TotalAccounts,
    (SELECT COUNT(*) FROM Newsletter) AS TotalNewsletterSubscriptions;

go

create view SalesRevenue as
select 
	sum(TotalCost) as TotalSalesRevenue,
	count(*) as NumberOfSales
from Payment
WHERE 
    TransacStatus = 'Paid';

go

create view SalesPendingPayment as
select 
	sum(TotalCost) as TotalPendingRevenue,
	count(*) as NumberOfPendingSales
from Payment
where
	TransacStatus = 'Pending';

go

------------------------------------------------------------------------------------------------------------
-- triggers
CREATE TRIGGER trg_CompleteEnquiry
ON enquiryTimeline
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    -- Only proceed if the inserted row has tag = 'Completed'
    IF EXISTS (SELECT 1 FROM inserted WHERE tag = 'Completed')
    BEGIN
        -- Update Businesses table's enquiryStatus to 'Completed'
        UPDATE B
        SET B.enquiryStatus = 'Completed'
        FROM Businesses B
        INNER JOIN inserted I ON B.BusinessID = I.BusinessID
        WHERE I.tag = 'Completed';

        -- Prevent unnecessary updates to enquiryTimeline
        UPDATE ET
        SET ET.tag = 'Completed'
        FROM enquiryTimeline ET
        WHERE ET.BusinessID IN (SELECT BusinessID FROM inserted WHERE tag = 'Completed')
        AND ET.tag <> 'Completed';  -- Only update rows that are not already 'Completed'
    END;
END;
GO

CREATE TRIGGER trg_UpdateEnquiryStatus
ON enquiryTimeline
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    -- Update enquiryStatus in Businesses table when a new row is added to enquiryTimeline
    UPDATE Businesses
    SET enquiryStatus = 'In Progress'
    FROM Businesses b
    INNER JOIN inserted i ON b.BusinessID = i.BusinessID
    WHERE b.enquiryStatus = 'New Enquiry'; -- Update only if it's still 'New Enquiry'
END;
GO





-------------------------------------------------------------------------------------------------------------

-- Insert data into Roles
INSERT INTO Roles (RoleID, Name) VALUES
(1, 'Admin'),
(2, 'User');

-- Insert data into Account
INSERT INTO Account (Name, Email, ContactNo, memberStatus, memberExpiry, address, dateOfBirth, relationshipToChild, RoleID, Salt, HashedPassword) VALUES
('John Doe', 'johndoe@example.com', '12345678', 'Active', '2025-12-31', '123 Main St, Springfield, IL', '1990-01-01', 'Father', 2, 'randomsalt1', 'hashedpassword1'),
('Jane Smith', 'janesmith@example.com', '23456789', 'Inactive', NULL, '456 Elm St, Springfield, IL', '1985-02-15', 'Mother', 2, 'randomsalt2', 'hashedpassword2'),
('Mark Evans', 'markevans@example.com', '34567890', 'Pending', NULL, '789 Oak St, Springfield, IL', '1992-03-22', 'Guardian', 2, 'randomsalt3', 'hashedpassword3'),
('Lucy Gray', 'lucygray@example.com', '45678901', 'Active', '2026-01-01', '321 Pine St, Springfield, IL', '1995-04-10', 'Mother', 2, 'randomsalt4', 'hashedpassword4'),
('Emma White', 'emmawhite@example.com', '56789012', 'Active', '2025-11-15', '654 Cedar St, Springfield, IL', '1991-05-05', 'Guardian', 2, 'randomsalt5', 'hashedpassword5'),
('Bob', 'iamjovantan@gmail.com', '67890123', 'Pending', NULL, '987 Birch St, Springfield, IL', '1988-06-30', 'Father', 2, 'randomsalt6', 'hashedpassword6'),
('Nancy Blue', 'nancyblue@example.com', '78901234', 'Active', '2025-12-15', '159 Maple St, Springfield, IL', '1994-07-25', 'Mother', 2, 'randomsalt7', 'hashedpassword7'),
('Oliver Red', 'oliverred@example.com', '89012345', 'Active', '2025-10-05', '753 Walnut St, Springfield, IL', '1986-08-20', 'Father', 2, 'randomsalt8', 'hashedpassword8'),
('Chris Green', 'chrisgreen@example.com', '90123456', 'Inactive', NULL, '951 Ash St, Springfield, IL', '1993-09-15', 'Guardian', 2, 'randomsalt9', 'hashedpassword9'),
('Sophia Brown', 'sophiabrown@example.com', '01234567', 'Active', '2026-05-20', '357 Spruce St, Springfield, IL', '1990-10-12', 'Mother', 2, 'randomsalt10', 'hashedpassword10'),
('Jovan Tan', 's10259920@connect.np.edu.sg', '12121212', 'Active', '2026-04-03', '357 Spruce St, Springfield, IL', '1990-10-12', 'Mother', 2, '', ''),
('Admin', 'admin@gmail.com', '99008833', NULL, NULL, '9876 Fake St, Imaginary City, IC', '2000-12-25', NULL, 1, '$2b$10$IIJkOdfcvizT0Q2uCmw5QO', '$2b$10$IIJkOdfcvizT0Q2uCmw5QODYi5TYzkE3t2QrwBx8rlwp5TirPu7wW');

-- Insert data into Children
INSERT INTO Children (GuardianEmail, Name, Gender, Dob, Needs, School, Interests) VALUES
('lucygray@example.com', 'Liam Gray', 'M', '2015-05-10', 'None', 'Bright Future School', 'Painting, Science'),
('iamjovantan@gmail.com', 'Mia Black', 'F', '2014-03-22', 'Allergies', 'Sunshine Academy', 'Dancing, Mathematics'),
('lucygray@example.com', 'Lucas Gray', 'M', '2017-10-01', 'Speech Therapy', 'Bright Future School', 'Reading, Robotics'),
('iamjovantan@gmail.com', 'Amelia Black', 'F', '2013-08-15', 'Dietary Restrictions', 'Sunshine Academy', 'Sports, Art'),
('chrisgreen@example.com', 'Ethan Green', 'M', '2016-12-05', 'None', 'Green Valley School', 'Chess, Swimming'),
('janesmith@example.com', 'Ava Smith', 'F', '2015-09-25', 'None', 'Green Valley School', 'Math, Reading'),
('emmawhite@example.com', 'James White', 'M', '2014-01-15', 'Autism', 'Lakewood School', 'Science, Computers'),
('nancyblue@example.com', 'Ella Blue', 'F', '2013-11-10', 'Visual Impairment', 'Hillcrest School', 'Art, Music'),
('oliverred@example.com', 'Lily Red', 'F', '2016-07-18', 'Hearing Impairment', 'Sunrise Academy', 'Sports, Robotics'),
('sophiabrown@example.com', 'Benjamin Brown', 'M', '2015-04-30', 'Asthma', 'Maplewood School', 'Reading, Drama');

-- Insert data into Programmes
INSERT INTO Programmes (ProgID, Name, ProgIntro, ProgDesc, ProgType) VALUES
(1, 'Public Speaking Workshops', 'Basic public speaking', 'Beginner Public Speaking Workshops', 'Light'),
(2, 'PSLE Power Up Camp', 'PSLE learning enhancement', 'Help PSLE takers learn efficiently and effectively', 'Regular'),
(3, 'Future Entrepreneurs Labs', 'Learn about entrepreneurship', 'Study how to be an entrepreneur', 'Premium');

INSERT INTO Businesses (Name, ContactNo, Email, exNumOfDays, groupSize, orgName, helpText, callbackRequest, enquiryStatus)
VALUES 
('John Doe', '12345678', 'johndoe@company.com', 3, 20, 'Tech Innovations Ltd.', 
'My employees here at Tech Innovations Ltd. need team bonding exercises to improve collaboration and communication skills. We are looking for interactive workshops that will help our team build trust, enhance problem-solving skills, and work more effectively together in a fast-paced tech environment. These sessions should also focus on improving leadership qualities within the team, encouraging creative thinking and better decision-making.',
'2024-11-15 10:30:00', 'New Enquiry'),
('Jane Smith', '87654321', 'neilhadziq31@gmail.com', 5, 50, 'Creative Solutions Inc.', 
'At Creative Solutions Inc., our team is looking for creative workshops to stimulate innovation and foster collaboration. We need interactive sessions where employees can work together to solve real-world problems. We are also interested in leadership development and workshops that teach employees how to think outside the box, encouraging new ideas and creative solutions. It''s important to us that these workshops are fun and engaging, yet challenge our team to think critically.',
'2024-11-16 09:00:00', 'In Progress'),
('Emily Johnson', '11223344', 'emilyj@company.com', 2, 15, 'FutureTech Corp.', 
'At FutureTech Corp., we are in need of technical workshops to help our employees keep up with the latest developments in AI, data analytics, and software development. Our team is looking for hands-on learning experiences that will give them practical skills they can apply to real projects. Additionally, we need workshops that can foster better communication between our technical and non-technical teams, ensuring they are aligned and can collaborate effectively on projects.',
'2024-11-18 14:00:00', 'Confirmed'),
('Michael Brown', '55667788', 'michaelb@company.com', 4, 30, 'Health Solutions Co.', 
'Our team at Health Solutions Co. is looking for workshops focused on stress management and improving mental health awareness. We need help in teaching our employees how to manage work-related stress and maintain a healthy work-life balance. Additionally, we would love to have team-building activities that strengthen relationships between departments and encourage a positive, supportive work environment. These sessions should be interactive and practical, with tips that employees can use in their day-to-day work life.',
'2024-11-19 11:45:00', 'Completed'),
('Sophia Lee', '99887766', 'sophial@company.com', 3, 25, 'Retail Enterprises Ltd.', 
'My team at Retail Enterprises Ltd. is seeking workshops that focus on improving customer service skills and handling difficult situations. We want to provide our employees with the tools they need to enhance customer interactions, resolve conflicts, and manage customer expectations more effectively. Additionally, we are interested in team-building activities that help strengthen our sales and customer support teams, promoting better communication and collaboration across the board.',
'2024-11-20 13:00:00', 'Completed');

-- Insert data into ProgrammeTier
INSERT INTO ProgrammeTier (TierID, ProgID, TierDesc, Lunch, Level, Duration, ClassSize, AgeRange, Cost) VALUES
(1, 1, 'Beginner Public Speaking Workshops', 'Included', 'Beginner', '3.5 days', '15-20', '5-10', 988.00),
(2, 1, 'Intermediate Public Speaking Workshops', 'Included', 'Intermediate', '3 days', '12-15', '8-12', 1188.00),
(3, 1, 'Advanced Public Speaking Workshops', 'Included', 'Advanced', '3 days', '10-15', '7-12', 1388.00),
(4, 2, 'PSLE Power Up Camp', 'Included', 'Beginner', '2 days', '15-20', '7-12', 428.00),
(5, 3, 'Future Entrepreneurs Labs', 'Included', 'Beginner', '2 days', '10-15', '10-15', 1000.00);

-- Insert data into Payment
INSERT INTO Payment (Email, ProgID, Quantity, TotalCost, PaidDate, TransacStatus) VALUES
('johndoe@example.com', 1, 1, 50.00, '2024-11-12', 'Paid'),
('janesmith@example.com', 3, 3, 150.00, '2024-11-10', 'Paid'),
('iamjovantan@gmail.com', 2, 2, 100.00, '2024-11-12', 'Pending'),
('lucygray@example.com', 3, 1, 90.00, '2024-11-12', 'Paid'),
('nancyblue@example.com', 2, 4, 120.00, '2024-11-13', 'Pending'),
('emmawhite@example.com', 2, 5, 200.00, '2024-11-14', 'Paid'),
('johndoe@example.com', 2, 1, 45.00, '2024-11-15', 'Paid'),
('oliverred@example.com', 1, 2, 30.00, '2024-11-16', 'Pending'),
('johndoe@example.com', 3, 4, 80.00, '2024-11-16', 'Paid'),
('emmawhite@example.com', 2, 3, 40.00, '2024-11-17', 'Paid');

-- Insert data into ProgrammeFeedback
INSERT INTO ProgrammeFeedback (ProgID, AccID, FdbkDesc) VALUES
(1, 1, 'Great program! My child loved it.'),
(2, 4, 'Very educational and fun.'),
(3, 2, 'Well-organized and enjoyable.'),
(2, 6, 'Good value for the price.'),
(1, 7, 'Loved the interactive activities.'),
(2, 9, 'Fun experience, will join again.'),
(2, 3, 'Good for younger kids.'),
(3, 8, 'Very engaging and informative.'),
(2, 5, 'My child improved a lot.'),
(1, 10, 'Excellent program for beginners.');

-- Insert data into ProgrammeSchedule
INSERT INTO ProgrammeSchedule (ProgID, DateStart, DateEnd, Venue, TotalSeats) VALUES
(1, '2025-11-18 09:00:00', '2025-11-18 17:00:00', 'Community Hall A', 20),
(2, '2025-11-18 10:00:00', '2025-11-18 16:00:00', 'School Auditorium', 20),
(3, '2025-11-18 08:30:00', '2025-11-18 18:00:00', 'Activity Centre', 15);

-- Insert data into Bookings
INSERT INTO Bookings (Name, Email, ContactNo, TierID, ProgID, childrenDetails, Diet, SchedID, NumSeats, TransacID, SpecialReq, BookingDate) VALUES
('Lucy Gray', 'lucygray@example.com', '34567890', 2, 1, 
 '[{"name": "Liam Gray", "dob": "2015-05-10", "gender": "M", "school": "Bright Future School", "needs": "None"}, 
   {"name": "Lucas Gray", "dob": "2017-10-01", "gender": "M", "school": "Bright Future School", "needs": "Speech Therapy"}]', 
 'None', 1, 2, 3, 'Wheelchair access', '2024-11-15'),

('Jovan Tan', 'iamjovantan@gmail.com', '67890123', 5, 3, 
 '[{"name": "Mia Black", "dob": "2014-03-22", "gender": "F", "school": "Sunshine Academy", "needs": "Allergies"}, 
   {"name": "Amelia Black", "dob": "2013-08-15", "gender": "F", "school": "Sunshine Academy", "needs": "Dietary Restrictions"}]', 
 'Allergic', 3, 2, 4, NULL, '2024-11-15'),

('Jane Smith', 'janesmith@example.com', '23456789', 3, 1, 
 '[{"name": "Ava Smith", "dob": "2015-09-25", "gender": "F", "school": "Green Valley School", "needs": "None"}]', 
 'None', 1, 1, 2, NULL, '2024-11-14'),

('Emma White', 'emmawhite@example.com', '67890113', 4, 2, 
 '[{"name": "James White", "dob": "2014-01-15", "gender": "M", "school": "Lakewood School", "needs": "Autism"}]', 
 'None', 2, 1, 6, NULL, '2024-11-14'),

('Nancy Blue', 'nancyblue@example.com', '56789012', 4, 2, 
 '[{"name": "Ella Blue", "dob": "2013-11-10", "gender": "F", "school": "Hillcrest School", "needs": "Visual Impairment"}]', 
 'Gluten-Free', 2, 1, 5, 'Quiet room needed', '2024-11-13');


INSERT INTO WhatsappUsers (Name, phoneNum)
VALUES ('Neil Hadziq', '+6589217943');

/*INSERT INTO AccountVerification (Email, verifCode)
VALUES ('redzhiyao2012@gmail.com', '121212')*/