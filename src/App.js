import { Button, Form, Container, Table } from "react-bootstrap";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [cards, setCards] = useState([]);
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [limit, setLimit] = useState('');

  useEffect(() => {
    axios("http://localhost:3000/v1/cards")
      .then(({ data }) => setCards(data.result));
  }, []);

  const clearForm = () => {
    setName("");
    setCardNumber('');
    setLimit('');
  }

  const addCard = () => {
    const data = {
      name,
      cardNumber,
      limit,
    }
    axios({
      method: 'POST',
      url: 'http://localhost:3000/v1/cards',
      data
    }).then((res) => {
      toast.success(res.data.message);
      setCards([
        ...cards,
        data,
      ]);
      clearForm();
    }).catch((err) => {
      toast.error(err.response.data.message);
    });
  };

  return (
    <div className="App">
      <Container className="py-5">
        <h2 className="Title MB20">Credit Card System</h2>
        <Form>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCardNumber">
            <Form.Label>Card Number</Form.Label>
            <Form.Control
              type="number"
              placeholder="Card Number"
              value={cardNumber}
              onChange={e => setCardNumber(Number(e.target.value))}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formLimit">
            <Form.Label>Limit</Form.Label>
            <Form.Control
              type="number"
              placeholder="Limit"
              value={limit}
              onChange={e => setLimit(Number(e.target.value))}
            />
          </Form.Group>

          <Button variant="primary" type="button" onClick={addCard}>
            Add
          </Button>
        </Form>

        <h3 className="Title">Existing Cards</h3>
        <div className="Table_Container">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th scope="col">SNo</th>
                <th scope="col">Name</th>
                <th scope="col">Card Number</th>
                <th scope="col">Balance</th>
                <th scope="col">Limit</th>
              </tr>
            </thead>
            <tbody id="output">
              {cards.map((card, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{card.name}</td>
                  <td>${card.balance}</td>
                  <td>{card.cardNumber}</td>
                  <td>{card.limit}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
      <ToastContainer />
    </div>
  );
}

export default App;
