const express = require("express");
const app = express();
const User = require("./user_schema");
const {
  commonLogger,
  withIdMiddleware,
  withoutIdMiddleware,
} = require("./middleware");
require("dotenv").config();

const PORT = process.env.DEV_PORT;
const USERS_PATH = "/api/users";
const USERS_PATH_WITH_ID = USERS_PATH + "/:id";

const users = [];

app.use(express.json());
app.use(commonLogger);

app.get("/api/hello", (req, res) => {
  res.send("Привет, Redev!");
});

app.post("/api/echo", (req, res) => {
  const { message } = req.body;
  res.send(JSON.stringify(message));
});

app
  .route(USERS_PATH)
  .all(withoutIdMiddleware)
  .get((req, res) => {
    res.send(JSON.stringify(users));
  })
  .post((req, res) => {
    const newUser = new User(req.body);
    users.push(newUser);
    res.send(JSON.stringify(newUser));
  });

app
  .route(USERS_PATH_WITH_ID)
  .all(withIdMiddleware)
  .get((req, res) => {
    const { id } = req.params;
    const user = users.find((user) => user.id === id);
    if (!user) {
      return res.send(JSON.stringify("User not found."));
    }
    res.send(JSON.stringify(user));
  })
  .put((req, res) => {
    const data = req.body;
    const { id } = req.params;
    const targetUserIndex = users.findIndex((user) => user.id === id);
    if (targetUserIndex === -1) {
      return res.send(JSON.stringify("User not found."));
    }
    const updatedUser = new User({ id, ...data });
    users[targetUserIndex] = updatedUser;
    res.send(JSON.stringify(updatedUser));
  })
  .patch((req, res) => {
    const { id } = req.params;
    const { password } = req.body;
    const targetUserIndex = users.findIndex((user) => user.id === id);
    if (targetUserIndex === -1) {
      return res.send(JSON.stringify("User not found."));
    }
    if (!password) {
      return res.send(JSON.stringify("Password is required."));
    }
    users[targetUserIndex].password = password;
    res.send(JSON.stringify(id));
  })
  .delete((req, res) => {
    const { id } = req.params;
    const targetUserIndex = users.findIndex((user) => user.id === id);
    if (targetUserIndex === -1) {
      return res.send(JSON.stringify("User not found."));
    }
    users.splice(targetUserIndex, 1);
    res.send(JSON.stringify(id));
  });

app.listen(PORT, () => {
  console.log(`Started on http://localhost:${PORT}`);
});
