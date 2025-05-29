import { Contact } from "../models/contacts.js";


export async function getAllContacts({ page,
    perPage,
    sortBy,
    sortOrder }) {
    
    const skip = page > 0 ? (page - 1) * perPage : 0;

    const contactQuery = Contact.find();

    const [totalItems, contacts] = await Promise.all([
        Contact.countDocuments(contactQuery),
        contactQuery
        .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
          .skip(skip)
          .limit(perPage),
      ]);
    
    const totalPages = Math.ceil(totalItems / perPage);
    
    return {
        data: contacts,
        page,
        perPage,
        totalItems,
        totalPages,
        hasNextPage: totalPages > page,
        hasPreviousPage: page > 1,
      };
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