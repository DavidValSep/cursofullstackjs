const fs = require("fs/promises");
const path = require("path");
const rootDir = require("../utils/path");

const mascotasPath = path.join(rootDir, "data", "mascotas.json");

function getFilePath(type) {
  return type === "mascotas" ? mascotasPath : null;
}

// lee los datos del modelo correspondiente (películas o series)
async function readItems(type) {
  const data = await fs.readFile(getFilePath(type), "utf-8");
  return JSON.parse(data);
}

// escribe los datos actualizados en el modelo correspondiente (películas o series)
async function writeItems(type, items) {
  await fs.writeFile(getFilePath(type), JSON.stringify(items, null, 2));
}

// GET /
// GET /?type=movies o /?type=series
const getMascotas = async (req, res) => {
  const { type, sort } = req.query;
  if (!type) return res.render("index", {});

  try {
    let items = await readItems(type);
    if (sort) {
      items.sort((a, b) => (a[sort] > b[sort] ? 1 : -1));
    }
    res.render("index", { type, sort, items, isMovies: type === "movies" });
  } catch (err) {
    res.status(500).render("index", { error: "Error al leer el archivo" });
  }
};

// GET /agregar-peliculas
// GET /agregar-series
const getAgregar = (req, res) => {
  res.render("agregar");
};

// POST /agregar-peliculas
// POST /agregar-series
const postAgregar = async (req, res) => {
  const { type, name, director, year, seasons } = req.body;

  try {
    const items = await readItems(type);
    const newItem =
      type === "movies"
        ? { name, director, year }
        : { name, year, seasons };
    items.push(newItem);
    await writeItems(type, items);
    res.redirect(`/?type=${type}`);
  } catch (err) {
    res.status(500).render("agregar", { error: "Error al guardar" });
  }
};

// POST /eliminar/:type/:id
const deleteItem = async (req, res) => {
  const { type, id } = req.params;

  try {
    const items = await readItems(type);
    const filtered = items.filter((item) => item.id !== parseInt(id, 10));
    await writeItems(type, filtered);
    res.redirect(`/?type=${type}`);
  } catch (err) {
    res.status(500).redirect(`/?type=${type}`);
  }
};

const getDetail = async (req, res) => {
  const { type, id } = req.params;
  const index = parseInt(id, 10);

  if (isNaN(index) || index < 0) {
    return res.status(400).render("no-encontrado");
  }

  try {
    const items = await readItems(type);
    const item = items[index];

    if (!item) {
      return res.status(404).render("no-encontrado");
    }

    res.render("detail", { type, id: index, item, isMovies: type === "movies" });
  } catch (err) {
    res.status(500).render("no-encontrado");
  }
};

module.exports = { getMascotas };
