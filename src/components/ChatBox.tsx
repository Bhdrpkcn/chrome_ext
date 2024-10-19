import React, { useRef, useEffect } from "react";
import { useApiStore } from "../store/api/apiStore";

const ChatBox = () => {
  const { messages, input, loading, setInput, sendMessage } = useApiStore();
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

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

        {loading && <div>Loading...</div>}
      </div>

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
