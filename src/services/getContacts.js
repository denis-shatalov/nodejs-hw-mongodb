import { Contact } from "../models/contacts.js";


export async function getAllContacts({ page,
    perPage,
    sortBy,
    sortOrder, userId }) {
    
    const skip = page > 0 ? (page - 1) * perPage : 0;

    const contactQuery = Contact.find({userId});

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


export function getContactById(contactId, userId) {
    return Contact.findOne({ _id: contactId, userId });
  }
  
  export function createContact(payload) {
    return Contact.create(payload);
  }
  
  export function updateContact(contactId, userId, payload) {
    return Contact.findOneAndUpdate({ _id: contactId, userId }, payload, { new: true });
  }
  

export function replaceContact(contactId, contact) {
    const result =  Contact.findOneAndUpdate(contactId, contact, {
        new: true,
        upsert: true,
        includeResultMetadata: true,
    });
    
    return  {
        value: result.value,
        updatedExisting: result.lastErrorObject.updatedExisting,
      };
}

export function deleteContact(contactId, userId) {
    return Contact.findOneAndDelete({ _id: contactId, userId });
}