CREATE DATABASE repositories;
USE repositories;
-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 22/10/2024 às 02:30
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `repositories`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `coordinator`
--

CREATE TABLE `coordinator` (
  `ID_Coordinator` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Password` varchar(100) NULL,
  `ID_Unit` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `course`
--

CREATE TABLE `course` (
  `ID_Course` int(11) NOT NULL,
  `Course_Name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `course_unit`
--

CREATE TABLE `course_unit` (
  `ID_Course` int(11) NOT NULL DEFAULT 0,
  `ID_Unit` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `files`
--

CREATE TABLE `files` (
  `ID_File` int(11) NOT NULL,
  `ID_Project` int(11) DEFAULT NULL,
  `File_Name` varchar(100) NOT NULL,
  `File_Type` varchar(50) NOT NULL,
  `URL` varchar(255) NULL,
  `File_Data` LONGTEXT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `professor`
--

CREATE TABLE `professor` (
  `ID_Professor` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Password` varchar(100) NULL,
  `Area_of_Expertise` varchar(100) NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

CREATE TABLE `mail_code`(
  `Code` int(11) NOT NULL
)

--
-- Estrutura para tabela `professor_course`
--

CREATE TABLE `professor_course` (
  `ID_Professor` int(11) NOT NULL DEFAULT 0,
  `ID_Course` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `professor_unit`
--

CREATE TABLE `professor_unit` (
  `ID_Professor` int(11) NOT NULL DEFAULT 0,
  `ID_Unit` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `project`
--

CREATE TABLE `project` (
  `ID_Project` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Description` text NOT NULL,
  `Start_Date` date NOT NULL,
  `End_Date` date NOT NULL,
  `Participants` varchar(1000) DEFAULT NULL,
  `ID_Unit` int(11) DEFAULT NULL,
  `ID_Professor` int(11) NOT NULL,
  `Status` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `unit`
--

CREATE TABLE `unit` (
  `ID_Unit` int(11) NOT NULL,
  `Unit_Name` varchar(100) NOT NULL,
  `Address` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `coordinator`
--
ALTER TABLE `coordinator`
  ADD PRIMARY KEY (`ID_Coordinator`),
  ADD KEY `ID_Unit` (`ID_Unit`);

ALTER TABLE `mail_code`
  ADD PRIMARY KEY (`Code`);

--
-- Índices de tabela `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`ID_Course`);

--
-- Índices de tabela `course_unit`
--
ALTER TABLE `course_unit`
  ADD PRIMARY KEY (`ID_Course`,`ID_Unit`),
  ADD KEY `ID_Unit` (`ID_Unit`);

--
-- Índices de tabela `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`ID_File`),
  ADD KEY `ID_Project` (`ID_Project`);

--
-- Índices de tabela `professor`
--
ALTER TABLE `professor`
  ADD PRIMARY KEY (`ID_Professor`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- Índices de tabela `professor_course`
--
ALTER TABLE `professor_course`
  ADD PRIMARY KEY (`ID_Professor`,`ID_Course`),
  ADD KEY `ID_Course` (`ID_Course`);

--
-- Índices de tabela `professor_unit`
--
ALTER TABLE `professor_unit`
  ADD PRIMARY KEY (`ID_Professor`,`ID_Unit`),
  ADD KEY `ID_Unit` (`ID_Unit`);

--
-- Índices de tabela `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`ID_Project`),
  ADD KEY `ID_Unit` (`ID_Unit`),
  ADD KEY `ID_Professor` (`ID_Professor`);

--
-- Índices de tabela `unit`
--
ALTER TABLE `unit`
  ADD PRIMARY KEY (`ID_Unit`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `coordinator`
--
ALTER TABLE `coordinator`
  MODIFY `ID_Coordinator` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `course`
--
ALTER TABLE `course`
  MODIFY `ID_Course` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `files`
--
ALTER TABLE `files`
  MODIFY `ID_File` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `professor`
--
ALTER TABLE `professor`
  MODIFY `ID_Professor` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `project`
--
ALTER TABLE `project`
  MODIFY `ID_Project` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `unit`
--
ALTER TABLE `unit`
  MODIFY `ID_Unit` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `coordinator`
--
ALTER TABLE `coordinator`
  ADD CONSTRAINT `Coordinator_ibfk_1` FOREIGN KEY (`ID_Unit`) REFERENCES `unit` (`ID_Unit`);

--
-- Restrições para tabelas `course_unit`
--
ALTER TABLE `course_unit`
  ADD CONSTRAINT `Course_Unit_ibfk_1` FOREIGN KEY (`ID_Course`) REFERENCES `course` (`ID_Course`),
  ADD CONSTRAINT `Course_Unit_ibfk_2` FOREIGN KEY (`ID_Unit`) REFERENCES `unit` (`ID_Unit`);

--
-- Restrições para tabelas `files`
--
ALTER TABLE `files`
  ADD CONSTRAINT `Files_ibfk_1` FOREIGN KEY (`ID_Project`) REFERENCES `project` (`ID_Project`);

--
-- Restrições para tabelas `professor_course`
--
ALTER TABLE `professor_course`
  ADD CONSTRAINT `Professor_Course_ibfk_1` FOREIGN KEY (`ID_Professor`) REFERENCES `professor` (`ID_Professor`),
  ADD CONSTRAINT `Professor_Course_ibfk_2` FOREIGN KEY (`ID_Course`) REFERENCES `course` (`ID_Course`);

--
-- Restrições para tabelas `professor_unit`
--
ALTER TABLE `professor_unit`
  ADD CONSTRAINT `Professor_Unit_ibfk_1` FOREIGN KEY (`ID_Professor`) REFERENCES `professor` (`ID_Professor`),
  ADD CONSTRAINT `Professor_Unit_ibfk_2` FOREIGN KEY (`ID_Unit`) REFERENCES `unit` (`ID_Unit`);

--
-- Restrições para tabelas `project`
--
ALTER TABLE `project`
  ADD CONSTRAINT `Project_ibfk_1` FOREIGN KEY (`ID_Unit`) REFERENCES `unit` (`ID_Unit`);

------ INSERTS

INSERT INTO unit(Unit_Name,Address) VALUES('Fatec Itaquera','Avenida Miguel Ignácio Curi, 360');
INSERT INTO unit(Unit_Name,Address) VALUES('Fatec Zona Leste','Avenida Águia de Haia, 2983');
INSERT INTO unit(Unit_Name,Address) VALUES('Fatec São Paulo','Avenida Tiradentes, 610');

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
