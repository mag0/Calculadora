let boton = document.querySelectorAll(".boton");
let igual = document.querySelector(".igual");
let borrar = document.querySelector(".borrar");
let negativo = document.querySelector(".negativo");
let borrarTodo = document.querySelector(".borrarTodo");
let r = document.getElementById("pantalla");
let numero = "";
let numero1 = "";
let numero2 = "";
let muchasCuentas = false;
let suma = false;
let resta = false;
let por = false;
let division = false;
let puntoActivo = false;
let reinicioDePantalla = false;
let capacidadMaxima = false;

boton.forEach((e) => {
  r.textContent = "";
  e.addEventListener("click", () => {
    if (r.textContent.length == 8) {
      capacidadMaxima = true;
    }
    if (!capacidadMaxima) {
      if (r.textContent == "ERROR" || r.textContent == "UNA CUENTA A LA VEZ") {
        r.textContent = "";
      }
      if (
        e.textContent != "c" &&
        e.textContent != "ce" &&
        e.textContent != "+/-"
      ) {
        r.textContent += e.textContent;
        numero = r.textContent;
      }
    }
  });
});

igual.addEventListener("click", () => {
  r.textContent = "";
  r.textContent = mostrarResultado();
  capacidadMaxima = false;
});

borrar.addEventListener("click", () => {
  let cantidad = 0;
  let numeroNuevo = "";
  while (numero.length - 1 > cantidad) {
    numeroNuevo += numero.charAt(cantidad);
    cantidad++;
  }
  numero = numeroNuevo;
  r.textContent = numeroNuevo;
  capacidadMaxima = false;
});

borrarTodo.addEventListener("click", () => {
  r.textContent = "";
  numero = "";
});

function mostrarResultado() {
  let cantidad = 0;
  let resultado = 0;
  let cambioDeNumero = false;
  let finDeImpresion = false;
  numero1 = "";
  numero2 = "";
  while (!finDeImpresion) {
    if (!cambioDeNumero) {
      if (numero.charAt(0) == "-") {
        numero1 += numero.charAt(0);
        cantidad++;
      }
      while (numero.length > cantidad && !esSigno(cantidad)) {
        numero1 += numero.charAt(cantidad);
        cantidad++;
      }
      getOperacion(cantidad);
      cambioDeNumero = true;
      cantidad++;
    } else {
      if (numero.charAt(cantidad) == "-") {
        numero2 += numero.charAt(cantidad);
        cantidad++;
      }
      while (
        numero.length > cantidad &&
        !esSigno(cantidad) &&
        numero.charAt(cantidad) != "="
      ) {
        numero2 += numero.charAt(cantidad);
        cantidad++;
      }
      if (esSigno(cantidad)) {
        muchasCuentas = true;
      }
      finDeImpresion = true;
    }
  }
  if (muchasCuentas) {
    resultado = "UNA CUENTA A LA VEZ";
    muchasCuentas = false;
  } else {
    resultado = resultadoFinal(numero1, numero2);
  }
  reinicioDePantalla = true;
  if (
    resultado != "UNA CUENTA A LA VEZ" &&
    resultado != "ERROR" &&
    resultado - resultado.toFixed(0) != 0
  ) {
    resultado = resultado.toFixed(2);
  }
  return resultado;
}

function esSigno(cantidad) {
  if (
    numero.charAt(cantidad) == "-" ||
    numero.charAt(cantidad) == "+" ||
    numero.charAt(cantidad) == "/" ||
    numero.charAt(cantidad) == "*"
  ) {
    return true;
  } else {
    return false;
  }
}

function resultadoFinal(numero1, numero2) {
  if (suma) {
    resultado = parseFloat(numero1) + parseFloat(numero2);
    suma = false;
  } else if (resta) {
    resultado = parseFloat(numero1) - parseFloat(numero2);
    resta = false;
  } else if (por) {
    resultado = parseFloat(numero1) * parseFloat(numero2);
    por = false;
  } else if (division && numero2 != "0") {
    resultado = parseFloat(numero1) / parseFloat(numero2);
    division = false;
  } else if (capacidadMaxima) {
    resultado = "OCHO DIGITOS MAXIMO";
  } else {
    resultado = "ERROR";
  }
  return resultado;
}

function getOperacion(cantidad) {
  if (numero.charAt(cantidad) == "-") {
    resta = true;
  } else if (numero.charAt(cantidad) == "+") {
    suma = true;
  } else if (numero.charAt(cantidad) == "*") {
    por = true;
  } else if (numero.charAt(cantidad) == "/") {
    division = true;
  } else {
    r.textContent = "ERROR";
  }
}
