INSERT INTO users (name, email, password)
VALUES ('Samuel Sorrow', 'ssrrow@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Amy Heather', 'iamyeather@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Alex Bond', 'A007@yahoo.ca', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id,title,description, thumbnail_photo_url,cover_photo_url,cost_per_night,parking_spaces,number_of_bathrooms,number_of_bedrooms,country,street,city,province,post_code)
VALUES (1, 'Speed lamp', 'description','https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg',93061,6,4,8,'Canada','536 Namsub Highway','Sotboske','Quebec','28142'),
(1, 'Blank Corner', 'description','https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350 ', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg ',85234,6,6,7,'Canada','651 Nami Road','Bohbatev','Alberta','83680'),
(2, 'Habit mix', 'description','https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg?auto=compress&cs=tinysrgb&h=350', ' https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg ',46058,0,5,6,'Canada','1650 Hejto Center','Genwezuj','Newfoundland and Labrabor','44583');

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2018-09-11', '2018-09-26', 1, 1),
('2019-01-04', '2019-02-01', 2, 2),
('2021-10-01', '2021-10-14', 3, 3);

INSERT INTO property_reviews ( guest_id, property_id, reservation_id,rating,message)
VALUES (3, 2, 1, 3,'message'),
(2, 2, 2, 4,'message'),
(3, 1, 3, 4,'message');