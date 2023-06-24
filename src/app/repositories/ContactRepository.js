const db = require('../../database');

class ContactRepository {
  // we try to keed a standard for naming the methods of a repository, but this doesn't exclude
  // the possibility to have some methods with custom names
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`
      SELECT contacts.*, categories.name AS category_name
      FROM contacts
      LEFT JOIN categories on categories.id = contacts.category_id
      ORDER BY contacts.name ${direction}`);

    return rows;
  }

  async findById(id) {
    const [row] = await db.query(
      `
      SELECT contacts.*, categories.name AS category_name
      FROM contacts
      LEFT JOIN categories on categories.id = contacts.category_id
      WHERE contacts.id = $1`,
      [id],
    );

    return row;
  }

  async findByEmail(email) {
    const [row] = await db.query(
      `
      SELECT * FROM contacts
      WHERE email = $1`,
      [email],
    );

    return row;
  }

  async create({
    name, email, phone, category_id,
  }) {
    // as the db.query(..) returns an array of `rows` we will destruct the array (using the variable 'row' inside the brackets [row])
    // to get the first position of the array and set him to the `row` variable
    const [row] = await db.query(
      `
     INSERT INTO contacts (name, email, phone, category_id)
     VALUES($1, $2, $3, $4)
     RETURNING *`, // we use the RETURNING * keyword to return all the fields from the table, we could choose only the ones that we want too
      [name, email, phone, category_id], // to protect our query from SQL Injection, we use the
      // bindings to pass the values from the variables to the query
    );

    return row;
  }

  async update(id, {
    name, email, phone, category_id,
  }) {
    const [row] = await db.query(
      `
      UPDATE contacts
      SET name = $1, email = $2, phone = $3, category_id = $4
      WHERE id = $5
      RETURNING *`,
      [name, email, phone, category_id, id],
    );

    return row;
  }

  async delete(id) {
    const deleteOp = await db.query(
      `
      DELETE FROM contacts
      WHERE id = $1`,
      [id],
    );

    return deleteOp;
  }
}

module.exports = new ContactRepository();
