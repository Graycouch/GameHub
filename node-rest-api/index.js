const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const routeUser = require("./Routes/users");
const routeAuth = require("./Routes/auth");
const routePost = require("./Routes/posts");
const routeConversation = require("./Routes/conversations");
const routeMessage = require("./Routes/messages");
const multer = require("multer");
const path = require("path");

dotenv.config();

// Connection to MongoDB
mongoose.connect(process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log("Successfully Connected to MongoDB!");
    }
);

app.use("/images", express.static(path.join(__dirname, "public/images")));

// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    }
})

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
        return res.status(200).json("File uploaded successfully!");
    } catch (err) {
        console.log(err);
    }
})

app.use("/api/users", routeUser);
app.use("/api/auth", routeAuth);
app.use("/api/posts", routePost);
app.use("/api/conversations", routeConversation);
app.use("/api/messages", routeMessage);

// Connecting to the Backend Server
app.listen(8800,
    () => {
        console.log("Backend Server is up and  running!");
    }
);