import { useState, useRef, useEffect } from "react";

export default function Terminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [currentPath] = useState("C:\\Users\\User");
  const [isTyping, setIsTyping] = useState(false);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(null);

  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (!isTyping) {
      inputRef.current?.focus();
    }
  }, [isTyping]);

  const typeLine = (line) => {
    return new Promise((resolve) => {
      let i = 0;

      setHistory((prev) => [...prev, { type: "output", text: [""] }]);

      const interval = setInterval(() => {
        setHistory((prev) => {
          const newHistory = [...prev];
          const lastIndex = newHistory.length - 1;

          newHistory[lastIndex] = {
            type: "output",
            text: [line.slice(0, i)],
          };

          return newHistory;
        });

        i++;

        if (i > line.length) {
          clearInterval(interval);
          resolve();
        }
      }, 15);
    });
  };

  const handleCommand = async () => {
    if (!input.trim() || isTyping) return;

    const userInput = input.trim();

    if (userInput.toLowerCase() === "clear") {
      setHistory([]);
      setInput("");
      return;
    }
    setCommandHistory((prev) => [...prev, userInput]);
    setHistoryIndex(null);

    const commandText = `${currentPath}> ${userInput}`;

    setHistory((prev) => [...prev, { type: "command", text: [commandText] }]);

    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("http://localhost:3001/api/terminal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command: userInput }),
      });

      const data = await response.json();

      for (let line of data.output) {
        await typeLine(line);
      }
    } catch (error) {
      await typeLine("Error connecting to server");
    }

    setIsTyping(false);
  };

  const renderLine = (line) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    const parts = line.split(urlRegex);

    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#4ea1ff", textDecoration: "underline" }}
          >
            {part}
          </a>
        );
      }

      return part;
    });
  };

  return (
    <div
      ref={terminalRef}
      className="terminal"
      onClick={() => inputRef.current.focus()}
    >
      {history.map((item, index) => (
        <div key={index} className="history-block">
          {item.text.map((line, i) => (
            <div
              key={i}
              className={
                item.type === "command" ? "command-line" : "output-line"
              }
            >
              {renderLine(line)}
            </div>
          ))}
        </div>
      ))}

      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ marginRight: "6px" }}>{currentPath}&gt;</span>

        <span>{input}</span>
        {!isTyping && <span className="blinking-cursor" />}

        <input
          ref={inputRef}
          value={input}
          disabled={isTyping}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleCommand();
            }

            if (e.key === "ArrowUp") {
              e.preventDefault();

              if (commandHistory.length === 0) return;

              const newIndex =
                historyIndex === null
                  ? commandHistory.length - 1
                  : Math.max(0, historyIndex - 1);

              setHistoryIndex(newIndex);
              setInput(commandHistory[newIndex]);
            }

            if (e.key === "ArrowDown") {
              e.preventDefault();

              if (historyIndex === null) return;

              const newIndex =
                historyIndex + 1 >= commandHistory.length
                  ? null
                  : historyIndex + 1;

              setHistoryIndex(newIndex);
              setInput(newIndex === null ? "" : commandHistory[newIndex]);
            }
          }}
          style={{ position: "absolute", opacity: 0 }}
          autoComplete="off"
        />
      </div>
    </div>
  );
}
