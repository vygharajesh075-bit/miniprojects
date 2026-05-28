const API_KEY = "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\
"; // ⚠️ put your key here

async function sendMessage() {
    let input = document.getElementById("chatInput");
    let chatBox = document.getElementById("chatBox");

    if (!input.value.trim()) return;

    let userText = input.value;

    // USER MESSAGE
    let userMsg = document.createElement("div");
    userMsg.innerText = "You: " + userText;
    chatBox.appendChild(userMsg);

    input.value = "";

    // BOT MESSAGE
    let botMsg = document.createElement("div");
    botMsg.innerText = "AI: Thinking...";
    chatBox.appendChild(botMsg);

    try {
        let res = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [{ role: "user", content: userText }]
            })
        });

        let data = await res.json();
        let reply = data.choices[0].message.content;

        botMsg.innerText = "AI: " + reply;

    } catch (err) {
        botMsg.innerText = "AI: Error connecting ⚠️";
    }
}