import express from "express";
import cors from "cors";
import terminalRoutes from "./routes/terminal.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", terminalRoutes);

app.listen(3001, () => {
  console.log("Backend running on http://localhost:3001");
});
