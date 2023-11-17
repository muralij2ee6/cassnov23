
CREATE TABLE `automobiles` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `color` varchar(255) DEFAULT NULL,
  `make` varchar(255) DEFAULT NULL,
  `model` varchar(255) DEFAULT NULL,
  `owner_name` varchar(255) DEFAULT NULL,
  `purchase_date` datetime(6) DEFAULT NULL,
  `vin` varchar(255) DEFAULT NULL,
  `model_year` int DEFAULT NULL,
  PRIMARY KEY (`id`)
); 

INSERT INTO `automobiles` VALUES (1,'Blue','Nissan','Rogue',NULL,NULL,'AA325B2018',2018),(2,'Silver','Honda','Accord',NULL,NULL,'HH256B2010',2010),(3,'Gold','Chevrolet','S10',NULL,NULL,'CH123G2001',2001),(4,'Gold','Ford','Windstar',NULL,NULL,'FO123G1990',1990),(6,'Blue','Ford','Mustang',NULL,NULL,'FO20236B1967',1967);
