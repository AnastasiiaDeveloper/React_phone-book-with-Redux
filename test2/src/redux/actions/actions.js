import {
    ADD_CONTACT, 
    REMOVE_CONTACT, 
    FILTER,
   
  } from "./actionType.js";


export function addContact(name, number) {
    return {
      type: ADD_CONTACT,
      name,
      number,
    };
  }
  export function removeContact(id) {
    return {
      type: REMOVE_CONTACT,
      id,
    };
  }
  export function findContact(find) {
    return {
      type: FILTER,
      find,
    };
  }