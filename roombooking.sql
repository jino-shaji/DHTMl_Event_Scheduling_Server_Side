-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Nov 17, 2017 at 04:23 AM
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
  `is_taxi` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`start_date`, `end_date`, `room`, `status`, `id`, `is_paid`, `Name`, `Email`, `ReferredBy`, `Category`, `room_type`, `bed_type`, `No_of_guests`, `No_of_male`, `No_of_female`, `Arrival_flight_details`, `Departure_flight_details`, `is_taxi`) VALUES
('2017-03-02 04:22:36', '2017-03-23 14:13:00', 9, 'Enquiry', 1, 1, 'Jino Shaji', 'jinoshajiv@gmail.com', 'Jino S', 'Indian Standard', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
('2017-03-05 22:45:00', '2017-03-09 00:55:00', 1, 'Progress', 2, 1, 'Jino S', 'jinoshajiv@gmail.com', 'Jibin', 'Indian Standard', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
('2017-03-06 00:00:00', '2017-03-14 00:00:00', 5, 'Enquiry', 3, 0, 'Jino S', 'jishs@gg.com', '', 'Foreign (USA)', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
('2017-03-04 02:35:00', '2017-03-18 01:25:00', 7, 'Enquiry', 4, 0, 'Jino', 'jinoshajiv@gmail.com', 'Jk', 'Foreign (USA)', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
('2017-03-20 14:30:00', '2017-03-23 12:45:00', 3, 'Progress', 9, 0, 'Jino Shaji ', 'jinoshajiv@gmail.com, jiinmathe@ff.co', 'Ref Jino s', 'Foreign (USA)', 'AC', 'Single', 10, 8, 2, '0', 'ddepp flght', 0),
('2017-03-16 05:50:00', '2017-03-17 01:25:00', 4, 'Confirmed', 10, 0, 'dsf', 'dfvc', 'Ref d', 'Foreign (USA)', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
('2017-03-15 02:00:00', '2017-03-17 07:20:00', 3, 'Enquiry', 11, 0, 'Jose', 'jose@ff.co', 'Ref s', 'Foreign (Europe)', 'AC', 'Double', 20, 12, 8, '0', 'Dep Flight', 0);

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
(1, '101', 1, 1, 'RO'),
(2, '102', 1, 3, 'EV'),
(3, '103', 1, 2, 'HJ'),
(4, '104', 1, 1, 'JK'),
(5, '105', 2, 1, 'LO'),
(6, '201', 2, 2, 'KI'),
(7, '202', 2, 1, 'OI'),
(8, '203', 3, 3, 'OP'),
(9, '204', 3, 3, 'OK'),
(10, '301', 4, 2, 'IO'),
(11, '302', 4, 2, 'ER');

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
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `booking_statuses`
--
ALTER TABLE `booking_statuses`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `booking_statuses`
--
ALTER TABLE `booking_statuses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
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
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
