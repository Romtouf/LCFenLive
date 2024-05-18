const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const authRoutes = require("./routes/auth");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("chat message", (msg) => {
    if (typeof msg === "object" && msg.text && msg.username) {
      console.log("message: " + msg.text + ", username: " + msg.username);
      io.emit("chat message", msg);
    } else {
      console.log("Invalid message format received");
    }
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
