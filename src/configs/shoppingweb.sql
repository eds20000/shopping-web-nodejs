-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- ホスト: 127.0.0.1
-- 生成日時: 2024-11-29 07:04:26
-- サーバのバージョン： 10.4.32-MariaDB
-- PHP のバージョン: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- データベース: `shoppingweb`
--

-- --------------------------------------------------------

--
-- テーブルの構造 `cart`
--

CREATE TABLE `cart` (
  `user_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `color_id` int(11) NOT NULL,
  `size` varchar(10) NOT NULL,
  `quantity` int(11) NOT NULL,
  `add_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- テーブルの構造 `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `category_name` varchar(255) NOT NULL,
  `item_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- テーブルのデータのダンプ `categories`
--

INSERT INTO `categories` (`id`, `category_name`, `item_id`) VALUES
(1, 'recommended', 0),
(2, 'new_arrivals', 0),
(3, 'best_sellers', 0),
(4, 'mens', 0),
(5, 'womens', 16),
(6, 'cosmetics', 0),
(7, 'womens', 17),
(8, 'womens', 18),
(9, 'mens', 0),
(10, 'mens', 1),
(11, 'mens', 2),
(12, 'mens', 3),
(13, 'mens', 14),
(14, 'mens', 15),
(15, 'recommended', 1),
(16, 'recommended', 2),
(17, 'recommended', 3),
(18, 'recommended', 14),
(19, 'recommended', 15),
(20, 'recommended', 17),
(21, 'recommended', 18),
(22, 'recommended', 19),
(23, 'recommended', 20),
(24, 'recommended', 21),
(36, 'new_arrivals', 17),
(37, 'new_arrivals', 18),
(38, 'new_arrivals', 19),
(39, 'new_arrivals', 20),
(40, 'new_arrivals', 21),
(41, 'womens', 19),
(42, 'womens', 20),
(43, 'womens', 21),
(44, 'womens', 23),
(45, 'womens', 24),
(46, 'womens', 25),
(47, 'womens', 27),
(48, 'mens', 26),
(49, 'womens', 28),
(50, 'womens', 29);

-- --------------------------------------------------------

--
-- テーブルの構造 `chat_history`
--

CREATE TABLE `chat_history` (
  `id` int(11) NOT NULL,
  `room_id` varchar(255) NOT NULL,
  `sender_name` varchar(255) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `sender_role` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `timestamp` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- テーブルのデータのダンプ `chat_history`
--

INSERT INTO `chat_history` (`id`, `room_id`, `sender_name`, `sender_id`, `sender_role`, `message`, `timestamp`) VALUES
(21, 'room-2', 'eds2002', 2, 'customer', 'hi', '2024-11-29 05:27:22'),
(22, 'room-2', 'eds2002', 2, 'customer', 'khnong co gi', '2024-11-29 05:29:13'),
(23, 'room-2', 'nguyenthanhson', 1, 'admin', 'hoc tot khong', '2024-11-29 05:42:30'),
(24, 'room-2', 'nguyenthanhson', 1, 'admin', 'sao', '2024-11-29 05:43:30'),
(25, 'room-2', 'nguyenthanhson', 1, 'admin', 'sao trang gi', '2024-11-29 05:54:09'),
(26, 'room-2', 'eds2002', 2, 'customer', 'thoi toi xin', '2024-11-29 05:54:23'),
(27, 'room-29', 'eds2000', 29, 'customer', 'hello', '2024-11-29 05:55:51'),
(28, 'room-29', 'nguyenthanhson', 1, 'admin', 'im', '2024-11-29 05:56:29'),
(29, 'room-29', 'nguyenthanhson', 1, 'admin', 'the sao', '2024-11-29 05:56:38');

-- --------------------------------------------------------

--
-- テーブルの構造 `colors`
--

CREATE TABLE `colors` (
  `id` int(11) NOT NULL,
  `item_id` int(11) DEFAULT NULL,
  `color_nameEng` varchar(255) DEFAULT NULL,
  `color_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- テーブルのデータのダンプ `colors`
--

INSERT INTO `colors` (`id`, `item_id`, `color_nameEng`, `color_name`) VALUES
(21, 15, 'rgb(0, 0, 124)', 'ネイビーブルー'),
(22, 15, 'rgb(0, 0, 0)', 'ブラック'),
(23, 15, 'rgb(255, 255, 255)', 'ホワイト'),
(24, 16, 'rgb(200, 162, 200)', 'lilac purple'),
(25, 16, 'rgb(128, 0, 32)', 'バーガンディ'),
(26, 16, 'rgb(255, 255, 255)', 'ホワイト'),
(27, 16, 'rgb(0, 0, 0)', 'ブラック'),
(28, 0, 'black', 'ブラック'),
(29, 0, 'red', 'レッド'),
(30, 0, 'blue', 'ブルー'),
(31, 1, 'black', 'ブラック'),
(32, 1, 'rgb(67, 63, 47)', 'アーミーグリーン'),
(33, 1, 'rgb(134, 137, 134)', 'ダックグレー'),
(34, 2, 'rgb(79, 83, 50)', 'アーミーグリーン'),
(35, 2, 'black', 'ブラック'),
(36, 2, 'rgb(181, 89, 88)', 'ワインレッド'),
(37, 3, 'black', 'ブラック'),
(38, 3, 'rgb(216, 221, 224)', 'ホワイト'),
(39, 3, 'rgb(222, 153, 154)', 'ピンク'),
(40, 3, 'rgb(72, 79, 83)', 'ダーク・グレー'),
(41, 3, 'rgb(53, 65, 55)', 'ダーク・グリーン'),
(42, 14, 'rgb(0, 0, 0)', 'ブラック'),
(43, 14, 'rgb(255, 255, 255)', 'ホワイト'),
(44, 14, 'rgb(210, 212, 210)', 'グレー'),
(45, 17, 'rgb(193, 154, 107)', 'camel'),
(46, 17, 'rgb(245, 245, 220)', 'beige'),
(47, 17, 'rgb(255, 255, 255)', 'ホワイト'),
(48, 17, 'rgb(0, 0, 0)', 'ブラック'),
(49, 18, 'rgb(0, 0, 0)', 'ブラック'),
(50, 18, 'rgb(255, 255, 255)', 'ホワイト'),
(51, 18, 'rgb(255, 192, 203)', 'Pink'),
(52, 18, 'rgb(111, 78, 55)', 'Coffee Brown'),
(53, 19, 'rgb(245, 245, 220)', 'beige'),
(54, 20, 'rgb(2, 48, 32)', 'Dark Green'),
(55, 20, 'rgb(211, 211, 211)', 'Light Grey'),
(56, 20, 'rgb(255, 192, 203)', 'ピンク'),
(57, 20, 'rgb(0, 0, 0)', 'ブラック'),
(58, 21, 'rgb(211, 211, 211)', 'Light Grey'),
(59, 21, 'rgb(255, 192, 203)', 'ピンク'),
(60, 21, 'rgb(231, 222, 190)', 'Khaki'),
(61, 21, 'rgb(0, 128, 0)', 'Green'),
(63, 23, 'rgb(255, 0, 0)', 'レッド'),
(64, 23, 'rgb(255, 255, 255)', 'ホワイト'),
(65, 23, 'rgb(0, 0, 0)', 'ブラック'),
(66, 24, 'rgb(90, 134, 173)', 'Dusty Blue'),
(67, 24, 'rgb(169, 169, 169)', 'Dark Grey'),
(68, 24, 'rgb(211, 211, 211)', 'Light Grey'),
(69, 25, 'rgb(0, 0, 0)', 'ブラック'),
(70, 25, 'rgb(128, 128, 128)', 'Grey'),
(71, 25, 'rgb(150, 75, 0)', 'Brown'),
(72, 25, 'rgb(0, 0, 128)', 'Navy Blue'),
(73, 26, 'rgb(0, 0, 0)', 'ブラック'),
(74, 26, 'rgb(255, 0, 0)', 'レッド'),
(75, 26, 'rgb(128, 128, 128)', 'Grey'),
(76, 27, 'rgb(0, 0, 0)', 'ブラック'),
(77, 27, 'rgb(169, 169, 169)', 'Dark Grey'),
(78, 28, 'rgb(0, 0, 0)', 'ブラック'),
(79, 28, 'rgb(128, 0, 32)', 'Burgundy'),
(80, 28, 'rgb(247, 185, 119)', 'Apricot'),
(81, 28, 'rgb(0, 128, 0)', 'Green'),
(82, 29, 'rgb(0, 0, 0)', 'ブラック'),
(83, 29, 'rgb(211, 211, 211)', 'Light Grey'),
(84, 29, 'rgb(173, 216, 230)', 'Light Blue'),
(85, 30, 'rgb(0, 0, 0)', 'ブラック');

-- --------------------------------------------------------

--
-- テーブルの構造 `color_sizes`
--

CREATE TABLE `color_sizes` (
  `color_id` int(11) NOT NULL,
  `size` varchar(10) NOT NULL,
  `item_id` int(11) NOT NULL,
  `zaiko` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- テーブルのデータのダンプ `color_sizes`
--

INSERT INTO `color_sizes` (`color_id`, `size`, `item_id`, `zaiko`) VALUES
(21, 'M', 15, 1),
(21, 'L', 15, 1),
(22, 'M', 15, 1),
(22, 'L', 15, 1),
(23, 'M', 15, 1),
(23, 'L', 15, 1),
(24, 'S', 16, 1),
(24, 'M', 16, 1),
(25, 'S', 16, 1),
(25, 'M', 16, 1),
(26, 'S', 16, 1),
(26, 'M', 16, 1),
(27, 'S', 16, 1),
(27, 'M', 16, 1),
(28, 'L', 0, 1),
(28, 'M', 0, 1),
(28, 'S', 0, 1),
(29, 'L', 0, 1),
(29, 'M', 0, 1),
(30, 'L', 0, 1),
(30, 'M', 0, 1),
(31, 'L', 1, 1),
(31, 'M', 1, 1),
(31, 'S', 1, 1),
(32, 'L', 1, 1),
(32, 'M', 1, 1),
(32, 'S', 1, 1),
(33, 'L', 1, 1),
(33, 'M', 1, 1),
(33, 'S', 1, 1),
(34, 'L', 2, 1),
(34, 'M', 2, 1),
(34, 'S', 2, 1),
(35, 'L', 2, 1),
(35, 'M', 2, 1),
(35, 'S', 2, 1),
(36, 'L', 2, 1),
(36, 'M', 2, 1),
(36, 'S', 2, 1),
(37, 'L', 3, 1),
(37, 'M', 3, 1),
(37, 'S', 3, 1),
(38, 'M', 3, 1),
(38, 'S', 3, 1),
(39, 'L', 3, 1),
(39, 'M', 3, 1),
(39, 'S', 3, 1),
(40, 'L', 3, 1),
(40, 'M', 3, 1),
(40, 'S', 3, 1),
(41, 'L', 3, 1),
(41, 'M', 3, 1),
(41, 'S', 3, 1),
(42, 'S', 14, 1),
(42, 'M', 14, 1),
(42, 'L', 14, 1),
(43, 'S', 14, 1),
(43, 'M', 14, 1),
(43, 'L', 14, 1),
(44, 'S', 14, 1),
(44, 'M', 14, 1),
(44, 'L', 14, 1),
(45, 'S', 17, 1),
(45, 'M', 17, 1),
(46, 'S', 17, 1),
(46, 'M', 17, 1),
(47, 'S', 17, 1),
(47, 'M', 17, 1),
(48, 'S', 17, 1),
(48, 'M', 17, 1),
(49, 'S', 18, 1),
(49, 'M', 18, 1),
(50, 'S', 18, 1),
(50, 'M', 18, 1),
(51, 'S', 18, 1),
(51, 'M', 18, 1),
(52, 'S', 18, 1),
(52, 'M', 18, 1),
(53, 'S', 19, 1),
(53, 'M', 19, 1),
(53, 'L', 19, 1),
(54, 'S', 20, 1),
(54, 'M', 20, 1),
(54, 'L', 20, 1),
(55, 'S', 20, 1),
(55, 'M', 20, 1),
(55, 'L', 20, 1),
(56, 'S', 20, 1),
(56, 'M', 20, 1),
(56, 'L', 20, 1),
(57, 'S', 20, 1),
(57, 'M', 20, 1),
(57, 'L', 20, 1),
(58, 'S', 21, 1),
(58, 'M', 21, 1),
(59, 'S', 21, 1),
(59, 'M', 21, 1),
(60, 'S', 21, 1),
(60, 'M', 21, 1),
(61, 'S', 21, 1),
(61, 'M', 21, 1),
(63, 'XS', 23, 1),
(63, 'S', 23, 1),
(63, 'M', 23, 1),
(64, 'XS', 23, 1),
(64, 'S', 23, 1),
(64, 'M', 23, 1),
(65, 'XS', 23, 1),
(65, 'S', 23, 1),
(65, 'M', 23, 1),
(66, 'S', 24, 1),
(66, 'M', 24, 1),
(67, 'S', 24, 1),
(67, 'M', 24, 1),
(68, 'S', 24, 1),
(68, 'M', 24, 1),
(69, 'S', 25, 1),
(69, 'M', 25, 1),
(69, 'L', 25, 1),
(70, 'S', 25, 1),
(70, 'M', 25, 1),
(70, 'L', 25, 1),
(71, 'S', 25, 1),
(71, 'M', 25, 1),
(71, 'L', 25, 1),
(72, 'S', 25, 1),
(72, 'M', 25, 1),
(72, 'L', 25, 1),
(73, 'M', 26, 1),
(73, 'L', 26, 1),
(73, 'XL', 26, 1),
(74, 'M', 26, 1),
(74, 'L', 26, 1),
(74, 'XL', 26, 1),
(75, 'M', 26, 1),
(75, 'L', 26, 1),
(75, 'XL', 26, 1),
(76, 'S', 27, 1),
(76, 'M', 27, 1),
(77, 'S', 27, 1),
(77, 'M', 27, 1),
(78, 'S', 28, 1),
(78, 'M', 28, 1),
(78, 'L', 28, 1),
(79, 'S', 28, 1),
(79, 'M', 28, 1),
(79, 'L', 28, 1),
(80, 'S', 28, 1),
(80, 'M', 28, 1),
(80, 'L', 28, 1),
(81, 'S', 28, 1),
(81, 'M', 28, 1),
(81, 'L', 28, 1),
(82, 'S', 29, 1),
(82, 'M', 29, 1),
(83, 'S', 29, 1),
(83, 'M', 29, 1),
(84, 'S', 29, 1),
(84, 'M', 29, 1),
(85, 'S', 30, 1),
(85, 'M', 30, 1),
(85, 'L', 30, 1);

-- --------------------------------------------------------

--
-- テーブルの構造 `favorite_items`
--

CREATE TABLE `favorite_items` (
  `user_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `added_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- テーブルのデータのダンプ `favorite_items`
--

INSERT INTO `favorite_items` (`user_id`, `item_id`, `added_date`) VALUES
(1, 27, '2024-11-26 08:49:35'),
(2, 2, '2024-11-28 02:45:55'),
(2, 0, '2024-11-28 06:10:37');

-- --------------------------------------------------------

--
-- テーブルの構造 `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `color_id` int(11) DEFAULT NULL,
  `img_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- テーブルのデータのダンプ `images`
--

INSERT INTO `images` (`id`, `color_id`, `img_url`) VALUES
(432, 21, 'image-add-1731872869366.webp'),
(433, 21, 'image-add-1731872869367.webp'),
(434, 21, 'image-add-1731872869368.webp'),
(435, 22, 'image-add-1731872773838.webp'),
(436, 22, 'image-add-1731872773839.webp'),
(437, 22, 'image-add-1731872773841.webp'),
(438, 23, 'image-add-1731872748026.webp'),
(439, 23, 'image-add-1731872748027.webp'),
(440, 23, 'image-add-1731872748029.webp'),
(441, 24, 'image-add-1731991036658.webp'),
(442, 24, 'image-add-1731991036658.webp'),
(443, 24, 'image-add-1731991036659.webp'),
(444, 24, 'image-add-1731991036660.webp'),
(445, 24, 'image-add-1731991036660.webp'),
(446, 25, 'image-add-1731990898632.webp'),
(447, 25, 'image-add-1731990898633.webp'),
(448, 25, 'image-add-1731990898634.webp'),
(449, 25, 'image-add-1731990898634.webp'),
(450, 25, 'image-add-1731990898635.webp'),
(451, 26, 'image-add-1731990664316.webp'),
(452, 26, 'image-add-1731990664317.webp'),
(453, 26, 'image-add-1731990664317.webp'),
(454, 26, 'image-add-1731990664318.webp'),
(455, 27, 'image-add-1731990636137.webp'),
(456, 27, 'image-add-1731990636143.webp'),
(457, 27, 'image-add-1731990636145.webp'),
(458, 27, 'image-add-1731990636147.webp'),
(459, 27, 'image-add-1731990636149.webp'),
(460, 28, 'item1-img1.jpg'),
(461, 28, 'item1-img2.webp'),
(462, 28, 'item1-img3.webp'),
(463, 28, 'item1-img4.webp'),
(464, 28, 'item1-img5.webp'),
(465, 29, 'item1-img7.webp'),
(466, 29, 'item1-img8.webp'),
(467, 29, 'item1-img9.webp'),
(468, 29, 'item1-img10.webp'),
(469, 29, 'item1-img11.webp'),
(470, 30, 'item1-img12.webp'),
(471, 30, 'item1-img13.webp'),
(472, 30, 'item1-img14.webp'),
(473, 30, 'item1-img15.webp'),
(474, 30, 'item1-img16.webp'),
(475, 31, 'item2-black-2.webp'),
(476, 31, 'item2-black-3.webp'),
(477, 31, 'item2-black-4.webp'),
(478, 31, 'item2-black-5.webp'),
(479, 32, 'item2-color2-1.webp'),
(480, 32, 'item2-color2-2.webp'),
(481, 32, 'item2-color2-3.webp'),
(482, 32, 'item2-color2-4.webp'),
(483, 33, 'item2-color3-1.webp'),
(484, 33, 'item2-color3-2.webp'),
(485, 33, 'item2-color3-3.webp'),
(486, 33, 'item2-color3-4.webp'),
(487, 34, 'item3-color1-1.webp'),
(488, 34, 'item3-color1-2.webp'),
(489, 34, 'item3-color1-3.webp'),
(490, 34, 'item3-color1-4.webp'),
(491, 35, 'item3-color2-1.webp'),
(492, 35, 'item3-color2-2.webp'),
(493, 35, 'item3-color2-3.webp'),
(494, 35, 'item3-color2-4.webp'),
(495, 35, 'item3-color2-5.webp'),
(496, 35, 'item3-color2-6.webp'),
(497, 36, 'item3-color3-1.webp'),
(498, 36, 'item3-color3-2.webp'),
(499, 36, 'item3-color3-3.webp'),
(500, 36, 'item3-color3-4.webp'),
(501, 37, 'item4-color1-1.webp'),
(502, 37, 'item4-color1-2.webp'),
(503, 37, 'item4-color1-3.webp'),
(504, 38, 'item4-color2-1.webp'),
(505, 38, 'item4-color2-2.webp'),
(506, 38, 'item4-color2-3.webp'),
(507, 38, 'item4-color2-4.webp'),
(508, 38, 'item4-color2-5.webp'),
(509, 39, 'item4-color3-1.webp'),
(510, 39, 'item4-color3-2.webp'),
(511, 39, 'item4-color3-3.webp'),
(512, 40, 'item4-color4-1.webp'),
(513, 40, 'item4-color4-2.webp'),
(514, 40, 'item4-color4-3.webp'),
(515, 40, 'item4-color4-4.webp'),
(516, 41, 'item4-color5-1.webp'),
(517, 41, 'item4-color5-2.webp'),
(518, 41, 'item4-color5-3.webp'),
(519, 41, 'item4-color5-4.webp'),
(520, 42, 'image-add-1731826618187.webp'),
(521, 42, 'image-add-1731826618189.webp'),
(522, 42, 'image-add-1731826618190.webp'),
(523, 43, 'image-add-1731826287387.webp'),
(524, 43, 'image-add-1731826287388.webp'),
(525, 43, 'image-add-1731826287389.webp'),
(526, 43, 'image-add-1731826287390.webp'),
(527, 44, 'image-add-1731824946536.webp'),
(528, 44, 'image-add-1731824946537.webp'),
(529, 44, 'image-add-1731824946538.webp'),
(530, 44, 'image-add-1731824946539.webp'),
(531, 45, 'image-add-1731992245314.webp'),
(532, 45, 'image-add-1731992245316.webp'),
(533, 45, 'image-add-1731992245317.webp'),
(534, 45, 'image-add-1731992245319.webp'),
(535, 45, 'image-add-1731992245320.webp'),
(536, 46, 'image-add-1731992175684.webp'),
(537, 46, 'image-add-1731992175685.webp'),
(538, 46, 'image-add-1731992175685.webp'),
(539, 46, 'image-add-1731992175685.webp'),
(540, 47, 'image-add-1731992098386.webp'),
(541, 47, 'image-add-1731992098387.webp'),
(542, 47, 'image-add-1731992098388.webp'),
(543, 47, 'image-add-1731992098389.webp'),
(544, 48, 'image-add-1731992039244.webp'),
(545, 48, 'image-add-1731992039245.webp'),
(546, 48, 'image-add-1731992039245.webp'),
(547, 48, 'image-add-1731992039246.webp'),
(548, 48, 'image-add-1731992039247.webp'),
(600, 49, 'image-add-1731993216727.webp'),
(601, 49, 'image-add-1731993216728.webp'),
(602, 49, 'image-add-1731993216729.webp'),
(603, 50, 'image-add-1731993148063.webp'),
(604, 50, 'image-add-1731993148064.webp'),
(605, 50, 'image-add-1731993148067.webp'),
(606, 50, 'image-add-1731993148068.webp'),
(607, 50, 'image-add-1731993148069.webp'),
(608, 51, 'image-add-1731993092162.webp'),
(609, 51, 'image-add-1731993092163.webp'),
(610, 51, 'image-add-1731993092164.webp'),
(611, 51, 'image-add-1731993092165.webp'),
(612, 52, 'image-add-1731993034384.webp'),
(613, 52, 'image-add-1731993034385.webp'),
(614, 52, 'image-add-1731993034386.webp'),
(615, 52, 'image-add-1731993034387.webp'),
(616, 53, 'image-add-1732113680375.webp'),
(617, 53, 'image-add-1732113680376.webp'),
(618, 53, 'image-add-1732113680377.webp'),
(619, 53, 'image-add-1732113680377.webp'),
(620, 53, 'image-add-1732113680378.webp'),
(621, 54, 'image-add-1732114381810.webp'),
(622, 54, 'image-add-1732114381811.webp'),
(623, 54, 'image-add-1732114381811.webp'),
(624, 54, 'image-add-1732114381812.webp'),
(625, 55, 'image-add-1732114300898.webp'),
(626, 55, 'image-add-1732114300898.webp'),
(627, 55, 'image-add-1732114300899.webp'),
(628, 55, 'image-add-1732114300899.webp'),
(629, 55, 'image-add-1732114300900.webp'),
(630, 56, 'image-add-1732114253800.webp'),
(631, 56, 'image-add-1732114253801.webp'),
(632, 56, 'image-add-1732114253804.webp'),
(633, 56, 'image-add-1732114253805.webp'),
(634, 56, 'image-add-1732114253805.webp'),
(635, 57, 'image-add-1732114162821.webp'),
(636, 57, 'image-add-1732114162822.webp'),
(637, 57, 'image-add-1732114162823.webp'),
(638, 58, 'image-add-1732114999291.webp'),
(639, 58, 'image-add-1732114999294.webp'),
(640, 58, 'image-add-1732114999295.webp'),
(641, 59, 'image-add-1732114959605.webp'),
(642, 59, 'image-add-1732114959606.webp'),
(643, 59, 'image-add-1732114959606.webp'),
(644, 59, 'image-add-1732114959607.webp'),
(645, 59, 'image-add-1732114959607.webp'),
(646, 60, 'image-add-1732114906592.webp'),
(647, 60, 'image-add-1732114906592.webp'),
(648, 60, 'image-add-1732114906594.webp'),
(649, 60, 'image-add-1732114906594.webp'),
(650, 60, 'image-add-1732114906594.webp'),
(651, 61, 'image-add-1732114810529.webp'),
(652, 61, 'image-add-1732114810530.webp'),
(653, 61, 'image-add-1732114810533.webp'),
(654, 61, 'image-add-1732114810533.webp'),
(655, 61, 'image-add-1732114810534.webp'),
(659, 63, 'image-add-1732606745089.webp'),
(660, 63, 'image-add-1732606745090.webp'),
(661, 63, 'image-add-1732606745090.webp'),
(662, 63, 'image-add-1732606745091.webp'),
(663, 63, 'image-add-1732606745092.webp'),
(664, 64, 'image-add-1732606667200.webp'),
(665, 64, 'image-add-1732606667201.webp'),
(666, 64, 'image-add-1732606667202.webp'),
(667, 64, 'image-add-1732606667202.webp'),
(668, 64, 'image-add-1732606667204.webp'),
(669, 65, 'image-add-1732606613337.webp'),
(670, 65, 'image-add-1732606613342.webp'),
(671, 65, 'image-add-1732606613343.webp'),
(672, 65, 'image-add-1732606613343.webp'),
(673, 65, 'image-add-1732606613344.webp'),
(674, 66, 'image-add-1732607800616.webp'),
(675, 66, 'image-add-1732607800618.webp'),
(676, 66, 'image-add-1732607800618.webp'),
(677, 66, 'image-add-1732607800619.webp'),
(678, 66, 'image-add-1732607800619.webp'),
(679, 67, 'image-add-1732607722707.webp'),
(680, 67, 'image-add-1732607722708.webp'),
(681, 67, 'image-add-1732607722709.webp'),
(682, 67, 'image-add-1732607722709.webp'),
(683, 67, 'image-add-1732607722710.webp'),
(684, 68, 'image-add-1732607656302.webp'),
(685, 68, 'image-add-1732607656304.webp'),
(686, 68, 'image-add-1732607656304.webp'),
(687, 68, 'image-add-1732607656305.webp'),
(688, 68, 'image-add-1732607656305.webp'),
(689, 69, 'image-add-1732608788903.webp'),
(690, 69, 'image-add-1732608788904.webp'),
(691, 69, 'image-add-1732608788904.webp'),
(692, 69, 'image-add-1732608788905.webp'),
(693, 70, 'image-add-1732608756427.webp'),
(694, 70, 'image-add-1732608756427.webp'),
(695, 70, 'image-add-1732608756428.webp'),
(696, 70, 'image-add-1732608756429.webp'),
(697, 70, 'image-add-1732608756430.webp'),
(698, 71, 'image-add-1732608690147.webp'),
(699, 71, 'image-add-1732608690147.webp'),
(700, 71, 'image-add-1732608690149.webp'),
(701, 71, 'image-add-1732608690150.webp'),
(702, 71, 'image-add-1732608690152.webp'),
(703, 72, 'image-add-1732608631772.webp'),
(704, 72, 'image-add-1732608631774.webp'),
(705, 72, 'image-add-1732608631774.webp'),
(706, 72, 'image-add-1732608631775.webp'),
(707, 72, 'image-add-1732608631776.webp'),
(708, 73, 'image-add-1732609413488.webp'),
(709, 73, 'image-add-1732609413489.webp'),
(710, 73, 'image-add-1732609413490.webp'),
(711, 74, 'image-add-1732609390184.webp'),
(712, 74, 'image-add-1732609390185.webp'),
(713, 74, 'image-add-1732609390185.webp'),
(714, 75, 'image-add-1732609354688.webp'),
(715, 75, 'image-add-1732609354689.webp'),
(716, 75, 'image-add-1732609354690.webp'),
(717, 76, 'image-add-1732610940341.webp'),
(718, 76, 'image-add-1732610940343.webp'),
(719, 76, 'image-add-1732610940343.webp'),
(720, 76, 'image-add-1732610940344.webp'),
(721, 77, 'image-add-1732610925500.webp'),
(722, 77, 'image-add-1732610925501.webp'),
(723, 77, 'image-add-1732610925501.webp'),
(724, 77, 'image-add-1732610925502.webp'),
(742, 78, 'image-add-1732644931457.webp'),
(743, 78, 'image-add-1732644931458.webp'),
(744, 78, 'image-add-1732644931458.webp'),
(745, 78, 'image-add-1732644931459.webp'),
(746, 78, 'image-add-1732644931459.webp'),
(747, 79, 'image-add-1732644836723.webp'),
(748, 79, 'image-add-1732644836725.webp'),
(749, 79, 'image-add-1732644836726.webp'),
(750, 80, 'image-add-1732644784114.webp'),
(751, 80, 'image-add-1732644784115.webp'),
(752, 80, 'image-add-1732644784117.webp'),
(753, 81, 'image-add-1732644715446.webp'),
(754, 81, 'image-add-1732644715447.webp'),
(755, 81, 'image-add-1732644715448.webp'),
(770, 82, 'image-add-1732645938634.webp'),
(771, 82, 'image-add-1732645938635.webp'),
(772, 82, 'image-add-1732645938636.webp'),
(773, 83, 'image-add-1732645914479.webp'),
(774, 83, 'image-add-1732645914480.webp'),
(775, 83, 'image-add-1732645914483.webp'),
(776, 83, 'image-add-1732645914484.webp'),
(777, 84, 'image-add-1732645840353.webp'),
(778, 84, 'image-add-1732645840354.webp'),
(779, 84, 'image-add-1732645840356.webp'),
(780, 84, 'image-add-1732645840358.webp'),
(781, 84, 'image-add-1732645840362.webp'),
(782, 85, 'image-add-1732749786441.webp'),
(783, 85, 'image-add-1732749786443.webp'),
(784, 85, 'image-add-1732749786445.webp'),
(785, 85, 'image-add-1732749786446.webp'),
(786, 85, 'image-add-1732749786447.webp'),
(787, 85, 'image-add-1732749786448.webp');

-- --------------------------------------------------------

--
-- テーブルの構造 `items`
--

CREATE TABLE `items` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `zaiko` int(11) DEFAULT NULL,
  `infor` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- テーブルのデータのダンプ `items`
--

INSERT INTO `items` (`id`, `name`, `brand`, `category`, `price`, `zaiko`, `infor`) VALUES
(0, 'Manfinity EMRG メンズシャツ バギー クルーネック 半袖 グラフィックティー 夏用', 'Manfinity', 'トップス', 5023, 1, '<strong>スリーブタイプドロップショルダー,スタイルカジュアル</strong>'),
(1, 'Manfinity EMRG メンズ カジュアルなルーズフィット カーゴパンツ フラップポケットとドローストリングウエスト付き', 'Manfinity', 'パンツ', 2099, 1, 'クロージャータイプ:	ドローストリングウェスト\r\n詳細:	ドローストリング, ポケット\r\nスタイル:	ストリート\r\nカラー:	Dark Grey\r\nパターンタイプ:	プレーン\r\nタイプ:	カーゴパンツ\r\nウエストライン:	Natural\r\n長さ:	ロング\r\nフィットタイプ:	ルーズ\r\n生地:	ノンストレッチ\r\n素材:	織物生地\r\nコンポジション:	100% ポリエステル\r\nお手入れ方法:	洗濯機洗い可、もしくはプロによるドライクリーニング可\r\n洋服の厚さ:	晩秋 (10-17℃/50-63℉)\r\n本体:	裏地なし\r\n透明度:	No'),
(2, 'Manfinity Hypemode メンズ ボンバージャケット ローズフィットファッションウェア アウター', 'Manfinity', 'ジャケット・アウター', 2652, 1, '詳細:	ポケット, ジッパー\r\nフィットタイプ:	ルーズ\r\nネックライン:	ベースボールカラー\r\nプラケット:	ジッパー\r\nスリーブタイプ:	ドロップショルダー\r\nスタイル:	カジュアル\r\nタイプ:	ボマー\r\nカラー:	Black\r\nパターンタイプ:	プレーン\r\n袖丈:	長袖\r\n長さ:	レギュラー\r\n生地:	ノンストレッチ\r\n素材:	ファブリック\r\nコンポジション:	100% ポリエステル\r\nお手入れ方法:	洗濯機洗い可、もしくはプロによるドライクリーニング可\r\n洋服の厚さ:	晩秋 (10-17℃/50-63℉)\r\n透明度:	No'),
(3, 'Manfinity Hypemode ゆったりサイズのメンズソリッドカラー ドロップショルダーシャツ(ネクタイ非付属)', 'Manfinity', 'トップス', 1193, 1, 'カラー:	Black\r\nスタイル:	カジュアル\r\nスリーブタイプ:	ドロップショルダー\r\n詳細:	ボタン\r\nネックライン:	カラー\r\nタイプ:	シャツ\r\nパターンタイプ:	プレーン\r\n袖丈:	長袖\r\n長さ:	レギュラー\r\nフィットタイプ:	ルーズ\r\n生地:	ローストレッチ\r\n素材:	織物生地\r\nコンポジション:	97% ポリエステル, 3% エラスタン\r\nお手入れ方法:	洗濯機洗い可、もしくはプロによるドライクリーニング可\r\n透明度:	No'),
(14, 'Manfinity Modomio ニットカジュアル長袖tシャツ', 'Manfinity', 'トップス', 1087, 1, '詳細:	パッチング\r\nスリーブタイプ:	レギュラースリーブ\r\nスタイル:	カジュアル\r\nヘム形状:	レギュラー\r\nカラー:	White\r\nパターンタイプ:	レター\r\nネックライン:	ラウンドネック\r\n袖丈:	長袖\r\n長さ:	レギュラー\r\nフィットタイプ:	レギュラーフィット\r\n生地:	ノンストレッチ\r\n素材:	編み物生地\r\nコンポジション:	100% ポリエステル\r\n洋服の厚さ:	春/秋 (18-25℃/63-77℉)\r\nお手入れ方法:	洗濯機洗い可、もしくはプロによるドライクリーニング可\r\n透明度:	No'),
(15, 'メンズ 春秋 カジュアル 無地 スタンドカラーTシャツ', 'SHEIN', 'トップス', 1002, 1, '詳細:	パッチング\r\nスリーブタイプ:	ドロップショルダー\r\nスタイル:	カジュアル\r\nカラー:	White\r\nパターンタイプ:	プレーン\r\nネックライン:	ハイネック\r\n袖丈:	長袖\r\n長さ:	レギュラー\r\nフィットタイプ:	レギュラーフィット\r\n生地:	ローストレッチ\r\n素材:	ファブリック\r\nコンポジション:	95% ポリエステル, 5% エラスタン\r\n洋服の厚さ:	春/秋 (18-25℃/63-77℉)\r\nお手入れ方法:	手洗い可、ドライクリーニング不可\r\n透明度:	No'),
(16, 'DAZY ポロネックリブニットTシャツ', 'DAZY', 'トップス', 1143, 6, '詳細:	ボタン, リブニット\r\nスリーブタイプ:	レギュラースリーブ\r\nスタイル:	カジュアル\r\nカラー:	Lilac Purple\r\nパターンタイプ:	プレーン\r\nネックライン:	ポロ\r\n袖丈:	半袖\r\n長さ:	レギュラー\r\nフィットタイプ:	レギュラーフィット\r\n生地:	ローストレッチ\r\n素材:	ファブリック\r\nコンポジション:	97% ポリエステル, 3% エラスタン\r\nお手入れ方法:	洗濯機洗い可、ドライクリーニング不可\r\n透明度:	No'),
(17, 'DAZY 単色 スタンドカラー 長袖 レディース シャツ', 'DAZY', 'トップス', 824, 6, 'スリーブタイプ:	レギュラースリーブ\r\nスタイル:	カジュアル\r\nヘム形状:	レギュラー\r\nカラー:	Camel\r\nパターンタイプ:	プレーン\r\nネックライン:	ハイネック\r\n袖丈:	長袖\r\n長さ:	レギュラー\r\nフィットタイプ:	レギュラーフィット\r\n生地:	ミディアムストレッチ\r\n素材:	編み物生地\r\nコンポジション:	92% ポリエステル, 8% エラスタン\r\nお手入れ方法:	手洗い可、ドライクリーニング不可\r\n透明度:	No'),
(18, 'カラーブロック 長袖 ルーズポロシャツ レディース 春秋', 'DAZY', 'トップス', 1522, 1, '詳細: パッチング, ボタン<br>スリーブタイプ: ドロップショルダー<br>スタイル: カジュアル<br>ヘム形状: レギュラー<br>カラー: Pink<br>パターンタイプ: カラーブロック, レター<br>ネックライン: ポロ<br>袖丈: 長袖<br>長さ: レギュラー<br>フィットタイプ: ルーズ<br>生地: ローストレッチ<br>素材: ファブリック<br>コンポジション: 90% ビスコース, 10% ポリエステル<br>お手入れ方法: 洗濯機洗い可、もしくはプロによるドライクリーニング可<br>透明度: No'),
(19, 'ROMWE Anime メンズカジュアルアウトフィット、コントラストカラーの図案とレタープリントのベースボールジャケット、秋の屋外に適しています', 'ROMWE', 'ジャケット・アウター', 2925, 3, '詳細:	ジッパー\r\nフィットタイプ:	レギュラーフィット\r\nネックライン:	ベースボールカラー\r\nプラケット:	シングルブレスト\r\nスリーブタイプ:	ドロップショルダー\r\nスタイル:	カジュアル\r\nタイプ:	ボマー\r\nヘム形状:	レギュラー\r\nカラー:	Multicolor\r\nパターンタイプ:	動物, フィギュア, レター, ストライプ, スローガン\r\n袖丈:	長袖\r\n長さ:	レギュラー\r\n生地:	ミディアムストレッチ\r\n素材:	ファブリック\r\nコンポジション:	100% ポリエステル\r\nお手入れ方法:	洗濯機洗い可、もしくはプロによるドライクリーニング可\r\n洋服の厚さ:	春/秋 (18-25℃/63-77℉)\r\n透明度:	No'),
(20, 'ROMWE スクール ジップアップ ドローストリング パーカー', 'ROMWE', 'ジャケット・アウター', 2389, 12, '詳細:	ドローストリング, ポケット, ジッパー\r\nネックライン:	フード付き\r\nタイプ:	ジップアップ\r\nカラー:	Dark Green\r\n袖丈:	長袖\r\n長さ:	ロング\r\nフィットタイプ:	オーバーサイズ\r\n生地:	ローストレッチ\r\n素材:	ファブリック\r\nコンポジション:	62.0% ポリエステル, 38.0% コットン\r\nお手入れ方法:	洗濯機洗い可、もしくはプロによるドライクリーニング可\r\n洋服の厚さ:	晩秋 (10-17℃/50-63℉)\r\n透明度:	No'),
(21, 'ROMWE Kawaii 無地柄 ドロップショルダー ダブルポケット カーディガン', 'ROMWE', 'ジャケット・アウター', 2854, 8, '詳細:	ボタン, ポケット\r\nネックライン:	Ｖネック\r\nスリーブタイプ:	ドロップショルダー\r\nスタイル:	カジュアル\r\nカラー:	Light Grey\r\nパターンタイプ:	プレーン\r\n袖丈:	長袖\r\n長さ:	ロング\r\n洋服の厚さ:	晩秋 (10-17℃/50-63℉)\r\nフィットタイプ:	オーバーサイズ\r\n生地:	ローストレッチ\r\n素材:	ウーステッド\r\nコンポジション:	100% アクリル\r\nお手入れ方法:	洗濯機洗い可、もしくはプロによるドライクリーニング可\r\n透明度:	No'),
(23, 'SHEIN MOOSTA レディースカーゴパンツ ポケットつき', 'SHEIN', 'パンツ', 1315, 9, 'クロージャータイプ:	ドローストリングウェスト\r\n詳細:	ドローストリング, ポケット\r\nスタイル:	カジュアル\r\nカラー:	White\r\nパターンタイプ:	プレーン\r\nタイプ:	カーゴパンツ\r\nウエストライン:	ハイウェスト\r\n長さ:	ロング\r\nフィットタイプ:	ルーズ\r\n生地:	ノンストレッチ\r\n素材:	ポリエステル\r\nコンポジション:	100% ポリエステル\r\nお手入れ方法:	手洗い、もしくはプロによるドライクリーニング可\r\n洋服の厚さ:	春/秋 (18-25℃/63-77℉)\r\n本体:	裏地なし\r\n透明度:	No'),
(24, 'DAZY コントラストカラーストライプのレディースルーズワイドレッグパンツ', 'DAZY', 'パンツ', 1711, 6, 'クロージャータイプ:	ドローストリングウェスト\r\n詳細:	ドローストリング, パッチング, コントラストバインディング\r\nスタイル:	カジュアル\r\nカラー:	Dusty Blue\r\nパターンタイプ:	レター\r\nタイプ:	ワイドレッグ\r\nウエストライン:	Natural\r\n長さ:	ロング\r\nフィットタイプ:	ルーズ\r\n生地:	ノンストレッチ\r\n素材:	ファブリック\r\nコンポジション:	100% ポリエステル\r\nお手入れ方法:	洗濯機洗い可、もしくはプロによるドライクリーニング可\r\n洋服の厚さ:	春/秋 (18-25℃/63-77℉)\r\n本体:	裏地なし\r\n透明度:	No'),
(25, 'FRIFUL カラーブロック ドローストリングパンツ レディース、ファッショナブルなカジュアルスポーツウェア', 'FRIFUL', 'パンツ', 2365, 12, 'クロージャータイプ:	伸縮性ウェスト\r\n詳細:	結び目, ポケット, サイドストライプ\r\nスタイル:	カジュアル\r\nカラー:	Black\r\nパターンタイプ:	プレーン, ストライプ\r\nタイプ:	ワイドレッグ\r\nウエストライン:	Natural\r\n長さ:	ロング\r\nフィットタイプ:	レギュラーフィット\r\n生地:	ミディアムストレッチ\r\n素材:	フランネル\r\nコンポジション:	95% ポリエステル, 5% エラスタン\r\nお手入れ方法:	洗濯機洗い可、ドライクリーニング不可\r\n洋服の厚さ:	晩秋 (10-17℃/50-63℉)\r\n本体:	裏地なし\r\n透明度:	No'),
(26, 'ROMWE Street Life カラーブロック ビッグシルエット パンツ、春夏の日常着や学校向け', 'ROMWE', 'パンツ', 1655, 9, 'クロージャータイプ:	ドローストリングウェスト\r\n詳細:	サイドストライプ\r\nスタイル:	カジュアル\r\nカラー:	Black\r\nパターンタイプ:	カラーブロック, ストライプ\r\nタイプ:	テーパード/キャロット, ワイドレッグ\r\nウエストライン:	Natural\r\n長さ:	ロング\r\nフィットタイプ:	ルーズ\r\n生地:	ノンストレッチ\r\n素材:	織物生地\r\nコンポジション:	100% ポリエステル\r\nお手入れ方法:	洗濯機洗い可、ドライクリーニング不可\r\n洋服の厚さ:	春/秋 (18-25℃/63-77℉)\r\n本体:	裏地なし\r\n透明度:	No'),
(27, 'DAZY ハイウエスト ベルトなし プリーツスカート', 'DAZY', 'スカート', 1629, 4, '詳細:	プリーツ\r\nスタイル:	カジュアル\r\nタイプ:	プリーツ\r\nカラー:	Black\r\nパターンタイプ:	プレーン\r\nウエストライン:	Natural\r\n長さ:	ニーレングス\r\nフィットタイプ:	レギュラーフィット\r\n生地:	ノンストレッチ\r\n素材:	織物生地\r\nコンポジション:	97.0% ポリエステル, 3.0% エラスタン\r\nお手入れ方法:	手洗い可、ドライクリーニング不可\r\nポケット:	No\r\n透明度:	No'),
(28, 'EMERY ROSE 女性用エレガントハイウエストプリーツスカート、春夏', 'EMERY ROSE', 'スカート', 6023, 1, '詳細: ポケット, ジッパー<br>スタイル: カジュアル, エレガント<br>タイプ: Aライン<br>カラー: Burgundy<br>パターンタイプ: プレーン<br>ウエストライン: ハイウェスト<br>長さ: ロング<br>フィットタイプ: レギュラーフィット<br>生地: ノンストレッチ<br>素材: ファブリック<br>コンポジション: 100% ポリエステル<br>お手入れ方法: 洗濯機洗い可、もしくはプロによるドライクリーニング可<br>ポケット: No<br>透明度: No'),
(29, 'FRIFUL 春夏用 ドローストリングウエスト ハーフプラケット キャミワンピース、ファスナー付き、フラップポケット付き', 'FRIFUL', 'ワンピース/ドレス', 2752, 1, '詳細: ドローストリング, 結び目, ポケット<br>ネックライン: スパゲッティストラップ<br>スタイル: カジュアル<br>タイプ: キャミソール<br>ウエストライン: ハイウェスト<br>ヘム形状: レイヤード/ティアード<br>カラー: Black<br>パターンタイプ: プレーン<br>袖丈: ノースリーブ<br>フィットタイプ: ルーズ<br>長さ: ロング<br>素材: ファブリック<br>コンポジション: 71% ポリエステル, 29% ポリアミド<br>お手入れ方法: 手洗い可、ドライクリーニング不可<br>透明度: No<br>生地: ノンストレッチ<br>ポケット: No'),
(30, 'DAZY コントラストメッシュフリル袖マーメイドヘムベルベットドレス、誕生日、新年の夜', 'DAZY', 'ワンピース/ドレス', 2266, 3, '詳細:	コントラストメッシュ, カットアウト, ジッパー\r\nネックライン:	スタンドカラー\r\nスリーブタイプ:	レギュラースリーブ\r\nスタイル:	エレガント\r\nタイプ:	ボディコン\r\nウエストライン:	Natural\r\nヘム形状:	Mermaid\r\nカラー:	Black\r\nパターンタイプ:	プレーン\r\n袖丈:	長袖\r\nフィットタイプ:	レギュラーフィット\r\n長さ:	ミディ\r\n素材:	フランネル\r\nコンポジション:	95% ポリエステル, 5% エラスタン\r\nお手入れ方法:	洗濯機洗い可、もしくはプロによるドライクリーニング可\r\n透明度:	No\r\n生地:	ミディアムストレッチ');

-- --------------------------------------------------------

--
-- テーブルの構造 `items_backup`
--

CREATE TABLE `items_backup` (
  `id` int(11) NOT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `zaiko` int(255) NOT NULL,
  `infor` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- テーブルのデータのダンプ `items_backup`
--

INSERT INTO `items_backup` (`id`, `brand`, `name`, `price`, `category`, `zaiko`, `infor`) VALUES
(0, 'SHEIN', 'Manfinity EMRG メンズシャツ バギー クルーネック 半袖 グラフィックティー 夏用', 5023, 'トップス', 1, 'スリーブタイプドロップショルダー,スタイルカジュアル'),
(1, 'SHEIN', 'Manfinity EMRG メンズ カジュアルなルーズフィット カーゴパンツ フラップポケットとドローストリングウエスト付き', 2099, 'パンツ', 1, ''),
(2, 'SHEIN', 'Manfinity Hypemode メンズ ボンバージャケット ローズフィットファッションウェア アウター', 2652, 'ジャケット・アウター', 1, ''),
(3, 'SHEIN', 'Manfinity Hypemode ゆったりサイズのメンズソリッドカラー ドロップショルダーシャツ(ネクタイ非付属)', 1193, 'トップス', 1, '');

-- --------------------------------------------------------

--
-- テーブルの構造 `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `order_username` varchar(255) NOT NULL,
  `order_userphone` int(11) NOT NULL,
  `order_date` datetime NOT NULL,
  `status` enum('pending','shipped','delivered','canceled','shipping','failed','returned') NOT NULL,
  `total_amount` int(11) NOT NULL,
  `shipping_address` varchar(255) NOT NULL,
  `payment_method` enum('代金引換') NOT NULL,
  `shipping_method` varchar(255) NOT NULL DEFAULT '未定',
  `payment_status` enum('paid','unpaid') NOT NULL,
  `shipping_fee` int(10) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `order_number` varchar(12) NOT NULL,
  `delivery_time` varchar(255) NOT NULL DEFAULT '未定'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- テーブルのデータのダンプ `orders`
--

INSERT INTO `orders` (`order_id`, `user_id`, `order_username`, `order_userphone`, `order_date`, `status`, `total_amount`, `shipping_address`, `payment_method`, `shipping_method`, `payment_status`, `shipping_fee`, `created_at`, `updated_at`, `order_number`, `delivery_time`) VALUES
(26, 2, 'Jon Stewart Doe', 2147483647, '2024-11-07 14:50:58', 'pending', 1023, '〒30260-070  dasddasdasdasda', '代金引換', '未定', 'paid', 0, '2024-11-07 05:50:58', '2024-11-07 05:50:58', 'XT4866188095', '未定'),
(27, 2, 'Nguyen Thanh Son', 2147483647, '2024-11-07 19:44:59', 'pending', 2386, '〒5570016  大阪府大阪市西成区花園北dasddsad', '代金引換', '未定', 'paid', 0, '2024-11-07 10:44:59', '2024-11-07 10:44:59', 'LX4682183085', '未定'),
(28, 2, 'Nguyen Thanh Son', 2147483647, '2024-11-07 20:03:06', 'pending', 2652, '〒5570016  大阪府大阪市西成区花園北dasddsad', '代金引換', '未定', 'paid', 0, '2024-11-07 11:03:06', '2024-11-07 11:03:06', 'JZ7570208496', '未定'),
(29, 2, 'Nguyen Thanh Son', 2147483647, '2024-11-28 12:36:45', 'pending', 5023, '〒5570016  大阪府大阪市西成区花園北dasddsad', '代金引換', '未定', 'paid', 0, '2024-11-28 03:36:45', '2024-11-28 03:36:45', 'TG4133238066', '未定'),
(30, 2, 'Nguyen Thanh Son', 2147483647, '2024-11-28 15:12:27', 'pending', 5023, '〒5570016  大阪府大阪市西成区花園北dasddsad', '代金引換', '未定', 'paid', 0, '2024-11-28 06:12:27', '2024-11-28 06:12:27', 'MZ3916735926', '未定');

-- --------------------------------------------------------

--
-- テーブルの構造 `order_details`
--

CREATE TABLE `order_details` (
  `order_detail_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `item_name` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `size` varchar(10) NOT NULL,
  `color` varchar(50) NOT NULL,
  `colorId` int(11) NOT NULL,
  `brand` varchar(50) NOT NULL,
  `category` varchar(100) NOT NULL,
  `img` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`img`)),
  `subtotal` decimal(10,2) GENERATED ALWAYS AS (`quantity` * `price`) STORED
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- テーブルのデータのダンプ `order_details`
--

INSERT INTO `order_details` (`order_detail_id`, `order_id`, `item_id`, `item_name`, `quantity`, `price`, `size`, `color`, `colorId`, `brand`, `category`, `img`) VALUES
(29, 26, 0, 'Manfinity EMRG メンズシャツ バギー クルーネック 半袖 グラフィックティー 夏用', 1, 1023, 'M', 'ブラック', 1, 'SHEIN', 'トップス', '[\"item1-img1.jpg\",\"item1-img2.webp\",\"item1-img3.webp\",\"item1-img4.webp\",\"item1-img5.webp\"]'),
(30, 27, 3, 'Manfinity Hypemode ゆったりサイズのメンズソリッドカラー ドロップショルダーシャツ(ネクタイ非付属)', 1, 1193, 'S', 'ダーク・グリーン', 14, 'SHEIN', 'トップス', '[\"item4-color5-1.webp\",\"item4-color5-2.webp\",\"item4-color5-3.webp\",\"item4-color5-4.webp\"]'),
(31, 27, 3, 'Manfinity Hypemode ゆったりサイズのメンズソリッドカラー ドロップショルダーシャツ(ネクタイ非付属)', 1, 1193, 'M', 'ダーク・グレー', 13, 'SHEIN', 'トップス', '[\"item4-color4-1.webp\",\"item4-color4-2.webp\",\"item4-color4-3.webp\",\"item4-color4-4.webp\"]'),
(32, 28, 2, 'Manfinity Hypemode メンズ ボンバージャケット ローズフィットファッションウェア アウター', 1, 2652, 'M', 'ブラック', 8, 'SHEIN', 'ジャケット・アウター', '[\"item3-color2-1.webp\",\"item3-color2-2.webp\",\"item3-color2-3.webp\",\"item3-color2-4.webp\",\"item3-color2-5.webp\",\"item3-color2-6.webp\"]'),
(33, 29, 0, 'Manfinity EMRG メンズシャツ バギー クルーネック 半袖 グラフィックティー 夏用', 1, 5023, 'L', 'ブラック', 28, 'Manfinity', 'トップス', '[\"item1-img1.jpg\",\"item1-img2.webp\",\"item1-img3.webp\",\"item1-img4.webp\",\"item1-img5.webp\"]'),
(34, 30, 0, 'Manfinity EMRG メンズシャツ バギー クルーネック 半袖 グラフィックティー 夏用', 1, 5023, 'L', 'ブラック', 28, 'Manfinity', 'トップス', '[\"item1-img1.jpg\",\"item1-img2.webp\",\"item1-img3.webp\",\"item1-img4.webp\",\"item1-img5.webp\"]');

-- --------------------------------------------------------

--
-- テーブルの構造 `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `color_name` varchar(255) DEFAULT NULL,
  `size` varchar(10) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL CHECK (`rating` >= 1 and `rating` <= 5),
  `review_title` varchar(255) NOT NULL,
  `review_text` text DEFAULT NULL,
  `review_img` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- テーブルのデータのダンプ `reviews`
--

INSERT INTO `reviews` (`id`, `item_id`, `user_id`, `color_name`, `size`, `rating`, `review_title`, `review_text`, `review_img`, `created_at`, `updated_at`) VALUES
(13, 2, 1, 'ワインレッド', 'M', 3, 'bad', 'not god', '', '2024-10-30 04:42:14', '2024-10-30 04:42:14'),
(17, 1, 2, 'ブラック', 'M', 4, 'good', 'mm', '', '2024-11-07 11:04:31', '2024-11-07 11:04:31'),
(37, 0, 2, 'ブラック', 'L', 2, 'bad', 'aaa', 'review-img-1732774278143.webp', '2024-11-28 06:11:18', '2024-11-28 06:11:18');

-- --------------------------------------------------------

--
-- テーブルの構造 `review_like`
--

CREATE TABLE `review_like` (
  `id` int(11) NOT NULL,
  `review_id` int(11) NOT NULL,
  `like_userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- テーブルのデータのダンプ `review_like`
--

INSERT INTO `review_like` (`id`, `review_id`, `like_userId`) VALUES
(38, 13, 1);

-- --------------------------------------------------------

--
-- テーブルの構造 `sizes`
--

CREATE TABLE `sizes` (
  `id` int(11) NOT NULL,
  `item_id` int(11) DEFAULT NULL,
  `size` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- テーブルのデータのダンプ `sizes`
--

INSERT INTO `sizes` (`id`, `item_id`, `size`) VALUES
(22, 15, 'M'),
(23, 15, 'L'),
(24, 16, 'S'),
(25, 16, 'M'),
(26, 0, 'M'),
(27, 0, 'L'),
(28, 1, 'S'),
(29, 1, 'M'),
(30, 1, 'L'),
(31, 2, 'S'),
(32, 2, 'M'),
(33, 2, 'L'),
(34, 3, 'S'),
(35, 3, 'M'),
(36, 3, 'L'),
(37, 14, 'M'),
(38, 14, 'S'),
(39, 14, 'L'),
(40, 17, 'S'),
(41, 17, 'M'),
(42, 18, 'S'),
(43, 18, 'M'),
(44, 19, 'M'),
(45, 19, 'S'),
(46, 19, 'L'),
(47, 20, 'M'),
(48, 20, 'S'),
(49, 20, 'L'),
(50, 21, 'S'),
(51, 21, 'M'),
(53, 23, 'XS'),
(54, 23, 'S'),
(55, 23, 'M'),
(56, 24, 'S'),
(57, 24, 'M'),
(58, 25, 'S'),
(59, 25, 'M'),
(60, 25, 'L'),
(61, 26, 'M'),
(62, 26, 'L'),
(63, 26, 'XL'),
(64, 27, 'S'),
(65, 27, 'M'),
(66, 28, 'S'),
(67, 28, 'M'),
(68, 28, 'L'),
(69, 29, 'S'),
(70, 29, 'M'),
(71, 30, 'S'),
(72, 30, 'M'),
(73, 30, 'L');

-- --------------------------------------------------------

--
-- テーブルの構造 `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `user_img` varchar(255) NOT NULL,
  `user_sex` varchar(255) NOT NULL,
  `user_birth` varchar(255) NOT NULL,
  `user_role` varchar(255) NOT NULL,
  `verification_code` varchar(255) DEFAULT NULL,
  `is_verified` tinyint(1) DEFAULT 0,
  `reset_password_token` varchar(255) DEFAULT NULL,
  `reset_password_expire` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- テーブルのデータのダンプ `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `user_password`, `user_email`, `user_img`, `user_sex`, `user_birth`, `user_role`, `verification_code`, `is_verified`, `reset_password_token`, `reset_password_expire`, `created_at`) VALUES
(1, 'nguyenthanhson', '$2a$10$GUUKIRqa9Rx3YuJGYlLQP.yHMa6nYLvkH91IeF3xkNexOnAWyFIXy', 'nthanhsonn@gmail.com', 'user_avatar-1727920867571.jpg', 'male', '2000-09-20', 'admin', NULL, 1, NULL, NULL, '2024-11-28 12:00:23'),
(2, 'eds2002', '$2a$10$CJAP2VAKmcCObnOJDDvWuONBI5AgAXiX78c7oVzDeT3mIDAN6yWGq', '23844108@hagoromo.ac.jp', 'default.jpg', 'male', '2009-11-20', 'customer', NULL, 1, NULL, NULL, '2024-11-28 12:00:07'),
(29, 'eds2000', '$2a$10$aBR.R9KMY/xS3EHff7JVh.plmrChYURtY2eHv5JR/Vbywrl8Y7m4a', 'sthanhsonss@gmail.com', 'default.jpg', 'male', '2013/02/02', 'customer', NULL, 1, NULL, NULL, '2024-11-28 06:31:21');

-- --------------------------------------------------------

--
-- テーブルの構造 `user_address`
--

CREATE TABLE `user_address` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `address_zip_code` varchar(255) NOT NULL,
  `address_prefecture` varchar(255) NOT NULL,
  `address_city` varchar(255) NOT NULL,
  `address_add` varchar(255) NOT NULL,
  `address_building` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- テーブルのデータのダンプ `user_address`
--

INSERT INTO `user_address` (`id`, `user_id`, `name`, `phone`, `address_zip_code`, `address_prefecture`, `address_city`, `address_add`, `address_building`) VALUES
(14, 1, 'Nguyen Thanh Son', '08083004904', '5570016', '大阪府', '大阪市西成区花園北', 's', 'd'),
(15, 2, 'Nguyen Thanh Son', '08083004904', '5570016', '大阪府', '大阪市西成区花園北', 'dasd', 'dsad');

--
-- ダンプしたテーブルのインデックス
--

--
-- テーブルのインデックス `cart`
--
ALTER TABLE `cart`
  ADD KEY `item_id` (`item_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `size` (`size`),
  ADD KEY `color_id` (`color_id`);

--
-- テーブルのインデックス `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `item_id` (`item_id`);

--
-- テーブルのインデックス `chat_history`
--
ALTER TABLE `chat_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sender_id` (`sender_id`);

--
-- テーブルのインデックス `colors`
--
ALTER TABLE `colors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `colors_ibfk_1` (`item_id`);

--
-- テーブルのインデックス `color_sizes`
--
ALTER TABLE `color_sizes`
  ADD KEY `size_id` (`size`),
  ADD KEY `item_id` (`item_id`),
  ADD KEY `item_id_2` (`item_id`);

--
-- テーブルのインデックス `favorite_items`
--
ALTER TABLE `favorite_items`
  ADD KEY `user_id` (`user_id`),
  ADD KEY `item_id` (`item_id`);

--
-- テーブルのインデックス `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `images_ibfk_1` (`color_id`);

--
-- テーブルのインデックス `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`);

--
-- テーブルのインデックス `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `user_id` (`user_id`);

--
-- テーブルのインデックス `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`order_detail_id`),
  ADD KEY `order_details_ibfk_2` (`item_id`),
  ADD KEY `order_id` (`order_id`);

--
-- テーブルのインデックス `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `item_id` (`item_id`),
  ADD KEY `user_id` (`user_id`);

--
-- テーブルのインデックス `review_like`
--
ALTER TABLE `review_like`
  ADD PRIMARY KEY (`id`),
  ADD KEY `review_like_ibfk_1` (`review_id`);

--
-- テーブルのインデックス `sizes`
--
ALTER TABLE `sizes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sizes_ibfk_1` (`item_id`);

--
-- テーブルのインデックス `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- テーブルのインデックス `user_address`
--
ALTER TABLE `user_address`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- ダンプしたテーブルの AUTO_INCREMENT
--

--
-- テーブルの AUTO_INCREMENT `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- テーブルの AUTO_INCREMENT `chat_history`
--
ALTER TABLE `chat_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- テーブルの AUTO_INCREMENT `colors`
--
ALTER TABLE `colors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- テーブルの AUTO_INCREMENT `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=788;

--
-- テーブルの AUTO_INCREMENT `items`
--
ALTER TABLE `items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- テーブルの AUTO_INCREMENT `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- テーブルの AUTO_INCREMENT `order_details`
--
ALTER TABLE `order_details`
  MODIFY `order_detail_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- テーブルの AUTO_INCREMENT `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- テーブルの AUTO_INCREMENT `review_like`
--
ALTER TABLE `review_like`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- テーブルの AUTO_INCREMENT `sizes`
--
ALTER TABLE `sizes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- テーブルの AUTO_INCREMENT `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- テーブルの AUTO_INCREMENT `user_address`
--
ALTER TABLE `user_address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- ダンプしたテーブルの制約
--

--
-- テーブルの制約 `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- テーブルの制約 `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- テーブルの制約 `chat_history`
--
ALTER TABLE `chat_history`
  ADD CONSTRAINT `chat_history_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- テーブルの制約 `colors`
--
ALTER TABLE `colors`
  ADD CONSTRAINT `colors_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- テーブルの制約 `color_sizes`
--
ALTER TABLE `color_sizes`
  ADD CONSTRAINT `color_sizes_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- テーブルの制約 `favorite_items`
--
ALTER TABLE `favorite_items`
  ADD CONSTRAINT `favorite_items_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `favorite_items_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`);

--
-- テーブルの制約 `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `images_ibfk_1` FOREIGN KEY (`color_id`) REFERENCES `colors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- テーブルの制約 `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- テーブルの制約 `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `order_details_ibfk_3` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `order_details_ibfk_4` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`);

--
-- テーブルの制約 `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `reviews_ibfk_3` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`);

--
-- テーブルの制約 `review_like`
--
ALTER TABLE `review_like`
  ADD CONSTRAINT `review_like_ibfk_1` FOREIGN KEY (`review_id`) REFERENCES `reviews` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- テーブルの制約 `sizes`
--
ALTER TABLE `sizes`
  ADD CONSTRAINT `sizes_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- テーブルの制約 `user_address`
--
ALTER TABLE `user_address`
  ADD CONSTRAINT `user_address_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
