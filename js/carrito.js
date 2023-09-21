// variables globales
// array
const carrito = [];
const ListaDeproductos = [];

const yerbaAmanda = {
  nombre: "Yerba Amanda",
  precio: 200,
  stock: 30,
};
const yerbaPlayadito = {
  nombre: "Yerba Playadito",
  precio: 300,
  stock: 10,
};
const yerbaLamerced = {
  nombre: "Yerba la Merced",
  precio: 500,
  stock: 20,
};

ListaDeproductos.push(yerbaAmanda);
ListaDeproductos.push(yerbaPlayadito);
ListaDeproductos.push(yerbaLamerced);

function listaProductos() {
  console.clear();
  console.log("Productos:");

  ListaDeproductos.forEach((producto) => {
    console.log("-----------------------");
    console.log("Nombre:", producto.nombre);
    console.log("Precio: $", producto.precio);
    console.log("Stock:", producto.stock);
  });

  //meto oferta con un map
  const oferta = ListaDeproductos.map((producto) => {
    return {
      nombre: producto.nombre,
      precio: producto.precio - 30,
      stock: producto.stock,
    };
  });
  console.log("ofertas: ", oferta);
}

//funcion para buscar productos
function buscar() {
  const keyword = prompt("¿Que producto desea buscar?");

  const arrayResultados = ListaDeproductos.filter((producto) =>
    producto.nombre.toLowerCase().includes(keyword.toLowerCase())
  );

  console.log(arrayResultados);
}

// funcion que se encargue de buscar si un producto existe en nuestro carrito
function enCarrito(nombrePrompt) {
  for (const producto of carrito) {
    if (producto.nombre == nombrePrompt) {
      return producto;
    }
  }
  return false;
}

// funcion para agregar un producto al carrito
function agregar() {
  // pido por promp los datos del producto
  let nombrePrompt = prompt("Introduzca el nombre del producto");
  let precioPrompt = parseInt(prompt("Introduzca el precio del producto"));

  if (nombrePrompt == nombrePrompt && precioPrompt == precioPrompt) {
    alert("El producto " + nombrePrompt + " fue agregado al carrito");
  }

  while (nombrePrompt === "" || precioPrompt === "" || isNaN(parseFloat(precioPrompt))) {
    alert("Porfavor ingrese un producto o precio valido");
    nombrePrompt = prompt("Introduzca el nombre del producto");
    precioPrompt = parseInt(prompt("Introduzca el precio del producto"));

    if (nombrePrompt == nombrePrompt && precioPrompt == precioPrompt && isNaN(parseFloat(precioPrompt))
    ) {
      alert("El producto " + nombrePrompt + " fue agregado al carrito");
    }
  }

  // creo un objeto con los dfatos obtenido del promp
  const nuevoProducto = {
    nombre: nombrePrompt,
    precio: parseInt(precioPrompt),
    subtotal: parseInt(precioPrompt),
    cantidad: 1,
  };

  const productoEncontrado = enCarrito(nombrePrompt);

  if (productoEncontrado) {
    productoEncontrado.cantidad++;
    productoEncontrado.precio = parseInt(precioPrompt);
    productoEncontrado.subtotal =
      parseInt(precioPrompt) * productoEncontrado.cantidad;
  } else {
    // push agrega el producto en el array
    carrito.push(nuevoProducto);
  }

  // mesanje de alaert exitoso
  // alert("El producto " + nombrePrompt + " fue agregado al carrito");

  listar();
}

// funcuion para alistar los productos del carrito
function listar() {
  console.clear();
  console.log("Productos que hay en el carrito:");

  if (carrito == "") {
    console.log("No hay ningun articulo ingresado en el carrito");
  }

  carrito.forEach((producto) => {
    console.log("-----------------------");
    console.log("Nombre:", producto.nombre);
    console.log("Precio: $", producto.precio);
    console.log("Cantidad:", producto.cantidad);
    console.log("Subtotal:", producto.subtotal);
  });

  const totalCarrito = carrito.reduce((acu, el) => acu + el.subtotal, 0);
  console.log("Total de los producto del carrito: $", totalCarrito);
}

//funcion para quitar un producto del carrito
function quitar() {
  let nombrePrompt = prompt("¿Que producto queres sacar del carrito?");
  const nombreMinuscula = nombrePrompt.toLowerCase();

  //le agrege un find con tolowercase para que el codigo lea todo el minuscula y lo borre igual por mas que este escrito difeerente
  const productoEncontrado = carrito.find((producto) =>
    producto.nombre.toLowerCase().includes(nombreMinuscula.toLowerCase())
  );

  while (nombrePrompt == "") {
    nombrePrompt = prompt("¿Que producto queres sacar del carrito?");
  }

  for (const producto of carrito) {
    if (productoEncontrado) {
      // encontrado
      // nesecitamos el indice y lo pedimos con index of
      const indiceProducto = carrito.indexOf(producto);
      // una vez obtenemos el indice lo sacamos con splice
      carrito.splice(indiceProducto, 1);
      // mostramos u mensaje al usuario que se saco el producto del carrito
      alert("El producto " + nombrePrompt + " fue borrado del carrito");
      listar();
      return; // cuando llega a esta linea del codigo sale de la funcion
    }
  }
  //llega aca si no encontro ningun producto
  alert("No se encontro el producto " + nombrePrompt + " en el carrito");
}

function principal() {
  const elegirOpcion = prompt(
    "Eliga la opcion que desee:\n\nBuscar\n\nLista de Productos"
  );

  // Convierto el pormp minúsculas
  const opcionEnMinusculas = elegirOpcion.toLowerCase();

  switch (opcionEnMinusculas) {
    case "buscar":
      buscar();
      break;

    case "lista de productos":
      listaProductos();
      break;

    case "":
      alert("No se ingreso nada en la ventana");
      break;

    default:
      break;
  }
}
