import { Router } from 'express';
import express from 'express';
import { upload } from "../middlewares/upload.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { isValidID } from '../middlewares/isValidId.js';
import { validateBody } from "../middlewares/validateBody.js"; 
import { contactsSchema, updateContactSchema } from '../validation/contacts.js';
import { authenticate } from "../middlewares/authenticate.js";
import { getContactsController, getContactByIdController, createContactController, updateContactController, replaceContactController, deleteContactController } from '../controllers/contacts.js';

const router = Router();
const jsonParser = express.json();

router.get(`/`, authenticate, ctrlWrapper(getContactsController));
router.get(`/:contactId`,isValidID , authenticate, ctrlWrapper(getContactByIdController));
router.post(`/`, upload.single("photo"), jsonParser, validateBody(contactsSchema),authenticate, ctrlWrapper(createContactController));
router.patch(`/:contactId`,upload.single("photo"), isValidID, jsonParser,validateBody(updateContactSchema),authenticate, ctrlWrapper(updateContactController));
router.put(`/:contactId`,isValidID,  jsonParser,validateBody(contactsSchema),authenticate, ctrlWrapper(replaceContactController));
router.delete(`/:contactId`, isValidID, authenticate,  ctrlWrapper(deleteContactController));


export default router;