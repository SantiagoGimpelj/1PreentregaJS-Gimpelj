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
    this.agregarProducto(1, "Yerba Playadito", 1978, "Yerba", "playadito.webp");
    this.agregarProducto(2, "Yerba Mañanita", 1800, "Yerba", "Mañanita.webp");
    this.agregarProducto(
      3,
      "Yerba La Union Suave",
      2000,
      "Yerba",
      "la unicon suave.webp"
    );
    this.agregarProducto(4, "Yerba Chamigo", 1600, "Yerba", "chamigo.webp");
    this.agregarProducto(5, "Yerba CBSE", 1700, "Yerba", "cbse.webp");
    this.agregarProducto(6, "Yerba Canarias", 1500, "Yerba", "canarias.png");

    //creo otro array para otra section
    this.productos2 = [];
    //creo productos para otro array
    this.agregarProducto2(7, "Yerba Amanda", 1900, "Yerba", "Amanda.jpg");
    this.agregarProducto2(8, "Yerba Amanda Tradicional", 1899, "Yerba", "amandatradicional.webp");
    this.agregarProducto2(9, "Yerba Taragui", 1800, "Yerba", "taragui.webp");
    this.agregarProducto2(10, "Yerba Rosamonte Suave", 2000, "Yerba", "rosamontesuave.jpg");
    this.agregarProducto2(11, "Yerba Rosamonte terere", 1700, "Yerba", "rosamontetere.jpg");
    this.agregarProducto2(12, "Yerba Rosamonte Sin Palo", 2100, "Yerba", "rosamontesinpalo.jpg");
  }

  //crea el producto y lo muestra en el catalogo
  agregarProducto(id, nombre, precio, categoria, imagen) {
    const producto = new Producto(id, nombre, precio, categoria, imagen);
    this.productos.push(producto);
  }

  agregarProducto2(id, nombre, precio, categoria, imagen) {
    const producto2 = new Producto(id, nombre, precio, categoria, imagen);
    this.productos2.push(producto2);
  }

  //nos da el catalogo de productos
  traerProductos() {
    return this.productos;
  }
  //segundo catalogo
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
      producto.nombre.tolowercase().includes(palabra.tolowercase())
    );
  }

  productosPorNombre2(palabra) {
    return this.productos2.filter((producto) =>
      producto.nombre.tolowercase().includes(palabra.tolowercase())
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

//llamamos la clase carrito
const Carrito = new carrito();

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
    });
  }
}

//funtion para la section2
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
    });
  }
}
