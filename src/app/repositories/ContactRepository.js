const { v4 } = require('uuid');

const db = require('../../database');

let contacts = [
  {
    id: v4(),
    name: 'Andre Luiz',
    email: 'andre@mail.com',
    phone: '2312983128',
    category_id: v4(),
  },
  {
    id: v4(),
    name: 'Juca Bala',
    email: 'juca@mail.com',
    phone: '129321939',
    category_id: v4(),
  },
];

class ContactController {
  // we try to keed a standard for naming the methods of a repository, but this doesn't exclude
  // the possibility to have some methods with custom names
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`SELECT * FROM contacts ORDER BY name ${direction}`);

    return rows;
  }

  async findById(id) {
    const [row] = await db.query(
      `
      SELECT * FROM contacts
      WHERE id = $1`,
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

  update(id, {
    name, email, phone, category_id,
  }) {
    return new Promise((resolve) => {
      const updatedContact = {
        id,
        name,
        email,
        phone,
        category_id,
      };

      contacts = contacts.map((contact) => (
        contact.id === id ? updatedContact : contact
      ));
      resolve(updatedContact);
    });
  }

  delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id);
      resolve();
    });
  }
}

module.exports = new ContactController();
