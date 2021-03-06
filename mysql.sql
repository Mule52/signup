-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema sakila
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema sakila
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `sakila` DEFAULT CHARACTER SET utf8 ;
USE `sakila` ;

-- -----------------------------------------------------
-- Table `sakila`.`actor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sakila`.`actor` (
  `actor_id` SMALLINT(5) UNSIGNED NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `last_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`actor_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 206
DEFAULT CHARACTER SET = utf8;

CREATE INDEX `idx_actor_last_name` ON `sakila`.`actor` (`last_name` ASC);


-- -----------------------------------------------------
-- Table `sakila`.`country`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sakila`.`country` (
  `country_id` SMALLINT(5) UNSIGNED NOT NULL AUTO_INCREMENT,
  `country` VARCHAR(50) NOT NULL,
  `last_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`country_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 110
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `sakila`.`city`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sakila`.`city` (
  `city_id` SMALLINT(5) UNSIGNED NOT NULL AUTO_INCREMENT,
  `city` VARCHAR(50) NOT NULL,
  `country_id` SMALLINT(5) UNSIGNED NOT NULL,
  `last_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`city_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 601
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `sakila`.`address`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sakila`.`address` (
  `address_id` SMALLINT(5) UNSIGNED NOT NULL AUTO_INCREMENT,
  `address` VARCHAR(50) NOT NULL,
  `address2` VARCHAR(50) NULL DEFAULT NULL,
  `district` VARCHAR(20) NOT NULL,
  `city_id` SMALLINT(5) UNSIGNED NOT NULL,
  `postal_code` VARCHAR(10) NULL DEFAULT NULL,
  `phone` VARCHAR(20) NOT NULL,
  `last_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`address_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 606
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `sakila`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sakila`.`category` (
  `category_id` TINYINT(3) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(25) NOT NULL,
  `last_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`category_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 17
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `sakila`.`staff`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sakila`.`staff` (
  `staff_id` TINYINT(3) UNSIGNED NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `address_id` SMALLINT(5) UNSIGNED NOT NULL,
  `picture` BLOB NULL DEFAULT NULL,
  `email` VARCHAR(50) NULL DEFAULT NULL,
  `store_id` TINYINT(3) UNSIGNED NOT NULL,
  `active` TINYINT(1) NOT NULL DEFAULT '1',
  `username` VARCHAR(16) NOT NULL,
  `password` VARCHAR(40) CHARACTER SET 'utf8' COLLATE 'utf8_bin' NULL DEFAULT NULL,
  `last_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`staff_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `sakila`.`store`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sakila`.`store` (
  `store_id` TINYINT(3) UNSIGNED NOT NULL AUTO_INCREMENT,
  `manager_staff_id` TINYINT(3) UNSIGNED NOT NULL,
  `address_id` SMALLINT(5) UNSIGNED NOT NULL,
  `last_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`store_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `sakila`.`customer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sakila`.`customer` (
  `customer_id` SMALLINT(5) UNSIGNED NOT NULL AUTO_INCREMENT,
  `store_id` TINYINT(3) UNSIGNED NOT NULL,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(50) NULL DEFAULT NULL,
  `address_id` SMALLINT(5) UNSIGNED NOT NULL,
  `active` TINYINT(1) NOT NULL DEFAULT '1',
  `create_date` DATETIME NOT NULL,
  `last_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`customer_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 600
DEFAULT CHARACTER SET = utf8;

CREATE INDEX `idx_last_name` ON `sakila`.`customer` (`last_name` ASC);


-- -----------------------------------------------------
-- Table `sakila`.`language`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sakila`.`language` (
  `language_id` TINYINT(3) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` CHAR(20) NOT NULL,
  `last_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`language_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `sakila`.`film`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sakila`.`film` (
  `film_id` SMALLINT(5) UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NULL DEFAULT NULL,
  `release_year` YEAR NULL DEFAULT NULL,
  `language_id` TINYINT(3) UNSIGNED NOT NULL,
  `original_language_id` TINYINT(3) UNSIGNED NULL DEFAULT NULL,
  `rental_duration` TINYINT(3) UNSIGNED NOT NULL DEFAULT '3',
  `rental_rate` DECIMAL(4,2) NOT NULL DEFAULT '4.99',
  `length` SMALLINT(5) UNSIGNED NULL DEFAULT NULL,
  `replacement_cost` DECIMAL(5,2) NOT NULL DEFAULT '19.99',
  `rating` ENUM('G','PG','PG-13','R','NC-17') NULL DEFAULT 'G',
  `special_features` SET('Trailers','Commentaries','Deleted Scenes','Behind the Scenes') NULL DEFAULT NULL,
  `last_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`film_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1001
DEFAULT CHARACTER SET = utf8;

CREATE INDEX `idx_title` ON `sakila`.`film` (`title` ASC);


-- -----------------------------------------------------
-- Table `sakila`.`film_actor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sakila`.`film_actor` (
  `actor_id` SMALLINT(5) UNSIGNED NOT NULL,
  `film_id` SMALLINT(5) UNSIGNED NOT NULL,
  `last_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`actor_id`, `film_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `sakila`.`film_category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sakila`.`film_category` (
  `film_id` SMALLINT(5) UNSIGNED NOT NULL,
  `category_id` TINYINT(3) UNSIGNED NOT NULL,
  `last_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`film_id`, `category_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `sakila`.`film_text`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sakila`.`film_text` (
  `film_id` SMALLINT(6) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`film_id`))
ENGINE = MyISAM
DEFAULT CHARACTER SET = utf8;

CREATE FULLTEXT INDEX `idx_title_description` ON `sakila`.`film_text` (`title` ASC, `description` ASC);


-- -----------------------------------------------------
-- Table `sakila`.`inventory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sakila`.`inventory` (
  `inventory_id` MEDIUMINT(8) UNSIGNED NOT NULL AUTO_INCREMENT,
  `film_id` SMALLINT(5) UNSIGNED NOT NULL,
  `store_id` TINYINT(3) UNSIGNED NOT NULL,
  `last_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`inventory_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 4582
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `sakila`.`package`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sakila`.`package` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NULL DEFAULT NULL,
  `description` TEXT NOT NULL,
  `price` DECIMAL(7,2) NOT NULL,
  `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `sakila`.`parent`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sakila`.`parent` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `phone` VARCHAR(10) NULL DEFAULT NULL,
  `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 48
DEFAULT CHARACTER SET = utf8;

CREATE UNIQUE INDEX `email_UNIQUE` ON `sakila`.`parent` (`email` ASC);


-- -----------------------------------------------------
-- Table `sakila`.`rental`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sakila`.`rental` (
  `rental_id` INT(11) NOT NULL AUTO_INCREMENT,
  `rental_date` DATETIME NOT NULL,
  `inventory_id` MEDIUMINT(8) UNSIGNED NOT NULL,
  `customer_id` SMALLINT(5) UNSIGNED NOT NULL,
  `return_date` DATETIME NULL DEFAULT NULL,
  `staff_id` TINYINT(3) UNSIGNED NOT NULL,
  `last_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`rental_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 16050
DEFAULT CHARACTER SET = utf8;

CREATE UNIQUE INDEX `rental_date` ON `sakila`.`rental` (`rental_date` ASC, `inventory_id` ASC, `customer_id` ASC);


-- -----------------------------------------------------
-- Table `sakila`.`payment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sakila`.`payment` (
  `payment_id` SMALLINT(5) UNSIGNED NOT NULL AUTO_INCREMENT,
  `customer_id` SMALLINT(5) UNSIGNED NOT NULL,
  `staff_id` TINYINT(3) UNSIGNED NOT NULL,
  `rental_id` INT(11) NULL DEFAULT NULL,
  `amount` DECIMAL(5,2) NOT NULL,
  `payment_date` DATETIME NOT NULL,
  `last_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`payment_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 16050
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `sakila`.`player`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sakila`.`player` (
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `parent_id` INT(11) NOT NULL,
  `position` VARCHAR(45) NOT NULL,
  `team` VARCHAR(45) NULL DEFAULT NULL,
  `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`first_name`, `last_name`, `parent_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `sakila`.`sessions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sakila`.`sessions` (
  `session_id` VARCHAR(255) CHARACTER SET 'utf8' COLLATE 'utf8_bin' NOT NULL,
  `expires` INT(11) UNSIGNED NOT NULL,
  `data` TEXT CHARACTER SET 'utf8' COLLATE 'utf8_bin' NULL DEFAULT NULL,
  PRIMARY KEY (`session_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;


-- -----------------------------------------------------
-- Table `sakila`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sakila`.`user` (
  `email` VARCHAR(255) NOT NULL,
  `password` CHAR(60) NOT NULL,
  `create_time` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`email`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

USE `sakila` ;

-- -----------------------------------------------------
-- Placeholder table for view `sakila`.`actor_info`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sakila`.`actor_info` (`actor_id` INT, `first_name` INT, `last_name` INT, `film_info` INT);

-- -----------------------------------------------------
-- Placeholder table for view `sakila`.`customer_list`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sakila`.`customer_list` (`ID` INT, `name` INT, `address` INT, `zip code` INT, `phone` INT, `city` INT, `country` INT, `notes` INT, `SID` INT);

-- -----------------------------------------------------
-- Placeholder table for view `sakila`.`film_list`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sakila`.`film_list` (`FID` INT, `title` INT, `description` INT, `category` INT, `price` INT, `length` INT, `rating` INT, `actors` INT);

-- -----------------------------------------------------
-- Placeholder table for view `sakila`.`nicer_but_slower_film_list`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sakila`.`nicer_but_slower_film_list` (`FID` INT, `title` INT, `description` INT, `category` INT, `price` INT, `length` INT, `rating` INT, `actors` INT);

-- -----------------------------------------------------
-- Placeholder table for view `sakila`.`sales_by_film_category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sakila`.`sales_by_film_category` (`category` INT, `total_sales` INT);

-- -----------------------------------------------------
-- Placeholder table for view `sakila`.`sales_by_store`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sakila`.`sales_by_store` (`store` INT, `manager` INT, `total_sales` INT);

-- -----------------------------------------------------
-- Placeholder table for view `sakila`.`staff_list`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sakila`.`staff_list` (`ID` INT, `name` INT, `address` INT, `zip code` INT, `phone` INT, `city` INT, `country` INT, `SID` INT);

-- -----------------------------------------------------
-- procedure film_in_stock
-- -----------------------------------------------------

DELIMITER $$
USE `sakila`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `film_in_stock`(IN p_film_id INT, IN p_store_id INT, OUT p_film_count INT)
    READS SQL DATA
BEGIN
     SELECT inventory_id
     FROM inventory
     WHERE film_id = p_film_id
     AND store_id = p_store_id
     AND inventory_in_stock(inventory_id);

     SELECT FOUND_ROWS() INTO p_film_count;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure film_not_in_stock
-- -----------------------------------------------------

DELIMITER $$
USE `sakila`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `film_not_in_stock`(IN p_film_id INT, IN p_store_id INT, OUT p_film_count INT)
    READS SQL DATA
BEGIN
     SELECT inventory_id
     FROM inventory
     WHERE film_id = p_film_id
     AND store_id = p_store_id
     AND NOT inventory_in_stock(inventory_id);

     SELECT FOUND_ROWS() INTO p_film_count;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- function get_customer_balance
-- -----------------------------------------------------

DELIMITER $$
USE `sakila`$$
CREATE DEFINER=`root`@`localhost` FUNCTION `get_customer_balance`(p_customer_id INT, p_effective_date DATETIME) RETURNS decimal(5,2)
    READS SQL DATA
    DETERMINISTIC
BEGIN

       #OK, WE NEED TO CALCULATE THE CURRENT BALANCE GIVEN A CUSTOMER_ID AND A DATE
       #THAT WE WANT THE BALANCE TO BE EFFECTIVE FOR. THE BALANCE IS:
       #   1) RENTAL FEES FOR ALL PREVIOUS RENTALS
       #   2) ONE DOLLAR FOR EVERY DAY THE PREVIOUS RENTALS ARE OVERDUE
       #   3) IF A FILM IS MORE THAN RENTAL_DURATION * 2 OVERDUE, CHARGE THE REPLACEMENT_COST
       #   4) SUBTRACT ALL PAYMENTS MADE BEFORE THE DATE SPECIFIED

  DECLARE v_rentfees DECIMAL(5,2); #FEES PAID TO RENT THE VIDEOS INITIALLY
  DECLARE v_overfees INTEGER;      #LATE FEES FOR PRIOR RENTALS
  DECLARE v_payments DECIMAL(5,2); #SUM OF PAYMENTS MADE PREVIOUSLY

  SELECT IFNULL(SUM(film.rental_rate),0) INTO v_rentfees
    FROM film, inventory, rental
    WHERE film.film_id = inventory.film_id
      AND inventory.inventory_id = rental.inventory_id
      AND rental.rental_date <= p_effective_date
      AND rental.customer_id = p_customer_id;

  SELECT IFNULL(SUM(IF((TO_DAYS(rental.return_date) - TO_DAYS(rental.rental_date)) > film.rental_duration,
        ((TO_DAYS(rental.return_date) - TO_DAYS(rental.rental_date)) - film.rental_duration),0)),0) INTO v_overfees
    FROM rental, inventory, film
    WHERE film.film_id = inventory.film_id
      AND inventory.inventory_id = rental.inventory_id
      AND rental.rental_date <= p_effective_date
      AND rental.customer_id = p_customer_id;


  SELECT IFNULL(SUM(payment.amount),0) INTO v_payments
    FROM payment

    WHERE payment.payment_date <= p_effective_date
    AND payment.customer_id = p_customer_id;

  RETURN v_rentfees + v_overfees - v_payments;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- function inventory_held_by_customer
-- -----------------------------------------------------

DELIMITER $$
USE `sakila`$$
CREATE DEFINER=`root`@`localhost` FUNCTION `inventory_held_by_customer`(p_inventory_id INT) RETURNS int(11)
    READS SQL DATA
BEGIN
  DECLARE v_customer_id INT;
  DECLARE EXIT HANDLER FOR NOT FOUND RETURN NULL;

  SELECT customer_id INTO v_customer_id
  FROM rental
  WHERE return_date IS NULL
  AND inventory_id = p_inventory_id;

  RETURN v_customer_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- function inventory_in_stock
-- -----------------------------------------------------

DELIMITER $$
USE `sakila`$$
CREATE DEFINER=`root`@`localhost` FUNCTION `inventory_in_stock`(p_inventory_id INT) RETURNS tinyint(1)
    READS SQL DATA
BEGIN
    DECLARE v_rentals INT;
    DECLARE v_out     INT;

    #AN ITEM IS IN-STOCK IF THERE ARE EITHER NO ROWS IN THE rental TABLE
    #FOR THE ITEM OR ALL ROWS HAVE return_date POPULATED

    SELECT COUNT(*) INTO v_rentals
    FROM rental
    WHERE inventory_id = p_inventory_id;

    IF v_rentals = 0 THEN
      RETURN TRUE;
    END IF;

    SELECT COUNT(rental_id) INTO v_out
    FROM inventory LEFT JOIN rental USING(inventory_id)
    WHERE inventory.inventory_id = p_inventory_id
    AND rental.return_date IS NULL;

    IF v_out > 0 THEN
      RETURN FALSE;
    ELSE
      RETURN TRUE;
    END IF;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure rewards_report
-- -----------------------------------------------------

DELIMITER $$
USE `sakila`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `rewards_report`(
    IN min_monthly_purchases TINYINT UNSIGNED
    , IN min_dollar_amount_purchased DECIMAL(10,2) UNSIGNED
    , OUT count_rewardees INT
)
    READS SQL DATA
    COMMENT 'Provides a customizable report on best customers'
proc: BEGIN

    DECLARE last_month_start DATE;
    DECLARE last_month_end DATE;

    /* Some sanity checks... */
    IF min_monthly_purchases = 0 THEN
        SELECT 'Minimum monthly purchases parameter must be > 0';
        LEAVE proc;
    END IF;
    IF min_dollar_amount_purchased = 0.00 THEN
        SELECT 'Minimum monthly dollar amount purchased parameter must be > $0.00';
        LEAVE proc;
    END IF;

    /* Determine start and end time periods */
    SET last_month_start = DATE_SUB(CURRENT_DATE(), INTERVAL 1 MONTH);
    SET last_month_start = STR_TO_DATE(CONCAT(YEAR(last_month_start),'-',MONTH(last_month_start),'-01'),'%Y-%m-%d');
    SET last_month_end = LAST_DAY(last_month_start);

    /*
        Create a temporary storage area for
        Customer IDs.
    */
    CREATE TEMPORARY TABLE tmpCustomer (customer_id SMALLINT UNSIGNED NOT NULL PRIMARY KEY);

    /*
        Find all customers meeting the
        monthly purchase requirements
    */
    INSERT INTO tmpCustomer (customer_id)
    SELECT p.customer_id
    FROM payment AS p
    WHERE DATE(p.payment_date) BETWEEN last_month_start AND last_month_end
    GROUP BY customer_id
    HAVING SUM(p.amount) > min_dollar_amount_purchased
    AND COUNT(customer_id) > min_monthly_purchases;

    /* Populate OUT parameter with count of found customers */
    SELECT COUNT(*) FROM tmpCustomer INTO count_rewardees;

    /*
        Output ALL customer information of matching rewardees.
        Customize output as needed.
    */
    SELECT c.*
    FROM tmpCustomer AS t
    INNER JOIN customer AS c ON t.customer_id = c.customer_id;

    /* Clean up */
    DROP TABLE tmpCustomer;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- View `sakila`.`actor_info`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sakila`.`actor_info`;
USE `sakila`;
CREATE  OR REPLACE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY INVOKER VIEW `sakila`.`actor_info` AS select `a`.`actor_id` AS `actor_id`,`a`.`first_name` AS `first_name`,`a`.`last_name` AS `last_name`,group_concat(distinct concat(`c`.`name`,': ',(select group_concat(`f`.`title` order by `f`.`title` ASC separator ', ') from ((`sakila`.`film` `f` join `sakila`.`film_category` `fc` on((`f`.`film_id` = `fc`.`film_id`))) join `sakila`.`film_actor` `fa` on((`f`.`film_id` = `fa`.`film_id`))) where ((`fc`.`category_id` = `c`.`category_id`) and (`fa`.`actor_id` = `a`.`actor_id`)))) order by `c`.`name` ASC separator '; ') AS `film_info` from (((`sakila`.`actor` `a` left join `sakila`.`film_actor` `fa` on((`a`.`actor_id` = `fa`.`actor_id`))) left join `sakila`.`film_category` `fc` on((`fa`.`film_id` = `fc`.`film_id`))) left join `sakila`.`category` `c` on((`fc`.`category_id` = `c`.`category_id`))) group by `a`.`actor_id`,`a`.`first_name`,`a`.`last_name`;

-- -----------------------------------------------------
-- View `sakila`.`customer_list`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sakila`.`customer_list`;
USE `sakila`;
CREATE  OR REPLACE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `sakila`.`customer_list` AS select `cu`.`customer_id` AS `ID`,concat(`cu`.`first_name`,_utf8' ',`cu`.`last_name`) AS `name`,`a`.`address` AS `address`,`a`.`postal_code` AS `zip code`,`a`.`phone` AS `phone`,`sakila`.`city`.`city` AS `city`,`sakila`.`country`.`country` AS `country`,if(`cu`.`active`,_utf8'active',_utf8'') AS `notes`,`cu`.`store_id` AS `SID` from (((`sakila`.`customer` `cu` join `sakila`.`address` `a` on((`cu`.`address_id` = `a`.`address_id`))) join `sakila`.`city` on((`a`.`city_id` = `sakila`.`city`.`city_id`))) join `sakila`.`country` on((`sakila`.`city`.`country_id` = `sakila`.`country`.`country_id`)));

-- -----------------------------------------------------
-- View `sakila`.`film_list`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sakila`.`film_list`;
USE `sakila`;
CREATE  OR REPLACE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `sakila`.`film_list` AS select `sakila`.`film`.`film_id` AS `FID`,`sakila`.`film`.`title` AS `title`,`sakila`.`film`.`description` AS `description`,`sakila`.`category`.`name` AS `category`,`sakila`.`film`.`rental_rate` AS `price`,`sakila`.`film`.`length` AS `length`,`sakila`.`film`.`rating` AS `rating`,group_concat(concat(`sakila`.`actor`.`first_name`,_utf8' ',`sakila`.`actor`.`last_name`) separator ', ') AS `actors` from ((((`sakila`.`category` left join `sakila`.`film_category` on((`sakila`.`category`.`category_id` = `sakila`.`film_category`.`category_id`))) left join `sakila`.`film` on((`sakila`.`film_category`.`film_id` = `sakila`.`film`.`film_id`))) join `sakila`.`film_actor` on((`sakila`.`film`.`film_id` = `sakila`.`film_actor`.`film_id`))) join `sakila`.`actor` on((`sakila`.`film_actor`.`actor_id` = `sakila`.`actor`.`actor_id`))) group by `sakila`.`film`.`film_id`;

-- -----------------------------------------------------
-- View `sakila`.`nicer_but_slower_film_list`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sakila`.`nicer_but_slower_film_list`;
USE `sakila`;
CREATE  OR REPLACE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `sakila`.`nicer_but_slower_film_list` AS select `sakila`.`film`.`film_id` AS `FID`,`sakila`.`film`.`title` AS `title`,`sakila`.`film`.`description` AS `description`,`sakila`.`category`.`name` AS `category`,`sakila`.`film`.`rental_rate` AS `price`,`sakila`.`film`.`length` AS `length`,`sakila`.`film`.`rating` AS `rating`,group_concat(concat(concat(ucase(substr(`sakila`.`actor`.`first_name`,1,1)),lcase(substr(`sakila`.`actor`.`first_name`,2,length(`sakila`.`actor`.`first_name`))),_utf8' ',concat(ucase(substr(`sakila`.`actor`.`last_name`,1,1)),lcase(substr(`sakila`.`actor`.`last_name`,2,length(`sakila`.`actor`.`last_name`)))))) separator ', ') AS `actors` from ((((`sakila`.`category` left join `sakila`.`film_category` on((`sakila`.`category`.`category_id` = `sakila`.`film_category`.`category_id`))) left join `sakila`.`film` on((`sakila`.`film_category`.`film_id` = `sakila`.`film`.`film_id`))) join `sakila`.`film_actor` on((`sakila`.`film`.`film_id` = `sakila`.`film_actor`.`film_id`))) join `sakila`.`actor` on((`sakila`.`film_actor`.`actor_id` = `sakila`.`actor`.`actor_id`))) group by `sakila`.`film`.`film_id`;

-- -----------------------------------------------------
-- View `sakila`.`sales_by_film_category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sakila`.`sales_by_film_category`;
USE `sakila`;
CREATE  OR REPLACE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `sakila`.`sales_by_film_category` AS select `c`.`name` AS `category`,sum(`p`.`amount`) AS `total_sales` from (((((`sakila`.`payment` `p` join `sakila`.`rental` `r` on((`p`.`rental_id` = `r`.`rental_id`))) join `sakila`.`inventory` `i` on((`r`.`inventory_id` = `i`.`inventory_id`))) join `sakila`.`film` `f` on((`i`.`film_id` = `f`.`film_id`))) join `sakila`.`film_category` `fc` on((`f`.`film_id` = `fc`.`film_id`))) join `sakila`.`category` `c` on((`fc`.`category_id` = `c`.`category_id`))) group by `c`.`name` order by `total_sales` desc;

-- -----------------------------------------------------
-- View `sakila`.`sales_by_store`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sakila`.`sales_by_store`;
USE `sakila`;
CREATE  OR REPLACE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `sakila`.`sales_by_store` AS select concat(`c`.`city`,_utf8',',`cy`.`country`) AS `store`,concat(`m`.`first_name`,_utf8' ',`m`.`last_name`) AS `manager`,sum(`p`.`amount`) AS `total_sales` from (((((((`sakila`.`payment` `p` join `sakila`.`rental` `r` on((`p`.`rental_id` = `r`.`rental_id`))) join `sakila`.`inventory` `i` on((`r`.`inventory_id` = `i`.`inventory_id`))) join `sakila`.`store` `s` on((`i`.`store_id` = `s`.`store_id`))) join `sakila`.`address` `a` on((`s`.`address_id` = `a`.`address_id`))) join `sakila`.`city` `c` on((`a`.`city_id` = `c`.`city_id`))) join `sakila`.`country` `cy` on((`c`.`country_id` = `cy`.`country_id`))) join `sakila`.`staff` `m` on((`s`.`manager_staff_id` = `m`.`staff_id`))) group by `s`.`store_id` order by `cy`.`country`,`c`.`city`;

-- -----------------------------------------------------
-- View `sakila`.`staff_list`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sakila`.`staff_list`;
USE `sakila`;
CREATE  OR REPLACE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `sakila`.`staff_list` AS select `s`.`staff_id` AS `ID`,concat(`s`.`first_name`,_utf8' ',`s`.`last_name`) AS `name`,`a`.`address` AS `address`,`a`.`postal_code` AS `zip code`,`a`.`phone` AS `phone`,`sakila`.`city`.`city` AS `city`,`sakila`.`country`.`country` AS `country`,`s`.`store_id` AS `SID` from (((`sakila`.`staff` `s` join `sakila`.`address` `a` on((`s`.`address_id` = `a`.`address_id`))) join `sakila`.`city` on((`a`.`city_id` = `sakila`.`city`.`city_id`))) join `sakila`.`country` on((`sakila`.`city`.`country_id` = `sakila`.`country`.`country_id`)));
USE `sakila`;

DELIMITER $$
USE `sakila`$$
CREATE
DEFINER=`root`@`localhost`
TRIGGER `sakila`.`customer_create_date`
BEFORE INSERT ON `sakila`.`customer`
FOR EACH ROW
SET NEW.create_date = NOW()$$

USE `sakila`$$
CREATE
DEFINER=`root`@`localhost`
TRIGGER `sakila`.`del_film`
AFTER DELETE ON `sakila`.`film`
FOR EACH ROW
BEGIN
    DELETE FROM film_text WHERE film_id = old.film_id;
  END$$

USE `sakila`$$
CREATE
DEFINER=`root`@`localhost`
TRIGGER `sakila`.`ins_film`
AFTER INSERT ON `sakila`.`film`
FOR EACH ROW
BEGIN
    INSERT INTO film_text (film_id, title, description)
        VALUES (new.film_id, new.title, new.description);
  END$$

USE `sakila`$$
CREATE
DEFINER=`root`@`localhost`
TRIGGER `sakila`.`upd_film`
AFTER UPDATE ON `sakila`.`film`
FOR EACH ROW
BEGIN
    IF (old.title != new.title) or (old.description != new.description)
    THEN
        UPDATE film_text
            SET title=new.title,
                description=new.description,
                film_id=new.film_id
        WHERE film_id=old.film_id;
    END IF;
  END$$

USE `sakila`$$
CREATE
DEFINER=`root`@`localhost`
TRIGGER `sakila`.`rental_date`
BEFORE INSERT ON `sakila`.`rental`
FOR EACH ROW
SET NEW.rental_date = NOW()$$

USE `sakila`$$
CREATE
DEFINER=`root`@`localhost`
TRIGGER `sakila`.`payment_date`
BEFORE INSERT ON `sakila`.`payment`
FOR EACH ROW
SET NEW.payment_date = NOW()$$


DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
