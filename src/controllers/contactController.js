import { getAllContacts, getContactById } from "../services/getContacts.js";

export async function getContacts(req, res) {
  try {
    const result = await getAllContacts();
    res.status(result.status).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getContact(req, res) {
  const { contactId } = req.params;
  try {
    const result = await getContactById(contactId);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
