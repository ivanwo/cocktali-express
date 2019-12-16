const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/", routes);

const DEFAULT_PORT = 3000;

// this next bit uses either the PORT in the process.env file or the default PORT (on localhost)
const port = process.env.PORT || DEFAULT_PORT;

app.listen(port, () => {
  console.log(`Server started http://localhost:${port}`);
});