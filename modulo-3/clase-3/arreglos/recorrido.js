const numerosForEach = [1, 2, 3, 4, 5];

numerosForEach.forEach((numero, indice) => {
  const resultado = numero;
  console.log(`El numero en el indice ${indice} es ${resultado}`);
});

const numerosMap = [1, 2, 3, 4, 5];
numerosMap.map((numero) => {
  const resultado = numero;
  console.log(`El numero es ${resultado}`);
});

const numerosForEach2 = [1, 2, 3, 4, 5];
const resultadosForEach2 = numerosForEach2.forEach((numero) => numero);

console.log(resultadosForEach2); // undefined

const numerosMap2 = [1, 2, 3, 4, 5];
const resultadosMap2 = numerosMap2.map((numero) => numero);

console.log(resultadosMap2); // [1, 2, 3, 4, 5]