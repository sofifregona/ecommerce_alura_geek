import { loginServices } from "../services/loginServices.js";
import { productoServices } from "../services/productoServices.js";

const href = window.location.search;
const idProducto = href.slice(4, href.length);

const texto1 = document.querySelector(".texto_agregar_imagen");
const texto2 = document.querySelector(".texto_arrastrar_imagen");
const icono = document.querySelector(".icono_agregar_imagen");
const menuSeccion = document.querySelector(".secciones");
const secciones = document.querySelectorAll(".seccion");
const inputSeccion = document.querySelector(".input_seccion_producto");
const inputs = document.querySelectorAll(".input_form");
const botonAgregarProducto = document.querySelector(".boton_agregar_producto");

let boton;
let sectorImagen;

if (window.innerWidth < 480) {
  boton = document.querySelector(".imagen_producto");
} else {
  boton = document.querySelector(".buscar_imagen_dispositivo");
  sectorImagen = document.querySelector(".imagen_producto");
}

var uploaded_image;
var seccion = secciones[0].innerHTML;
inputSeccion.value = seccion;

const auth = loginServices.getAutorizathion();
if (auth === "administrador") {
  if (window.innerWidth >= 480) {
    sectorImagen.addEventListener("dragover", (event) => {
      event.stopPropagation();
      event.preventDefault();
      event.dataTransfer.dropEffect = "copy";
    });

    sectorImagen.addEventListener("drop", (event) => {
      event.stopPropagation();
      event.preventDefault();
      const fileList = event.dataTransfer.files;
      readImage(fileList[0]);
    });
  }

  boton.addEventListener("click", () => {
    const explorador = document.querySelector(".file_element");
    explorador.click();
    explorador.addEventListener("change", () => {
      var file = explorador.files[0];
      readImage(file);
    });
  });

  const readImage = (file) => {
    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
      uploaded_image = event.target.result;
      document.querySelector(
        ".imagen_producto"
      ).style.cssText = `background-image:url(${uploaded_image});background-position:center;background-size:cover;background-repeat:no-repeat;border:none`;
    });
    texto1.style.display = "none";
    texto2.style.display = "none";
    icono.style.display = "none";
    reader.readAsDataURL(file);
  };

  window.addEventListener("click", (event) => {
    if (event.target.classList[0] === "seleccionar_seccion") {
      event.preventDefault();
      if (menuSeccion.style.display === "block") {
        menuSeccion.style.display = "none";
      } else {
        menuSeccion.style.display = "block";
      }
    } else {
      menuSeccion.style.display = "none";
    }
  });

  secciones.forEach((section) => {
    section.addEventListener("click", () => {
      seccion = section.innerHTML;
      inputSeccion.value = seccion;
    });
  });

  if (idProducto !== "") {
    botonAgregarProducto.innerHTML = "Actualizar producto";
    productoServices
      .detalleProducto(idProducto)
      .then((response) => {
        sectorImagen.style.cssText = `background-image:url(${response.imagen});background-position:center;background-size:cover;background-repeat:no-repeat;border:none`;
        texto1.style.display = "none";
        texto2.style.display = "none";
        icono.style.display = "none";
        document.querySelector(".input_nombre_producto").value =
          response.nombre;
        document.querySelectorAll(".seccion")[response.seccion - 1].click();
        document.querySelector(".input_stock_producto").value = response.stock;
        document.querySelector(".input_precio_producto").value =
          response.precio;
        document.querySelector(".input_descripcion_producto").value =
          response.descripcion;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  botonAgregarProducto.addEventListener("click", () => {
    let campos = [];
    inputs.forEach((input) => {
      const clasesInput = input.classList;
      const id = input.id;
      let contenido;
      let error = "";
      if (clasesInput.contains("imagen_producto")) {
        const imagen = input.style[0];
        if (imagen !== "background-image") {
          error = "Debe cargar una imagen del producto";
        } else {
          contenido = input.style.backgroundImage.split('"')[1];
        }
      } else if (clasesInput.contains("seccion_producto")) {
        const seccion = input.childNodes[1].childNodes[3].value;
        const secciones =
          input.childNodes[1].childNodes[5].childNodes[1].childNodes;
        console.log(secciones);
        secciones.forEach((secc, index) => {
          if (secc.innerHTML === seccion) {
            contenido = Math.ceil(index / 2);
          }
        });
      } else {
        const entrada = input.childNodes[3];
        contenido = entrada.value;
        error = validarInput(entrada);
      }
      if (id !== "seccion" && id !== "descripcion") {
        const span = document.querySelector(`#span_${id}`);
        span.innerHTML = "";
        if (error !== "") {
          span.innerHTML = error;
        }
      }
      campos.push(contenido);
    });
    const spans = document.querySelectorAll(".span_form");
    let errores = false;
    spans.forEach((span) => {
      if (span.innerHTML !== "") {
        errores = true;
      }
    });
    if (errores === false) {
      if (idProducto !== "") {
        productoServices.actualizarProducto(
          idProducto,
          campos[1],
          campos[2],
          campos[5],
          campos[4],
          campos[3],
          campos[0]
        );
      } else {
        const idNuevoProducto = uuid.v4();
        productoServices
          .crearProducto(
            idNuevoProducto,
            campos[1],
            campos[2],
            campos[5],
            campos[4],
            campos[3],
            campos[0]
          )
          .then((response) => {
            console.log(response);
          });
      }
    }
  });
} else {
  const tituloInicial = document.querySelector(".titulo");
  tituloInicial.innerHTML = "Ups... parece que no hay nada que ver aquí";
  tituloInicial.style.fontSize = "1rem";
  inputs.forEach((input) => {
    input.style.display = "none";
  });
  botonAgregarProducto.style.display = "none";
  document.querySelector(".o").style.display = "none";
  document.querySelector(".campos_obligatorios").style.display = "none";
  boton.style.display = "none";
}

function validarInput(input) {
  let error = "";
  if (input.validity.valueMissing) {
    error = `El campo "${input.parentElement.id}" es obligatorio`;
  } else if (input.validity.stepMismatch) {
    console.log(input.validity);
    error = "El stock sólo puede contener unidades enteras";
  }
  return error;
}
