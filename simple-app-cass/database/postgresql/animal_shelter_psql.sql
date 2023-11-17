CREATE TABLE animals (
  id bigserial PRIMARY KEY,
  birthdate timestamp(6) DEFAULT NULL,
  description varchar(255) DEFAULT NULL,
  name varchar(255) DEFAULT NULL,
  type varchar(255) DEFAULT NULL
);

INSERT INTO animals (id, birthdate, description, name, type) VALUES
(13, '2020-12-27 00:06:00.000000', 'Pit Bull Terrier - Brown/Chocolate with Tan', 'Strawberry Shortcake', 'DOG'),
(14, '2021-12-26 00:12:00.000000', 'Cattle Dog - Black and White', 'Duke', 'DOG'),
(15, '2017-12-31 00:06:00.000000', 'Domestic Shorthair', 'Seraphina', 'CAT'),
(16, '2023-01-01 00:01:00.000000', 'Hound', 'Kelli', 'DOG'),
(17, '2009-12-27 00:01:00.000000', 'Domestic Shorthair', 'Mambo', 'CAT'),
(18, '2017-12-31 00:06:00.000000', 'Just a Rabbit', 'Jessie', 'RABBIT'),
(19, '2008-12-28 00:10:00.000000', 'Parrot', 'Amee', 'BIRD');
