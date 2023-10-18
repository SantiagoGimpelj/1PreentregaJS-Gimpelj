//clase molde para los produc
class Producto {
  constructor(id, nombre, precio, categoria, imagen) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.categoria = categoria;
    this.imagen = imagen;
  }
}

class BaseDeDatos {
  constructor() {
    //array para el catalogo de productos
    this.productos = [];
    //cargar productos
    this.agregarProductos();

    //creo otro array para otra section
    this.productos2 = [];
    //creo productos para otro array
    this.agregarProductos2();
  }

  //crea el productos y los muestra en el catalogo con fetch
  async agregarProductos() {
    const resultado = await fetch("./json/productos.json");
    this.productos = await resultado.json();
    cargarProductos(this.productos);
  }

  async agregarProductos2() {
    const resultado2 = await fetch("./json/productos2.json");
    this.productos2 = await resultado2.json();
    cargarProductos2(this.productos2);
  }

  //nos da el catalogo de productos
  traerProductos() {
    return this.productos;
  }
  // egundo catalogos
  traerProductos2() {
    return this.productos2;
  }

  //nos da el producto segun el id
  productoPorId(id) {
    return this.productos.find((producto) => producto.id === id);
  }

  productoPorId2(id) {
    return this.productos2.find((producto) => producto.id === id);
  }

  //buscador
  productosPorNombre(palabra) {
    return this.productos.filter((producto) =>
      producto.nombre.toLowerCase().includes(palabra.toLowerCase())
    );
  }
  //
  productosPorNombre2(palabra) {
    return this.productos2.filter((producto) =>
      producto.nombre.toLowerCase().includes(palabra.toLowerCase())
    );
  }

  productosPorCategoria(categoria) {
    return this.productos.filter((producto) => producto.categoria == categoria);
  }

  productosPorCategoria2(categoria) {
    return this.productos2.filter(
      (producto) => producto.categoria == categoria
    );
  }
}

class carrito {
  constructor() {
    const carritoStorage = JSON.parse(localStorage.getItem("carrito"));
    //aca van a estar lo productos que esten en el carrito
    this.carrito = carritoStorage || [];
    this.total = 0; //suma de todos los productos
    this.cantidadProductos = 0; //cantidad de productos qeu tenemos en el carrito
    this.listar();
  }

  //
  estaEnCarrito({ id }) {
    return this.carrito.find((producto) => producto.id === id);
  }

  //agregar al carrito
  agregar(producto) {
    const productoEnCarrito = this.estaEnCarrito(producto);

    if (!productoEnCarrito) {
      this.carrito.push({ ...producto, cantidad: 1 });
    } else {
      productoEnCarrito.cantidad++;
    }

    //actualizo el storage
    localStorage.setItem("carrito", JSON.stringify(this.carrito));

    this.listar();
  }

  //quitar del carrito
  quitar(id) {
    const indice = this.carrito.findIndex((producto) => producto.id === id);
    //saco de un producto del carrito si hay muchos
    if (this.carrito[indice].cantidad > 1) {
      this.carrito[indice].cantidad--;
    }
    //borrar del carrito el producto
    else this.carrito.splice(indice, 1);

    //actualizo el storage
    localStorage.setItem("carrito", JSON.stringify(this.carrito));

    this.listar();
  }

  vaciar() {
    this.total = 0;
    this.cantidadProductos = 0;
    this.carrito = [];
    localStorage.setItem("carrito", JSON.stringify(this.carrito));
    this.listar();
  }

  //listado de los productos en el carrito
  listar() {
    //reinicio las variables
    this.total = 0;
    this.cantidadProductos = 0;
    divcarrito.innerHTML = "";

    for (const producto of this.carrito) {
      divcarrito.innerHTML += `
        <div class="productoCarrito">
            <h2>${producto.nombre}</h2>
            <img src="assets/img/${producto.imagen}" />
            <p>$${producto.precio}</p>
            <p>Cantidad: ${producto.cantidad}</p>
            <a href="#" class="btnquitar" data-id="${producto.id}">Quitar del carrito</a>
        </div>
        `;
      //actualizo los totales
      this.total += producto.precio * producto.cantidad;
      this.cantidadProductos += producto.cantidad;
    }

    if (this.cantidadProductos > 0) {
      btnComprar.style.display = "block";
    } else {
      btnComprar.style.display = "none";
    }

    const botonesQuitar = document.querySelectorAll(".btnquitar");

    for (const boton of botonesQuitar) {
      boton.addEventListener("click", (evento) => {
        evento.preventDefault();
        const idproducto = parseInt(boton.dataset.id);
        this.quitar(idproducto);
      });
    }
    spanCantidadProductos.innerText = this.cantidadProductos;
    spanTotalCarrito.innerText = this.total;
  }
}

//llamo la base de datos
const bd = new BaseDeDatos();

//elementos
const spanCantidadProductos = document.querySelector("#cantidadProductos");
const spanTotalCarrito = document.querySelector("#totalcarrito");
const sectionProductos1 = document.querySelector("#section1");
const sectionProductos2 = document.querySelector("#section2");
const divcarrito = document.querySelector("#carrito");
const inputBuscar = document.querySelector("#inputbuscar");
const btnComprar = document.querySelector("#btncomprar");
const botonesCategoria = document.querySelectorAll(".btncategoria");

//llamamos la clase carrito
const Carrito = new carrito();

//boton para llamar a los productos por categoria
botonesCategoria.forEach((boton) => {
  boton.addEventListener("click", (event) => {
    event.preventDefault();
    const categoria = boton.dataset.categoria;

    //sacar el seleccionado
    const botonSeleccionado = document.querySelector(".seleccionado");
    botonSeleccionado.classList.remove("seleccionado");

    //se lo agrego al boton
    boton.classList.add("seleccionado");

    //si categoria es iguala todos muestra todos los producos
    if (categoria == "Todos") {
      cargarProductos(bd.traerProductos());
      cargarProductos2(bd.traerProductos2());
    } else {
      cargarProductos(bd.productosPorCategoria(categoria));
      cargarProductos2(bd.productosPorCategoria2(categoria));
    }
  });
});

//LLamo a las listas de productos al hmtl
cargarProductos(bd.traerProductos());
cargarProductos2(bd.traerProductos2());

//fuction para la seccion 1
function cargarProductos(productos) {
  //vaciamos el section
  sectionProductos1.innerHTML = "";
  //
  for (const producto of productos) {
    sectionProductos1.innerHTML += `
        <div class="producto"> 
            <h3>${producto.nombre}</h3>
            <p class="precio">$${producto.precio}</p>
            <div class="imagen">
            <img src="assets/img/${producto.imagen}" />
            </div>
            <a href="#" class="btnAgregar" data-id="${producto.id}">Agregar al carrito</a>
        </div>
        `;
  }

  const botonesAgregar = document.querySelectorAll(".btnAgregar");

  //recorro el boton y le agrego el evento a cada uno
  for (const boton of botonesAgregar) {
    boton.addEventListener("click", (evento) => {
      evento.preventDefault();

      //guardo el data set del html del boton agregar al carrito
      const idProducto = parseInt(boton.dataset.id);

      //uso
      const producto = bd.productoPorId(idProducto);

      //agrega al carrito
      Carrito.agregar(producto);
      //tostify
      Toastify({
        text: `Se ha añadido ${producto.nombre} al carrito`,
        gravity: "bottom",
        position: "center",
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
      }).showToast();
    });
  }
}

// //funtion para la section2
function cargarProductos2(productos2) {
  sectionProductos2.innerHTML = "";

  for (const producto of productos2) {
    sectionProductos2.innerHTML += `
        <div class="producto"> 
            <h3>${producto.nombre}</h3>
            <p class="precio">$${producto.precio}</p>
            <div class="imagen">
            <img src="assets/img/${producto.imagen}"/>
            </div>
            <a href="#" class="btnAgregar2" data-id="${producto.id}">Agregar al carrito</a>
        </div>
        `;
  }

  const botonesAgregar2 = document.querySelectorAll(".btnAgregar2");

  //recorro el boton y le agrego el evento a cada uno
  for (const boton of botonesAgregar2) {
    boton.addEventListener("click", (evento) => {
      evento.preventDefault();

      //guardo el data set del html del boton agregar al carrito
      const idProducto2 = parseInt(boton.dataset.id);

      //uso
      const producto2 = bd.productoPorId2(idProducto2);

      //agrega al carrito
      Carrito.agregar(producto2);
      Toastify({
        text: `Se ha añadido ${producto2.nombre} al carrito`,
        gravity: "bottom",
        position: "center",
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
      }).showToast();
    });
  }
}

//buscador
inputBuscar.addEventListener("input", (event) => {
  event.preventDefault();
  const palabra = inputBuscar.value;
  const productos = bd.productosPorNombre(palabra);
  cargarProductos(productos);
  const palabra2 = inputBuscar.value;
  const productos2 = bd.productosPorNombre2(palabra2);
  cargarProductos2(productos2);
});

//boton comprar
btnComprar.addEventListener("click", (event) => {
  event.preventDefault();
  
  Swal.fire({
    title: '¿Estas seguro de comprar estos productos?',
    // text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, estoy seguro!',
    cancelButtonText:'No, no quiero'
  }).then((result) => {
    if (result.isConfirmed) {
      Carrito.vaciar();
      Swal.fire(
        'Su compra se realizo con exito',
        'Felicidades',
        'success'
      )
    }
  })
});
