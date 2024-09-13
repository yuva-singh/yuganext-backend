const asyncHandler = require("express-async-handler");
const Contact = require("../../models/Admin/contactModel");

const createContact = asyncHandler(async (req, res) => {
  const { name, email, description } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Email is required!");
  }

  const contactEntry = await Contact.create({
    name,
    email,
    description,
  });

  if (!contactEntry) {
    res.status(500);
    throw new Error("Server error!");
  }

  res.status(201).json({
    message: "Contact created successfully!",
    contactEntry,
  });
});

const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();

  if (!contacts || contacts.length === 0) {
    res.status(404);
    throw new Error("No contacts found!");
  }

  res.status(200).json(contacts);
});

const deleteContact = asyncHandler(async (req, res) => {
  const contactId = req.params.id;

  const contact = await Contact.findById(contactId);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found!");
  }

  await contact.deleteOne();

  res.status(200).json({
    message: "Contact deleted successfully!",
  });
});

module.exports = {
  createContact,
  getAllContacts,
  deleteContact,
};
