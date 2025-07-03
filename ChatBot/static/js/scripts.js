function sendMessage() {
    const inputField = document.getElementById("user-input");
    const message = inputField.value.trim();
    if (!message) return;

    const chatBox = document.getElementById("chat-box");
    const userMsg = document.createElement("div");
    userMsg.className = "user-msg";
    userMsg.textContent = message;
    chatBox.appendChild(userMsg);

    fetch("/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: message })
    })
    .then(res => res.json())
    .then(data => {
        const botMsg = document.createElement("div");
        botMsg.className = "bot-msg";
        botMsg.textContent = data.reply;
        chatBox.appendChild(botMsg);
        chatBox.scrollTop = chatBox.scrollHeight;
    });

    inputField.value = "";
}

window.onload = () => {
    const chatBox = document.getElementById("chat-box");
    const welcome = document.createElement("div");
    welcome.className = "welcome-msg";
    welcome.textContent = "Hello User! Welcome to your Chatbot!";
    chatBox.appendChild(welcome);

    // 🔑 Add Enter key support
    document.getElementById("user-input").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            sendMessage();
        }
    });
};
