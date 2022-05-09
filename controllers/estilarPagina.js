const menu = document.querySelector(".menu");
const logo = document.querySelector(".logo_imagen");
const modo = document.querySelector(".modo");
const empty_button = document.querySelector(".empty_button");
const buscar = document.querySelector(".buscar");
const inputBuscador = document.querySelector(".input_buscador");
const copyright = document.querySelector(".copyright");
const seccionPrincipal = document.querySelector(".seccion_principal");
const footer = document.querySelector(".footer");
const footerLogo = document.querySelector(".footer_logo");
const footerLista = document.querySelectorAll(".footer_lista_elemento");
const input = document.querySelectorAll(".input");

export function estilarPagina() {
  let modoColor = localStorage.getItem("modoColor");
  if (modoColor === undefined) localStorage.setItem("modoColor", "claro");
  if (modoColor === "claro") {
    menu.style.backgroundColor = "#FFFFFF";
    logo.src = "assets/img/Logo.svg";
    modo.innerHTML = "Modo oscuro";
    empty_button.style.backgroundColor = "#FFFFFF";
    buscar.classList.remove("buscar_oscuro");
    buscar.classList.add("buscar_clara");
    inputBuscador.style.backgroundColor = "#F5F5F5";
    copyright.style.backgroundColor = "#FFFFFF";
    copyright.style.color = "#464646";
    seccionPrincipal.style.backgroundColor = "#E5E5E5";
    footer.style.backgroundColor = "#EAF2FD";
    footerLogo.src = "assets/img/Logo.svg";
    footerLista.forEach((item) => {
      item.style.color = "#555555";
    });
    input.forEach((item) => {
      item.style.backgroundColor = "#FFFFFF";
    });
  } else {
    menu.style.backgroundColor = "#242424";
    logo.src = "assets/img/Logo_blanco.png";
    modo.innerHTML = "Modo claro";
    empty_button.style.backgroundColor = "#242424";
    buscar.classList.remove("buscar_clara");
    buscar.classList.add("buscar_oscuro");
    inputBuscador.style.backgroundColor = "#636363";
    copyright.style.backgroundColor = "#242424";
    copyright.style.color = "#b3b3b3";
    seccionPrincipal.style.backgroundColor = "#080808";
    footer.style.backgroundColor = "#141414";
    footerLogo.src = "assets/img/Logo_blanco.png";
    footerLista.forEach((item) => {
      item.style.color = "#b3b3b3";
    });
    input.forEach((item) => {
      item.style.backgroundColor = "#b3b3b3";
      item.style.color = "#464646";
    });
  }
}
