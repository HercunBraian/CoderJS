const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer');

const braian = document.getElementById('braian');
const templateCompra = document.getElementById('template-compra').content

const templateCard = document.getElementById('template-card').content
const templateCarrito = document.getElementById('template-carrito').content
const templateFooter = document.getElementById('template-footer').content

const fragment = document.createDocumentFragment();
let carrito = [];


function showCart(x){
  document.getElementById("products-id").style.display = "block";
}
function closeBtn(){
   document.getElementById("products-id").style.display = "none";
}



//Productos 

const productosAll = [
  {
    "id": 1,
    "nombre": "Gabinete Gamer Thermaltake V250 Tg Argb",
    "precio": 11999,
    "img": "img/productos/cpu1.webp"
  },
  {
    "id": 2,
    "nombre": "Gabinete Thermaltake Level 20",
    "precio": 15630,
    "img": "img/productos/cpu2.webp"
  },
  {
    "id": 3,
    "nombre": "Gabinete Gamer Cooler Master K501l Argb Atx",
    "precio": 15400,
    "img": "img/productos/cpu4.webp"
  },  {
    "id": 4,
    "nombre": "Gabinete Premium Master BH232 Argb",
    "precio": 16599,
    "img": "img/productos/cpu3.webp"
  },  {
    "id": 5,
    "nombre": "Consola Gamer Portátil Netmak 16bits 140 Juegos",
    "precio": 4599,
    "img": "img/productos/consola1.webp"
  },  {
    "id": 6,
    "nombre": "Nintendo Switch OLED 64GB Standard",
    "precio": 94599,
    "img": "img/productos/consola2.webp"
  },
  {
    "id": 7,
    "nombre": "Sony PlayStation 4 Slim 1TB Standard",
    "precio": 103300,
    "img": "img/productos/consola3.webp"
  },
  {
    "id": 8,
    "nombre": "Sony PlayStation 5 825GB Standard",
    "precio": 160450,
    "img": "img/productos/consola4.webp"
  }
];


// Mostramos los productos en el Carrito
const mostrarCompra = () =>{
  braian.innerHTML = '';
  Object.values(carrito).forEach(producto =>{
    templateCompra.querySelector('img').setAttribute("src", producto.img);
    templateCompra.querySelector('h5').textContent = producto.nombre;
    templateCompra.querySelector('h6').textContent = producto.cantidad;
    templateCompra.querySelector('.cart-price').textContent = producto.cantidad * producto.precio;

    const clone = templateCompra.cloneNode(true);
    fragment.appendChild(clone);
  })

  braian.appendChild(fragment);
  mostrarFooter();
}

// Mostramos los productos en el HTML

const mostrarCard = productosAll =>{
  productosAll.forEach(producto => {
    templateCard.querySelector('h5').textContent = producto.nombre;
    templateCard.querySelector('p').textContent = producto.precio;
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
    precio: objeto.querySelector('p').textContent,
    img: objeto.querySelector('img').src,
    cantidad: 1
    
   }
console.log(producto)
   if(carrito.hasOwnProperty(producto.id)){
      producto.cantidad = carrito[producto.id].cantidad + 1;
   }

   carrito[producto.id] = {...producto}
   mostrarCarrito();
   mostrarCompra();
  }
  
// Mostramos los productos del carrito en el HTML

  const mostrarCarrito = () =>{
    /* console.log(carrito); */
    items.innerHTML = '';
    Object.values(carrito).forEach(producto =>{
      templateCarrito.querySelectorAll('td')[0].textContent = producto.nombre;
      templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad;
      templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio;

      const clone = templateCarrito.cloneNode(true);
      fragment.appendChild(clone);
    })

    items.appendChild(fragment);

    mostrarFooter();
    mostrarCompra();
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