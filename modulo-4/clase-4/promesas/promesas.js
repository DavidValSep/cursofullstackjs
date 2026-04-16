const p = new Promise((resolve, reject) => {
  setTimeout(() => resolve("OK"), 500);
});

p.then((value) => console.log(value))
  .catch((err) => console.error(err))
  .finally(() => console.log("listo"));



// const tarea = new Promise((resolve) => {
//   setTimeout(() => resolve("OK"), 300);
// });


// tarea.then((valor) => {
//   console.log(valor);
// });