class Estudiante {
    constructor(nombre,nota) {
        this.nombre = nombre;
        this.nota = nota;
    }

    mostrarInformacion () {
        console.log(`El estudiante ${this.nombre} tiene una nota ${this.nota}`);
    }
}

class Curso {
    constructor(nombre) {
        this.nombre = nombre;
        this.estudiantes = [];
    }

    agregarEstudiante(estudiante) {
        this.estudiantes.push(estudiante);
    }
    
    mostrarEstudiantes() {
        this.estudiantes.forEach((estudiante) => estudiante.mostrarInformacion());
    }
}

//Crear instancia Curso
const cursoJavaScript = new Curso("JavaScript");

//Crear instancias de estudiantes
cursoJavaScript.agregarEstudiante(new Estudiante("Juan", 85));
cursoJavaScript.agregarEstudiante(new Estudiante("María", 92));
cursoJavaScript.agregarEstudiante(new Estudiante("Pedro", 78));
cursoJavaScript.agregarEstudiante(new Estudiante("Ana", 88));
cursoJavaScript.agregarEstudiante(new Estudiante("Luis", 95));

cursoJavaScript.mostrarEstudiantes();