import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "./../../../redux/actions/actions";
import "./add.css"

const AddContact= () => {
  const [contactName, setContactName] = useState("");
  const [telephoneNumber, setTelephoneNumber] = useState("");
  const [errorDoubleContact, setErrorDoubleContact] = useState(false);
  const [errorEmptyField, setErrorEmptyField] = useState(false);
  const [errorStyles] = useState({
    ifNo: {
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
    ifYes: {
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
      <p style={errorDoubleContact ? errorStyles.ifYes : errorStyles.ifNo}>
          {" "}
          {contactName}  пользователь уже добавлен
        </p>
        
      <p style={errorEmptyField ? errorStyles.ifYes : errorStyles.ifNo}> Заполните пожалуйста все поля</p>
      
        <label className="name">Contact name</label>
        <input
          type="text"
          className="form-control"
          onChange={actionForContactName}
          value={contactName}
          aria-describedby="emailHelp"
        />
      </div>
      <div className="form-group">
        <label className="number">Telephone number</label>
        <input
          type="number"
          className="form-control"
          onChange={actionForTelephoneNumber}
          value={telephoneNumber}
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
