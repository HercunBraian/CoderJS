const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer');
const procesarPedidoBtn = document.getElementById('procesar-pedido'); // Procesar Pedido
const precioTotal = document.getElementById('precioTotal');
const contadorTotal = document.getElementById('contadorTotal');
const templateTotal = document.getElementById('template-total').content


const itemsCards = document.getElementById('itemsCards');
const templateCompra = document.getElementById('template-compra').content
const templateContador = document.getElementById('template-contador').content
const templateCard = document.getElementById('template-card').content


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
      mostrarCompra()
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
itemsCards.addEventListener('click', e =>{eliminarProducto(e)})

procesarPedidoBtn.addEventListener('click', e =>{procesarPedido(e)})



// Mostramos los productos en el Carrito
const mostrarCompra = () =>{
  itemsCards.innerHTML = '';
  Object.values(carrito).forEach(producto =>{
    templateCompra.querySelector('img').setAttribute("src", producto.img);
    templateCompra.querySelector('h5').textContent = producto.nombre;
    templateCompra.querySelector('h6').textContent = producto.cantidad;
    templateCompra.querySelector('.cart-price').textContent = producto.cantidad * producto.precio;
    templateCompra.querySelector('.delete-product').dataset.id = producto.id;


    const clone = templateCompra.cloneNode(true);
    fragment.appendChild(clone);
  })

  itemsCards.appendChild(fragment);
  localStorage.setItem('carrito', JSON.stringify(carrito))
  mostrarTotal(); 

}

// Mostramos los productos en el HTML

const pintarCards = data =>{
  data.forEach(producto => {
    templateCard.querySelector('h3').textContent = producto.nombre;
    templateCard.querySelector('h6').textContent = producto.precio;
    templateCard.querySelector('img').setAttribute("src", producto.img);
    templateCard.querySelector('.buy-2').dataset.id = producto.id;
    templateCard.querySelector('.product-item').setAttribute("category", producto.categoria);


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
  if(e.target.classList.contains('buy-2')){
      setCarrito(e.target.parentElement);
      
  }

  e.stopPropagation();
}

const setCarrito = objeto =>{
  const producto = {
    
    id: objeto.querySelector('.buy-2').dataset.id,
    nombre: objeto.querySelector('h3').textContent,
    precio: objeto.querySelector('h6').textContent,
    img: objeto.querySelector('img').src,
    cantidad: 1
    
   }

   if(carrito.hasOwnProperty(producto.id)){
      producto.cantidad = carrito[producto.id].cantidad + 1;
   }
// Generamos una copia de producto aplicando spread operator.
   carrito[producto.id] = {...producto}
   mostrarCompra();
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
// Aplicando operador ternario.
// Generamos una copia de producto aplicando spread operator.
    producto.id == e.target.dataset.id ? delete carrito[e.target.dataset.id] : carrito[e.target.dataset.id] = {...producto}
    
  mostrarCompra()
}
}

// Aplicando alerta cuando el carrito se encuentra vacio y se presiona el boton procesar compra
// Aplicando operador ternario.
const procesarPedido = e =>{

  Object.keys(carrito).length === 0 ? Swal.fire({
    type: 'error',
    title: 'Oops...',
    text: 'El carrito está vacío, agrega algún producto',
    showConfirmButton: false,
    timer: 2000
}) : location.href = "carrito.html";

}


// FILTRO POR CATEGORIA ====================

$(document).ready(function(){

  // AGREGANDO CLASE ACTIVE AL PRIMER ENLACE ====================
  $('.category_list .category_item[category="all"]').addClass('ct_item-active');

  $('.category_item').click(function(){
    var catProduct = $(this).attr('category');
  // AGREGANDO CLASE ACTIVE AL ENLACE SELECCIONADO ====================
    console.log(catProduct);
    $('.category_item').removeClass('ct_item-active');
    $(this).addClass('ct_item-active');

    // OCULTANDO PRODUCTOS =============

    $('.product-item').hide();

    // MOSTRANDO PRODUCTOS =============

    $('.product-item[category="'+catProduct+'"]').show();
});

    $('.category_item[category="all"]').click(function(){
      $('.product-item').show();
    });

});