import express from "express";
import cors from "cors";
import terminalRoutes from "./routes/terminal.route.js";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: ["http://localhost:5173", "https://portfolio-santi.vercel.app/"],
    methods: ["GET", "POST"],
    credentials: true,
  }),
);
app.use(express.json());

app.use("/api", terminalRoutes);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
