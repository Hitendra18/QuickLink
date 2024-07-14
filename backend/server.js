require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();

const router = require("./routes");

const PORT = Number(process.env.PORT) || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.send("Welcome to quick-link server!");
});

app.use("/api", router);

app.listen(PORT, () => console.log(`Server is listening on ${PORT}...`));
