import {
    ADD_CONTACT, 
    REMOVE_CONTACT, 
    FILTER,
   
  } from "./actionType.js";


export function addContact(text, num) {
    return {
      type: ADD_CONTACT,
      text,
      num,
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