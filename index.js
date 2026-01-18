const btnServicios = document.getElementById("btn-servicios");
const btnTrabajos = document.getElementById("btn-trabajos");
const btnWhatsapp = document.getElementById("btn-whatsapp");
const btnMenu = document.getElementById("btn-menu");
const verServicios = document.getElementById("ver-servicios");
const verTrabajos = document.getElementById("ver-trabajos");
const contacto = document.getElementById("contacto");
const navBar = document.getElementById("navbar");

const closeModal = document.querySelectorAll(".close-modal");

function modales(btn, contenedor){
    btn.addEventListener("click", () => {
        contenedor.classList.toggle("hidden");
    })
}

modales(btnServicios, verServicios);
modales(btnTrabajos, verTrabajos);
modales(btnWhatsapp, contacto);
modales(btnMenu, navBar);

const contenedoresTodos = [verServicios, verTrabajos, contacto, navBar];

closeModal.forEach(btn => {
    btn.addEventListener("click", () => {
        contenedoresTodos.forEach(modal => modal.classList.add("hidden"));
    })
});

//Modal Uno
const slider = document.getElementById("slider");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

// Distancia de avance = ancho total visible
const step = () => slider.offsetWidth;

// 👉 Siguiente
nextBtn.addEventListener("click", () => {
  slider.scrollBy({ left: step(), behavior: "smooth" });
    if (slider.scrollLeft + slider.offsetWidth >= slider.scrollWidth - 5) {
      slider.scrollTo({ left: 0, behavior: "smooth" });
    }
});

// 👉 Anterior
prevBtn.addEventListener("click", () => {
  slider.scrollBy({ left: -step(), behavior: "smooth" });
    if (slider.scrollLeft <= 0) {
      slider.scrollTo({
        left: slider.scrollWidth,
        behavior: "smooth"
      });
    }
});

// Modal Dos
let modalIndex = 0;
const modalSlider = document.getElementById("modalSlider");
const btnModalPrev = document.getElementById("modal-prev");
const btnModalNext = document.getElementById("modal-next");

btnModalNext.addEventListener("click", () => {
  const slides = modalSlider.children.length;
  modalIndex = (modalIndex + 1) % slides;

  modalSlider.scrollTo({
    left: modalIndex * modalSlider.clientWidth,
    behavior: "smooth"
  });
});

btnModalPrev.addEventListener("click", () => {
  const slides = modalSlider.children.length;
  modalIndex = (modalIndex - 1 + slides) % slides;

  modalSlider.scrollTo({
    left: modalIndex * modalSlider.clientWidth,
    behavior: "smooth"
  });
});

//Whatsapp

const formContacto = document.getElementById("form-contacto");

if (formContacto) {
  formContacto.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const consulta = document.getElementById("consulta").value;
    const mensaje = document.getElementById("mensaje");

    const numero = "5491137659081";
    const texto = `Hola! Soy ${nombre}. Quiero consultar por esta impresión 3D:\n${consulta}`;

    const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;

    // Abrir WhatsApp
    window.open(url, "_blank");

    // Mensaje de enviado
    mensaje.classList.remove("hidden");

    // Opcional: resetear el form
    formContacto.reset();
  });
}

const imagenNavbar = document.getElementById("imagen-navbar");

const arrayAnchord = [
  document.getElementById("a-personalizadas"),
  document.getElementById("a-veladores"),
  document.getElementById("a-decoraciones"),
  document.getElementById("a-accesorios"),
  document.getElementById("a-letreros")
];

const imagenesA = [ 
  "./images/ventilacionAuto.png",
  "./images/eclipceUno.jpeg",
  "./images/renoNavidad.jpeg",
  "./images/happyRosa.jpeg",
  "./images/DireccionConBase.png"
];

let imgNav = 0;

const CLASE_ACTIVA = "bg-lime-300/70";
const CLASE_INACTIVA = "bg-lime-50/30";

function cambiarImagenNav() {
  imagenNavbar.src = imagenesA[imgNav];

  arrayAnchord.forEach(a => {
    a.classList.remove(CLASE_ACTIVA);
    a.classList.add(CLASE_INACTIVA);
  });

  arrayAnchord[imgNav].classList.add(CLASE_ACTIVA);
  arrayAnchord[imgNav].classList.remove(CLASE_INACTIVA);

  imgNav = (imgNav + 1) % imagenesA.length;
}

setInterval(cambiarImagenNav, 2500);


//

/*Mostrar modal PROMO
window.addEventListener('load', () => {
  const modal = document.getElementById('modalInicio');
  const cerrar = document.getElementById('cerrarModal');

  // Mostrar modal al iniciar
  modal.classList.remove('hidden');

  // Cerrar modal
  cerrar.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  // Cerrar al hacer click fuera
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  });
}); */

