const toggleBtn = document.getElementById("chatbot-toggle");
const windowChat = document.getElementById("chatbot-window");
const sendBtn = document.getElementById("chatbot-send");
const input = document.getElementById("chatbot-input");
const messages = document.getElementById("chatbot-messages");

// Abrir / cerrar
toggleBtn.addEventListener("click", () => {
    windowChat.classList.toggle("hidden");
});

// FAQ OVORA · Letreros y Carteles 3D
const FAQ = [
    {
        intent: "precio",
        keywords: [
            "precio", "costo", "vale", "presupuesto", "cotizacion", "sale"
        ],
        answer:
            "El precio depende del tamaño del letrero, tipografía, color y si es para interior o exterior. Como referencia: letras de hasta 22 cm, con tipografía estándar, tienen un valor aproximado de $4.500 por letra. Para algo a medida, escribinos y te armamos una cotización sin compromiso 😊"
    },
    {
        intent: "materiales",
        keywords: [
            "material", "materiales", "plastico", "resistente", "abs", "pla", "exterior", "interior"
        ],
        answer:
            "Usamos impresión 3D con materiales específicos según el uso: PLA para interior y ABS para exterior, ya que es más resistente a la intemperie."
    },
    {
        intent: "envios_instalacion",
        keywords: [
            "envio", "entrega", "retiran", "retiro", "instalacion", "colocacion"
        ],
        answer:
            "Realizamos envíos gratis en zona sur. La instalación es tercerizada: contamos con instaladores profesionales de total confianza. El costo de instalación depende del instalador y del trabajo a realizar."
    },
    {
        intent: "luz",
        keywords: [
            "luz", "iluminado", "led", "luminaria", "con luz", "iluminaciones", "luminoso"
        ],
        answer:
            "Sí 💡 Nuestros instaladores ofrecen el servicio de agregado de luminaria en los letreros, ideal si buscás mayor visibilidad."
    },
    {
        intent: "tiempos",
        keywords: [
            "tiempo", "demora", "tardan", "cuando", "listo"
        ],
        answer:
            "Los tiempos de producción varían según el diseño y el tamaño del letrero. Una vez definido el proyecto, te indicamos el plazo estimado."
    },
    {
        intent: "agradecimiento",
        keywords: [
            "gracias", "chau", "hasta luego", "adios"
        ],
        answer:
            "¡Gracias por contactarte con OVORA! 💚 Cuando quieras, escribinos y te ayudamos a darle visibilidad a tu negocio con un letrero 3D."
    },
    {
        intent: "ubicacion",
        keywords: [
            "donde estan",
            "ubicacion",
            "de donde son",
            "zona",
            "local",
            "direccion"
        ],
        answer:
            "Estamos en San José, Temperley (Zona Sur). Trabajamos principalmente por encargo y con envíos 🙂"
    },
    {
        intent: "contacto",
        keywords: [
            "contacto",
            "comunicarme",
            "whatsapp",
            "hablar",
            "mensaje",
            "hacer una consulta"
        ],
        answer:
            "Podés comunicarte haciendo click en \"Ver más\" en cualquier letrero que te interese. Al final de la página vas a encontrar un formulario que se envía directo a nuestro WhatsApp 😊"
    }

];


function normalize(text) {
    if (!text) return "";

    return text
        .toString()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

function getBotResponse(text) {
    const clean = normalize(text);

    for (const item of FAQ) {
        if (item.keywords.some(k => clean.includes(k))) {
            return item.answer;
        }
    }

    return "Puedo ayudarte con precios, materiales, envíos o trabajos personalizados 😊";
}

// Enviar mensaje
function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    input.value = "";

    setTimeout(() => {
        const reply = getBotResponse(text);
        addMessage(reply, "bot");
    }, 400);
}

sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keypress", e => {
    if (e.key === "Enter") sendMessage();
});

function addMessage(text, role) {
    const div = document.createElement("div");
    div.className =
        role === "user"
            ? "bg-lime-400 text-black p-2 rounded-lg ml-auto max-w-[85%]"
            : "bg-neutral-800 p-2 rounded-lg max-w-[85%]";
    div.textContent = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
}
