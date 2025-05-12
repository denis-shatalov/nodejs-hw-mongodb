import { Contact } from "../models/contacts.js";

export async function getAllContacts() {
    try {
        const contacts = await Contact.find();
        const res = {
            status: 200,
            message: "Successfully found contacts!",
            data: contacts
        };
          
        return res;
    } catch (error) {
        console.log(error);
    }
}

export async function getContactById(contactId) {
    try {
        const contactById = await Contact.findById(contactId);
        if (!contactById) {
            return {
              status: 404,
              message: "Contact not found",
              data: null,
            };
          }
        return {
            status: 200,
            message: "Successfully found contact with id {contactId}!",
            data: {
                contactById
              }
        }
        ;
    } catch (error) {
        console.log(error);
    }
}