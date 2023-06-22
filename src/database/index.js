const { Client } = require('pg');

// to connect to our database in our container we specify the congiguration for the connection
const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'root',
  password: 'root',
  database: 'mycontacts',
});

// and run the connect
client.connect();

// exports directly the query method that will execute the queries in the database
exports.query = async (query, values /* values are the values that we pass in the bindings with queries */) => {
  const { rows } = await client.query(query, values);
  return rows;
};
