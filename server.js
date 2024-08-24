const express = require('express');
const cors = require('cors');
const { createServer } = require('node:http');
const appRouter = require('./src/config/routes');
const multer = require('multer');
const path = require('path'); // Thêm dòng này để import module 'path'
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:8081',
    methods: ['GET', 'POST']
  },
  transports: ['websocket'] // Ép buộc sử dụng WebSocket
});

app.use(cors({
  origin: 'http://localhost:8081' // Hoặc bạn có thể dùng '*' để cho phép tất cả các nguồn
}));

app.get('/api', (req, res) => {
  io.emit('speech', 'call api speech');
  res.json({ message: 'super backend' });
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Thư mục lưu trữ tệp tải lên
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Đặt tên tệp với thời gian hiện tại để tránh trùng lặp
  }
});
const upload = multer({ storage: storage });
app.post('/upload', upload.single('file'), (req, res) => {
  try {
    res.status(200).json({ message: 'File uploaded successfully!', file: req.file });
  } catch (error) {
    res.status(400).json({ message: 'File upload failed!', error: error.message });
  }
});

app.use(function (req,res){
  res.status(404).send('Unable to find the requested resource!');
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});
