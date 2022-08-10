class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    };

    getFullName() {
        return `${this.nombre} ${this.apellido}`;
    };

    addMascota(mascota) {
        this.mascotas.push(mascota);
    };

    countMascotas() {
        return this.mascotas.length;
    };

    addBook(nombre, autor) {
        this.libros.push({
            nombre,
            autor
        });
    };

    getBookNames() {
        return this.libros.map(libro => libro.nombre);
    };
};

const usuario1 = new Usuario('Juan', 'Perez', [{nombre: "El Resplandor", autor: "Stephen King"}], ['perro', 'gato', 'canario']);

console.log(usuario1.getFullName()); // Juan Perez
usuario1.addMascota('pez');
console.log(usuario1.countMascotas()); // 4
usuario1.addBook('Juego de Tronos', 'George R.R. Martin');
console.log(usuario1.getBookNames()); // ["El Resplandor", "Juego de Tronos"]


