USE swole;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
	user_id INT NOT NULL auto_increment,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    PRIMARY KEY (user_id)
);

INSERT INTO users (first_name, last_name)
VALUES
	("Seth", "Whitaker"),
    ("Timmy", "Turner"),
    ("Kendrick", "Lamar");
