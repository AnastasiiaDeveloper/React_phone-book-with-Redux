import { ADD_CONTACT, REMOVE_CONTACT, FILTER } from "./../actions/actionType";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  contacts: {
    items: JSON.parse(localStorage.getItem("list")) || [],
    filter: "",
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_CONTACT:
      const newContactsObject = {
        id: uuidv4(),
        contactName: action.name,
        telephoneNumber: action.number,
      };
      const newItem = [newContactsObject, ...state.contacts.items];
      localStorage.setItem("list", JSON.stringify(newItem));
      return {
        contacts: {
          ...state.contacts,
          items: JSON.parse(localStorage.getItem("list")),
        },
      };

    case REMOVE_CONTACT:
      let filteredArray = state.contacts.items.filter(({ id }) => id !== action.id);
      localStorage.setItem("list", JSON.stringify(filteredArray));
      return {
        contacts: {
          ...state.contacts,
          items: filteredArray,
        },
      };

    case FILTER:
      return {
        contacts: {
          ...state.contacts,
          filter: action.find,
        },
      };

    default:
      return state;
  }
}
