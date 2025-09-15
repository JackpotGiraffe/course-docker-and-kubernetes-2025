const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios').default;
const mongoose = require('mongoose');

const Favorite = require('./models/favorite');

const app = express();

app.use(bodyParser.json());

app.get('/favorites', async (req, res) => {
  const favorites = await Favorite.find();
  res.status(200).json({
    favorites: favorites,
  });
});

app.post('/favorites', async (req, res) => {
  const favName = req.body.name;
  const favType = req.body.type;
  const favUrl = req.body.url;

  try {
    if (favType !== 'movie' && favType !== 'character') {
      throw new Error('"type" should be "movie" or "character"!');
    }
    const existingFav = await Favorite.findOne({ name: favName });
    if (existingFav) {
      throw new Error('Favorite exists already!');
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  const favorite = new Favorite({
    name: favName,
    type: favType,
    url: favUrl,
  });

  try {
    await favorite.save();
    res
      .status(201)
      .json({ message: 'Favorite saved!', favorite: favorite.toObject() });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

app.get('/movies', async (req, res) => {
  try {
    // API url有可能隨時間遞移改變，run此demo前請先確認
    const response = await axios.get('https://swapi.py4e.com/api/films/');
    res.status(200).json({ movies: response.data });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

app.get('/people', async (req, res) => {
  try {
    // API url有可能隨時間遞移改變，run此demo前請先確認
    const response = await axios.get('https://swapi.py4e.com/api/people/');
    res.status(200).json({ people: response.data });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

// app.listen(3000);

// 當local machine沒有安裝MongoDB時，以下連線會失敗
// 可暫時不加入local machine的DB相關功能
// 僅對外聆聽port number 3000提供Containers to WWW的服務(Line 70需取消註解)

mongoose.connect(
  // 假設MongoDB由Local Machine提供服務及管理
  // 可以將連線字串domain用以下方式取代
  // 1. "localhost"字串
  // 2. Local Machine的IP Address
  // 3. host.docker.internal
  // 'mongodb://<localhost|local-machine-ip|host.docker.internal>:27017/swfavorites',

  // 當使用dockerized MongoDB container時，必須將domain改為mongodb所位於的container的ip
  // 'mongodb://172.17.0.2:27017/swfavorites',

  // 上面這樣的做法畢竟毫無效率及彈性，必須每次先啟動db container後，即時查詢ip address才能做對應的更動
  // 更加優雅的方法是事先建立一個自訂bridge network，並讓app container及db container都加入此network
  // 這樣就可以直接用container name當domain來連線，docker會自行將container name解析成正確的ip address
  'mongodb://favorite-db:27017/swfavorites',

  { useNewUrlParser: true },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(3000);
    }
  }
);
