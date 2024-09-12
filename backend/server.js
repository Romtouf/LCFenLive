const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const authRoutes = require("./routes/auth");
const Message = require("./models/Message");
const dotenv = require("dotenv");
const cron = require("node-cron");
const fs = require("fs");
const https = require("https");

dotenv.config();

const app = express();
const options = {
  key: fs.readFileSync("path/to/your/private.key"),
  cert: fs.readFileSync("path/to/your/certificate.crt"),
};

app.use(
  helmet({
    crossOriginOpenerPolicy: { policy: "same-origin" },
    originAgentCluster: true,
  })
);

app.use(
  cors({
    origin: "https://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

const server = https.createServer(options, app);
const io = new Server(server, {
  cors: {
    origin: "https://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.use(morgan("dev"));
app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to LCFenLive API");
});

io.on("connection", async (socket) => {
  console.log("a user connected");

  // Envoyer les 100 derniers messages à l'utilisateur connecté
  const lastMessages = await Message.find()
    .sort({ timestamp: -1 })
    .limit(100)
    .exec();
  socket.emit("previous_messages", lastMessages.reverse());

  socket.on("chat_message", async (msg) => {
    const message = new Message({
      username: msg.username,
      text: msg.text,
      timestamp: new Date(),
    });
    await message.save();

    // Émettre le message à tous les clients connectés
    io.emit("chat_message", msg);

    // Limiter les messages à 100
    const messageCount = await Message.countDocuments();
    if (messageCount > 50) {
      const oldestMessage = await Message.findOne()
        .sort({ timestamp: 1 })
        .exec();
      await Message.deleteOne({ _id: oldestMessage._id });
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// Tâche cron pour effacer les messages vieux de plus de 15 minutes toutes les 15 minutes
cron.schedule("*/15 * * * *", async () => {
  const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);
  const messagesToDelete = await Message.find({
    timestamp: { $lt: fifteenMinutesAgo },
  })
    .sort({ timestamp: -1 })
    .skip(30)
    .exec();
  const idsToDelete = messagesToDelete.map((message) => message._id);
  await Message.deleteMany({ _id: { $in: idsToDelete } });
  console.log("Messages older than 15 minutes deleted");
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
