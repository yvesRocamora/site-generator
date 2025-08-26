import React, { useState } from "react";

function Sidebar({ onPrompt, chatHistory, onChat }) {
  const [prompt, setPrompt] = useState("");
  const [chatInput, setChatInput] = useState("");

  return (
    <div className="flex h-screen w-80 flex-col bg-gray-100 p-4">
      <h2 className="mb-4 text-xl font-bold">Générateur de site</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onPrompt(prompt);
        }}
        className="mb-6"
      >
        <label className="mb-2 block font-semibold">Prompt :</label>
        <textarea
          className="mb-2 w-full rounded border p-2"
          rows={3}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          type="submit"
          className="w-full rounded bg-blue-600 px-4 py-2 text-white"
        >
          Générer
        </button>
      </form>
      <div className="mb-2 flex-1 overflow-y-auto">
        <h3 className="mb-2 font-semibold">Chat</h3>
        <div className="space-y-2">
          {chatHistory.map((msg, i) => (
            <div
              key={i}
              className={msg.role === "user" ? "text-right" : "text-left"}
            >
              <span
                className={
                  msg.role === "user"
                    ? "inline-block rounded bg-blue-200 px-2 py-1"
                    : "inline-block rounded bg-gray-300 px-2 py-1"
                }
              >
                {msg.content}
              </span>
            </div>
          ))}
        </div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onChat(chatInput);
          setChatInput("");
        }}
        className="flex"
      >
        <input
          className="flex-1 rounded-l border p-2"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          placeholder="Message au LLM..."
        />
        <button
          type="submit"
          className="rounded-r bg-blue-600 px-4 py-2 text-white"
        >
          Envoyer
        </button>
      </form>
    </div>
  );
}

function MainView({ html }) {
  return (
    <div className="h-screen flex-1 overflow-auto bg-white">
      <iframe
        title="Résultat"
        className="h-full w-full border-0"
        srcDoc={html}
        sandbox="allow-scripts allow-forms"
      />
    </div>
  );
}

async function fetchLLM(prompt) {
  const apiKey = import.meta.env.VITE_MISTRAL_API_KEY;
  const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "mistral-medium", // ou mistral-small, mistral-large selon ton accès
      messages: [
        {
          role: "system",
          content:
            "Tu es un générateur de code HTML Tailwind. Quand tu ajoutes des images, utilise uniquement des balises <img> avec des URLs d’images libres de droits (exemple : https://images.unsplash.com/...). N’utilise pas de balises <img> sans src ou de génération d’images IA.",
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 1024,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    console.log(await response.text());
    throw new Error("Erreur lors de la requête LLM (Mistral)");
  }

  const data = await response.json();
  // Pour Mistral, le texte généré est dans data.choices[0].message.content
  return data.choices[0].message.content;
}

export default function App() {
  const [generatedHtml, setGeneratedHtml] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handlePrompt = async (prompt) => {
    setChatHistory((h) => [...h, { role: "user", content: prompt }]);
    try {
      const html = await fetchLLM(prompt);
      console.log(html);
      setGeneratedHtml(html);
    } catch (e) {
      setGeneratedHtml(
        `<div style="color:red;padding:2rem;">${e.message}</div>`,
      );
    }
  };

  const handleChat = async (message) => {
    setChatHistory((h) => [...h, { role: "user", content: message }]);
    // Ici, tu peux appeler fetchLLM ou une autre fonction pour le chat
    setChatHistory((h) => [
      ...h,
      { role: "assistant", content: "Réponse simulée du LLM." },
    ]);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        onPrompt={handlePrompt}
        chatHistory={chatHistory}
        onChat={handleChat}
      />
      <MainView html={generatedHtml} />
    </div>
  );
}
