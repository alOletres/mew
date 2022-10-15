-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 13, 2022 at 12:14 PM
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
  `date_booked` timestamp NOT NULL DEFAULT current_timestamp(),
  `cottage` int(11) NOT NULL,
  `selected_date_from` date NOT NULL,
  `selected_date_to` date NOT NULL,
  `payment_type` varchar(6) NOT NULL,
  `booker` int(11) NOT NULL,
  `receipt` varchar(100) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `m_cottages`
--

CREATE TABLE `m_cottages` (
  `id` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `description` text NOT NULL,
  `price` double(6,2) NOT NULL,
  `is_available` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `m_users`
--

CREATE TABLE `m_users` (
  `id` int(11) NOT NULL,
  `role` varchar(10) NOT NULL,
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
(1, '[\"admin\"]', 'Dexter Louiee', 'Aniezz', 'Tawagan Surr', '+639383673348', 'louieaniez@gmail.com', '$2b$10$o907DGERuQeYgVP5F8r2wexdzWa1XluesznxW2/tbPMPGT3fvsYhW', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxvdWllYW5pZXpAZ21haWwuY29tIiwiY3JlYXRlZEF0IjoxNjY1NjU1NDc0NTEwLCJpYXQiOjE2NjU2NTU0NzR9.w4jWa7f66lfi8TaKdDd7O92p3ax5EuTZiOvTUSQo9EE', '2022-10-13 09:15:18', '2022-10-13 09:15:18');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `m_cottages`
--
ALTER TABLE `m_cottages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `m_users`
--
ALTER TABLE `m_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
