USE swole;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS records;
DROP TABLE IF EXISTS meals;
DROP TABLE IF EXISTS meal_foods;
DROP TABLE IF EXISTS foods;
DROP TABLE IF EXISTS workouts;
DROP TABLE IF EXISTS workout_lifts;
DROP TABLE IF EXISTS lifts;

CREATE TABLE users (
	user_id INT NOT NULL auto_increment,
	first_name VARCHAR(255),
	last_name VARCHAR(255),
	email_address VARCHAR(240),
	password_hash VARCHAR(255),
	password_salt VARCHAR(50),
	password_hash_algorithm VARCHAR(255),
	PRIMARY KEY (user_id)
);

CREATE TABLE records (
	record_id INT NOT NULL auto_increment,
	user_id INT,
	day DATE,
	weight FLOAT,
	PRIMARY KEY (record_id)
);

CREATE TABLE meals (
	meal_id INT NOT NULL auto_increment,
	record_id INT,
	PRIMARY KEY (meal_id)
);

CREATE TABLE meal_foods (
	meal_id INT,
	food_id INT,
	servings INT
);

CREATE TABLE foods (
	food_id INT NOT NULL auto_increment,
	food_name VARCHAR(100),
	calories INT,
	carbs INT,
	fat INT,
	protein INT,
	PRIMARY KEY (food_id)
);

CREATE TABLE workouts (
	workout_id INT NOT NULL auto_increment,
	record_id INT,
	PRIMARY KEY (workout_id)
);

CREATE TABLE workout_lifts (
	workout_id INT,
	lift_id INT
);

CREATE TABLE lifts (
	lift_id INT NOT NULL auto_increment,
	user_id INT,
	lift_name VARCHAR(100),
	exercise_type VARCHAR(100),
	sets INT,
	reps INT,
	weight INT,
	units VARCHAR(3),
	comment VARCHAR(255),
	PRIMARY KEY (lift_id)
);