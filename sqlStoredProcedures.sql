CREATE PROCEDURE insert_room_booking_info
 (IN start_date datetime,IN end_date datetime,
 IN room_type varchar(50),IN bed_type	varchar(50),IN No_of_guests	int(11),IN No_of_male int(11),
 IN No_of_female int(11), IN Arrival_flight_details	varchar(200),IN Departure_flight_details varchar(200),
 IN room int(11),IN status	varchar(50), IN is_taxi	int(11), IN is_paid	tinyint(1),
 IN Name	varchar(100),IN Email	varchar(100),IN ReferredBy	varchar(100),IN Category varchar(100),
 IN Description	varchar(1000))
BEGIN

    
INSERT INTO bookings(start_date, end_date, room_type,bed_type,No_of_guests,No_of_male,No_of_female,Arrival_flight_details,
Departure_flight_details,room,status,is_taxi,is_paid,Name,Email,ReferredBy,Category,Description)
                      VALUES (start_date, end_date, room_type,bed_type,No_of_guests,No_of_male,No_of_female,Arrival_flight_details,
Departure_flight_details,room,status,is_taxi,is_paid,Name,Email,ReferredBy,Category,Description); 
      
END

CREATE PROCEDURE update_room_booking_info
 (IN Bookingid int(11),IN start_date datetime,IN end_date datetime,
 IN room_type varchar(50),IN bed_type	varchar(50),IN No_of_guests	int(11),IN No_of_male int(11),
 IN No_of_female int(11), IN Arrival_flight_details	varchar(200),IN Departure_flight_details varchar(200),
 IN room int(11),IN status	varchar(50), IN is_taxi	int(11), IN is_paid	tinyint(1),
 IN Name	varchar(100),IN Email	varchar(100),IN ReferredBy	varchar(100),IN Category varchar(100),
 IN Description	varchar(1000))
BEGIN
    
update bookings set start_date=start_date, end_date=end_date, room_type=room_type,bed_type=bed_type,No_of_guests=No_of_guests,No_of_male=No_of_male,No_of_female=No_of_female,Arrival_flight_details=Arrival_flight_details,
Departure_flight_details=Departure_flight_details,room=room,status=status,is_taxi=is_taxi,is_paid=is_paid,Name=Name,Email=Email,ReferredBy=ReferredBy,Category=Category,Description=Description
where id=Bookingid;
      
END

CREATE PROCEDURE delete_room_booking_info(IN Bookingid int(11))
BEGIN
 DELETE from  bookings where id=Bookingid;
END
