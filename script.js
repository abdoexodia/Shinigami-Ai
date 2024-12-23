const OPENAI_API_KEY = "proj-viWH5-HIW4AFqIWjvmPeplkGAItr-0QmcFntXzSBv31g_aCDCyViM9BJXsYA";

const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");

async function sendMessage() {
    const userMessage = userInput.value.trim();
    if (!userMessage) return;

    appendMessage("You", userMessage);
    userInput.value = "";

    try {
        const response = await fetch("https://api.openai.com/v1/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "text-davinci-003",
                prompt: `You are Shinigami Ai. If someone asks "What is your name?" respond "My name is Shinigami Ai." \n\nUser: ${userMessage}`,
                max_tokens: 150
            })
        });

        const data = await response.json();
        const botMessage = data.choices[0].text.trim();

        appendMessage("Shinigami Ai", botMessage);
    } catch (error) {
        appendMessage("Error", "Unable to connect to OpenAI API.");
        console.error(error);
    }
}

function appendMessage(sender, message) {
    const messageElement = document.createElement("div");
    messageElement.textContent = `${sender}: ${message}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}
