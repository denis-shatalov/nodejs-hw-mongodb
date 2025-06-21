import createHttpError from 'http-errors';
import * as fs from 'node:fs/promises';
import path from 'node:path';
import { getEnvVar } from '../utils/getEnvVar.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { uploadToCloudinary } from '../utils/uploadToCloudinary.js';
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
  
export const createContactController = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ status: 401, message: 'Unauthorized: user not found' });
    }

    let photoUrl = null;
    if (req.file && req.file.path) {
      const uploadResult = await uploadToCloudinary(req.file.path);
      photoUrl = uploadResult.secure_url;
    }

    const contact = await createContact({
      ...req.body,
      userId,
      photo: photoUrl,
    });

    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Something went wrong',
      data: error.message,
    });
  }
};



export async function updateContactController(req, res) {
  const { contactId } = req.params;
  const userId = req.user.id;

  let photo = null;

  if (req.file) {
    if (getEnvVar('UPLOAD_TO_CLOUDINARY') === 'true') {
      const result = await uploadToCloudinary(req.file.path);
      await fs.unlink(req.file.path);
      photo = result.secure_url;
    } else {
      const newPath = path.resolve('src', 'uploads', 'photo', req.file.filename);
      await fs.rename(req.file.path, newPath);
      photo = `http://localhost:3000/photo/${req.file.filename}`;
    }

    req.body.photo = photo; 
  }

  const result = await updateContact(contactId, userId, req.body);

  if (result === null) {
    throw new createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: "Successfully patched a contact!",
    data: result
  });
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