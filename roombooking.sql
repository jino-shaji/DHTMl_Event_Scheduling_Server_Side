-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Nov 22, 2017 at 09:35 PM
-- Server version: 10.1.13-MariaDB
-- PHP Version: 7.0.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `roombooking`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `analytics` (IN `sd` DATE, IN `ed` DATE)  BEGIN
select count(*) total,rooms.prefix prefix from bookings inner join rooms on rooms.id = bookings.room
where bookings.status like 'confirmed' and (
(sd <=Date(bookings.start_date) and ed >=Date(bookings.end_date)) or
(sd <= Date(bookings.start_date) and ed<= Date(bookings.end_date) and ed>=Date(bookings.start_date)) or
( sd>= Date(bookings.start_date) and ed <= Date(bookings.end_date)) or
(sd <=Date(bookings.end_date) and ed >=Date(bookings.end_date))
)
 group by rooms.prefix;

select count(*) total,IF(referredby IS NULL or referredby = '', 'Misc', referredby) referredBy from bookings where status like 'confirmed' and (
(sd <=Date(bookings.start_date) and ed >=Date(bookings.end_date)) or
(sd <= Date(bookings.start_date) and ed<= Date(bookings.end_date) and ed>=Date(bookings.start_date)) or
( sd>= Date(bookings.start_date) and ed <= Date(bookings.end_date)) or
(sd <=Date(bookings.end_date) and ed >=Date(bookings.end_date))

)
 GROUP by referredby ;
 
select distinct count(*) total,IF(referredby IS NULL or referredby = '', 'Misc', referredBy) referredBy
 from bookings where (status like 'enquiry' or status like 'progress')  and (
(sd <=Date(bookings.start_date) and ed >=Date(bookings.end_date)) or
(sd <= Date(bookings.start_date) and ed<= Date(bookings.end_date) and ed>=Date(bookings.start_date)) or
( sd>= Date(bookings.start_date) and ed <= Date(bookings.end_date)) or
(sd <=Date(bookings.end_date) and ed >=Date(bookings.end_date))
)
GROUP by referredby ;

select * from
(select rooms.prefix loc,sum(
case 
when sd <=Date(bookings.start_date) and ed >=Date(bookings.end_date) then datediff(bookings.end_date,bookings.start_date)+1
when sd <= Date(bookings.start_date) and ed<= Date(bookings.end_date) and ed>=Date(bookings.start_date) then datediff(ed,bookings.start_date)+1
when sd>= Date(bookings.start_date) and ed <= Date(bookings.end_date) then datediff(ed,sd)+1
when sd <=Date(bookings.end_date) and ed >=Date(bookings.end_date) then datediff(bookings.end_date,sd)+1

else 0
end 
)total ,datediff(ed,sd)+1 max ,rooms.prefix from bookings inner join rooms on rooms.id = bookings.room 
where bookings.status like 'confirmed' group by rooms.prefix 
 )A cross join
 (select count(roomno)totalRooms,prefix from rooms group by prefix)B on A.prefix=B.prefix;


select concat(rooms.prefix,":",rooms.roomno)room,rooms.prefix loc,sum(
case 
when sd <=Date(bookings.start_date) and ed >=Date(bookings.end_date) then datediff(bookings.end_date,bookings.start_date)+1
when sd <= Date(bookings.start_date) and ed<= Date(bookings.end_date) and ed>=Date(bookings.start_date) then datediff(ed,bookings.start_date)+1
when sd>= Date(bookings.start_date) and ed <= Date(bookings.end_date) then datediff(ed,sd)+1
when sd <=Date(bookings.end_date) and ed >=Date(bookings.end_date) then datediff(bookings.end_date,sd)+1
else 0
end 
)total ,datediff(ed,sd)+1 max from bookings inner join rooms on rooms.id = bookings.room 
where bookings.status like 'confirmed' group by room ;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_room_booking_info` (IN `Bookingid` INT(11))  BEGIN
DECLARE countBookings int;
 SET countBookings =(select count(*) from bookings where id=Bookingid);
 
 DELETE from  bookings where id=Bookingid;
select countBookings;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_room_booking_info` (IN `start_date` DATETIME, IN `end_date` DATETIME, IN `room_type` VARCHAR(50), IN `bed_type` VARCHAR(50), IN `No_of_guests` INT(11), IN `No_of_male` INT(11), IN `No_of_female` INT(11), IN `Arrival_flight_details` VARCHAR(200), IN `Departure_flight_details` VARCHAR(200), IN `room` INT(11), IN `status` VARCHAR(50), IN `is_taxi` INT(11), IN `is_paid` TINYINT(1), IN `Name` VARCHAR(100), IN `Email` VARCHAR(100), IN `ReferredBy` VARCHAR(100), IN `Category` VARCHAR(100), IN `Description` VARCHAR(1000))  BEGIN

    
INSERT INTO bookings(start_date, end_date, room_type,bed_type,No_of_guests,No_of_male,No_of_female,Arrival_flight_details,
Departure_flight_details,room,status,is_taxi,is_paid,Name,Email,ReferredBy,Category,Description)
                      VALUES (start_date, end_date, room_type,bed_type,No_of_guests,No_of_male,No_of_female,Arrival_flight_details,
Departure_flight_details,room,status,is_taxi,is_paid,Name,Email,ReferredBy,Category,Description); 
      
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `update_room_booking_info` (IN `Bookingid` INT(11), IN `start_date` DATETIME, IN `end_date` DATETIME, IN `room_type` VARCHAR(50), IN `bed_type` VARCHAR(50), IN `No_of_guests` INT(11), IN `No_of_male` INT(11), IN `No_of_female` INT(11), IN `Arrival_flight_details` VARCHAR(200), IN `Departure_flight_details` VARCHAR(200), IN `room` INT(11), IN `status` VARCHAR(50), IN `is_taxi` INT(11), IN `is_paid` TINYINT(1), IN `Name` VARCHAR(100), IN `Email` VARCHAR(100), IN `ReferredBy` VARCHAR(100), IN `Category` VARCHAR(100), IN `Description` VARCHAR(1000))  BEGIN
    
update bookings set start_date=start_date, end_date=end_date, room_type=room_type,bed_type=bed_type,No_of_guests=No_of_guests,No_of_male=No_of_male,No_of_female=No_of_female,Arrival_flight_details=Arrival_flight_details,
Departure_flight_details=Departure_flight_details,room=room,status=status,is_taxi=is_taxi,is_paid=is_paid,Name=Name,Email=Email,ReferredBy=ReferredBy,Category=Category,Description=Description
where id=Bookingid;
      
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `room` int(11) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `is_paid` tinyint(1) DEFAULT NULL,
  `Name` varchar(100) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `ReferredBy` varchar(100) DEFAULT NULL,
  `Category` varchar(100) DEFAULT NULL,
  `room_type` varchar(50) DEFAULT NULL,
  `bed_type` varchar(50) DEFAULT NULL,
  `No_of_guests` int(11) DEFAULT NULL,
  `No_of_male` int(11) DEFAULT NULL,
  `No_of_female` int(11) DEFAULT NULL,
  `Arrival_flight_details` varchar(200) DEFAULT NULL,
  `Departure_flight_details` varchar(200) DEFAULT NULL,
  `is_taxi` int(11) DEFAULT NULL,
  `Description` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`start_date`, `end_date`, `room`, `status`, `id`, `is_paid`, `Name`, `Email`, `ReferredBy`, `Category`, `room_type`, `bed_type`, `No_of_guests`, `No_of_male`, `No_of_female`, `Arrival_flight_details`, `Departure_flight_details`, `is_taxi`, `Description`) VALUES
('2017-11-11 23:30:00', '2017-11-16 14:05:00', 17, 'Enquiry', 8, 0, 'jino', '', '', 'Foreign (Europe)', 'undefined', 'undefined', 0, 0, 0, '', '', 0, ''),
('2017-11-22 05:00:00', '2017-11-26 19:35:00', 2, 'Enquiry', 9, 0, 'jino', '', '', 'Foreign (Europe)', 'undefined', 'undefined', 0, 0, 0, '', '', 0, ''),
('2017-11-02 19:25:00', '2017-11-07 10:00:00', 19, 'Enquiry', 12, 0, 'jino', '', '', 'Foreign (Europe)', 'undefined', 'undefined', 0, 0, 0, '', '', 0, ''),
('2017-11-07 06:30:00', '2017-11-11 21:05:00', 16, 'Confirmed', 13, 0, 'jino', '', '', 'Foreign (Europe)', 'undefined', 'undefined', 0, 0, 0, '', '', 0, ''),
('2017-11-02 18:00:00', '2017-11-07 08:35:00', 4, 'Confirmed', 14, 0, 'jino', '', 'Jish', 'Foreign (Europe)', 'undefined', 'undefined', 0, 0, 0, '', '', 0, ''),
('2017-11-09 18:50:00', '2017-11-11 16:40:00', 4, 'Enquiry', 16, 0, 'zx', '', '', 'Foreign (Europe)', 'undefined', 'undefined', 0, 0, 0, '', '', 0, '');

-- --------------------------------------------------------

--
-- Table structure for table `booking_statuses`
--

CREATE TABLE `booking_statuses` (
  `id` int(11) NOT NULL,
  `name` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `booking_statuses`
--

INSERT INTO `booking_statuses` (`id`, `name`) VALUES
(1, 'New'),
(2, 'Confirmed'),
(3, 'Arrived'),
(4, 'Checked Out');

-- --------------------------------------------------------

--
-- Table structure for table `login_details`
--

CREATE TABLE `login_details` (
  `id` bigint(20) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(20) NOT NULL,
  `role` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `login_details`
--

INSERT INTO `login_details` (`id`, `username`, `password`, `role`) VALUES
(1, 'Admin', '123', 'admin'),
(2, 'Reception', '12345', 'user');

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `id` int(11) NOT NULL,
  `roomno` text NOT NULL,
  `type` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `prefix` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`id`, `roomno`, `type`, `status`, `prefix`) VALUES
(2, '112', 1, 0, 'p'),
(4, '104', 1, 1, 'p'),
(16, '201', 0, 0, 't'),
(17, '120', 0, 0, 'K'),
(19, '52', 0, 0, 'H'),
(20, '45', 0, 0, 'Z');

-- --------------------------------------------------------

--
-- Table structure for table `room_statuses`
--

CREATE TABLE `room_statuses` (
  `id` int(11) NOT NULL,
  `name` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `room_statuses`
--

INSERT INTO `room_statuses` (`id`, `name`) VALUES
(1, 'Ready'),
(2, 'Dirty'),
(3, 'Clean up');

-- --------------------------------------------------------

--
-- Table structure for table `room_types`
--

CREATE TABLE `room_types` (
  `id` int(11) NOT NULL,
  `name` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `room_types`
--

INSERT INTO `room_types` (`id`, `name`) VALUES
(1, '1 bed'),
(2, '2 beds'),
(3, '3 beds'),
(4, '4 beds');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_name` (`room`);

--
-- Indexes for table `booking_statuses`
--
ALTER TABLE `booking_statuses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `login_details`
--
ALTER TABLE `login_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `room_statuses`
--
ALTER TABLE `room_statuses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `room_types`
--
ALTER TABLE `room_types`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT for table `booking_statuses`
--
ALTER TABLE `booking_statuses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `login_details`
--
ALTER TABLE `login_details`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT for table `room_statuses`
--
ALTER TABLE `room_statuses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `room_types`
--
ALTER TABLE `room_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `fk_name` FOREIGN KEY (`room`) REFERENCES `rooms` (`id`) ON DELETE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
