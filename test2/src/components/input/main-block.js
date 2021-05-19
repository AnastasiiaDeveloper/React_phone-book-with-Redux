import React, { useState, useEffect } from "react";
import AddContact from "./add/add";
import { useSelector } from "react-redux";
import "./main-block.css";

const MainBlockInput = () => {
    const [hidePhoneSign, setHidePhoneSign] = useState({
        marginLeft: "-400px",
      });
      const [showFilterInput, setShowFilterInput] = useState(false);
      const contacts = useSelector((state) => state.contacts.items);

      useEffect(() => {
        if (contacts.length > 0) {
          setShowFilterInput(true);
        } else {
          setShowFilterInput(false);
        }
      }, [contacts]);

  
      useEffect(() => {
        if (contacts.length > 0) {
          setShowFilterInput(true);
        }
        setHidePhoneSign({ marginLeft: "0px", transition: "1s" });
      }, []);


  return (
    <div>
      <div className="phone">
      <p style={hidePhoneSign}>PhoneBook</p>
      </div>
      <div className="mainAdd">
        <AddContact />
      </div>
      {showFilterInput ? <Filter /> : null}
    </div>
  );
};
export default MainBlockInput;
