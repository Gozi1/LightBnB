SELECT city, count(reservations.*) as total_reservations
FROM reservations
JOIN properties ON property_id =properties.id 
GROUP BY city
ORDER BY total_reservations DESC;