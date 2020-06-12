CREATE DATABASE  IF NOT EXISTS `HSE` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `HSE`;

--
-- Dumping data for table `occupancy`
--
-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.

-- Modify this code to update the DB schema diagram.
-- To reset the sample schema, replace everything with
-- two dots ('..' - without quotes).
-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.

-- Modify this code to update the DB schema diagram.
-- To reset the sample schema, replace everything with
-- two dots ('..' - without quotes).

-- # Modify this code to update the DB schema diagram.
-- # To reset the sample schema, replace everything with
-- # two dots ('..' - without quotes).

-- users
-- -
-- id PK int
-- email varchar(255)  AUTOINCREMENT
-- surname varchar(255) 
-- name varchar(255)  
-- pwdHash varchar(255)  
-- role int 

-- photos
-- -
-- id PK int AUTOINCREMENT
-- userID int FK >- users.id
-- path varchar(255)  

DROP TABLE IF EXISTS `photos`;
DROP TABLE IF EXISTS `users`;
CREATE TABLE `photos` (
    `id` int  NOT NULL AUTO_INCREMENT,
    `userID` int  NOT NULL ,
    `filename` varchar(255)   NOT NULL ,
    `orgfilename` varchar(255)   NOT NULL ,
    PRIMARY KEY (
        `id`
    )
);



CREATE TABLE `users` (
    `id` int  NOT NULL AUTO_INCREMENT ,
    `surname` varchar(255)  NOT NULL ,
    `name` varchar(255)  NOT NULL ,
    `role` int  NOT NULL ,
    `email` varchar(255)  NOT NULL ,
    `pwdHash` varchar(255)  NOT NULL ,
    `telegramToken` varchar(255)  NOT NULL ,
    PRIMARY KEY (
        `id`
    )
);


ALTER TABLE `photos` ADD CONSTRAINT `fk_photos_userID` FOREIGN KEY(`userID`)
REFERENCES `users` (`id`);

CREATE INDEX `idx_users_email`
ON `users` (`email`);


LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Karl','Marx  ',0,'test@test.com','',''),(2,'Einstein ','Albert ',0,'albertostein@physicist.io','',''),(3,'Newton ','Isaac ',0,'applehead@trees.oof','',''),(4,'Curie ','Marie ',0,'cmglow@google.com','',''),(5,'Koch','Robert',0,'','',''),(6,'Planck','Max',0,'','',''),(7,'Picasso','Pablo',0,'','',''),(8,'Escobar','Pablo',0,'','',''),(9,'Schiller','Friedrich',0,'','',''),(10,'Schiller','Friedrich',0,'','',''),(11,'Freeman','Gordan',1,'gordan.freeman@halflife.com','$2b$12$1mE2OI9hMS/rgH9Mi0s85OM2V5gzm7aF3gJIWH1y0S1MqVBueyjsy',''),(12,'Smith','John',1,'jsmith@yahoo.com','$2b$12$1mE2OI9hMS/rgH9Mi0s85OM2V5gzm7aF3gJIWH1y0S1MqVBueyjsy','');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-01-09 10:50:06
