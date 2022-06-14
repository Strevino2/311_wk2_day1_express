const express = require("express");
const app = express();
const port = process.env.PORT || 4000;

const { users } = require("./state");
app.use(express.json());

/* BEGIN - create routes here */

// Get all PEOPLE
app.get("/users", (req, res) => {
  // ...perform some logic in here like getting the user data from the database...
  // console.log(res.json(users))
  return res.json(users);
  // then send back to the client a message saying 'success'
});

// Get one PERSON
app.get("/users/:userId", (req, res) => {
  // ...perform some logic in here like getting the user data from the database...
  // console.log(res.json(users))
  const foundId = users.find((item, index, arr) => item._id === +req.params.userId);
  // then send back to the client a message saying 'success'
  res.json(foundId);
});

app.post("/users", (req, res) => {
  const length = users.length;
  console.log(req.body);
  const newPerson = {
    id: length + 1,
    ...req.body,
  };
  console.log(newPerson);
  users.push(newPerson);
  res.json(users);
});

app.put("/users/:userId", (req, res) => {
  const id = req.params.userId;
  const person = users.find((person) => person._id === +id);
  const foundIndex = users.findIndex((person) => person._id === +id);

  const newPerson = {
    ...person,
    ...req.body,
  };

  users.splice(foundIndex, 1, newPerson);

  res.json(newPerson);
});

app.delete("/users/:userId", (req, res) => {
  const id = req.params.userId;
  const foundIndex = users.findIndex((person) => person._id === +id);

  users.splice(foundIndex, 1);

  res.json({ message: `Deleted user id: ${id}` });
});

/* END - create routes here */

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
