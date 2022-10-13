CREATE TABLE guns(
    gun_id SERIAL PRIMARY KEY,
    gun varchar(50) NOT NULL,
    date_added date DEFAULT Now() 

);

CREATE TABLE bullets(
    bullet_id SERIAL PRIMARY KEY,
    gun_id integer REFERENCES guns(gun_id) ON DELETE CASCADE,
    bullet varchar(50) NOT NULL,
    powder varchar(50),
    primer varchar(50),
    date_added date DEFAULT Now() 
);

CREATE TABLE testResult(
    test_id SERIAL PRIMARY KEY,
    bullet_id integer REFERENCES bullets(bullet_id) ON DELETE CASCADE,
    charge real,
    moa real,
    date_added date DEFAULT Now() 
);

CREATE TABLE velocity(
    velocity_id SERIAL PRIMARY KEY,
    test_id integer REFERENCES testResult(test_id) ON DELETE CASCADE,
    velocity int,
    date_added date DEFAULT Now() 
);

INSERT INTO guns (gun) VALUES ('test gun2');

INSERT INTO bullets (bullet, gun_id, powder, primer) VALUES ('test bullet3', 1, 'test powder','test primer');

INSERT INTO testResult (bullet_id,charge,moa) VALUES (1, 30, 1.1);
INSERT INTO testResult (bullet_id,charge,moa) VALUES (1, 30.5, 1.85);
INSERT INTO testResult (bullet_id,charge,moa) VALUES (1, 40, 0.5);

INSERT INTO velocity (test_id,velocity) VALUES (1, 3000);
INSERT INTO velocity (test_id,velocity) VALUES (1, 2900);
INSERT INTO velocity (test_id,velocity) VALUES (1, 2980);
