-- MySQL dump 10.13  Distrib 5.6.23, for Win64 (x86_64)
--
-- Host: localhost    Database: signup
-- ------------------------------------------------------
-- Server version	5.6.25-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `package`
--

DROP TABLE IF EXISTS `package`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `package` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `description` text NOT NULL,
  `price` decimal(7,2) NOT NULL,
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `package`
--

LOCK TABLES `package` WRITE;
/*!40000 ALTER TABLE `package` DISABLE KEYS */;
INSERT INTO `package` VALUES (1,'FILM REVIEW','A detailed review of film (highlight or game film).|A written report giving detailed assessment of ability, highlighting strengths and areas for improvement along\nwith a recruiting action plan.',300.00,'2015-06-15 10:05:00'),(2,'IN SEASON OR OFF SEASON EVALUATION','In person game evaluation (spring school season or club summer season).|A written report giving detailed assessment of ability, highlighting strengths and areas for improvement along with a recruiting action plan.',500.00,'2015-06-15 10:05:01'),(3,'FULL SEASON EVALUATION','Three in person game evaluations (spring school season or club summer season).|A written report giving detailed assessment of ability, highlighting strengths and areas for improvement along with a recruiting action plan.|A consultation to review the report in person or via phone.',1500.00,'2015-06-15 10:05:02'),(4,'FULL YEAR EVALUATION','Six in person game evaluations (spring school season and club summer season).|Two written reports giving detailed assessment of ability, highlighting strengths and areas for improvement along with a recruiting action plan.|A spring and summer consultation to review the reports in person or via phone.',3000.00,'2015-06-15 10:05:03'),(5,'RECRUITING CONSULTATION','Unlimited phone calls to provide guidance throughout the recruiting process.|The recruiting consultant will assist in finding the proper level for the student-athlete.|The recruiting consultant can communicate directly with college coaches.|The recruiting consultant will sit in on a home visit and oversee the meeting if desired.',3000.00,'2015-06-15 10:05:04');
/*!40000 ALTER TABLE `package` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-06-15 11:23:43
