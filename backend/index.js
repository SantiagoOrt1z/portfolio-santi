import express from "express";
import cors from "cors";
import terminalRoutes from "./routes/terminal.route.js";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api", terminalRoutes);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
