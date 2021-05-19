import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { findContact } from "./../../../redux/actions/actions";

const Filter = () => {
  const [filterName, setFilterName] = useState("");
  const dispatch = useDispatch();

  const connectingReducerFilterFunction = (fieldForName) => {
    dispatch(findContact(fieldForName));
  }

  const actionForFilterField = (event) => {
    setFilterName(event.target.value);
  };

  useEffect(() => {
    connectingReducerFilterFunction(filterName);
  }, [filterName]);

  return (
    <div className="form-group filtDiv">
      <label>Find contacts by name</label>
      <input
        type="text"
        className="form-control"
        onChange={actionForFilterField}
        value={filterName}
        aria-describedby="emailHelp"
      />
    </div>
  );
};
export default Filter;
