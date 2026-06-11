async function runChat(prompt) {
    const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${import.meta.env.VITE_API_KEY}`
            },
            body: JSON.stringify({
                model: "llama-3.1-8b-instant",
                messages: [{ role: "user", content: prompt }]
            })
        }
    );
    const data = await response.json();
    return data.choices[0].message.content;
}

export default runChat;