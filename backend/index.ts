import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import searchRoutes from "./routes/search";
import suggestRoutes from "./routes/suggestRoutes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/search", searchRoutes);
app.use("/suggest", suggestRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
