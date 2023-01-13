-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 13, 2023 at 01:59 AM
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
(4, '\"online\"', '[5]', '2022-01-01', '2022-01-01', 2, 23, 'approved', NULL, '2022-01-02 11:13:04', '2023-01-02 11:13:04'),
(6, '\"online\"', '[4]', '2023-01-03', '2023-01-05', 3, 25, 'approved', NULL, '2023-01-04 01:05:09', '2023-01-04 01:05:09'),
(7, '\"walkin\"', '[4]', '2023-01-06', '2023-01-07', 5, 27, 'pending', NULL, '2023-01-07 06:56:45', '2023-01-07 06:56:45'),
(8, '\"walkin\"', '[5]', '2023-01-06', '2023-01-07', 6, 28, 'pending', NULL, '2023-01-07 06:59:08', '2023-01-07 06:59:08'),
(9, '\"online\"', '[4]', '2023-01-07', '2023-01-07', 11, 30, 'pending', NULL, '2023-01-08 10:50:06', '2023-01-08 10:50:06'),
(10, '\"online\"', '[5]', '2023-01-08', '2023-01-08', 12, 30, 'pending', NULL, '2023-01-08 12:19:51', '2023-01-08 12:19:51'),
(11, '\"online\"', '[4]', '2023-01-11', '2023-01-11', 13, 0, 'pending', NULL, '2023-01-12 13:25:50', '2023-01-12 13:25:50'),
(12, '\"online\"', '[4]', '2023-01-11', '2023-01-11', 14, 0, 'pending', NULL, '2023-01-12 13:35:48', '2023-01-12 13:35:48'),
(13, '\"online\"', '[5]', '2023-01-11', '2023-01-11', 15, 0, 'pending', NULL, '2023-01-12 13:44:40', '2023-01-12 13:44:40'),
(14, '\"online\"', '[5,5]', '2023-01-11', '2023-01-11', 16, 0, 'pending', NULL, '2023-01-12 13:46:18', '2023-01-12 13:46:18'),
(15, '\"online\"', '[5,5,5]', '2023-01-11', '2023-01-11', 17, 31, 'pending', NULL, '2023-01-12 13:49:28', '2023-01-12 13:49:28'),
(16, '\"online\"', '[5]', '2023-01-11', '2023-01-11', 18, 34, 'pending', NULL, '2023-01-12 14:03:12', '2023-01-12 14:03:12'),
(17, '\"online\"', '[5,4]', '2023-01-11', '2023-01-11', 19, 30, 'pending', NULL, '2023-01-12 14:07:01', '2023-01-12 14:07:01');

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
(3, 'non-floating', 'c-0001', 'made in kawayan', '20persons', 5000.00, 0, '[\"C:\\\\Users\\\\admin\\\\Desktop\\\\mew\\\\mew\\\\src\\\\uploads\\\\images-1672657243680-912218609.jpg\"]', '2023-01-02 11:00:43', '2023-01-02 11:00:43'),
(4, 'floating', 'c-0002', 'made in kawayan', '30persons', 6000.00, 0, '[\"C:\\\\Users\\\\admin\\\\Desktop\\\\mew\\\\mew\\\\src\\\\uploads\\\\images-1672657287889-242505223.jpg\"]', '2023-01-02 11:01:27', '2023-01-02 11:01:27'),
(5, 'non-floating', 'c-0003', 'made in kawayan', '35persons', 5000.00, 0, '[\"C:\\\\Users\\\\admin\\\\Desktop\\\\mew\\\\mew\\\\src\\\\uploads\\\\images-1672657384085-423270075.jpg\"]', '2023-01-02 11:03:04', '2023-01-02 11:03:04');

-- --------------------------------------------------------

--
-- Table structure for table `m_payment_records`
--

CREATE TABLE `m_payment_records` (
  `id` int(11) NOT NULL,
  `type` varchar(10) NOT NULL,
  `account_name` varchar(30) DEFAULT NULL,
  `account_number` varchar(30) DEFAULT NULL,
  `reference_number` varchar(100) DEFAULT NULL,
  `receipt` text DEFAULT NULL,
  `amount` decimal(10,2) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `m_payment_records`
--

INSERT INTO `m_payment_records` (`id`, `type`, `account_name`, `account_number`, `reference_number`, `receipt`, `amount`, `createdAt`, `updatedAt`) VALUES
(2, 'gcash', 'alejandro oletres', '0', '0', '[\"C:\\\\Users\\\\admin\\\\Desktop\\\\mew\\\\mew\\\\src\\\\uploads\\\\images-1672657984214-218231836.jpg\"]', '900.00', '2023-01-02 11:13:04', '2023-01-02 11:13:04'),
(3, 'gcash', 'alejandro oletres', '9263919845', '99999999', '[\"C:\\\\Users\\\\admin\\\\Desktop\\\\mew\\\\mew\\\\src\\\\uploads\\\\images-1672794308943-882728604.jpg\"]', '1000.00', '2023-01-04 01:05:08', '2023-01-04 01:05:08'),
(5, 'cash', '', '', '', '', '6000.00', '2023-01-07 06:56:45', '2023-01-07 06:56:45'),
(6, 'cash', '', '', '', '', '5000.00', '2023-01-07 06:59:07', '2023-01-07 06:59:07'),
(11, 'gcash', 'alejandro oletres', '999999', '999000', '[\"C:\\\\Users\\\\admin\\\\Desktop\\\\mew\\\\mew\\\\src\\\\uploads\\\\images-1673175006556-142092250.jpg\"]', '8900.00', '2023-01-08 10:50:06', '2023-01-08 10:50:06'),
(12, 'gcash', 'alejandro oletres', '0', '0', '[\"C:\\\\Users\\\\admin\\\\Desktop\\\\mew\\\\mew\\\\src\\\\uploads\\\\images-1673180391581-780013545.jpg\"]', '890.00', '2023-01-08 12:19:51', '2023-01-08 12:19:51'),
(13, 'gcash', 'alejadnro', '99999', '900', '[\"C:\\\\Users\\\\admin\\\\Desktop\\\\mew\\\\mew\\\\src\\\\uploads\\\\images-1673529950731-672641733.jpg\"]', '890.00', '2023-01-12 13:25:50', '2023-01-12 13:25:50'),
(14, 'gcash', 'alejadnf', '0', '0', '[\"C:\\\\Users\\\\admin\\\\Desktop\\\\mew\\\\mew\\\\src\\\\uploads\\\\images-1673530548083-761117595.jpg\"]', '890.00', '2023-01-12 13:35:48', '2023-01-12 13:35:48'),
(15, 'gcash', 'alejadr', '999999999', '9999999999', '[\"C:\\\\Users\\\\admin\\\\Desktop\\\\mew\\\\mew\\\\src\\\\uploads\\\\images-1673531080466-692498385.jpg\"]', '987.00', '2023-01-12 13:44:40', '2023-01-12 13:44:40'),
(16, 'gcash', 'a;ejad', '9878', '0', '[\"C:\\\\Users\\\\admin\\\\Desktop\\\\mew\\\\mew\\\\src\\\\uploads\\\\images-1673531178507-942593749.jpg\"]', '789.00', '2023-01-12 13:46:18', '2023-01-12 13:46:18'),
(17, 'gcash', 'asdfad', '9000', '0', '[\"C:\\\\Users\\\\admin\\\\Desktop\\\\mew\\\\mew\\\\src\\\\uploads\\\\images-1673531368592-449338339.jpg\"]', '0.00', '2023-01-12 13:49:28', '2023-01-12 13:49:28'),
(18, 'gcash', 'erw1', '8999', '0', '[\"C:\\\\Users\\\\admin\\\\Desktop\\\\mew\\\\mew\\\\src\\\\uploads\\\\images-1673532192404-388113831.jpg\"]', '0.00', '2023-01-12 14:03:12', '2023-01-12 14:03:12'),
(19, 'gcash', 'sdfasfd', '9999', '0', '[\"C:\\\\Users\\\\admin\\\\Desktop\\\\mew\\\\mew\\\\src\\\\uploads\\\\images-1673532421195-577934116.jpg\"]', '99878.00', '2023-01-12 14:07:01', '2023-01-12 14:07:01');

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
(1, '[\"admin\"]', 'Dexter Louiee', 'Aniezz', 'Tawagan Surr', '+639383673348', 'louieaniez@gmail.com', '$2b$10$o907DGERuQeYgVP5F8r2wexdzWa1XluesznxW2/tbPMPGT3fvsYhW', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RuYW1lIjoiRGV4dGVyIExvdWllZSIsImxhc3RuYW1lIjoiQW5pZXp6Iiwicm9sZSI6IltcImFkbWluXCJdIiwibW9iaWxlX251bWJlciI6Iis2MzkzODM2NzMzNDgiLCJlbWFpbCI6ImxvdWllYW5pZXpAZ21haWwuY29tIiwiY3JlYXRlZEF0IjoxNjczMTczMjAyMTMzLCJpYXQiOjE2NzMxNzMyMDJ9.huEXtsLw59z1E5KJk1fk6RGlRWCyFwebaVVhx4K0kyw', '2022-10-13 09:15:18', '2022-10-13 09:15:18'),
(9, '[\"admin\"]', 'Dexter Louiee', 'Aniezz', 'address', '+639383673347', 'lodianiezzzzzz@gmail.com', '$2b$10$S.Ca6qXqEi7PY3O1.Fjw/eAi5piYxmluiqfDlC8b.zJypgluM4Cuu', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxvZGlhbmllekBnbWFpbC5jb20iLCJjcmVhdGVkQXQiOjE2Njg1NjU1NjYwMTEsImlhdCI6MTY2ODU2NTU2Nn0.ldp2ZYRSuqZBSf948MbXJvMmRyDPHPVuawGKkLyFiOs', '2022-10-14 00:01:44', '2022-10-14 00:01:44'),
(23, '[\"customer\"]', 'alejandro', 'oletres', 'tukuran', NULL, 'alejandrooletres', '$2b$10$bhDnhEvh0s/A.YemQCAu9Oqw09a582Tupq0VexJErEnqBEf3aqN82', NULL, '2023-01-02 11:13:04', '2023-01-02 11:13:04'),
(24, '[\"customer\"]', 'alejandro', 'oletres', 'tukuran ', '00000000', 'alejanwwdrooletres@gmail.com', '$2b$10$cbq/5odeQHCd7GXntZeVqucxkXNzYNXpZgzwo.6/TY9f4QflhRDoi', NULL, '2023-01-03 13:12:09', '2023-01-03 13:12:09'),
(25, '[\"customer\"]', 'alejandro', 'oletres', '', '9000099', 'alejandrooletres@gmail.com', '$2b$10$dgUCIrh/xN73c.Nl4Z87/uGpODMQCQNRC1gBVSB8cA/erCyc4oaUa', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjUsImZpcnN0bmFtZSI6ImFsZWphbmRybyIsImxhc3RuYW1lIjoib2xldHJlcyIsInJvbGUiOiJbXCJjdXN0b21lclwiXSIsIm1vYmlsZV9udW1iZXIiOiI5MDAwMDk5IiwiZW1haWwiOiJhbGVqYW5kcm9vbGV0cmVzQGdtYWlsLmNvbSIsImNyZWF0ZWRBdCI6MTY3MjgyNzk3NDMzOSwiaWF0IjoxNjcyODI3OTc0fQ.mi6uj0KSF5SDjSBV2KO562HKCzrvZ7Oqhxs18hhl27M', '2023-01-04 01:05:09', '2023-01-04 01:05:09'),
(27, '[\"customer\"]', 'alejandro', 'oletres', 'tukuran ', '0938393939', 'alejandoletres@gmail.com', '$2b$10$lTVEDsPHAnjPEikHG2ScRu4CSfSXBVA3j7kXLha5gAoIa3kH8b4xa', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjcsImZpcnN0bmFtZSI6ImFsZWphbmRybyIsImxhc3RuYW1lIjoib2xldHJlcyIsInJvbGUiOiJbXCJjdXN0b21lclwiXSIsIm1vYmlsZV9udW1iZXIiOiIwOTM4MzkzOTM5IiwiZW1haWwiOiJhbGVqYW5kb2xldHJlc0BnbWFpbC5jb20iLCJjcmVhdGVkQXQiOjE2NzMwODE5NzE4NTAsImlhdCI6MTY3MzA4MTk3MX0.EyQZcC6qC829FG3WpGCdF7mDVnIQX_Q_1yAiLN7LL10', '2023-01-07 06:56:45', '2023-01-07 06:56:45'),
(28, '[\"customer\"]', 'dexter ', 'girk', 'tukuran ', '09999999', 'dextergirl@gmail.com', '$2b$10$oLOyVr5cz0Kgm.IZAoHqVe7csVI.ObLNhWrvGiYCOjirGg.K4Zg46', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImZpcnN0bmFtZSI6ImRleHRlciAiLCJsYXN0bmFtZSI6ImdpcmsiLCJyb2xlIjoiW1wiY3VzdG9tZXJcIl0iLCJtb2JpbGVfbnVtYmVyIjoiMDk5OTk5OTkiLCJlbWFpbCI6ImRleHRlcmdpcmxAZ21haWwuY29tIiwiY3JlYXRlZEF0IjoxNjczMDgyMDU4OTU5LCJpYXQiOjE2NzMwODIwNTh9.XUha2h504lrDfe4vv62oepj9Cn8WvaT7maR9s5N6uQM', '2023-01-07 06:59:08', '2023-01-07 06:59:08'),
(29, '[\"customer\"]', 'alejadnro', 'oletres', 'tukuran ', '9999999', 'alejadnrooltrestdaf@gmail.com', '$2b$10$R.pKoQq0O1eBFg3ay9mCmesQVne5Eb0qGyQbRf.wNFjUdZoU5xr0q', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjksImZpcnN0bmFtZSI6ImFsZWphZG5ybyIsImxhc3RuYW1lIjoib2xldHJlcyIsInJvbGUiOiJbXCJjdXN0b21lclwiXSIsIm1vYmlsZV9udW1iZXIiOiI5OTk5OTk5IiwiZW1haWwiOiJhbGVqYWRucm9vbHRyZXN0ZGFmQGdtYWlsLmNvbSIsImNyZWF0ZWRBdCI6MTY3MzA4MzMzMzQyNSwiaWF0IjoxNjczMDgzMzMzfQ.fFEBngUGnbUT2w0HzQ5Dv51aQddd1R3tGqQIoBSXyQs', '2023-01-07 09:21:56', '2023-01-07 09:21:56'),
(30, '[\"customer\"]', 'jeffry', 'abellon', 'tukuran zamboanga del sur', '999999999', 'jeffryabellon@gmail.com', '$2b$10$UBc8MsfKtuTlu1l0ZJrJ/ux9ajxV/njTcvOWvqiAAEUo.PceeElt.', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAsImZpcnN0bmFtZSI6ImplZmZyeSIsImxhc3RuYW1lIjoiYWJlbGxvbiIsInJvbGUiOiJbXCJjdXN0b21lclwiXSIsIm1vYmlsZV9udW1iZXIiOiI5OTk5OTk5OTkiLCJlbWFpbCI6ImplZmZyeWFiZWxsb25AZ21haWwuY29tIiwiY3JlYXRlZEF0IjoxNjczNTMyMzc5MzAwLCJpYXQiOjE2NzM1MzIzNzl9.0Do71ZqLsntIEn-_bQpuA2OXh2BAJz6o0tGv-eYYZAg', '2023-01-07 09:24:08', '2023-01-07 09:24:08'),
(31, '[\"customer\"]', 'sdsdfgs', 'sfgs', 'adsturla', NULL, 'adfsfda', '$2b$10$80P5rDDt1Y04/kkKIJhQLepRKA0Oxqqthk1UiK.y0HSvec5CJNvr2', NULL, '2023-01-12 13:49:28', '2023-01-12 13:49:28'),
(32, '[\"customer\"]', 'alejadrn', 'oletres', 'teurkuan', NULL, 'asdf', '$2b$10$XvqssUABpjpopZF4atch1.H.eWR3JjycYfaM5G45kFZTcR9Oc0vDi', NULL, '2023-01-12 13:59:28', '2023-01-12 13:59:28'),
(34, '[\"customer\"]', 'rewerqwer``', 'qewrqr`', '5kuk4uqn', NULL, 'qerqewr', '$2b$10$wDjLakoEz1AA8XTt2ia97eWsPoKbWYjDN/mBxe8mVnO2e9GhspWLm', NULL, '2023-01-12 14:03:12', '2023-01-12 14:03:12');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `m_cottages`
--
ALTER TABLE `m_cottages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `m_payment_records`
--
ALTER TABLE `m_payment_records`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `m_users`
--
ALTER TABLE `m_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
