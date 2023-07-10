-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 07, 2023 at 06:11 AM
-- Server version: 10.5.20-MariaDB
-- PHP Version: 7.3.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `id20254872_finlearn`
--

-- --------------------------------------------------------

--
-- Table structure for table `stocks`
--

CREATE TABLE `stocks` (
  `username` text NOT NULL,
  `stock_name` text NOT NULL,
  `stock_quantity` text NOT NULL,
  `stock_price` int(11) NOT NULL,
  `stock_gain` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stocks`
--

INSERT INTO `stocks` (`username`, `stock_name`, `stock_quantity`, `stock_price`, `stock_gain`) VALUES
('akarsh91140@gmail.com', 'apple', '5', 185, '0'),
('akarsh91140@gmail.com', 'apple', '5', 185, '0'),
('akarsh91140@gmail.com', 'apple', '5', 185, '0'),
('akarsh91140@gmail.com', 'apple', '5', 154, '0'),
('akarsh91140@gmail.com', 'apple', '5', 154, '0'),
('akarsh91140@gmail.com', 'apple', '5', 154, '0'),
('akarsh91140@gmail.com', 'apple', '5', 154, '0'),
('akarsh91140@gmail.com', 'apple', '5', 154, '0'),
('akarsh91140@gmail.com', 'apple', '5', 154, '0'),
('akarsh91140@gmail.com', 'apple', '5', 155, '0'),
('akarsh91140@gmail.com', 'apple', '5', 155, '0'),
('akarsh91140@gmail.com', 'apple', '5', 155, '0'),
('akarsh91140@gmail.com', 'apple', '5', 155, '0'),
('akarsh91140@gmail.com', 'apple', '5', 155, '0'),
('test_user@test.com', 'apple', '5', 155, '0'),
('test_user@test.com', 'apple', '5', 155, '0'),
('test_user@test.com', 'apple', '5', 155, '0'),
('test_user@test.com', 'apple', '5', 155, '0'),
('test_user@test.com', 'apple', '5', 155, '0'),
('test_user@test.com', 'apple', '5', 155, '0'),
('test_user@test.com', 'apple', '5', 155, '0');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `s.no` int(11) NOT NULL,
  `username` text NOT NULL,
  `f_name` text NOT NULL,
  `l_name` text NOT NULL,
  `email` text NOT NULL,
  `ph_no` text NOT NULL,
  `psw_hash` text NOT NULL,
  `user_state` text NOT NULL,
  `wallet_balance` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`s.no`, `username`, `f_name`, `l_name`, `email`, `ph_no`, `psw_hash`, `user_state`, `wallet_balance`) VALUES
(3, 'admin@admin.com', 'John', 'Doe', 'akarsh91140@gmail.com', '9305267844', 'Premium#119', 'user_first', '8455'),
(4, 'test_user@test.com', 'TestUser', 'TestUser', 'test_user@test.com', '0000000000', 'Testuser@123', 'user_first', '99995365');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`s.no`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `s.no` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
