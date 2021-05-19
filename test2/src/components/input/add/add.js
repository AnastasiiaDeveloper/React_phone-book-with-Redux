import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "./../../../redux/actions/actions";

const AddContact= () => {
  const [contactName, setContactName] = useState("");
  const [telephoneNumber, setTelephoneNumber] = useState("");
  const [errorDoubleContact, setErrorDoubleContact] = useState(false);
  const [errorEmptyField, setErrorEmptyField] = useState(false);
  const [errorStyles] = useState({
    turnOff: {
      opacity: 0,
      position: "absolute",
      marginTop: "-60px",
      fontSize: "1.3em",
      transition: "2s",
      marginLeft: "500px",
      background: "red",
      bordeRadius: "10px",
      color: "white",
      padding: "4px",
    },
    turnOn: {
      opacity: 1,
      position: "absolute",
      marginTop: "-60px",
      marginLeft: "0px",
      fontSize: "1.3em",
      transition: "2s",
      background: "red",
      bordeRadius: "10px",
      color: "white",
      padding: "4px",
    },
  });
  const contacts = useSelector((state) => state.contacts.items);
  const dispatch = useDispatch();
  
  const handler = (fieldForName, fieldForNumber, arrayOfContacts) => {
    if (fieldForName.trim() === "" || fieldForNumber.trim() === "") {
      setErrorEmptyField(true);
      setTimeout(() => {
        setErrorEmptyField(false);
      }, 3000);
    } else {
      // проверка на добавление существующего контакта
      const doubleContactSearch = (arrayTodo) => {
        return arrayTodo.filter((item) => {
          return item.contactName === fieldForName;
        });
      };
      if (doubleContactSearch(arrayOfContacts).length > 0) {
        setErrorDoubleContact(true);
        setTimeout(() => {
          setErrorDoubleContact(false);
        }, 3000);
      } else {
        dispatch(addContact(fieldForName, fieldForNumber));
      }
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
      <p style={errorDoubleContact ? errorStyles.turnOn : errorStyles.turnOff}>
          {" "}
          {contactName} Такой пользователь уже зарегестрирован
        </p>
      <p style={errorEmptyField ? errorStyles.turnOn : errorStyles.turnOff}> Заполните пожалуйста все поля</p>
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
        style={{ width: "100%" }}
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
