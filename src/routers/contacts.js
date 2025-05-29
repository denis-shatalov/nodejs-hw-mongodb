import { Router } from 'express';
import express from 'express';
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { isValidID } from '../middlewares/isValidId.js';
import { validateBody } from "../middlewares/validateBody.js"; 
import { contactsSchema, updateContactSchema } from '../validation/contacts.js';
import { getContactsController, getContactByIdController, createContactController, updateContactController, replaceContactController, deleteContactController } from '../controllers/contacts.js';

const router = Router();
const jsonParser = express.json();

router.get(`/contacts`, ctrlWrapper(getContactsController));
router.get(`/contacts/:contactId`,isValidID ,ctrlWrapper(getContactByIdController));
router.post(`/contacts`, jsonParser, validateBody(contactsSchema), ctrlWrapper(createContactController));
router.patch(`/contacts/:contactId`, isValidID, jsonParser,validateBody(updateContactSchema), ctrlWrapper(updateContactController));
router.put(`/contacts/:contactId`,isValidID,  jsonParser,validateBody(contactsSchema), ctrlWrapper(replaceContactController));
router.delete(`/contacts/:contactId`,isValidID, ctrlWrapper(deleteContactController));

export default router;