-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema cafe_finder
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema cafe_finder
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `cafe_finder` ;
CREATE SCHEMA IF NOT EXISTS `cafe_finder` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `cafe_finder` ;

-- -----------------------------------------------------
-- Table `cafe_finder`.`cafes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cafe_finder`.`cafes` (
  `cafe_id` INT NOT NULL AUTO_INCREMENT,
  `cafe_name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`cafe_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- Add table data
INSERT INTO `cafes`(`cafe_name`)
		     VALUES ('Paludan Bog & Café'),
					('Bevar’s'),
                    ('Lagonis Kaffebar'),
                    ('Rist'),
                    ('Den Lille Smalle'),
                    ('Kjærs Kaffebar'),
                    ('Café Luna'),
                    ('The Mokka Café'),
                    ('Miss Coffee'),
                    ('Rømers Kaffebar'),
                    ('Nr. 15'),
                    ('Café Divino'),
                    ('MØRK Risteri & Kaffebar'),
                    ('BRØD'),
                    ('RS28 Kaffebar');


-- -----------------------------------------------------
-- Table `cafe_finder`.`details`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cafe_finder`.`details` (
  `cafe_id` INT NOT NULL,
  `opening_hours` TIME NULL DEFAULT NULL,
  `closing_hours` TIME NULL DEFAULT NULL,
  `city` VARCHAR(100) NULL DEFAULT NULL,
  `address` VARCHAR(100) NULL DEFAULT NULL,
  `price_range` VARCHAR(5) NULL DEFAULT NULL,
  `wifi` TINYINT(1) NULL DEFAULT NULL,
  `info` VARCHAR(500) NULL DEFAULT NULL,
  PRIMARY KEY (`cafe_id`),
  CONSTRAINT `cafe_id`
    FOREIGN KEY (`cafe_id`)
    REFERENCES `cafe_finder`.`cafes` (`cafe_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- Add table data
INSERT INTO `details` (`cafe_id`, `opening_hours`, `closing_hours`, `city`, `address`, `price_range`, `wifi`, `info`)
               VALUES (1, '10:00', '17:00', 'København K', 'Fiolstræde 12', '$$', 1, 'Paludan Bogcafé er et strålende sted at starte eksamenslæsningen. Her er gratis wifi, udsøgt kaffe og ikke mindst en smuk indretning, hvor du har mulighed for at sidde blandt gamle bogreoler, der bidrager til en helt særlig stemning.
Mange sidder her hele dagen, da der er studievenlige priser på både kaffe, mad og andre lækkerier.'),
                      (2, '11:30', '19:00', 'København N', 'Ravnsborggade 10B', '$', 1, 'Denne café ligger på Ravnsborggade på Nørrebro, og her er der lagt op til, at du benytter stedet som arbejdsrum i dagstimerne. Hvis du bliver hængende til aftentid, kan du opleve caféens aften set-up med mad, stearinlys, musik og fest.'),
                      (3, '09:00', '18:00', 'København Ø', 'Ryesgade 76', '$$$', 1, 'Her kan du nyde alt fra en frisk brygget kop kaffe eller nippe til et glas af din yndlingsvin, alt dette kan gøres imens du nyder en af deres lækre sandwiches eller kager.'),
                      (4, '10:00', '16:00', 'København V', 'Værnedamsvej 4B', '$', 1, 'Stedets interiør er rustikt med rå murstensvægge og en bar beklædt med træplanker i forskellige farver. Rist serverer god kaffe lavet af dygtige baristaer. Kaffebaren serverer desuden vin, juice, snaks og sandwiches.'),
                      (5, '11:00', '19:00', 'Odense', 'Vestergade 5', '$$', 1, 'Hyggelig lille café med forskellige morgenmads- og frokosttilbud. Både glutenfrie og laktosefrie muligheder. Der er masser af stikkontakter og muligheder for at sidde og arbejde eller studere.'),
                      (6, '09:30', '18:00', 'Aarhus', 'Sønder Allé 29', '$$$', 1, 'Super hyggelig kaffebar i hjertet af Aarhus. Friskbagte boller og kage hver dag. Mange tager det med på vejen, men der er også plads til at slå sig ned i og nyde et roligt og afslappende ophold i kaffebaren.'),
                      (7, '12:00', '20:00', 'Aalborg', 'Boulevarden 38', '$', 0, 'Café Luna har nogle hyggelige og indbydende lokaler med en fantastisk stemning. Her er der masser af plads til, at sidde med computeren og studere, enten alene eller med vennerne.'),
                      (8, '08:00', '19:00', 'Kolding', 'Al Passagen 9', '$', 0, 'Hyggelig café midt i Koldings gågade. Caféen er lille og intim men med plads til at sidde og nyde en kop kaffe med sin computer i ro.'),
                      (9, '08:30', '17:30', 'Helsingør', 'Stengade 17', '$$', 1, 'Caféen ligger på solsiden på Stengade, hvor solens stråler rammer fra tidlig morgen til sen eftermiddag. Deres enkle menukort er baseret på den gode smag med friske råvarer, som serveres til en pris, hvor alle kan være med.'),
                      (10, '09:00', '18:30', 'Hillerød', 'Slotsgade 10', '$', 1, 'I hjertet af Hillerøds gågade finder du Rømers Kaffebar, hvor der serveres økologisk og hjemmelavet morgenmad, frokost og tapas - alt sammen med verdens bedste kaffe.'),
                      (11, '11:00', '22:00', 'København S', 'Holmbladsgade 15', '$$$', 1, 'Hos Nr. 15 Køkken & Bar kan du nyde såvel en lækker brunch eller morgenmad som delikate frokostretter og et solidt aftensmåltid – selvfølgelig også i vegetariske versioner. Caféen har massere af plads med baglokaler som er mere lukkede for at arbejde eller studere i fred.'),
                      (12, '10:00', '19:00', 'Espergærde', 'Mørdrupvej 1A', '$$$', 0, 'Hos Café Divino kan du få lækker italiensk kaffe mens du nyder udsigten over Øresund. Der er massere af små borde hvor du kan sidde med en computer, både inde og ude.'),
                      (13, '07:00', '17:30', 'Roskilde', 'Penselstrøget 44', '$$', 1, 'MØRK er et lokalt økologisk kafferisteri med fokus på kvalitet og bæredygtighed. Hvis man prioritere god kaffe, ville dette være den oplagte café for en studerende.'),
                      (14, '10:00', '19:00', 'Svendborg', 'Gerritsgade 18B', '$', 1, 'Friskbagte kager og boller med kvalitetskaffe ved siden af. De studievenlige priser gør dette til et populært sted for studerende.'),
                      (15, '10:00', '18:00', 'Aarhus', 'Ryesgade 28', '$', 1, 'RS28 er en moderne kaffebar i Århus. Priserne gør caféen til et populært samlested for de mange studerende i Århus.');

-- -----------------------------------------------------
-- Table `cafe_finder`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cafe_finder`.`users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `user_firstname` VARCHAR(50) NULL DEFAULT NULL,
  `user_lastname` VARCHAR(50) NULL DEFAULT NULL,
  `user_email` VARCHAR(45) NOT NULL,
  `user_password` VARCHAR(256) NOT NULL,
  `user_salt` VARCHAR(256) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_email_UNIQUE` (`user_email` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- Add table data
-- INSERT INTO `users` (`user_firstname`, `user_lastname`, `user_email`, `user_password`)
--             VALUES ('Christine', 'Tofft', 'christine@tofft.dk', 'password123'),
--                    ('Lucas', 'Jacobsen', 'lucasjacobsen@mail.com', 'superPassWord'),
--                    ('Rasmus', 'Planteig', 'rasmusplateig@mail.dk', '123456'),
--                    ('Christian', 'Thellefsen', 'christiansmail@supermail.net', 'fourwordsalluppercase'),
--                    ('Natazja', 'Rosenkjær', 'natazja@minmail.dk', 'secretpassword321'),
--                    ('Sofie', 'Thorlund', 'sofie@thorlund.dk', 'hemmelig123');

-- -----------------------------------------------------
-- Table `cafe_finder`.`favorites`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cafe_finder`.`favorites` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `cafe_id` INT NOT NULL,
  INDEX `user_id` (`user_id` ASC) VISIBLE,
  INDEX `cafe_id` (`cafe_id` ASC) VISIBLE,
  PRIMARY KEY (`id`),
  CONSTRAINT `favorites_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `cafe_finder`.`users` (`user_id`),
  CONSTRAINT `favorites_ibfk_2`
    FOREIGN KEY (`cafe_id`)
    REFERENCES `cafe_finder`.`cafes` (`cafe_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- Add table data
-- INSERT INTO `favorites` (`user_id`, `cafe_id`)
--                 VALUES (1, 1),
--                        (2, 8),
--                        (3, 4),
--                        (4, 9),
--                        (5, 3),
--                        (6, 12),
--                        (2, 3);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

