// creo dos variables para el registro de la persona
let usuario = prompt(
  "Registro\n\nIngrese su nombre de usuario que desea utilizar"
);
let clave = parseInt(
  prompt("Registro\n\nIngrese su clave de usuario que desea utilizar")
);

// creo una funcion para iniciar sesion si pone lo mismo que puso en el registro
function inicio() {
  let usuario_input = prompt("Ingrese su nombre de usuario");
  let clave_input = parseInt(prompt("Ingrese su clave"));
  // creo un if para que si son corretas de una el usuario y la contraseña le de la bienvenida
  if (usuario_input == usuario && clave_input == clave) {
    alert("bienvenido " + usuario);
  }
  // creo un while para que si la persona pone mal un dato no avance hasta que complete con lo correcto
  while (usuario_input != usuario || clave_input != clave) {
    alert("El nombre de usuario o la clave ingresada es incorrecta");
    usuario_input = prompt("Ingrese su nombre de usuario");
    clave_input = parseInt(prompt("Ingrese su clave"));

    if (usuario_input == usuario && clave_input == clave) {
      alert("bienvenido " + usuario);
    }
  }
}

function productos() {
  for (let producto = 1; producto <= 4; producto++) {
    alert("Producto N° " + producto);
  }
}

function turno() {
  let cupos = 4;

  for (let turno = 1; turno <= 10; turno++) {
    const nombre = prompt("Ingresa tu nombre asi te podemos asignar un turno");
    const razon = prompt("Indique porque razon quiere un turno");
    // creo un if para que si la persona no pone nada en razon no le  de turno
    if (razon == "") {
      alert("no damos turno a gente sin que den una razon");
      continue;
    }
    // alert para saber el numero asignado para el turno
    alert(nombre + " te asignamos el N° " + turno);
    // if para que cuando turno sea igual a 6 no haya mas turnos
    if (turno == 6) {
      alert("Lo siento pero nos quedamos sin turnos");
      break;
    }

    cupos = cupos - 1;
  }
}

function ejecutarfuncion(eligaOpcion) {
  // declaro una variable afuera del while para despues cambiar sus datos
  eligaOpcion;
  // creo un while que hasta que la persona no ponga salir sigan apareciendo las opciones
  while (eligaOpcion != "Salir") {
    // le agrego datos a la variable
    eligaOpcion = prompt(
      "Eliga la opcion que dese:\n\nIniciar Sesion\nTurnos\nProductos\nSalir"
    );
    // creo un swicht para los diferentes datos que la persona puedde elegir
    switch (eligaOpcion) {
      case "Iniciar Sesion":
        inicio();
        break;

      case "Turnos":
        turno();
        break;

      case "Productos":
        productos();
        break;

      case "Salir":
        alert("Cerrando ventana...");
        break;

      default:
        alert("Opcion elegida no valida");
        break;
    }
  }
}
