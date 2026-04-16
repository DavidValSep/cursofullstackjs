async function cargarUsuario(id) {
  try {
    const r = await fetch("https://jsonplaceholder.typicode.com/users/" + id);
    if (!r.ok) throw new Error("HTTP " + r.status);
    const data = await r.json();
    return data;
  } catch (err) {
    console.error("falló:", err.message);
    throw err;
  } finally {
    console.log("hecho");
  }
}

// Llamada
cargarUsuario(5).then((user) => console.log(user));
