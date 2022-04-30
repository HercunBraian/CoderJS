const footer = document.getElementById('footer');

const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const procesarCompraBtn = document.getElementById('procesar-compra'); // Procesar Compra
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

items.addEventListener('click', e => { btnAumentarDisminuir(e) })

// Llamamos a nuestro archivo Json con los datos de los productos.
const fetchData = async () => {
  const res = await fetch('api.json');
  const data = await res.json()
}

//Eventos

procesarCompraBtn.addEventListener('click', e => {procesarCompra(e)})


// Mostramos los productos del carrito en el HTML

const pintarCarrito = () =>{
   
  items.innerHTML = '';
  Object.values(carrito).forEach(producto =>{
    templateCarrito.querySelector('img').setAttribute("src", producto.img);
    templateCarrito.querySelectorAll('th').textContent = producto.id;
    templateCarrito.querySelectorAll('td')[0].textContent = producto.nombre;
    templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad;
    templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio;

    //botones
    templateCarrito.querySelector('.btn-info').dataset.id = producto.id
    templateCarrito.querySelector('.btn-danger').dataset.id = producto.id

    const clone = templateCarrito.cloneNode(true);
    fragment.appendChild(clone);
  })

  items.appendChild(fragment);

  pintarFooter();

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

  })
}

const btnAumentarDisminuir = e => {
  // console.log(e.target.classList.contains('btn-info'))
  if (e.target.classList.contains('btn-info')) {
      const producto = carrito[e.target.dataset.id]
      producto.cantidad++
      carrito[e.target.dataset.id] = { ...producto }
      pintarCarrito()
  }

  if (e.target.classList.contains('btn-danger')) {
      const producto = carrito[e.target.dataset.id]
      producto.cantidad--
      producto.cantidad === 0 ? delete carrito[e.target.dataset.id] : carrito[e.target.dataset.id] = {...producto}

      pintarCarrito()
  }
  e.stopPropagation()
}

// Aplicando alerta cuando finalizamos la compra

const procesarCompra = e =>{

  Object.keys(carrito).length >= 1 ? Swal.fire(
    'Gracias por su Compra!',
    'Se le enviara la factura por mail!',
    'success'
) : Swal.fire({
  type: 'error',
  title: 'Oops...',
  text: 'El carrito está vacío, agrega algún producto',
  showConfirmButton: false,
  timer: 2000
})
}
