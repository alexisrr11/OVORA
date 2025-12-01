// decoraciones.js (type="module")

const slidesContainer = document.getElementById('slides')
const btnNext = document.getElementById('next')
const btnPrev = document.getElementById('prev')

let index = 0
let totalSlides = 0

// 📦 Cargar productos desde JSON
fetch('./decos.json')
  .then(res => res.json())
  .then(productos => {

    productos.forEach(producto => {

      const slide = document.createElement('div')
      slide.className =
        'min-w-full bg-neutral-800/60 p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6'

      slide.innerHTML = `
        <img src="${producto.imagen}"
             class="w-52 h-52 sm:w-64 sm:h-64 object-cover rounded-2xl shadow-lg">

        <div class="text-center md:text-left md:w-full">
          <h2 class="text-2xl font-bold">${producto.nombre}</h2>

          <p class="text-white/70 mt-2 mb-4">
            ${producto.descripcion}
          </p>

          <div class="flex justify-around md:justify-between items-center mt-2">
            <span class="text-xl font-semibold">
              <span class="text-lime-200/70">EF</span> $${producto.precio}
            </span>

            <button
              class="btn-consultar text-lime-300 font-semibold hover:underline text-lg">
              Ver más
            </button>
          </div>
        </div>
      `

      // ✅ Evento al botón
      slide.querySelector('.btn-consultar').addEventListener('click', () => {
        sessionStorage.setItem('productoSeleccionado', producto.nombre)
        window.location.href = `ventana.html?id=${producto.id}`
      })

      slidesContainer.appendChild(slide)
    })

    totalSlides = slidesContainer.children.length
  })

// 👉 Funciones del carrusel
function showSlide(i) {
  slidesContainer.style.transform = `translateX(-${i * 100}%)`
}

// 👉 Botón siguiente
btnNext.addEventListener('click', () => {
  if (totalSlides === 0) return

  index = (index + 1) % totalSlides
  showSlide(index)
})

// 👉 Botón anterior
btnPrev.addEventListener('click', () => {
  if (totalSlides === 0) return

  index = (index - 1 + totalSlides) % totalSlides
  showSlide(index)
})

// 🔁 Auto slide
setInterval(() => {
  if (totalSlides === 0) return

  index = (index + 1) % totalSlides
  showSlide(index)
}, 6000)
