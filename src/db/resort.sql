-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 21, 2022 at 02:55 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `resort`
--

CREATE DATABASE resort;
USE resort;

-- --------------------------------------------------------

--
-- Table structure for table `m_bookings`
--

CREATE TABLE `m_bookings` (
  `id` int(11) NOT NULL,
  `type` varchar(10) NOT NULL,
  `cottages` varchar(100) NOT NULL,
  `selected_date_from` date NOT NULL,
  `selected_date_to` date NOT NULL,
  `payment_record` int(11) DEFAULT NULL,
  `booker` int(11) NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'pending',
  `x_reason` text DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `m_bookings`
--

INSERT INTO `m_bookings` (`id`, `type`, `cottages`, `selected_date_from`, `selected_date_to`, `payment_record`, `booker`, `status`, `x_reason`, `createdAt`, `updatedAt`) VALUES
(1, '', '[1, 2]', '2022-12-15', '2022-12-17', 1, 20, 'pending', NULL, '2022-12-19 07:13:07', '2022-12-19 07:13:07');

-- --------------------------------------------------------

--
-- Table structure for table `m_cottages`
--

CREATE TABLE `m_cottages` (
  `id` int(11) NOT NULL,
  `type` varchar(15) NOT NULL,
  `cottage_number` varchar(30) NOT NULL,
  `description` text NOT NULL,
  `capacity` varchar(50) NOT NULL,
  `price` double(6,2) NOT NULL,
  `is_available` tinyint(1) NOT NULL DEFAULT 1,
  `images` text DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `m_cottages`
--

INSERT INTO `m_cottages` (`id`, `type`, `cottage_number`, `description`, `capacity`, `price`, `is_available`, `images`, `createdAt`, `updatedAt`) VALUES
(1, '0', '', 'test', '', 1000.00, 1, '[\"C:\\\\Users\\\\Programming\\\\Desktop\\\\Codes\\\\mew\\\\src\\\\uploads\\\\images-1666312328835-552262467.jpeg\",\"C:\\\\Users\\\\Programming\\\\Desktop\\\\Codes\\\\mew\\\\src\\\\uploads\\\\images-1666312328836-126065442.jpg\"]', '2022-10-21 00:32:08', '2022-10-21 00:32:08'),
(2, '0', '111111', 'latest test data', 'wanmilyon', 100.00, 0, '[\"C:\\\\Users\\\\Programming\\\\Desktop\\\\Codes\\\\mew\\\\src\\\\uploads\\\\images-1668567556696-892924299.jpg\"]', '2022-11-16 02:59:16', '2022-11-16 02:59:16');

-- --------------------------------------------------------

--
-- Table structure for table `m_payment_records`
--

CREATE TABLE `m_payment_records` (
  `id` int(11) NOT NULL,
  `type` varchar(10) NOT NULL,
  `account_name` varchar(30) NOT NULL,
  `account_number` varchar(30) NOT NULL,
  `reference_number` varchar(100) DEFAULT NULL,
  `receipt` text DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `m_payment_records`
--

INSERT INTO `m_payment_records` (`id`, `type`, `account_name`, `account_number`, `reference_number`, `receipt`, `createdAt`, `updatedAt`) VALUES
(1, 'gcash', 'test', '34243', '343243', '[\"C:\\\\Users\\\\Programming\\\\Desktop\\\\Codes\\\\mew\\\\src\\\\uploads\\\\images-1671433987175-407447090.jpeg\"]', '2022-12-19 07:13:07', '2022-12-19 07:13:07');

-- --------------------------------------------------------

--
-- Table structure for table `m_users`
--

CREATE TABLE `m_users` (
  `id` int(11) NOT NULL,
  `role` text NOT NULL,
  `firstname` varchar(15) NOT NULL,
  `lastname` varchar(15) NOT NULL,
  `address` varchar(100) NOT NULL,
  `mobile_number` varchar(15) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `refresh_token` text DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `m_users`
--

INSERT INTO `m_users` (`id`, `role`, `firstname`, `lastname`, `address`, `mobile_number`, `email`, `password`, `refresh_token`, `createdAt`, `updatedAt`) VALUES
(1, '[\"admin\"]', 'Dexter Louiee', 'Aniezz', 'Tawagan Surr', '+639383673348', 'louieaniez@gmail.com', '$2b$10$o907DGERuQeYgVP5F8r2wexdzWa1XluesznxW2/tbPMPGT3fvsYhW', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RuYW1lIjoiRGV4dGVyIExvdWllZSIsImxhc3RuYW1lIjoiQW5pZXp6Iiwicm9sZSI6IltcImFkbWluXCJdIiwibW9iaWxlX251bWJlciI6Iis2MzkzODM2NzMzNDgiLCJlbWFpbCI6ImxvdWllYW5pZXpAZ21haWwuY29tIiwiY3JlYXRlZEF0IjoxNjcxNTMyNzUwMDY1LCJpYXQiOjE2NzE1MzI3NTB9.nW3QayDpOEaIo2Jmcy_oonlYVfg2ZyLd7S9wXaTRE80', '2022-10-13 09:15:18', '2022-10-13 09:15:18'),
(9, '[\"admin\"]', 'Dexter Louiee', 'Aniezz', 'address', '+639383673347', 'lodianiezzzzzz@gmail.com', '$2b$10$S.Ca6qXqEi7PY3O1.Fjw/eAi5piYxmluiqfDlC8b.zJypgluM4Cuu', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxvZGlhbmllekBnbWFpbC5jb20iLCJjcmVhdGVkQXQiOjE2Njg1NjU1NjYwMTEsImlhdCI6MTY2ODU2NTU2Nn0.ldp2ZYRSuqZBSf948MbXJvMmRyDPHPVuawGKkLyFiOs', '2022-10-14 00:01:44', '2022-10-14 00:01:44'),
(20, '[\'customer', 'postman', 'agent', 'internet', '09124278043', 'lodianiez@gmail.com', '$2b$10$5Wydq0nW4aZjj7Tx2nnIdOlL/RSEkpmNMRt.xUfo4V9B/chbIDRNK', NULL, '2022-12-19 07:13:07', '2022-12-19 07:13:07');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `m_bookings`
--
ALTER TABLE `m_bookings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `m_cottages`
--
ALTER TABLE `m_cottages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `m_payment_records`
--
ALTER TABLE `m_payment_records`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `m_users`
--
ALTER TABLE `m_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `mobile_number` (`mobile_number`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `m_bookings`
--
ALTER TABLE `m_bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `m_cottages`
--
ALTER TABLE `m_cottages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `m_payment_records`
--
ALTER TABLE `m_payment_records`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `m_users`
--
ALTER TABLE `m_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
