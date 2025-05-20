import { Contact } from "../models/contacts.js";


export function getAllContacts() {
    return Contact.find();
};

export function getContactById(contactId) {
    return Contact.findById(contactId);
};

export function createContact(payload) {
    return Contact.create(payload);
};

export function updateContact(contactId, payload) {
    return Contact.findByIdAndUpdate(contactId, payload, { new: true });
}

export function replaceContact(contactId, contact) {
    const result =  Contact.findByIdAndUpdate(contactId, contact, {
        new: true,
        upsert: true,
        includeResultMetadata: true,
    });
    
    return  {
        value: result.value,
        updatedExisting: result.lastErrorObject.updatedExisting,
      };
}

export function deleteContact(contactId) {
    return Contact.findByIdAndDelete(contactId);
}