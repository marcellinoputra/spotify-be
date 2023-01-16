const musicModel = require('../model/music.model');

async function getMusic(req, res) {
  const music = await musicModel.Music.findAll();
  res.status(200).send({
    status: 200,
    data: music,
    message: 'Successfully Get List Music',
  });
}

async function postMusic(req, res) {
  
  const addMusic = await musicModel.Music.create({
    cover: req.files.cover[0].path,
    song: req.files.song[0].path,
    title: req.body.title,
    artist: req.body.artist,
    description: req.body.description,
    liked: req.body.liked,
  });

  res.status(201).send({
    status: 201,
    data: addMusic,
    message: 'Berhasil Menambahkan Lagu',
  });
}

module.exports = {
  getMusic,
  postMusic,
};
