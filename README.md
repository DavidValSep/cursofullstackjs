# Comandos Básicos de Git

| Comando       |           Definición breve         | Ejemplo de uso |
|---------------|------------------------------------|----------------|
| git --version | Muestra la versión de GIT instalada| git --version  |
| git init      | Inicializa un repositorio nuevo    | git init       |
| git add       | Agrega todos los archivos creados o| git add .      |
|               | cambiados                          |                |
| git commit    | Guarda los cambios con un mensaje  | git commit -m "featrure:Primer-Commit" |
| git status    | Muestra qué archivos cambiaron     | git status     |





# Muestra de uso real

zintronz@Incognito:/media/zintronz/DVS4TB/ZintronZ/Escritorio/Curso JS/FullStack$ git --version
git version 2.43.0
zintronz@Incognito:/media/zintronz/DVS4TB/ZintronZ/Escritorio/Curso JS/FullStack$ git init
Reinicializado el repositorio Git existente en /media/zintronz/DVS4TB/ZintronZ/Escritorio/Curso JS/FullStack/.git/
zintronz@Incognito:/media/zintronz/DVS4TB/ZintronZ/Escritorio/Curso JS/FullStack$ git status
En la rama main
Archivos sin seguimiento:
  (usa "git add <archivo>..." para incluirlo a lo que será confirmado)
        README.md

no hay nada agregado al commit pero hay archivos sin seguimiento presentes (usa "git add" para hacerles seguimiento)
zintronz@Incognito:/media/zintronz/DVS4TB/ZintronZ/Escritorio/Curso JS/FullStack$ git add .
zintronz@Incognito:/media/zintronz/DVS4TB/ZintronZ/Escritorio/Curso JS/FullStack$ git commit -m"chore:primer-ejercicio"
[main 1183ebd] chore:primer-ejercicio
 1 file changed, 10 insertions(+)
 create mode 100644 README.md
zintronz@Incognito:/media/zintronz/DVS4TB/ZintronZ/Escritorio/Curso JS/FullStack$ git status
En la rama main
nada para hacer commit, el árbol de trabajo está limpio