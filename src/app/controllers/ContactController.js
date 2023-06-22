const ContactRepository = require('../repositories/ContactRepository');

class ContactController {
  // we use this to show all the records
  async index(request, response) {
    const { orderBy } = request.query;

    const contacts = await ContactRepository.findAll(orderBy);

    return response.json(contacts);
  }

  // we use this when we want to get one record, by ID for example
  async show(request, response) {
    const { id } = request.params;

    const contact = await ContactRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'User not found!' });
    }

    response.json(contact);
  }

  // create a new record
  async store(request, response) {
    const {
      name, email, phone, category_id,
    } = request.body;

    // we're going to make a validation to require the name
    if (!name) {
      return response.status(400).json({ error: 'Name is required!' });
    }

    const contactExists = await ContactRepository.findByEmail(email);

    if (contactExists) {
      return response.status(400).json({ error: 'This e-mail is already in use!' });
    }

    const contact = await ContactRepository.create({
      name, email, phone, category_id,
    });

    response.json(contact);
  }

  // edit a record
  async update(request, response) {
    const { id } = request.params;
    const {
      name, email, phone, category_id,
    } = request.body;

    const contactExists = await ContactRepository.findById(id);
    if (!contactExists) {
      return response.status(404).json({ error: 'User not found!' });
    }

    // we're going to make a validation to require the name
    if (!name) {
      return response.status(400).json({ error: 'Name is required!' });
    }

    const contactByEmail = await ContactRepository.findByEmail(email);

    // here we will check if we already have a user with the email provided
    // AND the ID is different from the one passed as parameter
    if (contactByEmail && contactByEmail.id !== id) {
      return response.status(400).json({ error: 'This e-mail is already in use!' });
    }

    const contact = await ContactRepository.update(id, {
      name, email, phone, category_id,
    });

    response.json(contact);
  }

  // remove a record
  async delete(request, response) {
    const { id } = request.params;

    const contact = await ContactRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'User not found!' });
    }

    await ContactRepository.delete(id);

    // 204 - No Content (same as 200 for OK, but with no body)
    response.sendStatus(204);
  }
}

// Export using the Singleton pattern. In this way we will have only one instance created
// for the controller and everyone will use the same instance always
module.exports = new ContactController();
