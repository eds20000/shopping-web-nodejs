import express from 'express';
import configViewEngine from './configs/viewEngine';
import initWebRoute from './route/web';
import initAPIRoute from './route/api';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import flash from 'connect-flash';
import socketIo from 'socket.io';  // Sử dụng `import` thay vì `require` nếu bạn dùng ES6 modules
import http from 'http';
import pool from './configs/connectDB';

require('dotenv').config();
var morgan = require('morgan');

const app = express();
const port = process.env.PORT || 8080; // connect file env

// Tạo server HTTP trước rồi kết nối với Socket.io
const server = http.createServer(app);
const io = socketIo(server); // Kết nối socket.io với server HTTP

app.use((req, res, next) => {
    console.log('>>> run into my middleware');
    console.log(req.method);
    next();
});

app.use(morgan('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: 'user',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(cookieParser());
// Sử dụng flash
app.use(flash());

// Cấu hình middleware để truyền flash messages vào response locals
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

// setup view engine
configViewEngine(app);

//init web route
initWebRoute(app);

// init api route
initAPIRoute(app);

//handle 404 not found
app.use((req, res) => {
    return res.render('404.ejs');
});
// Bắt đầu lắng nghe server
try {
    server.listen(3001, () => {
        console.log('Server is running at http://localhost:3001');
    });
} catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1); // Dừng ứng dụng nếu gặp l
}
// Khởi tạo sự kiện Socket.io

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Xử lý người dùng tham gia phòng chat
    socket.on('joinRoom', async (userData) => {
        const roomId = `room-${userData.userId}`;
        socket.join(roomId);
        console.log(`${userData.userName} joined room: ${roomId}`);

        // Tải lịch sử tin nhắn từ cơ sở dữ liệu
        const [chatHistory] = await pool.query(
            'SELECT * FROM chat_history WHERE room_id = ? ORDER BY timestamp ASC',
            [roomId]
        );
        socket.emit('loadChatHistory', chatHistory);
    });
    socket.on('adminJoinRoom', async (userData) => {
        const roomId = userData.roomId;
        socket.join(roomId);
        console.log(`admin ${userData.userName} joined room: ${roomId}`);

        // Tải lịch sử tin nhắn từ cơ sở dữ liệu
        const [chatHistory] = await pool.query(
            'SELECT * FROM chat_history WHERE room_id = ? ORDER BY timestamp ASC',
            [roomId]
        );

        socket.emit('loadChatHistory', chatHistory);
    });

    // Xử lý admin online
    socket.on('adminOn', (adminData) => {
        socket.admin = true; // Đánh dấu socket này là của admin
        io.emit('adminOn', adminData); // Phát sự kiện admin online tới tất cả các client
        console.log(`Admin ${adminData.userName} is online`);
    });

    // Xử lý admin offline
    socket.on('adminOff', (adminData) => {
        io.emit('adminOff', adminData);
        console.log(`Admin ${adminData.userName} is offline`);
    });

    // Xử lý admin gửi tin nhắn tới người dùng
    socket.on('adminMessage', async (messageData) => {
        const { roomId, senderName, senderId,senderRole, message, timestamp } = messageData;

        // Lưu tin nhắn vào cơ sở dữ liệu
        await pool.query(
            'INSERT INTO chat_history (room_id, sender_name, sender_id,sender_role, message, timestamp) VALUES (?, ?, ?, ?, ?, ?)',
            [roomId, senderName, senderId,senderRole, message, timestamp]
        );

        // Gửi tin nhắn tới phòng cụ thể
        io.to(roomId).emit('chat message', {
            senderName,
            senderId,
            senderRole,
            message,
            timestamp,
        });
    });

    // Xử lý người dùng gửi tin nhắn tới admin
    socket.on('chat message', async (messageData) => {
        const { roomId, sender_name, senderId,senderRole, message, timestamp } = messageData;

        // Lưu tin nhắn vào cơ sở dữ liệu
        await pool.query(
            'INSERT INTO chat_history (room_id, sender_name, sender_id, sender_role, message, timestamp) VALUES (?, ?, ?, ?, ?, ?)',
            [roomId, sender_name, senderId,senderRole, message, timestamp]
        );

        // Gửi tin nhắn tới phòng cụ thể
        io.to(roomId).emit('chat message', {
            roomId,
            sender_name,
            senderId,
            senderRole,
            message,
            timestamp,
        });
    });

    // Xử lý khi admin hoặc người dùng ngắt kết nối
    socket.on('disconnect', () => {
        if (socket.admin) {
            console.log('Admin disconnected:', socket.id);
            io.emit('adminOff');
        } else {
            console.log('A user disconnected:', socket.id);
        }
    });
});




