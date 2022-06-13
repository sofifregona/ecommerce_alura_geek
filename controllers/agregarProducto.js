import { loginServices } from "../services/loginServices.js";

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

var uploaded_image;
var seccion = secciones[0].innerHTML;
inputSeccion.value = seccion;

const status = loginServices.getAutorizathion();
if (status === "administrador") {
  if (window.innerWidth < 480) {
    boton = document.querySelector(".imagen_producto");
  } else {
    boton = document.querySelector(".buscar_imagen_dispositivo");
    sectorImagen = document.querySelector(".imagen_producto");
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
      ).style.cssText = `background-image:url(${uploaded_image});background-position:center;background-size:cover;background-repeat:no-repeat;`;
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

  inputs.forEach((input) => {
    const clasesInput = input.classList;
    const id = input.id;
  });

  botonAgregarProducto.addEventListener("click", () => {
    inputs.forEach((input) => {
      const clasesInput = input.classList;
      const id = input.id;
      let contenido;
      let error = "";
      if (clasesInput.contains("imagen_producto")) {
        contenido = input.style[0];
        if (contenido !== "background-image") {
          error = "Debe cargar una imagen del producto";
        }
      } else if (clasesInput.contains("seccion_producto")) {
        contenido = input.childNodes[1].childNodes[3].value;
      } else {
        const entrada = input.childNodes[3];
        entrada.addEventListener("keyup", () => {
          contenido = entrada.value;
          console.log(contenido);
          error = validarInput(entrada);
        });
      }
      if (id !== "seccion" && id !== "descripcion") {
        const span = document.querySelector(`#span_${id}`);
        span.style.display = "none";
        if (error !== "") {
          span.innerHTML = error;
          span.style.display = "block";
        }
      }
    });
  });
} else {
  console.log("Ups... Parece que no hay nada que ver aquí");
}

function validarInput(input) {
  let error = "";
  console.log(input.validity);
  if (input.validity.valueMissing) {
    error = `El campo "${input.parentElement.id}" es obligatorio`;
  } else if (input.validity.stepMismatch) {
    error = "El stock sólo puede contener unidades enteras";
  }
  return error;
}
