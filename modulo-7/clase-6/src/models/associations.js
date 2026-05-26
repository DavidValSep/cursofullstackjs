import Pelicula from "./Pelicula.js";
import Actor from "./Actor.js";
import PeliculasActores from "./PeliculasActores.js";

Pelicula.belongsToMany(Actor, { through: PeliculasActores, as: "actores" });
Actor.belongsToMany(Pelicula, { through: PeliculasActores, as: "peliculas" });

export { Pelicula, Actor, PeliculasActores };
