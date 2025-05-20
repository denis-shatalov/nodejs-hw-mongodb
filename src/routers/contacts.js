import { Router } from 'express';
import express from 'express';
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { getContactsController, getContactByIdController, createContactController, updateContactController, replaceContactController, deleteContactController } from '../controllers/contacts.js';

const router = Router();
const jsonParser = express.json();

router.get(`/contacts`, ctrlWrapper(getContactsController));
router.get(`/contacts/:contactId`, ctrlWrapper(getContactByIdController));
router.post(`/contacts`, jsonParser, ctrlWrapper(createContactController));
router.patch(`/contacts/:contactId` , jsonParser, ctrlWrapper(updateContactController));
router.put(`/contacts/:contactId`, jsonParser, ctrlWrapper(replaceContactController));
router.delete(`/contacts/:contactId`, ctrlWrapper(deleteContactController));

export default router;