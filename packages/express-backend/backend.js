import express from "express";
import cors from "cors";
import userServices from "./user-services.js";

const app = express();
const port = 8000;

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
  
app.get("/users", async (req, res) => {
  const { name, job } = req.query;
  const users = await userServices.getUsers(name, job);
  res.send({ users_list: users });
});

app.get("/users/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const user = await userServices.findUserById(id);

    if (!user) {
      res.status(404).send("Resource not found.");
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(500).send({ message: 'Error finding user', error: error });
  }
});

/**
 * @deletes the user with the given id
 */
app.delete("/users/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const deletedUser = await userServices.deleteUser(id);

    if (!deletedUser) {
      res.status(404).send("Resource not found.");
    } else {
      res.send(deletedUser);
    }
  } catch (error) {
    res.status(500).send({ message: 'Error deleting user', error: error });
  }
});

/**
 * @brief Add a user to the list of users
 * send status 201 if successful
 */
app.post("/users", async (req, res) => {
  const userToAdd = {
    name: req.body.name,
    job: req.body.job
  };

  try {
    const addedUser = await userServices.addUser(userToAdd);
    res.status(201).send(addedUser);
  } catch (error) {
    res.status(500).send({ message: 'Error adding user', error: error });
  }
});

app.listen(port, () => {
  console.log(
    `app listening at http://localhost:${port}`
  );
});