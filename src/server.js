import express from 'express';
import configViewEngine from './configs/viewEngine';
import initWebRoute from './route/web';
import initAPIRoute from './route/api';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import flash from 'connect-flash';
import socketIo from 'socket.io';  // Sử dụng `import` thay vì `require` nếu bạn dùng ES6 modules
import http from 'http';
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

// Khởi tạo sự kiện Socket.io
io.on('connection', (socket) => {
    console.log('A user connected');

    // Lắng nghe sự kiện 'chat message' từ client
    socket.on('adminOn', (userData) => {
        // Phát sự kiện 'adminOn' cho tất cả các client
        io.emit('adminOn', userData);
    });
    socket.on('adminOff', (userData) => {
        // Phát sự kiện 'adminOn' cho tất cả các client
        io.emit('adminOff', userData);
    });
    

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    // Khi người dùng ngắt kết nối
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Bắt đầu lắng nghe server
server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
