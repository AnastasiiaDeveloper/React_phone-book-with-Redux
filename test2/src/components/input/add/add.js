import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "./../../../redux/actions/actions";

const AddContact= () => {
  const [contactName, setContactName] = useState("");
  const [telephoneNumber, setTelephoneNumber] = useState("");
  const contacts = useSelector((state) => state.contacts.items);
  const dispatch = useDispatch();

  const handler = useCallback((p1, p2, p3Arr) => {
    if (p1.trim() === "" || p2.trim() === "") {
      setErrP(true);
      setTimeout(() => {
        setErrP(false);
      }, 3000);
    } else {
      // проверка
      const filterSearch = (arrayTodo) => {
        return arrayTodo.filter((item) => {
          return item.name === p1;
        });
      };
      console.log(p3Arr);
      if (filterSearch(p3Arr).length > 0) {
        setErr(true);
        setTimeout(() => {
          setErr(false);
        }, 3000);
      } else {
        dispatch(addContact(p1, p2));
      }
    }
  }, []);

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
