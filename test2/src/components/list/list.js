import React, { useState, useEffect} from "react";
import { Container, ListGroup, Button } from "react-bootstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
import { removeContact } from "./../../redux/actions/actions";
import "./list.css";

const List = () => {
  const [items, setItems] = useState([]);
  const contacts = useSelector((state) => state.contacts.items);
  const filter = useSelector((state) => state.contacts.filter);

  const dispatch = useDispatch();
 

  const removeItem = (id) => {
    dispatch(removeContact(id));
  }

  const deleteItem = (id) => {
    removeItem(id);
  };

  useEffect(() => {
    setItems(contacts);
  }, [contacts]);

  const contactFilter = (arrayTodo) => {
    if (filter === "") {
      return arrayTodo;
    } else {
      return arrayTodo.filter((item) => {
        return item.name.toLowerCase().indexOf(filter.toLowerCase()) > -1;
      });
    }
  };

  const listOfContacts = contactFilter(items).map(({ id, contactName, telephoneNumber }) => {
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
  
  if (items.length === 0) {
    return <div style={{ marginTop: "20px" }}> Записей пока никаких нет</div>;
  }
  return (
    <Container style={{ marginTop: "2rem" }}>
      <ListGroup style={{ marginBottom: "1rem" }}>
        <TransitionGroup className="todo-list">{listOfContacts}</TransitionGroup>
      </ListGroup>
    </Container>
  );
};
export default List;
