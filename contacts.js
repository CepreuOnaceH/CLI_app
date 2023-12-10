const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve(__dirname, "db", "contacts.json");
console.log(contactsPath);

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    throw error;
  }
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === contactId) || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index !== -1) {
    const removedContact = contacts.splice(index, 1)[0];
    await writeContacts(contacts);
    return removedContact;
  } else {
    return null;
  }
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: String(Date.now()), name, email, phone };
  contacts.push(newContact);
  await writeContacts(contacts);
  return newContact;
}

async function writeContacts(contacts) {
  const data = JSON.stringify(contacts, null, 2);
  await fs.writeFile(contactsPath, data, "utf-8");
}

module.exports = { listContacts, getContactById, removeContact, addContact };
