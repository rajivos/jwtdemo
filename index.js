import { verify } from "crypto";
import express from "express";
import jwt from "jsonwebtoken";

const users = [
  { id: "2342342", name: "John" },
  { id: "2134243", name: "Jane" },
];

const app = express();

app.get("/", (req, res) => {
  res.send(users);
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;

  const user = users.find((user) => user.id === id);

  res.send(user);
});

app.post("/api/posts", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: "Post created...",
        authData,
      });
    }
  });
});

app.post("/api/login", (req, res) => {
  const user = { id: "2342342", name: "Jack", email: "SpecialEmail@gmail.com" };

  jwt.sign({ user }, "secretkey", (err, token) => {
    res.json({
      token,
    });
  });
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];

    req.token = bearerToken;

    next();
  } else {
    res.sendStatus(403);
  }
}

app.listen(8080, () => {
  console.log("Server is running on port 3000");
});
