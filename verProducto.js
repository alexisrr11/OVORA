async function cargarProducto() {
  const params = new URLSearchParams(window.location.search)
  const id = params.get('id')

  const section = document.querySelector('section')

  try {
    // Traemos ambos JSON en paralelo
    const [resProductos, resDecos] = await Promise.all([
      fetch('./productos.json'),
      fetch('./decos.json')
    ])

    const productos = await resProductos.json()
    const decoraciones = await resDecos.json()

    // Unimos los arrays
    const todos = [...productos, ...decoraciones]

    // Buscamos el producto por id
    const producto = todos.find(p => p.id == id)

    if (!producto) {
      section.innerHTML = `
        <p class="text-red-400 text-xl">❌ Producto no encontrado</p>
        <a href="index.html" class="mt-4 inline-block text-blue-400 hover:underline">
          ← Volver
        </a>
      `
      return
    }

    section.innerHTML += `
      <div class="bg-neutral-800/70 p-8 rounded-2xl shadow-xl max-w-xl w-full">
        <img id="imagenProducto" src="${producto.imagen}" 
        class="w-full h-80 object-cover rounded-xl mb-6 cursor-zoom-in">

        <h2 class="text-3xl font-bold">${producto.nombre}</h2>
        <p class="text-lime-200/70 mt-2">${producto.descripcion}</p>
        <p class="text-white/70 mt-2">${producto.medidas}</p>

        <div class="flex justify-around">
          <span class="block mt-6 text-xl font-semibold">
            <span class="text-lime-200/70">EF</span> $${producto.precio}
          </span>
          <span class="block mt-6 text-xl font-semibold">
            <span class="text-red-200/70">TR</span> $${producto.transferencia}
          </span>
        </div>

        <a href="index.html" class="mt-8 inline-block text-blue-400 hover:underline">
          ← Volver
        </a>
      </div>
    `
    // Activar zoom una vez que la imagen existe en el DOM
    const img = document.getElementById('imagenProducto');
    if (img) {
      activarZoom(img);
    }
  } catch (error) {
    console.error(error)
    section.innerHTML = `
      <p class="text-red-400 text-xl">❌ Error cargando el producto</p>
    `
  }
}

cargarProducto()


//Whatsapp
document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = this.name.value.trim();
  const producto = this.producto.value.trim();

  if (!nombre || !producto) return;

  // Número de WhatsApp
  const telefono = "541122356695";

  // Mensaje prellenado
  const mensaje = `Hola! Mi nombre es ${nombre} y estoy interesado/a en el: ${producto}`;

  // URL de WhatsApp
  const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

  window.open(url, "_blank");
  this.reset();
});

// Autocompletar producto seleccionado en WhatsApp
const productoGuardado = sessionStorage.getItem('productoSeleccionado');
if (productoGuardado) {
  const inputProducto = document.querySelector('input[name="producto"]');
  if (inputProducto) {
    inputProducto.value = productoGuardado;
  }
}

//Zoom imagenes
function activarZoom(imagen) {
  const modal = document.getElementById('modalZoom')
  const imgZoom = document.getElementById('imagenZoom')

  if (!modal || !imgZoom) {
    console.warn('⚠️ Falta modalZoom o imagenZoom en el HTML')
    return
  }

  imagen.addEventListener('click', () => {
    modal.classList.remove('hidden')
    modal.classList.add('flex')
    imgZoom.src = imagen.src
  })

  modal.addEventListener('click', () => {
    modal.classList.add('hidden')
    modal.classList.remove('flex')
  })
}
