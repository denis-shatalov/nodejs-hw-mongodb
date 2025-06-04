import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { getAllContacts, getContactById, createContact, updateContact, deleteContact, replaceContact } from "../services/getContacts.js";

export async function getContactsController(req, res) {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
    const result = await getAllContacts({page, perPage, sortBy,sortOrder,userId: req.user.id,});
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: result,
    });
  }


export async function getContactByIdController(req, res) {
  const { contactId } = req.params;
  const userId = req.user.id;
  const result = await getContactById(contactId, userId);
  
  if (result === null) {
    throw new createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contacts by ID ${contactId}!`,
    data: result,
  });
}
  
export async function createContactController(req, res) {
  const userId = req.user.id;
  const contact = await createContact({ ...req.body, userId});

  res.status(201).json({
		status: 201,
		message: "Successfully created a contact!",
		data: contact
}
);
}

export async function updateContactController(req, res) {
  const { contactId } = req.params;
  const userId = req.user.id;

  const result = await updateContact(contactId, userId, req.body);

  if (result === null) {
    throw new createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: "Successfully patched a contact!",
    data: result
  }
  );
}

export async function replaceContactController(req, res) {
  const { contactId } = req.params;
  const userId = req.user.id;
  const { value, updatedExisting } = await replaceContact(contactId, userId, req.body);

  if (updatedExisting === true) {
    return res.json({
      status: 200,
      message: 'Contact updated successfully',
      data: value,
    });
  }

  res.status(201).json({
    status: 201,
    message: 'Contact created successfully',
    data: value,
  });
}

export async function deleteContactController(req, res) {
  const { contactId } = req.params;
  const userId = req.user.id;
  const result = await deleteContact(contactId, userId);

  if (result === null) {
    throw new createHttpError(404, 'Contact not found');
  }

  res.status(204).end();
}

