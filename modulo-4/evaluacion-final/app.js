const API_URL = "https://jsonplaceholder.typicode.com/users";
const output = document.getElementById("output");
let users = [];

fetch(API_URL)
	.then((response) => response.json())
	.then((data) => {
		users = data;
		console.log(users.map((user) => user.name).sort());
	})
	.catch((error) => {
		console.error("Error fetching data:", error);
	});

// --- Funciones ---

const listAllUserNames = () => {
	//usar map para obtener los nombres de los usuarios
	//usar innerHTML

	const userNames = users.map((user) => `<li>${user.name}</li>`).join("");
	output.innerHTML = `<ol>${userNames}</ol>`;
};

const showBasicInfoByPrompt = () => {
	const userName = prompt("Ingrese el nombre del usuario:");
	const user = users.find((user) => user.name === userName);
	if (user) {
		output.innerHTML = `
		<p>Nombre: ${user.name}</p>
		<p>Email: ${user.email}</p>
		<p>Username: ${user.username}</p>
		`;
	} else {
		output.innerHTML = "Usuario no encontrado";
	}
//usar prompt para pedir el nombre del usuario
//usar find para buscar el usuario por nombre
//mostrar la informacion basica del usuario (nombre, email, username) usando innerHTML
};

const showAddressByPrompt = () => {
	//usar prompt para pedir el nombre del usuario
	//usar find para buscar el usuario por nombre
	//mostrar la direccion del usuario (calle, suite, ciudad, zipcode) usando innerHTML
	const userName = prompt("Ingrese el nombre del usuario:");
	const user = users.find((user) => user.name === userName);
	if (user) {
		const address = user.address;
		output.innerHTML = `
		<p>Calle: ${address.street}</p>
		<p>Suite: ${address.suite}</p>
		<p>Ciudad: ${address.city}</p>
		<p>Zipcode: ${address.zipcode}</p>
	
		`;
	} else {
		output.innerHTML = "Usuario no encontrado";
	}
};

const showAdvancedInfoByPrompt = () => {
	//usar prompt para pedir el nombre del usuario
	//usar find para buscar el usuario por nombre
	//mostrar la informacion avanzada del usuario (nombre, email, username, direccion completa, telefono, website) usando innerHTML
const userName = prompt("Ingrese el nombre del usuario:");
const user = users.find((user) => user.name === userName);
if (user) {
	const company = user.company;
	output.innerHTML = `
	<p>Nombre: ${user.name}</p>
	<p>Email: ${user.email}</p>
	<p>Username: ${user.username}</p>
	<p>Direccion: ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}</p>
	<p>Telefono: ${user.phone}</p>
	<p>Website: ${user.website}</p>
	<p>Compania: ${company.name}</p>
	<p>Catchphrase: ${company.catchPhrase}</p>
	<p>BS: ${company.bs}</p>
	`;
} else {
	output.innerHTML = "Usuario no encontrado";
}
};

const listCompaniesWithCatchphrase = () => {
	//usar map para obtener las empresas y sus slogans
	//usar innerHTML para mostrar la lista de empresas con sus slogans
	const companiesWithCatchphrase = users.map((user) => {
		return `Company: ${user.company.name}, Catchphrase: ${user.company.catchPhrase}`;
	});
	output.innerHTML = companiesWithCatchphrase.join("<br>");
};

const listUserNamesAlphabetically = () => {
	//usar map para obtener los nombres de los usuarios
	//usar sort para ordenar los nombres alfabeticamente
	//usar join para convertir el array de nombres en una cadena de texto separada por comas
	//usar innerHTML para mostrar la lista de nombres ordenados
	const userNames = users.map((user) => user.name).sort().map((name) => `<li>${name}</li>`).join("");
	output.innerHTML = `<ol>${userNames}</ol>`;
};
