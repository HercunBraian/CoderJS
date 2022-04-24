const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer');
const procesarPedidoBtn = document.getElementById('procesar-pedido'); // Procesar Pedido
const precioTotal = document.getElementById('precioTotal');
const contadorTotal = document.getElementById('contadorTotal');
const templateTotal = document.getElementById('template-total').content


const braian = document.getElementById('braian');
const templateCompra = document.getElementById('template-compra').content
const templateContador = document.getElementById('template-contador').content
const templateCard = document.getElementById('template-card').content
const templateCarrito = document.getElementById('template-carrito').content
const templateFooter = document.getElementById('template-footer').content

const fragment = document.createDocumentFragment();
const fragment2 = document.createDocumentFragment();
const fragment3 = document.createDocumentFragment();

let carrito = {}


function showCart(x){
  document.getElementById("products-id").style.display = "block";
}
function closeBtn(){
   document.getElementById("products-id").style.display = "none";
}

// El evento DOMContentLoaded es disparado cuando el documento HTML ha sido completamente cargado y parseado
document.addEventListener('DOMContentLoaded', e => {
  fetchData()
  if (localStorage.getItem('carrito')) {
      carrito = JSON.parse(localStorage.getItem('carrito'))
      pintarCarrito()
  }
});

// Llamamos a nuestro archivo Json con los datos de los productos.
const fetchData = async () => {
  const res = await fetch('api.json');
  const data = await res.json()
  pintarCards(data)
}

//Eventos

// Eliminamos el producto seleccionado
braian.addEventListener('click', e =>{
  eliminarProducto(e)
})

procesarPedidoBtn.addEventListener('click', e =>{
  procesarPedido(e)
})



// Mostramos los productos en el Carrito
const mostrarCompra = () =>{
  braian.innerHTML = '';
  Object.values(carrito).forEach(producto =>{
    templateCompra.querySelector('img').setAttribute("src", producto.img);
    templateCompra.querySelector('h5').textContent = producto.nombre;
    templateCompra.querySelector('h6').textContent = producto.cantidad;
    templateCompra.querySelector('.cart-price').textContent = producto.cantidad * producto.precio;
    templateCompra.querySelector('.delete-product').dataset.id = producto.id;


    const clone = templateCompra.cloneNode(true);
    fragment.appendChild(clone);
  })

  braian.appendChild(fragment);

  pintarFooter();
  mostrarTotal(); 

}

// Mostramos los productos en el HTML

const pintarCards = data =>{
  data.forEach(producto => {
    templateCard.querySelector('h5').textContent = producto.nombre;
    templateCard.querySelector('p').textContent = producto.precio;
    templateCard.querySelector('img').setAttribute("src", producto.img);
    templateCard.querySelector('.btn-dark').dataset.id = producto.id;

    const clone = templateCard.cloneNode(true);
    fragment.appendChild(clone);
  });

  cards.appendChild(fragment);
}



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

   if(carrito.hasOwnProperty(producto.id)){
      producto.cantidad = carrito[producto.id].cantidad + 1;
   }

   carrito[producto.id] = {...producto}
   pintarCarrito();
   mostrarCompra();
  }
  
// Mostramos los productos del carrito en el HTML

  const pintarCarrito = () =>{
   
    items.innerHTML = '';
    Object.values(carrito).forEach(producto =>{
      
      templateCarrito.querySelectorAll('td')[0].textContent = producto.nombre;
      templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad;
      templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio;

      const clone = templateCarrito.cloneNode(true);
      fragment.appendChild(clone);
    })

    items.appendChild(fragment);

    pintarFooter();
    mostrarCompra();

    localStorage.setItem('carrito', JSON.stringify(carrito))
  }

  const pintarFooter = () => {
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
    

    templateFooter.querySelectorAll('td')[0].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)

    footer.appendChild(fragment)

    const boton = document.querySelector('#vaciar-carrito')
    boton.addEventListener('click', () => {
        carrito = {}
        pintarCarrito()
        mostrarCompra();
    })
}

const mostrarTotal = () => {
  precioTotal.innerHTML = ''
  contadorTotal.innerHTML = ''


  // sumar cantidad y sumar totales
  const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0)
  const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio ,0)
  // console.log(nPrecio)

  templateContador.querySelector('.count-product').textContent = nCantidad 
  templateTotal.querySelector('.price-total').textContent = nPrecio

  const clone = templateTotal.cloneNode(true)
  fragment2.appendChild(clone)

  precioTotal.appendChild(fragment2)

  const clone2 = templateContador.cloneNode(true)
  fragment3.appendChild(clone2)

  contadorTotal.appendChild(fragment3)

}


const eliminarProducto = e =>{
  if (e.target.classList.contains('delete-product')) {
    const producto = carrito[e.target.dataset.id]
    if (producto.id == e.target.dataset.id) {
      delete carrito[e.target.dataset.id]
  } else {
      carrito[e.target.dataset.id] = {...producto}
  }
  pintarCarrito()
}
}


  const procesarPedido = e =>{
    if (Object.keys(carrito).length === 0) {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'El carrito está vacío, agrega algún producto',
        showConfirmButton: false,
        timer: 2000
    })
}
else {
    location.href = "carrito.html";
  }
}