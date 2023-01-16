const express = require('express');
const musicController = require('./controller/music.handler');
const authContoller = require('./controller/users.handler');
const authToken = require('./middleware/auth');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();
const port = 3000;
const path = require('path');

const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'storage/avatar/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
  },
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'cover') {
      cb(null, 'storage/cover/');
    } else if (file.fieldname === 'song') {
      cb(null, 'storage/music/');
    }
  },
  filename: (req, file, cb) => {
    if (file.fieldname === 'cover') {
      cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
    } else if (file.fieldname === 'song') {
      cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
    }
  },
});

const uploadAvatar = multer({
  storage: avatarStorage,
});

const upload = multer({
  storage: storage,
});

const cpUpload = upload.fields([
  {
    name: 'cover',
    maxCount: 1,
  },
  {
    name: 'song',
    maxCount: 1,
  },
]);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use('/song', express.static('storage/music'));

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello Word');
});

app.get('/api/music', musicController.getMusic);

app.post('/api/signin', authContoller.signin);
app.post('/api/signup', uploadAvatar.single('avatar'), authContoller.signup);
app.post(
  '/api/music/add-music',
  cpUpload,
  authToken.authenticateToken,
  musicController.postMusic
);
app.listen(port, () => {
  console.log(`Running On Port: ${port}`);
});
