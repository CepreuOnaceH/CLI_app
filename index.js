const { Command } = require("commander");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("./contacts");

const program = new Command();

program
  .option("-a, --action <type>", "Choose action")
  .option("-i, --id <type>", "User id")
  .option("-n, --name <type>", "User name")
  .option("-e, --email <type>", "User email")
  .option("-p, --phone <type>", "User phone")
  .parse(process.argv);

program.parse(process.argv);
const { action, id, name, email, phone } = program.opts();

async function invokeAction() {
  try {
    switch (action) {
      case "list":
        const allContacts = await listContacts();
        console.table(allContacts);
        break;
      case "get":
        const contactById = await getContactById(id);
        console.log(`Contact with ID ${id}:`, contactById);
        break;
      case "add":
        const newContact = await addContact(name, email, phone);
        console.log("Added new contact:", newContact);
        break;
      case "remove":
        const removedContact = await removeContact(id);
        console.log(`Deleted contact with ID ${id}:`, removedContact);
        break;
      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (error) {
    console.error(error.message);
  }
}

invokeAction();
