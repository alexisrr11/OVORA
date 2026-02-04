import FAQ  from './FaqLetreros.js';

const toggleBtn = document.getElementById("chatbot-toggle");
const windowChat = document.getElementById("chatbot-window");
const sendBtn = document.getElementById("chatbot-send");
const input = document.getElementById("chatbot-input");
const messages = document.getElementById("chatbot-messages");

// Abrir / cerrar
toggleBtn.addEventListener("click", () => {
    windowChat.classList.toggle("hidden");
});

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
        if (item.keywords.some(k => clean.includes(normalize(k)))) {
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
