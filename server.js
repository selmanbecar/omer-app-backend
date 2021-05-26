const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8080;

app.use("/api/users", require("./routes/user-route.js"));
app.use("/api", require("./routes/auth-route.js"));
app.use("/api/posts", require("./routes/post-route"));
app.use("/api/", require("./routes/validateToken-route"));
app.use("/api/likes", require("./routes/like-route"));

app.listen(port);
