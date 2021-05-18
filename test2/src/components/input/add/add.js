import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "./../../../redux/actions/actions";

const AddContact= () => {
  const [contactName, setContactName] = useState("");
  const [telephoneNumber, setTelephoneNumber] = useState("");
  const [errorEmptyField, setErrorEmptyField] = useState(false);
  const contacts = useSelector((state) => state.contacts.items);
  const dispatch = useDispatch();


  
  const handler = (field1, field2) => {
    if (field1.trim() === "" || field2.trim() === "") {
      setErrorEmptyField(true);
      } else {
        dispatch(addContact(field1, field2));
      }
    }



  const actionForContactName = (event) => {
    setContactName(event.target.value);
  };
  const actionForTelephoneNumber = (event) => {
    setTelephoneNumber(event.target.value);
  };
  const sendDataToRedux = () => {
    handler(contactName, telephoneNumber, contacts);
  };
  return (
    <div>
      <div className="form-group">
        <label>Contact name</label>
        <input
          type="text"
          className="form-control"
          onChange={actionForContactName}
          value={contactName}
        />
      </div>
      <div className="form-group">
        <label>Telephone number</label>
        <input
          type="number"
          className="form-control"
          onChange={actionForTelephoneNumber}
          value={telphoneNumber}
        />
      </div>
      <button
        type="submit"
        className="btn btn-dark"
        onClick={() => sendDataToRedux()}
      >
        Add contact
      </button>
    </div>
  );
};
export default AddContact;
