class Productos {
    constructor(nombre, marca, espacio, ram, precio, oferta){
    this.nombre = nombre;
    this.marca = marca;
    this.espacio = espacio;
    this.ram = ram;
    this.precio = parseFloat(precio);
    this.oferta = oferta;
    }

    sumarIva(){
        return this.precio * 1.21;
    }

    descuento(){
        let descuento = this.precio * 0.20;
        let resultado = this.precio - descuento;
        return resultado;
    }
}

//Declaramos un array de productos para almacenar objetos.

const carrito = [];
carrito.push(new Productos("PC1", "AMD Ryzen 5 5600G", "1TB", "32GB", "30000", "TRUE"));
carrito.push(new Productos("PC2", "Intel Core i3-10100F", "500GB", "8GB", "10000", "FALSE"));
carrito.push(new Productos("PC3", "AMD Ryzen 7 5700G", "2TB", "16GB", "12000", "FALSE"));
carrito.push(new Productos("PC4", "Intel Core i5-10400", "250GB", "8GB", "14500", "TRUE"));
carrito.push(new Productos("PC5", "AMD Athlon 3000G", "1TB", "16GB", "12300", "FALSE"));

// Recorremos el Array carrito que contiene objetos.

  for (const carritos of carrito){
      document.write("Nombre: " + carritos.nombre + "<br>");
      document.write("Modelo: " + carritos.marca + "<br>");
      document.write("Espacio: " + carritos.espacio + "<br>");
      document.write("Ram: " + carritos.ram + "<br>");
      document.write("Precio: $" + carritos.precio + "<br>");
      document.write("<br>");
  }
 
// Le solicitamos al usuario que ingrese el nombre del producto que desea comprar y lo almacenamos en la variable comprar.

  let comprar = prompt("Ingresar nombre del producto que desea comprar");
  let carro = carrito.filter(producto => producto.nombre.includes(comprar));

  for (var producto of carro){
    document.write("<h1>Gracias por su compra!</h1>");
    document.write("Usted compro el producto: " + producto.nombre + "<br>");
    document.write("El costo del producto es: $" + producto.precio + "<br>");
    document.write("El costo del producto con Iva es: $" + producto.sumarIva());
    document.write("<br>");
}

// Filtramos los productos que tengan aplicado el cupon de Oferta y los guardamos en la variable "oferta"
let oferta = carrito.filter(producto => producto.oferta.includes("TRUE"));

document.write("<h1>Productos con 20% de descuento!</h1>");
for (var producto of oferta){
  document.write("Nombre: " + producto.nombre + "<br>");
  document.write("Precio anterior: $" + producto.precio + "<br>");
  document.write("Precio con 20% de descuento: $" + producto.descuento() + "<br>");
  document.write("<br>");
}


