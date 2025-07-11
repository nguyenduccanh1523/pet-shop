import express from 'express'
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors'
import initRoutes from './src/routes/index.js'
import connectDatabase from './src/config/connectDatabase.js';
import http from 'http' // 👈 Thêm dòng này
import { Server } from 'socket.io' // 👈 Thêm dòng này

const app = express()
const server = http.createServer(app); // 👈 Tạo server từ http

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:4001',
        methods: ['GET', 'POST'],
        credentials: true,
    }
});

io.on('connection', (socket) => {

    // Nhận userId và gán socket vào phòng tương ứng
    socket.on('register', (userId) => {
        socket.join(userId);
    });

    // Nhận và gửi tin nhắn real-time
    socket.on('send_message', ({ toUserId, message }) => {
        io.to(toUserId).emit('receive_message', message);
    });

    socket.on("typing", ({ conversationId, fromUserId, toUserId }) => {
        io.to(toUserId).emit("user_typing", { conversationId, fromUserId });
    });


    // Gửi notification
    socket.on('send_notification', ({ toUserId, notification }) => {
        io.to(toUserId).emit("receive_notification", notification);
    });

    socket.on('disconnect', () => {
    });
});

io.on("connection_error", (err) => {
    console.log(err);
});


app.use(cors({
    origin: 'http://localhost:4001',
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}))

// app.options('*', cors({
//     origin: 'http://localhost:4001',
//     credentials: true,
//     allowedHeaders: ['Content-Type', 'Authorization']
// }));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

initRoutes(app)
connectDatabase()

app.get('/', (req, res) => {
    res.send('Server is running with Socket.IO');
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`🚀 Server & Socket.IO running on port ${PORT}`);
});