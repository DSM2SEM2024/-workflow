-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Host: sql10.freesqldatabase.com
-- Tempo de geração: 07/10/2024 às 18:38
-- Versão do servidor: 5.5.62-0ubuntu0.14.04.1
-- Versão do PHP: 7.0.33-0ubuntu0.16.04.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
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
-- Estrutura para tabela `Coordinator`
--

CREATE TABLE `Coordinator` (
  `ID_Coordinator` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `ID_Unit` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura para tabela `Course`
--

CREATE TABLE `Course` (
  `ID_Course` int(11) NOT NULL,
  `Course_Name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura para tabela `Course_Unit`
--

CREATE TABLE `Course_Unit` (
  `ID_Course` int(11) NOT NULL DEFAULT '0',
  `ID_Unit` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura para tabela `Files`
--

CREATE TABLE `Files` (
  `ID_File` int(11) NOT NULL,
  `ID_Project` int(11) DEFAULT NULL,
  `File_Name` varchar(100) NOT NULL,
  `File_Type` varchar(50) NOT NULL,
  `URL` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura para tabela `Professor`
--

CREATE TABLE `Professor` (
  `ID_Professor` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `Area_of_Expertise` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura para tabela `Professor_Course`
--

CREATE TABLE `Professor_Course` (
  `ID_Professor` int(11) NOT NULL DEFAULT '0',
  `ID_Course` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura para tabela `Professor_Unit`
--

CREATE TABLE `Professor_Unit` (
  `ID_Professor` int(11) NOT NULL DEFAULT '0',
  `ID_Unit` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura para tabela `Project`
--

CREATE TABLE `Project` (
  `ID_Project` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Description` text NOT NULL,
  `Start_Date` date NOT NULL,
  `End_Date` date NOT NULL,
  `Participants` varchar(255) DEFAULT NULL,
  `ID_Unit` int(11) DEFAULT NULL,
  `Status` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura para tabela `Unit`
--

CREATE TABLE `Unit` (
  `ID_Unit` int(11) NOT NULL,
  `Unit_Name` varchar(100) NOT NULL,
  `Address` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Índices de tabelas apagadas
--

--
-- Índices de tabela `Coordinator`
--
ALTER TABLE `Coordinator`
  ADD PRIMARY KEY (`ID_Coordinator`),
  ADD KEY `ID_Unit` (`ID_Unit`);

--
-- Índices de tabela `Course`
--
ALTER TABLE `Course`
  ADD PRIMARY KEY (`ID_Course`);

--
-- Índices de tabela `Course_Unit`
--
ALTER TABLE `Course_Unit`
  ADD PRIMARY KEY (`ID_Course`,`ID_Unit`),
  ADD KEY `ID_Unit` (`ID_Unit`);

--
-- Índices de tabela `Files`
--
ALTER TABLE `Files`
  ADD PRIMARY KEY (`ID_File`),
  ADD KEY `ID_Project` (`ID_Project`);

--
-- Índices de tabela `Professor`
--
ALTER TABLE `Professor`
  ADD PRIMARY KEY (`ID_Professor`);

--
-- Índices de tabela `Professor_Course`
--
ALTER TABLE `Professor_Course`
  ADD PRIMARY KEY (`ID_Professor`,`ID_Course`),
  ADD KEY `ID_Course` (`ID_Course`);

--
-- Índices de tabela `Professor_Unit`
--
ALTER TABLE `Professor_Unit`
  ADD PRIMARY KEY (`ID_Professor`,`ID_Unit`),
  ADD KEY `ID_Unit` (`ID_Unit`);

--
-- Índices de tabela `Project`
--
ALTER TABLE `Project`
  ADD PRIMARY KEY (`ID_Project`),
  ADD KEY `ID_Unit` (`ID_Unit`);

--
-- Índices de tabela `Unit`
--
ALTER TABLE `Unit`
  ADD PRIMARY KEY (`ID_Unit`);

--
-- AUTO_INCREMENT de tabelas apagadas
--

--
-- AUTO_INCREMENT de tabela `Coordinator`
--
ALTER TABLE `Coordinator`
  MODIFY `ID_Coordinator` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de tabela `Course`
--
ALTER TABLE `Course`
  MODIFY `ID_Course` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de tabela `Files`
--
ALTER TABLE `Files`
  MODIFY `ID_File` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de tabela `Professor`
--
ALTER TABLE `Professor`
  MODIFY `ID_Professor` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de tabela `Project`
--
ALTER TABLE `Project`
  MODIFY `ID_Project` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de tabela `Unit`
--
ALTER TABLE `Unit`
  MODIFY `ID_Unit` int(11) NOT NULL AUTO_INCREMENT;
--
-- Restrições para dumps de tabelas
--

--
-- Restrições para tabelas `Coordinator`
--
ALTER TABLE `Coordinator`
  ADD CONSTRAINT `Coordinator_ibfk_1` FOREIGN KEY (`ID_Unit`) REFERENCES `Unit` (`ID_Unit`);

--
-- Restrições para tabelas `Course_Unit`
--
ALTER TABLE `Course_Unit`
  ADD CONSTRAINT `Course_Unit_ibfk_1` FOREIGN KEY (`ID_Course`) REFERENCES `Course` (`ID_Course`),
  ADD CONSTRAINT `Course_Unit_ibfk_2` FOREIGN KEY (`ID_Unit`) REFERENCES `Unit` (`ID_Unit`);

--
-- Restrições para tabelas `Files`
--
ALTER TABLE `Files`
  ADD CONSTRAINT `Files_ibfk_1` FOREIGN KEY (`ID_Project`) REFERENCES `Project` (`ID_Project`);

--
-- Restrições para tabelas `Professor_Course`
--
ALTER TABLE `Professor_Course`
  ADD CONSTRAINT `Professor_Course_ibfk_1` FOREIGN KEY (`ID_Professor`) REFERENCES `Professor` (`ID_Professor`),
  ADD CONSTRAINT `Professor_Course_ibfk_2` FOREIGN KEY (`ID_Course`) REFERENCES `Course` (`ID_Course`);

--
-- Restrições para tabelas `Professor_Unit`
--
ALTER TABLE `Professor_Unit`
  ADD CONSTRAINT `Professor_Unit_ibfk_1` FOREIGN KEY (`ID_Professor`) REFERENCES `Professor` (`ID_Professor`),
  ADD CONSTRAINT `Professor_Unit_ibfk_2` FOREIGN KEY (`ID_Unit`) REFERENCES `Unit` (`ID_Unit`);

--
-- Restrições para tabelas `Project`
--
ALTER TABLE `Project`
  ADD CONSTRAINT `Project_ibfk_1` FOREIGN KEY (`ID_Unit`) REFERENCES `Unit` (`ID_Unit`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
