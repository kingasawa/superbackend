require('dotenv').config();
const databaseService = require('./src/database/databaseService');
const express = require('express');
const cors = require('cors');
const { createServer } = require('node:http');
const appRouter = require('./src/config/routes');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path'); // Thêm dòng này để import module 'path'
const { Server } = require('socket.io');
const assembly = require('./src/api/services/assembly');

// Khởi tạo kết nối cơ sở dữ liệu khi server khởi động
databaseService.init().then();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(bodyParser.raw())
const server = createServer(app);
const io = new Server(server, {});
io.on('connection', (socket) => {
  console.log(`connect: ${socket.id}`, socket.request.headers);
  socket.on('disconnect', () => {
    console.log(`disconnect: ${socket.id}`);
  });
  socket.on('uploadFile', async (data) => {
    const { blob } = data;
    await assembly(socket, blob);
  })
});

app.use(cors({
  origin: '*'
}));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Thư mục lưu trữ tệp tải lên
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Đặt tên tệp với thời gian hiện tại để tránh trùng lặp
  }
});
const upload = multer({ storage: storage });
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const fileName = req.file.filename;
    console.log('File uploaded successfully:', fileName);
    await assembly(fileName);
    res.status(200).json({ msg: 'ok' });
  } catch (error) {
    res.status(400).json({ message: 'File upload failed!', error: error.message });
  }
});


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', appRouter);

app.use(function (req,res){
  res.status(404).send('Unable to find the requested resource!');
});

server.listen(3001, () => {
  console.log('server running at http://localhost:3001');
});
