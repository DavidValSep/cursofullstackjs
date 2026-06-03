//delay con setTimeout
const delay = (ms) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(`Pasaron ${ms} ms`), ms);
  });

delay(1000).then((msg) => console.log(msg));


//all
const p1 = delay(500).then(() => "Primera");
const p2 = delay(1000).then(() => "Segunda");

Promise.all([p1, p2]).then(valores => {
  console.log("All:", valores);
});

//race
const r1 = delay(800).then(() => "Lenta");
const r2 = delay(300).then(() => "Rápida");

Promise.race([r1, r2]).then((valor) => {
  console.log("Race:", valor);
});

//any
const a1 = delay(400).then(() => "Ok 1");
const a2 = Promise.reject("Falló");
const a3 = delay(200).then(() => "Ok 2");

Promise.any([a1, a2, a3]).then(valor => {
  console.log("Any:", valor);
});



