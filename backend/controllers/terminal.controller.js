import { processCommand } from "../services/terminal.service.js";

export const handleTerminalCommand = (req, res) => {
  const { command } = req.body;

  if (!command || typeof command !== "string") {
    return res.status(400).json({
      output: ["Invalid command"]
    });
  }

  const output = processCommand(command.trim());

  res.json({ output });
};
