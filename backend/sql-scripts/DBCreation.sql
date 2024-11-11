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

if exists (select * from sysobjects where name='Businesses' and type='U')
    drop table Businesses
GO

if exists (select * from sysobjects where name='Children' and type='U')
    drop table Children
GO

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

-------------------------------------------------------------------------------------------------------------


create table Roles (
	RoleID int not null,	
	Name varchar(50) default 'User',
	constraint PK_Roles primary key (RoleID),
)
go

CREATE TABLE Account (
	AccID int not null IDENTITY(1,1),
	Name varchar(50) null,
	Email varchar(50) not null unique,
	ContactNo char(8)  null unique,
	memberStatus char(10) null default 'Pending',
	memberExpiry datetime null,
	address varchar(255) null,
	dateOfBirth datetime null,
	relationshipToChild varchar(255) null,
	RoleID int null default 2,
	Salt varchar(255) not null,
	HashedPassword varchar(255) not null,
	constraint PK_Account primary key (AccID),
	constraint FK_Account_RoleID foreign key (RoleID) references Roles(RoleID),
	constraint CHK_MemberStatus check (memberStatus in ('Active','Inactive','Pending'))
)
GO

CREATE TABLE AccountVerification (
	Email varchar(50) not null,
	verifCode int not null,
	constraint PK_AccountVerification primary key (Email),
)
go

CREATE TABLE Newsletter (
	Email varchar(50) not null,
	constraint PK_Newsletter primary key (Email),
);

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
GO

create table Businesses (
	BusinessID int not null identity(1,1),
	Name varchar(50) not null,
	ContactNo char(8) not null,
	Email varchar(50) not null,
	exNumOfDays int not null,
	groupSize int not null,
	orgName varchar(50) not null,
	helpText varchar(255) not null,
	constraint PK_Business primary key (BusinessID)
)
go


-- removed agerange, cost, added progintro
create table Programmes (
	ProgID int not null,
	Name varchar(50) not null,
	ProgIntro varchar(255) not null,
	ProgDesc varchar(255) not null,
	ProgType char(10) not null,
	constraint PK_Programmes primary key (ProgID),
	Constraint CHK_ProgType check (ProgType in ('Light','Regular','Premium'))
)
GO

create table ProgrammeTier(
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


create table ProgrammeFeedback (
	FeedbackID int not null IDENTITY(1,1),
	ProgID int not null,
	AccID int not null,
	FdbkDesc varchar(255),
	constraint PK_ProgrammeFeedback primary key (FeedbackID),
	constraint FK_ProgFeedback_ProgID foreign key (ProgID) references Programmes(ProgID),
	constraint FK_AccID foreign key (AccID) references Account(AccID),
)
go


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

-------------------------------------------------------------------------------------------------------------

-- Insert data into Roles
INSERT INTO Roles (RoleID, Name) VALUES
(1, 'Admin'),
(2, 'User');

-- Insert data into Account
INSERT INTO Account (Name, Email, ContactNo, memberStatus, memberExpiry, address, dateOfBirth, relationshipToChild, RoleID, Salt, HashedPassword) VALUES
('John Doe', 'johndoe@example.com', '12345678', 'Active', '2025-12-31', '123 Main St, Springfield, IL', '1990-01-01', 'Father', 1, 'randomsalt1', 'hashedpassword1'),
('Jane Smith', 'janesmith@example.com', '23456789', 'Inactive', NULL, '456 Elm St, Springfield, IL', '1985-02-15', 'Mother', 2, 'randomsalt2', 'hashedpassword2'),
('Mark Evans', 'markevans@example.com', '34567890', 'Pending', NULL, '789 Oak St, Springfield, IL', '1992-03-22', 'Guardian', 2, 'randomsalt3', 'hashedpassword3'),
('Lucy Gray', 'lucygray@example.com', '45678901', 'Active', '2026-01-01', '321 Pine St, Springfield, IL', '1995-04-10', 'Mother', 2, 'randomsalt4', 'hashedpassword4'),
('Emma White', 'emmawhite@example.com', '56789012', 'Active', '2025-11-15', '654 Cedar St, Springfield, IL', '1991-05-05', 'Guardian', 2, 'randomsalt5', 'hashedpassword5'),
('Paul Black', 'paulblack@example.com', '67890123', 'Pending', NULL, '987 Birch St, Springfield, IL', '1988-06-30', 'Father', 2, 'randomsalt6', 'hashedpassword6'),
('Nancy Blue', 'nancyblue@example.com', '78901234', 'Active', '2025-12-15', '159 Maple St, Springfield, IL', '1994-07-25', 'Mother', 2, 'randomsalt7', 'hashedpassword7'),
('Oliver Red', 'oliverred@example.com', '89012345', 'Active', '2025-10-05', '753 Walnut St, Springfield, IL', '1986-08-20', 'Father', 1, 'randomsalt8', 'hashedpassword8'),
('Chris Green', 'chrisgreen@example.com', '90123456', 'Inactive', NULL, '951 Ash St, Springfield, IL', '1993-09-15', 'Guardian', 2, 'randomsalt9', 'hashedpassword9'),
('Sophia Brown', 'sophiabrown@example.com', '01234567', 'Active', '2026-05-20', '357 Spruce St, Springfield, IL', '1990-10-12', 'Mother', 2, 'randomsalt10', 'hashedpassword10');



-- Insert data into Children
INSERT INTO Children (GuardianEmail, Name, Gender, Dob, Needs, School, Interests) VALUES
('lucygray@example.com', 'Liam Gray', 'M', '2015-05-10', 'None', 'Bright Future School', 'Painting, Science'),
('paulblack@example.com', 'Mia Black', 'F', '2014-03-22', 'Allergies', 'Sunshine Academy', 'Dancing, Mathematics'),
('lucygray@example.com', 'Lucas Gray', 'M', '2017-10-01', 'Speech Therapy', 'Bright Future School', 'Reading, Robotics'),
('paulblack@example.com', 'Amelia Black', 'F', '2013-08-15', 'Dietary Restrictions', 'Sunshine Academy', 'Sports, Art'),
('chrisgreen@example.com', 'Ethan Green', 'M', '2016-12-05', 'None', 'Green Valley School', 'Chess, Swimming'),
('janesmith@example.com', 'Ava Smith', 'F', '2015-09-25', 'None', 'Green Valley School', 'Math, Reading'),
('emmawhite@example.com', 'James White', 'M', '2014-01-15', 'Autism', 'Lakewood School', 'Science, Computers'),
('nancyblue@example.com', 'Ella Blue', 'F', '2013-11-10', 'Visual Impairment', 'Hillcrest School', 'Art, Music'),
('oliverred@example.com', 'Lily Red', 'F', '2016-07-18', 'Hearing Impairment', 'Sunrise Academy', 'Sports, Robotics'),
('sophiabrown@example.com', 'Benjamin Brown', 'M', '2015-04-30', 'Asthma', 'Maplewood School', 'Reading, Drama');

INSERT INTO Businesses (Name, ContactNo, Email, exNumOfDays, groupSize, orgName, helpText) VALUES
('Tech Innovations Ltd', '12345678', 'info@techinnovations.com', 7, 15, 'Innovate Group', 'Providing cutting-edge tech solutions for small businesses.'),
('Green Earth Inc', '23456789', 'contact@greenearth.com', 3, 20, 'Eco Solutions', 'Dedicated to eco-friendly products and sustainability initiatives.'),
('HealthPlus Clinic', '34567890', 'support@healthplus.com', 5, 10, 'Health Network', 'Focused on providing high-quality healthcare services.'),
('Urban Eats', '45678901', 'info@urbaneats.com', 2, 30, 'Foodies United', 'Offering fresh and diverse food options in urban areas.'),
('Digital Media Solutions', '56789012', 'contact@dmsolutions.com', 10, 12, 'Media Group', 'Specializing in digital marketing and media solutions for businesses.'),
('Elite Fitness Center', '67890123', 'info@elitefitness.com', 14, 25, 'Wellness Partners', 'Aiming to promote health and wellness through fitness training.'),
('Adventure Outdoors', '78901234', 'info@adventureoutdoors.com', 7, 50, 'Outdoors Corp', 'Organizing outdoor activities and adventures for groups.'),
('Creative Minds Studio', '89012345', 'contact@creativeminds.com', 4, 8, 'Design Hub', 'Creative agency focused on graphic design and branding.'),
('FinTech Solutions', '90123456', 'info@fintechsolutions.com', 6, 18, 'Finance Experts', 'Offering financial technology solutions for modern businesses.'),
('EduLearn Academy', '01234567', 'support@edulearn.com', 3, 40, 'Education Group', 'Committed to providing quality education and training programs.');


-- Insert data into Programmes
INSERT INTO Programmes (ProgID, Name, ProgIntro, ProgDesc, ProgType) VALUES
(1, 'Public Speaking Workshops', 'Basic public speaking', 'Beginner Public Speaking Workshops', 'Light'),
(2, 'PSLE Power Up Camp', 'PSLE learning enhancement', 'Help PSLE takers learn efficiently and effectively', 'Regular'),
(3, 'Future Entrepreneurs Labs', 'Learn about entrepreneurship', 'Study how to be an entrepreneur', 'Premium'),
(4, 'Professionals', 'Foster a culture of continuous learning and development', 'Learn what it takes to be a professional', 'Premium');

-- Insert data into ProgrammeTier
INSERT INTO ProgrammeTier (TierID, ProgID, TierDesc, Lunch, Level, Duration, ClassSize, AgeRange, Cost) VALUES
(1, 1, 'Beginner Public Speaking Workshops', 'Included', 'Beginner', '3.5 days', '15-20', '5-10', 988.00),
(2, 1, 'Intermediate Public Speaking Workshops', 'Included', 'Intermediate', '3 days', '12-15', '8-12', 1188.00),
(3, 1, 'Advanced Public Speaking Workshops', 'Included', 'Advanced', '3 days', '10-15', '7-12', 1388.00),
(4, 2, 'PSLE Power Up Camp', 'Included', 'Beginner', '2 days', '15-20', '7-12', 428.00),
(5, 3, 'Future Entrepreneurs Labs', 'Included', 'Beginner', '2 days', '10-15', '10-15', 1000.00),
(6, 4, 'Professionals', 'Included', 'Advanced', '8 days', '15-20', '18-25', 1180.00);


-- Insert data into Payment
INSERT INTO Payment (Email, ProgID, Quantity, TotalCost, PaidDate, TransacStatus) VALUES
('johndoe@example.com', 1, 1, 50.00, '2024-01-15', 'Paid'),
('janesmith@example.com', 3, 3, 150.00, '2024-02-10', 'Paid'),
('paulblack@example.com', 2, 2, 100.00, '2024-03-12', 'Pending'),
('lucygray@example.com', 3, 1, 90.00, '2024-04-05', 'Paid'),
('nancyblue@example.com', 4, 4, 120.00, '2024-05-19', 'Pending'),
('emmawhite@example.com', 4, 5, 200.00, '2024-06-21', 'Paid'),
('johndoe@example.com', 2, 1, 45.00, '2024-07-07', 'Paid'),
('oliverred@example.com', 1, 2, 30.00, '2024-08-13', 'Pending'),
('johndoe@example.com', 3, 4, 80.00, '2024-09-05', 'Paid'),
('emmawhite@example.com', 4, 3, 40.00, '2024-10-11', 'Paid');


-- Insert data into ProgrammeFeedback
INSERT INTO ProgrammeFeedback (ProgID, AccID, FdbkDesc) VALUES
(1, 1, 'Great program! My child loved it.'),
(2, 4, 'Very educational and fun.'),
(3, 2, 'Well-organized and enjoyable.'),
(4, 6, 'Good value for the price.'),
(1, 7, 'Loved the interactive activities.'),
(4, 9, 'Fun experience, will join again.'),
(2, 3, 'Good for younger kids.'),
(3, 8, 'Very engaging and informative.'),
(2, 5, 'My child improved a lot.'),
(1, 10, 'Excellent program for beginners.');

-- Insert data into ProgrammeSchedule with specific start and end times
INSERT INTO ProgrammeSchedule (ProgID, DateStart, DateEnd, Venue, TotalSeats) VALUES
(1, '2024-02-01 09:00:00', '2024-02-10 17:00:00', 'Community Hall A', 20),
(2, '2024-03-15 10:00:00', '2024-03-20 16:00:00', 'School Auditorium', 20),
(3, '2024-04-01 08:30:00', '2024-04-10 18:00:00', 'Activity Centre', 15),
(4, '2024-05-05 09:00:00', '2024-05-12 15:00:00', 'Office Room 3', 20);


-- Insert data into Bookings with updated structure, including BookingDate
INSERT INTO Bookings (Name, Email, ContactNo, TierID, ProgID, childrenDetails, Diet, SchedID, NumSeats, TransacID, SpecialReq, BookingDate) VALUES
('Lucy Gray', 'lucygray@example.com', '34567890', 2, 1, 
 '[{"name": "Liam Gray", "dob": "2015-05-10", "gender": "M", "school": "Bright Future School", "needs": "None"}, 
   {"name": "Lucas Gray", "dob": "2017-10-01", "gender": "M", "school": "Bright Future School", "needs": "Speech Therapy"}]', 
 'None', 2, 2, 3, 'Wheelchair access', '2024-03-12'),

('Paul Black', 'paulblack@example.com', '45678901', 5, 3, 
 '[{"name": "Mia Black", "dob": "2014-03-22", "gender": "F", "school": "Sunshine Academy", "needs": "Allergies"}, 
   {"name": "Amelia Black", "dob": "2013-08-15", "gender": "F", "school": "Sunshine Academy", "needs": "Dietary Restrictions"}]', 
 'Allergic', 3, 2, 4, NULL, '2024-04-05'),

('Jane Smith', 'janesmith@example.com', '23456789', 3, 1, 
 '[{"name": "Ava Smith", "dob": "2015-09-25", "gender": "F", "school": "Green Valley School", "needs": "None"}]', 
 'None', 1, 1, 2, NULL, '2024-02-10'),

('Emma White', 'emmawhite@example.com', '67890123', 6, 4, 
 '[{"name": "James White", "dob": "2014-01-15", "gender": "M", "school": "Lakewood School", "needs": "Autism"}]', 
 'None', 4, 1, 6, NULL, '2024-10-11'),

('Nancy Blue', 'nancyblue@example.com', '56789012', 4, 2, 
 '[{"name": "Ella Blue", "dob": "2013-11-10", "gender": "F", "school": "Hillcrest School", "needs": "Visual Impairment"}]', 
 'Gluten-Free', 2, 1, 5, 'Quiet room needed', '2024-05-19');