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


if exists (select * from sysobjects where name='ProgrammeSchedule' and type='U')
    drop table ProgrammeSchedule
GO

if exists (select * from sysobjects where name='ProgrammeFeedback' and type='U')
    drop table ProgrammeFeedback
GO

if exists (select * from sysobjects where name='Bookings' and type='U')
    drop table Bookings
GO

if exists (select * from sysobjects where name='Payment' and type='U')
    drop table Payment
GO

if exists (select * from sysobjects where name='Programmes' and type='U')
    drop table Programmes
GO

if exists (select * from sysobjects where name='Children' and type='U')
    drop table Children
GO

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
	Name varchar(50) not null,
	Email varchar(50) not null unique,
	ContactNo char(8) not null unique,
	memberStatus char(10) not null default 'Pending',
	memberExpiry datetime null,
	RoleID int not null default 2,
	constraint PK_Account primary key (AccID),
	constraint FK_Account_RoleID foreign key (RoleID) references Roles(RoleID),
	constraint CHK_MemberStatus check (memberStatus in ('Active','Inactive','Pending'))
)
GO

CREATE TABLE AccountVerification (
	AccID int not null,
	verifCode int not null,
	constraint PK_AccountVerification primary key (AccID),
	constraint FK_AccountVer_AccID foreign key (AccID) references Account(AccID)
)
go

create table Children (
	ChildID int not null IDENTITY(1,1),
	GuardianEmail varchar(50) not null,
	Name varchar(50) not null,
	Gender char(1) not null,
	Dob datetime not null,
	Needs varchar(50) not null,
	School varchar(50) not null,
	Interests text not null,
	constraint PK_Children primary key (ChildID),
	constraint FK_Children_GuardianEmail foreign key (GuardianEmail) references Account(Email),
	constraint CHK_Gender check (Gender in ('M', 'F'))
)
GO

create table Programmes (
	ProgID int not null,
	Name varchar(50) not null,
	ProgDesc varchar(255) not null,
	ProgType char(10) not null,
	AgeRange varchar(10) not null,
	Cost money not null,
	constraint PK_Programmes primary key (ProgID),
	Constraint CHK_ProgType check (ProgType in ('Light','Regular','Premium'))
)
GO

create table Payment (
	TransacID int not null IDENTITY(1,1),
	Email varchar(50) not null,
	ProgID int not null,
	Quantity int not null,
	TotalCost money not null,
	PaidDate datetime not null,
	TransacStatus varchar(10),
	constraint PK_Payment primary key (TransacID),
	constraint FK_Payment_AccID foreign key (Email) references Account(Email),
	constraint FK_Payment_ProgID foreign key (ProgID) references Programmes(ProgID),
	constraint CHK_TransacStatus check (TransacStatus in ('Paid','Pending'))
)
go

create table Bookings (
	BookingID int not null,
	Email varchar(50) not null,
	ProgID int not null,
	ChildID int,
	Diet varchar(50),
	BookingDate datetime,
	BookingStatus varchar(20) not null default 'Pending',
	TransacID int not null,
	constraint PK_Bookings primary key (BookingID),
	constraint FK_Bookings_Email foreign key (Email) references Account(Email),
	constraint FK_Bookings_ProgID foreign key (ProgID) references Programmes(ProgID),
	constraint FK_Bookings_ChildID foreign key (ChildID) references Children(ChildID),
	constraint FK_Bookings_TransacID foreign key (TransacID) references Payment(TransacID),
	constraint CHK_BookingStatus check (BookingStatus in ('Confirmed','Cancelled','Pending'))
)
GO

create table ProgrammeFeedback (
	FeedbackID int not null,
	ProgID int not null,
	AccID int not null,
	FdbkDesc varchar(255),
	constraint PK_ProgrammeFeedback primary key (FeedbackID),
	constraint FK_ProgFeedback_ProgID foreign key (ProgID) references Programmes(ProgID),
	constraint FK_AccID foreign key (AccID) references Account(AccID),
)
go


create table ProgrammeSchedule (
	SchedID int not null,
	ProgID int not null,
	DateStart datetime not null,
	DateEnd datetime not null,
	Venue varchar(100) not null,
	TotalSeats int not null,
	constraint PK_ProgrammeSchedule primary key (SchedID),
	constraint FK_ProgSchedule_ProgID foreign key (ProgID) references Programmes(ProgID)
)
go

-------------------------------------------------------------------------------------------------------------

-- Insert data into Roles
INSERT INTO Roles (RoleID, Name) VALUES
(1, 'Admin'),
(2, 'User');

-- Insert data into Account
INSERT INTO Account (Name, Email, ContactNo, memberStatus, memberExpiry, RoleID) VALUES
('John Doe', 'johndoe@example.com', '12345678', 'Active', '2025-12-31', 1),
('Jane Smith', 'janesmith@example.com', '23456789', 'Inactive', NULL, 2),
('Mark Evans', 'markevans@example.com', '34567890', 'Pending', NULL, 2),
('Lucy Gray', 'lucygray@example.com', '45678901', 'Active', '2026-01-01', 2),
('Emma White', 'emmawhite@example.com', '56789012', 'Active', '2025-11-15', 2),
('Paul Black', 'paulblack@example.com', '67890123', 'Pending', NULL, 2),
('Nancy Blue', 'nancyblue@example.com', '78901234', 'Active', '2025-12-15', 2),
('Oliver Red', 'oliverred@example.com', '89012345', 'Active', '2025-10-05', 1),
('Chris Green', 'chrisgreen@example.com', '90123456', 'Inactive', NULL, 2),
('Sophia Brown', 'sophiabrown@example.com', '01234567', 'Active', '2026-05-20', 2);

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


-- Insert data into Programmes
INSERT INTO Programmes (ProgID, Name, ProgDesc, ProgType, AgeRange, Cost) VALUES
(1, 'Art Class', 'Basic art class for children', 'Light', '5-10', 50.00),
(2, 'Science Camp', 'Hands-on science experiments', 'Regular', '7-12', 100.00),
(3, 'Sports Training', 'Weekly sports training', 'Premium', '10-15', 150.00),
(4, 'Dance Class', 'Beginner dance classes', 'Light', '5-8', 45.00),
(5, 'Music Workshop', 'Introduction to music', 'Regular', '6-12', 90.00),
(6, 'Coding Camp', 'Intro to coding', 'Premium', '8-14', 200.00),
(7, 'Robotics', 'Basics of robotics', 'Regular', '10-15', 120.00),
(8, 'Math Club', 'Math activities and games', 'Light', '7-10', 30.00),
(9, 'Drama Club', 'Weekly drama activities', 'Regular', '8-12', 80.00),
(10, 'Chess Club', 'Chess training sessions', 'Light', '6-10', 40.00);

-- Insert data into Payment
INSERT INTO Payment (Email, ProgID, Quantity, TotalCost, PaidDate, TransacStatus) VALUES
('johndoe@example.com', 1, 1, 50.00, '2024-01-15', 'Paid'),
('janesmith@example.com', 3, 3, 150.00, '2024-02-10', 'Paid'),
('paulblack@example.com', 2, 2, 100.00, '2024-03-12', 'Pending'),
('lucygray@example.com', 5, 1, 90.00, '2024-04-05', 'Paid'),
('nancyblue@example.com', 7, 4, 120.00, '2024-05-19', 'Pending'),
('emmawhite@example.com', 6, 5, 200.00, '2024-06-21', 'Paid'),
('johndoe@example.com', 4, 1, 45.00, '2024-07-07', 'Paid'),
('oliverred@example.com', 8, 2, 30.00, '2024-08-13', 'Pending'),
('johndoe@example.com', 9, 4, 80.00, '2024-09-05', 'Paid'),
('emmawhite@example.com', 10, 3, 40.00, '2024-10-11', 'Paid');


-- Insert data into Bookings
INSERT INTO Bookings (BookingID, Email, ProgID, ChildID, Diet, BookingDate, BookingStatus, TransacID) VALUES
(1, 'johndoe@example.com', 1, 1, 'Vegetarian', '2024-01-15', 'Confirmed', 1),  -- Quantity 1
(2, 'janesmith@example.com', 3, 2, 'None', '2024-02-10', 'Confirmed', 2),    -- Quantity 3
(3, 'janesmith@example.com', 3, 3, 'None', '2024-02-10', 'Confirmed', 2),    -- Quantity 3
(4, 'lucygray@example.com', 2, 4, 'None', '2024-03-12', 'Pending', 3),      -- Quantity 2
(5, 'lucygray@example.com', 2, 5, 'None', '2024-03-12', 'Pending', 3),      -- Quantity 2
(6, 'paulblack@example.com', 5, 6, 'Allergic', '2024-04-05', 'Confirmed', 4),  -- Quantity 1
(7, 'nancyblue@example.com', 7, 7, 'Gluten-Free', '2024-05-19', 'Cancelled', 5),  -- Quantity 4
(8, 'nancyblue@example.com', 7, 8, 'Gluten-Free', '2024-05-19', 'Cancelled', 5),  -- Quantity 4
(9, 'nancyblue@example.com', 7, 9, 'Gluten-Free', '2024-05-19', 'Cancelled', 5),  -- Quantity 4
(10, 'nancyblue@example.com', 7, 10, 'Gluten-Free', '2024-05-19', 'Cancelled', 5),  -- Quantity 4
(11, 'oliverred@example.com', 6, 1, 'None', '2024-06-21', 'Confirmed', 6),  -- Quantity 5
(12, 'oliverred@example.com', 6, 2, 'None', '2024-06-21', 'Confirmed', 6),  -- Quantity 5
(13, 'oliverred@example.com', 6, 3, 'None', '2024-06-21', 'Confirmed', 6),  -- Quantity 5
(14, 'oliverred@example.com', 6, 4, 'None', '2024-06-21', 'Confirmed', 6),  -- Quantity 5
(15, 'oliverred@example.com', 6, 5, 'None', '2024-06-21', 'Confirmed', 6),  -- Quantity 5
(16, 'johndoe@example.com', 9, 6, 'Kosher', '2024-09-05', 'Confirmed', 9),    -- Quantity 4
(17, 'johndoe@example.com', 9, 7, 'Kosher', '2024-09-05', 'Confirmed', 9),    -- Quantity 4
(18, 'johndoe@example.com', 9, 8, 'Kosher', '2024-09-05', 'Confirmed', 9),    -- Quantity 4
(19, 'johndoe@example.com', 9, 9, 'Kosher', '2024-09-05', 'Confirmed', 9),    -- Quantity 4
(20, 'emmawhite@example.com', 10, 10, 'None', '2024-10-11', 'Confirmed', 10),  -- Quantity 3
(21, 'emmawhite@example.com', 10, 1, 'None', '2024-10-11', 'Confirmed', 10),  -- Quantity 3
(22, 'emmawhite@example.com', 10, 2, 'None', '2024-10-11', 'Confirmed', 10);  -- Quantity 3



-- Insert data into ProgrammeFeedback
INSERT INTO ProgrammeFeedback (FeedbackID, ProgID, AccID, FdbkDesc) VALUES
(1, 1, 1, 'Great program! My child loved it.'),
(2, 2, 4, 'Very educational and fun.'),
(3, 3, 2, 'Well-organized and enjoyable.'),
(4, 5, 6, 'Good value for the price.'),
(5, 7, 7, 'Loved the interactive activities.'),
(6, 8, 9, 'Fun experience, will join again.'),
(7, 4, 3, 'Good for younger kids.'),
(8, 6, 8, 'Very engaging and informative.'),
(9, 9, 5, 'My child improved a lot.'),
(10, 10, 10, 'Excellent program for beginners.');

-- Insert data into ProgrammeSchedule
INSERT INTO ProgrammeSchedule (SchedID, ProgID, DateStart, DateEnd, Venue, TotalSeats) VALUES
(1, 1, '2024-02-01', '2024-02-10', 'Community Hall A', 20),
(2, 2, '2024-03-15', '2024-03-20', 'School Auditorium', 25),
(3, 3, '2024-04-01', '2024-04-10', 'Sports Center', 30),
(4, 4, '2024-05-05', '2024-05-12', 'Dance Studio B', 15),
(5, 5, '2024-06-15', '2024-06-25', 'Music Hall 1', 20),
(6, 6, '2024-07-10', '2024-07-15', 'Tech Lab A', 25),
(7, 7, '2024-08-05', '2024-08-12', 'Robotics Room', 30),
(8, 8, '2024-09-01', '2024-09-05', 'Math Center', 20),
(9, 9, '2024-10-10', '2024-10-15', 'Drama Theater', 25),
(10, 10, '2024-11-20', '2024-11-25', 'Chess Club Room', 15);