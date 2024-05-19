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

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
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
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

io.on("connection", async (socket) => {
  console.log("a user connected");

  // Envoyer les 100 derniers messages à l'utilisateur connecté
  const lastMessages = await Message.find()
    .sort({ timestamp: -1 })
    .limit(100)
    .exec();
  socket.emit("previous_messages", lastMessages.reverse());

  socket.on("chat_message", async (msg) => {
    const message = new Message({ username: msg.username, text: msg.text });
    await message.save();

    // Émettre le message à tous les clients connectés
    io.emit("chat_message", msg);

    // Limiter les messages à 100
    const messageCount = await Message.countDocuments();
    if (messageCount > 100) {
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

// Tâche cron pour effacer les messages vieux de plus de 3 heures toutes les 3 heures
cron.schedule("0 */3 * * *", async () => {
  const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000);
  await Message.deleteMany({ timestamp: { $lt: threeHoursAgo } });
  console.log("Messages older than 3 hours deleted");
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
