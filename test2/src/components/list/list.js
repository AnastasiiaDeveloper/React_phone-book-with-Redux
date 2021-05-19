import React, { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeContact } from "./../../redux/actions";
import "./list.css";

const List = () => {

const dispatch = useDispatch();

const removeItem = (id) => {
    dispatch(removeContact(id));
  };
  
  const deleteItemFromList = (id) => {
    removeItem(id);
  };
 

  return (
<Button
    className="remove-btn"
    variant="danger"
    size="sm"
    onClick={() => deleteItemFromList(id)}>
  </Button>
  );
};
export default List;
