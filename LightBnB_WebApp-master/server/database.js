const { Pool } = require('pg');
const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

const properties = require('./json/properties.json');
const users = require('./json/users.json');

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return pool A query made to the user table
 */
const getUserWithEmail = function(email) {
  const queryString = `
  SELECT *
  FROM users 
  WHERE email = $1;
  `;
  return pool
  .query(queryString,
    [email])
  .then((result) => {
    return result.rows[0]
  })
  .catch((err) => {
    console.log(err.message);
  });
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return pool A query made to the user table.
 */
const getUserWithId = function(id) {
  const queryString = `
  SELECT *
  FROM users 
  WHERE id = $1;
  `;
  return pool
  .query(queryString,
    [id])
  .then((result) => {
    return result.rows[0]
  })
  .catch((err) => {
    console.log(err.message);
  });
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return pool A new entry made to the users table.
 */
const addUser =  function(user) {

  const queryString = `
  INSERT INTO users 
  (name, email, password) 
  VALUES ($1,$2,$3) RETURNING id;
  `;
  return pool
  .query(queryString,
    [user.name,user.email,user.password])
  .then((result) => {
    return result.rows[0]
  })
  .catch((err) => {
    console.log(err.message);
  });
  
}
exports.addUser = addUser;

/// Reservations


/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return pool A query made to the properties related tables.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM reservations
  JOIN properties ON reservations.property_id = properties.id
  JOIN property_reviews ON properties.id = property_reviews.property_id
  WHERE reservations.guest_id = $1
  GROUP BY properties.id, reservations.id
  ORDER BY reservations.start_date
  LIMIT $2;`;
  return pool
  .query(queryString,
    [guest_id,limit])
  .then((result) => {
    return result.rows
  })
  .catch((err) => {
    console.log(err.message);
  });
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return pool A query made to the properties and property_reviews tables.
 */
const getAllProperties = function(options, limit = 10) {
  
   const queryParams = [];
  
   let queryString = `
   SELECT properties.*, avg(property_reviews.rating) as average_rating
   FROM properties
   JOIN property_reviews ON properties.id = property_id
   `;
 
   const whereOrAnd =(queryParams)=>{
      if(queryParams.length === 0)return 'WHERE'
      else return 'AND'
   }
   if (options.city) {
    const condition = whereOrAnd(queryParams);
     queryParams.push(`%${options.city}%`);
     queryString += `${condition} city LIKE $${queryParams.length} `;
   }
   if (options.owner_id) {
    const condition = whereOrAnd(queryParams);
    queryParams.push(parseInt(options.owner_id));
    queryString += `${condition} owner_id = $${queryParams.length} `;
  }
   
   if (options.minimum_price_per_night) {
    const condition = whereOrAnd(queryParams);
    queryParams.push(options.minimum_price_per_night*100);
    queryString += `${condition} cost_per_night >= $${queryParams.length} `;
  }
  if (options.maximum_price_per_night) {
    const condition = whereOrAnd(queryParams);
    queryParams.push(options.maximum_price_per_night*100);
    queryString += `${condition} cost_per_night <= $${queryParams.length} `;
  }
   queryString += `
   GROUP BY properties.id`;
   if (options.minimum_rating) {
    queryParams.push(options.minimum_rating);
    queryString += ` HAVING avg(property_reviews.rating) > $${queryParams.length} `;
  }
   queryParams.push(limit);
   queryString += `
   ORDER BY cost_per_night
   LIMIT $${queryParams.length};
   `;
  
   
   console.log(queryString, queryParams);
 
   return pool.query(queryString, queryParams).then((res) => res.rows)
  .catch((err) => {
    console.log(err.message);
  });
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return pool A new entry made to the properties table.
 */
const addProperty = function(property) {
  
  const queryString = `
    INSERT INTO properties (
     title, description, owner_id, cover_photo_url, thumbnail_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, active, province, city, country, street, post_code) 
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)RETURNING id;`;
    const queryParams = [property.title, property.description, property.owner_id, property.cover_photo_url, property.thumbnail_photo_url, property.cost_per_night, property.parking_spaces, property.number_of_bathrooms, property.number_of_bedrooms, true, property.province, property.city, property.country, property.street, property.post_code];    
  return pool
  .query(queryString,
    queryParams)
  .then((result) => {
    return result.rows
  })
  .catch((err) => {
    console.log(err.message);
  });
}
exports.addProperty = addProperty;
