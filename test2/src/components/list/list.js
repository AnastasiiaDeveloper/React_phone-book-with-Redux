import React, { useState, useEffect, useCallback} from "react";
import { Container, ListGroup, Button } from "react-bootstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
import { removeContact } from "./../../redux/actions/actions";
import "./list.css";

const List = () => {
  const [contactItems, setContactItems] = useState([]);
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.items);
  const filter = useSelector((state) => state.contacts.filter);


 
  const removeItem = useCallback((id) => {
    dispatch(removeContact(id));
  }, []);

  const deleteItem = (id) => {
    removeItem(id);
  };

  useEffect(() => {
    setContactItems(contacts);
  }, [contacts]);


  const contactFilter = (contactList) => {
    if (filter === "") {
      return contactList;
    } else {
      return contactList.filter((item) => {
        return item.contactName.toLowerCase().indexOf(filter.toLowerCase()) > -1;
      });
    }
  };

  const listOfFilteredContacts = contactFilter(contactItems).map(({ id, contactName, telephoneNumber }) => {
    return (
      <CSSTransition key={id} timeout={500} classNames="item">
        <ListGroup.Item className="li">
          <p>{contactName}</p> <p> {telephoneNumber}</p>
          <Button
            className="remove-btn"
            variant="danger"
            size="sm"
            onClick={() => deleteItem(id)}
          >
            &times;
          </Button>
        </ListGroup.Item>
      </CSSTransition>
    );
  });
  
  if (contactItems.length === 0) {
    return <div style={{ marginTop: "20px" }}> Записей пока никаких нет</div>;
  }
  return (
    <Container style={{ marginTop: "2rem" }}>
      <ListGroup style={{ marginBottom: "1rem" }}>
        <TransitionGroup className="todo-list">{listOfFilteredContacts}</TransitionGroup>
      </ListGroup>
    </Container>
  );
};
export default List;
