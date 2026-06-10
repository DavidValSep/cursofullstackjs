import express from "express";
import { UserRepository } from "../user-db.js";
import jwt from "jsonwebtoken";

import cookieParser from "cookie-parser";
import { SECRET_JWT_KEY } from "../config.js";

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.json());
app.use(cookieParser());

// Middleware para verificar el token JWT en cada petición
app.use((req, res, next) => {
  const token = req.cookies.access_token;
  req.session = { user: null };

  try {
    const data = jwt.verify(token, SECRET_JWT_KEY);
    req.session.user = data;
  } catch (error) {
  }
  next();
});

app.get("/", (req, res) => {
const { user } = req.session;
res.render("index", user);
  
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserRepository.login({ username, password });
    // Aquí se debería generar un token JWT con la información del usuario
    const token = jwt.sign(
      //agregamos 3 propiedades al token, el id, el username y el secret key y el tiempo de expiración
      { id: user._id, username: user.username },
      SECRET_JWT_KEY,
      { expiresIn: "1h" },
    );
    //agregamos el guardado del token en una cookie para que el cliente lo pueda enviar en las siguientes peticiones
    res.cookie("access_token", token, { httpOnly: true });
    res.send({ user, token });
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);

  try {
    const id = await UserRepository.create({ username, password });
    res.send({ id });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
app.post("/logout", (req, res) => {
  res.clearCookie("access_token");
  //redireccion al index
  res.redirect("/");
});

app.get("/protected", (req, res) => {

  const { user } = req.session;
  if (!user) return res.status(403).send({ error: "Access not authorized" });
  res.render("protected", user);
});

app.listen(PORT, () => {
  console.log(`API escuchando en http://localhost:${PORT}`);
});
