fetch('./productos.json')
  .then(res => res.json())
  .then(productos => {
    const slides = document.getElementById('slides');

    productos.forEach(producto => {
      const slide = document.createElement('div');
      slide.className = 'min-w-full bg-neutral-800/60 p-8 flex flex-col md:flex-row items-center gap-6';

      slide.innerHTML = `
        <img src="${producto.imagen}" class="w-64 h-64 object-cover rounded-2xl">
        <div class="text-center md:w-full">
          <h2 class="text-2xl font-bold">${producto.nombre}</h2>
          <p class="text-white/70 mt-2">${producto.descripcion}</p>
          <div class="flex justify-around items-center mt-4">
            <span class="text-xl font-semibold"><span class="text-lime-200/70">EF</span> $${producto.precio}</span>
            <button 
              class="btn-consultar text-blue-400 hover:underline">
              Consultar
            </button>
          </div>
        </div>
      `;

      // ✅ Evento correcto
      slide.querySelector('.btn-consultar').addEventListener('click', () => {
        sessionStorage.setItem('productoSeleccionado', producto.nombre);
        window.location.href = `ventana.html?id=${producto.id}`;
      });

      slides.appendChild(slide);
    });
  });


// Carrusel
const slidesContainer = document.getElementById('slides');
let index = 0;

function showSlide(i) {
  slidesContainer.style.transform = `translateX(-${i * 100}%)`;
}

document.getElementById('next').addEventListener('click', () => {
  index = (index + 1) % slidesContainer.children.length;
  showSlide(index);
});

document.getElementById('prev').addEventListener('click', () => {
  index = (index - 1 + slidesContainer.children.length) % slidesContainer.children.length;
  showSlide(index);
});

setInterval(() => {
  if (slidesContainer.children.length === 0) return;
  index = (index + 1) % slidesContainer.children.length;
  showSlide(index);
}, 6000);

//Mostrar modal PROMO

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
});
