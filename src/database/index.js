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

exports.query = async (query) => {
  const { rows } = await client.query(query);
  return rows;
};
