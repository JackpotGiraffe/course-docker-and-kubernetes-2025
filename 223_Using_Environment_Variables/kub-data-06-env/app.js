const path = require('path');
const fs = require('fs');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// 原本以 hardcoded 的方式指定資料夾
// 改為用環境變數指定，如此一來只要透過 k8s 的 ConfigMap 就能輕鬆變更
const filePath = path.join(__dirname, process.env.STORY_FOLDER, 'text.txt');

app.use(bodyParser.json());

app.get('/story', (req, res) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to open file.' });
    }
    res.status(200).json({ story: data.toString() });
  });
});

app.post('/story', (req, res) => {
  const newText = req.body.text;
  if (newText.trim().length === 0) {
    return res.status(422).json({ message: 'Text must not be empty!' });
  }
  fs.appendFile(filePath, newText + '\n', (err) => {
    if (err) {
      return res.status(500).json({ message: 'Storing the text failed.' });
    }
    res.status(201).json({ message: 'Text was stored!' });
  });
});

app.get('/error', () => {
  process.exit(1);
});

app.listen(3000);
