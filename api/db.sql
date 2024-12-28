-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 28, 2024 at 06:14 PM
-- Server version: 10.6.20-MariaDB-cll-lve
-- PHP Version: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `alguidance_canteen`
--

-- --------------------------------------------------------

--
-- Table structure for table `canteens`
--

CREATE TABLE `canteens` (
  `canteenId` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `canteens`
--

INSERT INTO `canteens` (`canteenId`, `title`, `location`, `created_at`, `updated_at`) VALUES
(1, 'Main Canteen', NULL, '2024-12-28 12:30:26', '2024-12-28 12:30:26'),
(2, 'Secondary Canteen', NULL, '2024-12-28 12:30:26', '2024-12-28 12:30:26');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `categoryId` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`categoryId`, `title`, `created_at`, `updated_at`) VALUES
(1, 'Beverages', '2024-12-28 12:28:16', '2024-12-28 12:28:16'),
(2, 'Snacks', '2024-12-28 12:28:16', '2024-12-28 12:28:16'),
(3, 'Desserts', '2024-12-28 12:28:16', '2024-12-28 12:28:16'),
(4, 'Main Course', '2024-12-28 12:28:16', '2024-12-28 12:28:16'),
(5, 'Beverages', '2024-12-28 12:29:35', '2024-12-28 12:29:35'),
(6, 'Snacks', '2024-12-28 12:29:35', '2024-12-28 12:29:35'),
(7, 'Desserts', '2024-12-28 12:29:35', '2024-12-28 12:29:35'),
(8, 'Main Course', '2024-12-28 12:29:35', '2024-12-28 12:29:35');

-- --------------------------------------------------------

--
-- Table structure for table `foods`
--

CREATE TABLE `foods` (
  `foodId` int(11) NOT NULL,
  `canteenId` int(11) NOT NULL,
  `categoryId` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `price` double NOT NULL,
  `status` int(11) DEFAULT 1,
  `image_url` varchar(255) DEFAULT NULL,
  `availability` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `foods`
--

INSERT INTO `foods` (`foodId`, `canteenId`, `categoryId`, `title`, `price`, `status`, `image_url`, `availability`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'Coffee', 2.5, 1, NULL, 1, '2024-12-28 12:30:35', '2024-12-28 12:30:35'),
(2, 1, 1, 'Tea', 1.5, 1, NULL, 1, '2024-12-28 12:30:35', '2024-12-28 12:30:35'),
(3, 1, 1, 'Orange Juice', 3, 1, NULL, 1, '2024-12-28 12:30:35', '2024-12-28 12:30:35'),
(4, 1, 2, 'Chips', 1, 1, NULL, 1, '2024-12-28 12:30:35', '2024-12-28 12:30:35'),
(5, 1, 2, 'Popcorn', 1.2, 1, NULL, 1, '2024-12-28 12:30:35', '2024-12-28 12:30:35');

-- --------------------------------------------------------

--
-- Table structure for table `orderItems`
--

CREATE TABLE `orderItems` (
  `orderItemId` int(11) NOT NULL,
  `orderId` int(11) NOT NULL,
  `foodId` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` double NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `orderId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `date` datetime DEFAULT current_timestamp(),
  `total_price` double NOT NULL,
  `order_status` varchar(50) DEFAULT 'Pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `regNo` varchar(50) DEFAULT NULL,
  `batch` int(11) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `status` int(11) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `email`, `phone`, `regNo`, `batch`, `password`, `status`, `created_at`, `updated_at`) VALUES
(1, 'John', 'Doe', 'johndoe@example.com', '1234567890', 'REG202425', 24, '$2b$10$/TAnaEWpR8RZpDoBpmjJyew4Blr3o.yoCLFicaKVN1oLgAr58f0y2', 1, '2024-12-27 21:52:56', '2024-12-27 21:52:56'),
(3, 'ramishka', 'geenath', 'ramishkathennakoon@gmail.com', '0711120401', 'EG/2022/5369', 24, '$2b$10$nwnnbNcjt51cvzTFGpFgfekOEREwKxnEgQXg5GILWNHayB1E90Zse', 1, '2024-12-27 22:21:30', '2024-12-27 22:21:30');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `canteens`
--
ALTER TABLE `canteens`
  ADD PRIMARY KEY (`canteenId`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`categoryId`);

--
-- Indexes for table `foods`
--
ALTER TABLE `foods`
  ADD PRIMARY KEY (`foodId`),
  ADD KEY `canteenId` (`canteenId`),
  ADD KEY `categoryId` (`categoryId`);

--
-- Indexes for table `orderItems`
--
ALTER TABLE `orderItems`
  ADD PRIMARY KEY (`orderItemId`),
  ADD KEY `orderId` (`orderId`),
  ADD KEY `foodId` (`foodId`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`orderId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `regNo` (`regNo`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `canteens`
--
ALTER TABLE `canteens`
  MODIFY `canteenId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `categoryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `foods`
--
ALTER TABLE `foods`
  MODIFY `foodId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `orderItems`
--
ALTER TABLE `orderItems`
  MODIFY `orderItemId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `orderId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `foods`
--
ALTER TABLE `foods`
  ADD CONSTRAINT `foods_ibfk_1` FOREIGN KEY (`canteenId`) REFERENCES `canteens` (`canteenId`) ON DELETE CASCADE,
  ADD CONSTRAINT `foods_ibfk_2` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`) ON DELETE CASCADE;

--
-- Constraints for table `orderItems`
--
ALTER TABLE `orderItems`
  ADD CONSTRAINT `orderItems_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`) ON DELETE CASCADE,
  ADD CONSTRAINT `orderItems_ibfk_2` FOREIGN KEY (`foodId`) REFERENCES `foods` (`foodId`) ON DELETE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
