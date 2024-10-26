CREATE database Mindsphere
GO

USE Mindsphere
GO

-- Drop tables if they exist in a specific order to prevent foreign key conflicts
DECLARE @tableName NVARCHAR(50);

DECLARE table_cursor CURSOR FOR
SELECT name 
FROM sysobjects 
WHERE xtype = 'U' 
  AND name IN ('Bookings', 'Programmes', 'Children', 'Account', 'Roles');

OPEN table_cursor;
FETCH NEXT FROM table_cursor INTO @tableName;

WHILE @@FETCH_STATUS = 0
BEGIN
    EXEC('DROP TABLE ' + @tableName);
    FETCH NEXT FROM table_cursor INTO @tableName;
END

CLOSE table_cursor;
DEALLOCATE table_cursor;
GO

create table Roles (
	RoleID int not null,
	Name varchar(50) default 'User',
	constraint PK_Roles primary key (RoleID),
)
go

CREATE TABLE Account (
	AccID int not null,
	Name varchar(50) not null,
	Email varchar(50) not null unique,
	ContactNo char(8) not null unique,
	memberStatus char(10) not null default 'Active',
	memberExpiry datetime not null default dateadd(year,1,getdate()),
	RoleID int not null default 2,
	constraint PK_Account primary key (AccID),
	constraint FK_Account_RoleID foreign key (RoleID) references Roles(RoleID),
	constraint CHK_MemberStatus check (memberStatus in ('Active','Inactive','Pending'))
)
GO

create table Children (
	ChildID int not null,
	GuardianID int not null,
	Dob datetime not null,
	School varchar(50) not null,
	Interests text not null,
	constraint PK_Children primary key (ChildID),
	constraint FK_Children_GuardianID foreign key (GuardianID) references Account(AccID)
)
GO

create table Programmes (
	ProgID int not null,
	Name varchar(50) not null,
	ProgDesc varchar(255) not null,
	ProgType char(10) not null,
	MaxCapacity int not null default 20,
	AgeRange varchar(10) not null,
	Date datetime not null,
	constraint PK_Programmes primary key (ProgID),
	Constraint CHK_ProgType check (ProgType in ('Light','Regular','Premium'))
)
GO

create table Bookings (
	BookingID int not null,
	AccID int not null,
	ProgID int not null,
	ChildID int,
	BookingDate datetime,
	BookingStatus varchar(20) not null default 'Confirmed',
	constraint PK_Bookings primary key (BookingID),
	constraint FK_Bookings_AccID foreign key (AccID) references Account(AccID),
	constraint FK_Bookings_ProgID foreign key (ProgID) references Programmes(ProgID),
	constraint FK_Bookings_ChildID foreign key (ChildID) references Children(ChildID),
	constraint CHK_BookingStatus check (BookingStatus in ('Confirmed','Cancelled','Pending'))
)
GO