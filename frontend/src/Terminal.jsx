import { useState, useRef, useEffect } from "react";

export default function Terminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleCommand = async () => {
    if (!input.trim()) return;

    try {
      const response = await fetch("http://localhost:3001/api/terminal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ command: input }),
      });

      const data = await response.json();

      setHistory((prev) => [
        ...prev,
        { type: "command", text: input },
        { type: "output", text: data.output },
      ]);

      setInput("");
    } catch (error) {
      setHistory((prev) => [
        ...prev,
        { type: "command", text: input },
        { type: "output", text: ["Error connecting to server"] },
      ]);
    }
  };

  return (
    <div className="terminal" onClick={() => inputRef.current.focus()}>
      {history.map((item, index) => (
        <div key={index}>
          {item.type === "command" && <div>$ {item.text}</div>}
          {item.type === "output" &&
            item.text.map((line, i) => <div key={i}>{line}</div>)}
        </div>
      ))}

      <div>
        ${" "}
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleCommand();
            }
          }}
          autoComplete="off"
        />
      </div>
    </div>
  );
}
