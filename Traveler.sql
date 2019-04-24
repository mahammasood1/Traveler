
go
create table SignUp
(
	 UserId varchar(50) primary key,
	 Security_Question varchar(100),
	 Security_Answer varchar(10),
	 Name varchar(50)
)

create table SignIn
(
	UserId varchar(50) primary key foreign key references SignUp(UserId),
	Pswrd varchar(50)
)
create table Organizer
(
	Org_id int identity(1,1) primary key,
	UserId varchar(50) foreign key references SignUp(UserId),
	Name varchar(50),
	Logo_Image varchar(50),
	CNIC varchar(50),
	Number varchar(50),
	Email varchar(50)
)
create table Sources
(
	S_id int,
	SourceName varchar(50),
	SourceBudget float,
	SourceDate varchar(50),
	SourceTime varchar(50)
)
create table Destinations
(
	D_id int,
	DestinationName varchar(50),	
	DestinationDate varchar(50),
	DestinationTime varchar(50)
)

create table MakeTrip
(
	Trip_id int identity(1,1) primary key,
	trip_name varchar(100),
	Org_id int foreign key references Organizer(Org_id),
	NoOfSeats int,
	NoOfDays int,
	S_id int,
	D_id int,
	Descriptions varchar(1000),
	BaseCost float
)
create table Reg_Trips
(
	Trip_id int foreign key references MakeTrip(Trip_id),
	NoOfRegSeats int,
	TotalCalculatedCost float,
	S_id int,
	--UserId varchar(50) foreign key references SignUp(UserId)
)

go
create proc SigningUp
@userid varchar(50),
@pswrd varchar(50),
@securityQuestion varchar(50),
@answer varchar(50),
@name varchar(50),
@out varchar(50) output
as
begin
	if not exists(select * from SignUp where @userid = UserId)
	begin
		insert into signup values (@userid, @securityQuestion, @answer, @name)
		insert into signin values (@userid, @pswrd)
		set @out = 'Done'
	end
	else
	begin
		set @out = 'Pehlay para hai id'
	end
end
go
go
create proc signingIn
@userId varchar(50),
@pswd varchar(50),
@out varchar(50) output
as
begin
	if exists(select * from SignIn where @userId = SignIn.userId AND @pswd = Signin.pswrd)
	begin
		set @out = 'On hai bro'
	end
	else
	begin
		set @out = 'Miss hai bro'
	end
end
go


go
alter proc UAD_Org
	--@org_id int,
	@UserId varchar(50),
	@Name varchar(50),
	@Logo_Image varchar(50),
	@CNIC varchar(50),
	@Number varchar(50),
	@Email varchar(50),
	@UAD varchar(10),
	@out varchar(50) output
as
begin
	if (@UAD = 'Add')
	begin
		if exists(select * from Organizer where UserId = @UserId)
		begin
			set @out = 'This user already has an account'
		end	
		else 
		begin
			insert into Organizer (userid, name, logo_image, cnic, number, email) values (@userid, @name, @logo_image, @cnic, @number, @email)
			set @out = 'Done'
		end
	end
	else if (@UAD = 'Update')
	begin
		if not exists(select * from Organizer where UserId = @UserId)
		begin
			set @out = 'Yaar organizer tu ban jao pehlay'
		end
		else 
		begin
			update Organizer set name = @name, logo_image = @logo_image, cnic = @cnic, number = @number, email = @email where @UserId = userid
			set @out = 'Done'
		end	
	end
	else if (@UAD = 'Delete')
	begin
		if not exists(select * from Organizer where UserId = @UserId)
		begin
			set @out = 'Yaar organizer tu ban jao pehlay'
		end
		else
		begin
			delete Organizer where @UserId = userid
			set @out = 'Done'
		end	
	end
end
go
create proc UAD_Trip
@tripId int,
@noofdays int,
@sourcename varchar(50),
@tripname varchar(50),
@sourcedate varchar(50),
@sourcetime varchar(50),
@sourcebudget varchar(50),
@destinationname varchar(50),
@destinationdate varchar(50),
@destinationtime varchar(50),
@userID varchar(50),
@noofseats varchar(50),
@description varchar(1000),
@basecost varchar(50),
@UAD varchar (20),
@out varchar(50) output
as
begin
	if (@UAD = 'Add')
	begin
		declare @s_id int, @d_id int, @org_id int
		select @s_id = max(s_id) from sources
		select @d_id = max(d_id) from Destinations
		if not exists (select * from Sources)
		begin
			set @s_id = 0
		end
		if not exists (select * from Destinations)
		begin
			set @d_id = 0
		end
		set @s_id = @s_id + 1
		set @d_id = @d_id + 1
		insert into Sources (S_id, SourceName, SourceDate, SourceTime, SourceBudget) values (@s_id, @sourcename, @sourcedate, @sourcetime, @sourcebudget)
		insert into Destinations(D_id, DestinationName, Destinationdate, DestinationTime) values (@d_id, @destinationname, @destinationdate, @destinationtime)
		select @org_id = org_id from Organizer where UserId = @userID
		insert into MakeTrip (BaseCost, noofdays, trip_name, NoOfSeats, S_id, D_id, Descriptions, Org_id) values (@basecost, @noofdays, @tripname, @noofseats, @s_id, @d_id, @description, @org_id)
		set @out = 'Done'
	end
	else if (@uad = 'delete')
	begin
		if exists(select * from MakeTrip where @tripId = Trip_id)
		begin
			delete from MakeTrip where @tripId = Trip_id
			set @out = 'Done'
		end
		else
		begin
			set @out = 'Trip pehlay bana tu loo'
		end
	end
	else if (@uad = 'update')
	begin
		if exists(select * from MakeTrip where @tripId = Trip_id)
		begin
			update MakeTrip set Maketrip.BaseCost = @basecost, Maketrip.Descriptions = @description, Maketrip.NoOfSeats = @noofseats where @tripId = Trip_id
			set @out = 'Done'
		end
		else
		begin
			set @out = 'Trip pehlay bana tu loo'
		end
	end
end

select * from sources
go
create proc UAD_Sources
@sourceid int,
@sourcename varchar(50),
@sourcedate varchar(50),
@sourcetime varchar(50),
@sourcebudget varchar(50),
@oldsourcename varchar(50),
@oldsourcedate varchar(50),
@oldsourcetime varchar(50),
@oldsourcebudget varchar(50),
@UAD varchar(50),
@out varchar(50) output
as
begin
	if(@UAD = 'add')
	begin
		if exists (select * from sources where @sourceid = s_id and @sourcename = SourceName and @sourcedate = sourcedate and @sourcetime = sourcetime and SourceBudget = @sourcebudget)
		begin
			set @out = 'Source is repeated'
		end
		else
		begin
			insert into sources (S_id, SourceName, SourceDate, SourceBudget, SourceTime) values (@sourceid, @SourceName, @SourceDate, @SourceBudget, @SourceTime)
			set @out = 'Done'
		end
	end
	else if (@UAD = 'update')
	begin
		if exists (select * from sources where @sourceid = s_id and @oldsourcename = SourceName and @oldsourcedate = sourcedate and @oldsourcetime = sourcetime and SourceBudget = @oldsourcebudget)
		begin
			update sources set sourcename = @sourcename, sourcebudget = @sourcebudget, SourceDate = @sourcedate, SourceTime = @sourcetime where sourcename = @oldsourcename and sourcebudget = @oldsourcebudget and SourceDate = @oldsourcedate and SourceTime = @oldsourcetime 
			set @out = 'Done'
		end
		else
		begin
			set @out = 'Pehlay Source tu daal lo'
		end
	end
	else if (@UAD = 'delete')
	begin
		if exists (select * from sources where @sourceid = s_id and @sourcename = SourceName and @sourcedate = sourcedate and @sourcetime = sourcetime and SourceBudget = @sourcebudget)
		begin
			delete from sources where sourcename = @sourcename and sourcebudget = @sourcebudget and SourceDate = @sourcedate and SourceTime = @sourcetime
			set @out = 'Done'
		end
		else
		begin
			set @out = 'Pehlay Source tu daal lo'
		end
	end
end
go
create proc UAD_Destinations
@destinationid int,
@destinationname varchar(50),
@destinationdate varchar(50),
@destinationtime varchar(50),
@destinationbudget varchar(50),
@olddestinationname varchar(50),
@olddestinationdate varchar(50),
@olddestinationtime varchar(50),
@olddestinationbudget varchar(50),
@UAD varchar(50),
@out varchar(50) output
as
begin
	if(@UAD = 'add')
	begin
		if exists (select * from destinations where @destinationid = d_id and @destinationname = destinationName and @destinationdate = destinationdate and @destinationtime = destinationtime)
		begin
			set @out = 'destination is repeated'
		end
		else
		begin
			insert into destinations (d_id, destinationName, destinationDate, destinationTime) values (@destinationid, @destinationName, @destinationDate, @destinationTime)
			set @out = 'Done'
		end
	end
	else if (@UAD = 'update')
	begin
		if exists (select * from destinations where @destinationid = d_id and @olddestinationname = destinationName and @olddestinationdate = destinationdate and @olddestinationtime = destinationtime)
		begin
			update destinations set destinationname = @destinationname, destinationDate = @destinationdate, destinationTime = @destinationtime where destinationname = @olddestinationname and destinationDate = @olddestinationdate and destinationTime = @olddestinationtime 
			set @out = 'Done'
		end
		else
		begin
			set @out = 'Pehlay destination tu daal lo'
		end
	end
	else if (@UAD = 'delete')
	begin
		if exists (select * from destinations where @destinationid = d_id and @destinationname = destinationName and @destinationdate = destinationdate and @destinationtime = destinationtime)
		begin
			delete from destinations where destinationname = @destinationname and destinationDate = @destinationdate and destinationTime = @destinationtime
			set @out = 'Done'
		end
		else
		begin
			set @out = 'Pehlay destination tu daal lo'
		end
	end
end

go
insert into SignUp (UserId, Name, Security_Question, Security_Answer) values ('Chowri', 'Hassan', 'Favourite pet?', 'Cat')
insert into SignUp (UserId, Name, Security_Question, Security_Answer) values ('Maham', 'Maham', 'Favourite pet?', 'Cat')
insert into SignUp (UserId, Name, Security_Question, Security_Answer) values ('Rabiya', 'Rabiya', 'Favourite pet?', 'Cat')
insert into SignUp (UserId, Name, Security_Question, Security_Answer) values ('Bilal', 'Bilal', 'Favourite pet?', 'Cat')

insert into signin (userid, Pswrd) values ('Chowri', 'pakistan')
declare @out varchar(50)
exec signingIn 'Chowri','pakistan',@out output
select @out
go
select * from SignUp
declare @out varchar(50)
exec UAD_Org 1,'Chowri','Tripexxx','URL','31203-1495018-1','0336-3427726','h.tariq10000@gmail.com','add', @out output
select @out 

go
declare @out varchar(50)
exec UAD_Trip '1', '3','Lahore','Islamabad Trip','29/06/2019','07:30','0','Islamabad','29/06/2019','12:30','Chowri','28','Very nice trip','6000','add', @out output
select @out
select * from MakeTrip
select * from sources
select * from destinations
go
declare @out varchar(50)
exec UAD_Sources '1','MianChanu','28/06/2019','08:30','550','Karachi','28/06/2019','08:30','550','add',@out output
select @out 
select * from sources
go
declare @out varchar(50)
exec UAD_Destinations'1','Murree','28/06/2019','08:30','550','Karachi','28/06/2019','07:30','500','add',@out output
select @out 
select * from Destinations

select * from SignIn
select * from SignUp
select * from Destinations
select * from Organizer
select * from Sources
select * from MakeTrip

insert into MakeTrip(trip_name, Org_id, NoOfSeats, NoOfDays, S_id, D_id, Descriptions, BaseCost) values ('Murree Trip', 1, 30, 5, 1, 1, 'Luxury Rooms Available', 5000)
select MakeTrip.trip_name, sourcename, destinationname from (MakeTrip join Destinations on MakeTrip.D_id = Destinations.D_id) join Sources on MakeTrip.S_id = Sources.S_id where MakeTrip.Trip_id = 1
select * from MakeTrip join sources on Sources.S_id = MakeTrip.S_id 

insert into Sources(S_id, SourceName, SourceBudget, SourceDate, SourceTime) values(2, 'Lahore', 5000, '30/06/2019', '12:30')
insert into MakeTrip(trip_name, Org_id, NoOfSeats, NoOfDays, S_id, D_id, Descriptions, BaseCost) values ('Skardu Trip', 2, 30, 5, 2, 3, 'Luxury Rooms Available', 15000)

insert into SignUp(UserId, Security_Question, Security_Answer, Name) values ('Farwa', 'Favourite pet?', 'Dog', 'Farwa')