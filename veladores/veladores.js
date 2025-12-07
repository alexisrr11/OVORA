//Menu
const btnMenu = document.getElementById("btn-menu");
const navBar = document.getElementById("navbar");
const cruzModal = document.getElementById("cruz");

function modales(btn, contenedor) {
  btn.addEventListener("click", () => {
    contenedor.classList.toggle("hidden");
  })
}

function closeM(cruzModal, navBar) {
  cruzModal.addEventListener("click", () => {
    navBar.classList.add("hidden");
  })
}

modales(btnMenu, navBar);
closeM(cruzModal, navBar);


//Fetch
fetch('./veladores.json')
  .then(res => res.json())
  .then(productos => {
    const slides = document.getElementById('slides');

    productos.forEach(producto => {
      const slide = document.createElement('div');
      slide.className = 'min-w-full bg-neutral-800/60 p-8 flex flex-col md:flex-row items-center gap-6';

      slide.innerHTML = `
        <img src="${producto.imagen}" class="btn-consultar w-64 h-64 object-cover rounded-2xl">
        <div class="text-center md:w-full">
          <h2 class="text-2xl font-bold">${producto.nombre}</h2>
          <p class="text-white/70 mt-2">${producto.descripcion}</p>
          <div class="flex justify-around items-center mt-4">
            <span class="text-xl font-semibold"><span class="text-lime-200/70">EF</span> $${producto.precio}</span>
            <button 
              class="btn-consultar text-lime-300 font-semibold hover:underline text-lg">
              Ver más
            </button>
          </div>
        </div>
      `;

      // ✅ Evento correcto
      slide.querySelectorAll('.btn-consultar').forEach(el => {
        el.addEventListener('click', () => {
          sessionStorage.setItem('productoSeleccionado', producto.nombre);
          window.location.href = `../ventana.html?id=${producto.id}`;
        });
      });

      slides.appendChild(slide);
    });
  });


// Carrusel
const slidesContainer = document.getElementById('slides');
let index = 0;
let autoSlide; // ← guardamos el intervalo

function showSlide(i) {
  slidesContainer.style.transform = `translateX(-${i * 100}%)`;
}

// 🔁 Reinicia el intervalo
function resetAutoSlide() {
  clearInterval(autoSlide);

  autoSlide = setInterval(() => {
    if (slidesContainer.children.length === 0) return;

    index = (index + 1) % slidesContainer.children.length;
    showSlide(index);
  }, 6000);
}

// Botón siguiente
document.getElementById('next').addEventListener('click', () => {
  index = (index + 1) % slidesContainer.children.length;
  showSlide(index);
  resetAutoSlide(); // 🔄 reinicio
});

// Botón anterior
document.getElementById('prev').addEventListener('click', () => {
  index = (index - 1 + slidesContainer.children.length) % slidesContainer.children.length;
  showSlide(index);
  resetAutoSlide(); // 🔄 reinicio
});

// Iniciar auto slide la primera vez
resetAutoSlide();
