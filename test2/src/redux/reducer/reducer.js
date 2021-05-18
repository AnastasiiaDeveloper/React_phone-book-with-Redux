import { ADD_CONTACT, REMOVE_CONTACT, FILTER } from "./../actions/actionType";
import nextId from "react-id-generator";

const initialState = {
  contacts: {
    items: JSON.parse(localStorage.getItem("list")) || [],
    filter: "",
  },
};
export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_CONTACT:
      const idGen = nextId();
      const newObjItem = {
        id: idGen + new Date().getMilliseconds(),
        name: action.text,
        num: action.num,
      };
      const newItem = [newObjItem, ...state.contacts.items];
      localStorage.setItem("list", JSON.stringify(newItem));
      return {
        contacts: {
          ...state.contacts,
          items: JSON.parse(localStorage.getItem("list")),
        },
      };

    case REMOVE_CONTACT:
      console.log(action);
      let remArr = state.contacts.items.filter(({ id }) => id !== action.id);
      console.log(remArr);
      localStorage.setItem("list", JSON.stringify(remArr));
      return {
        contacts: {
          ...state.contacts,
          items: remArr,
        },
      };
    case FILTER:
      console.log(action);

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
