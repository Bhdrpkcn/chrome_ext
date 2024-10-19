import { GoogleGenerativeAI } from "@google/generative-ai";
import React, { useState, useEffect, useRef } from "react";

const ChatBox = () => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    []
  );
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const fetchGeminiResponse = async (userMessage: string) => {
    setLoading(true);

    const genAI = new GoogleGenerativeAI(
      import.meta.env.VITE_GEMINI_AI_API_KEY
    );
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = userMessage;
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "ai", text: text },
      ]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "ai", text: "Error: Could not reach the AI service." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages([...messages, { sender: "user", text: input }]);

    fetchGeminiResponse(input);

    setInput("");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        border: "1px solid gray",
        backgroundColor: "#f4f4f4",
      }}
    >
      {/* Messages container with auto-scroll */}
      <div
        ref={chatContainerRef}
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.sender === "user" ? "right" : "left",
              marginBottom: "8px",
            }}
          >
            <span
              style={{
                background: msg.sender === "user" ? "#007bff" : "#e9e9e9",
                color: msg.sender === "user" ? "#fff" : "#000",
                padding: "8px 12px",
                borderRadius: "12px",
                display: "inline-block",
              }}
            >
              {msg.text}
            </span>
          </div>
        ))}

        {/* Display loading message when fetching */}
        {loading && (
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <span>Loading...</span>
          </div>
        )}
      </div>

      {/* Input section fixed at the bottom */}
      <div
        style={{
          display: "flex",
          padding: "10px",
          backgroundColor: "#fff",
          borderTop: "1px solid #ccc",
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask the AI..."
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "20px",
            border: "1px solid #ccc",
            outline: "none",
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            marginLeft: "10px",
            padding: "10px",
            borderRadius: "20px",
          }}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
