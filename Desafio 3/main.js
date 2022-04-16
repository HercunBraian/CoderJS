const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer');
const templateCard = document.getElementById('template-card').content
const templateCarrito = document.getElementById('template-carrito').content
const templateFooter = document.getElementById('template-footer').content
const fragment = document.createDocumentFragment();
let carrito = {};

const productosAll = [
  {
    "id": 1,
    "nombre": "PC1",
    "marca": "AMD",
    "espacio": "1TB",
    "ram": "2GB",
    "precio": 100,
    "img": "https://picsum.photos/id/0/400/200"
  },
  {
    "id": 2,
    "nombre": "PC2",
    "marca": "INTEL",
    "espacio": "3TB",
    "ram": "4GB",
    "precio": 300,
    "img": "https://picsum.photos/id/20/400/200"
  },
  {
    "id": 3,
    "nombre": "PC3",
    "marca": "INTEL",
    "espacio": "3TB",
    "ram": "4GB",
    "precio": 300,
    "img": "https://picsum.photos/id/80/400/200"
  },  {
    "id": 4,
    "nombre": "PC4",
    "marca": "INTEL",
    "espacio": "3TB",
    "ram": "4GB",
    "precio": 300,
    "img": "https://picsum.photos/id/90/400/200"
  },  {
    "id": 5,
    "nombre": "PC5",
    "marca": "INTEL",
    "espacio": "3TB",
    "ram": "4GB",
    "precio": 300,
    "img": "https://picsum.photos/id/40/400/200"
  },  {
    "id": 6,
    "nombre": "PC6",
    "marca": "INTEL",
    "espacio": "3TB",
    "ram": "4GB",
    "precio": 300,
    "img": "https://picsum.photos/id/60/400/200"
  }
];


// Mostramos los productos en el HTML

const mostrarCard = productosAll =>{
  productosAll.forEach(producto => {
    templateCard.querySelector('h5').textContent = producto.nombre;
    templateCard.querySelector('p').textContent = producto.marca;
    templateCard.querySelectorAll('p')[1].textContent = producto.espacio;
    templateCard.querySelectorAll('p')[2].textContent = producto.ram;
    templateCard.querySelectorAll('p')[3].textContent = producto.precio;
    templateCard.querySelector('img').setAttribute("src", producto.img);
    templateCard.querySelector('.btn-dark').dataset.id = producto.id;

    const clone = templateCard.cloneNode(true);
    fragment.appendChild(clone);
  });

  cards.appendChild(fragment);
}

mostrarCard(productosAll);

// Agregamos al carrito el producto deseado

cards.addEventListener('click', e =>{
  agregarCarrito(e);
})

items.addEventListener('click', e =>{
  btnAccion(e);
})

const agregarCarrito = e =>{
  if(e.target.classList.contains('btn-dark')){
      setCarrito(e.target.parentElement);
  }
  e.stopPropagation();
}

const setCarrito = objeto =>{
  const producto = {
    
    id: objeto.querySelector('.btn-dark').dataset.id,
    nombre: objeto.querySelector('h5').textContent,
    precio: objeto.querySelectorAll('p')[3].textContent,
    cantidad: 1
   }
   if(carrito.hasOwnProperty(producto.id)){
      producto.cantidad = carrito[producto.id].cantidad + 1;
   }

   carrito[producto.id] = {...producto}
   mostrarCarrito();
  }

  const mostrarCarrito = () =>{
    /* console.log(carrito); */
    items.innerHTML = '';
    Object.values(carrito).forEach(producto =>{
      templateCarrito.querySelector('th').textContent = producto.id;
      templateCarrito.querySelectorAll('td')[0].textContent = producto.nombre;
      templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad;
      templateCarrito.querySelector('.btn-info').dataset.id = producto.id;
      templateCarrito.querySelector('.btn-danger').dataset.id = producto.id;
      templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio;

      const clone = templateCarrito.cloneNode(true);
      fragment.appendChild(clone);
    })

    items.appendChild(fragment);

    mostrarFooter();
  }

  const mostrarFooter = () => {
    footer.innerHTML = ''
    
    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío con innerHTML</th>
        `
        return
    }
    
    // sumar cantidad y sumar totales
    const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0)
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio ,0)
    // console.log(nPrecio)

    templateFooter.querySelectorAll('td')[0].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)

    footer.appendChild(fragment)

    const boton = document.querySelector('#vaciar-carrito')
    boton.addEventListener('click', () => {
        carrito = {}
        mostrarCarrito()
    })
}

const btnAccion = e =>{
  //Accion de aumentar
  if(e.target.classList.contains('btn-info')){
    const producto = carrito[e.target.dataset.id];
    producto.cantidad++;
    carrito[e.target.dataset.id] = { ...producto};
    mostrarCarrito();
}

if(e.target.classList.contains('btn-danger')){
  const producto = carrito[e.target.dataset.id];
  producto.cantidad--;
  if(producto.cantidad === 0){
    delete carrito[e.target.dataset.id];
  }
  mostrarCarrito();
}
}

/* class Productos {
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


 */