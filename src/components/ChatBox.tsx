import React, { useRef, useEffect } from "react";

import { useApiStore } from "../store/api/apiStore";

import "../styles/style.scss";

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
    <div className="chat-box">
      <div ref={chatContainerRef} className="chat-box-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${
              msg.sender === "user" ? "user-message" : "ai-message"
            }`}
          >
            <span>{msg.text}</span>
          </div>
        ))}

        {loading && <div className="loading">Loading...</div>}
      </div>

      <div className="chat-box-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask the AI..."
        />
        <button onClick={sendMessage} disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
