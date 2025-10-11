const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());

app.post('/signup', async (req, res) => {
  // It's just a dummy service - we don't really care for the email
  const email = req.body.email;
  const password = req.body.password;

  if (
    !password ||
    password.trim().length === 0 ||
    !email ||
    email.trim().length === 0
  ) {
    return res
      .status(422)
      .json({ message: 'An email and password needs to be specified!' });
  }

  try {
    // const hashedPW = 'dummy text'; // 只有 users service 時先用 dummy text 代替，目前 demo 暫時不發真的 request 到 auth service
    // since it's a dummy service, we don't really care for the hashed-pw either

    // 當 users service 的 k8s config 設定完成，並且有實際連至 auth service 時，就可以用下面這行，並且將 auth-api 的 k8s 相關設定建置好
    // 在沒有使用 k8s 建置前，可以直接使用 docker-compose 的 service name 當作 hostname
    // const hashedPW = await axios.get(`http://${process.env.AUTH_ADDRESS}/hashed-password/` + password);
    
    // 當建置將 auth-api 獨立成一個 pod 之後，就需要用 service name 當作 hostname
    // 此時 k8s 提供了一個方便的 pattern，只要將宣告好 service name 做適當的變更即可，這個是 k8s 自動注入的環境變數
    // e.g. auth-service 變成 AUTH_SERVICE_SERVICE_HOST
    const hashedPW = await axios.get(`http://${process.env.AUTH_SERVICE_SERVICE_HOST}/hashed-password/` + password);
    console.log(hashedPW, email);
    res.status(201).json({ message: 'User created!' });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: 'Creating the user failed - please try again later.' });
  }
});

app.post('/login', async (req, res) => {
  // It's just a dummy service - we don't really care for the email
  const email = req.body.email;
  const password = req.body.password;

  if (
    !password ||
    password.trim().length === 0 ||
    !email ||
    email.trim().length === 0
  ) {
    return res
      .status(422)
      .json({ message: 'An email and password needs to be specified!' });
  }

  // normally, we'd find a user by email and grab his/ her ID and hashed password
  const hashedPassword = password + '_hash';
  // 當 users service 的 k8s config 設定完成，並且有實際連至 auth service 時，就可以用下面這行，並且將 auth-api 的 k8s 相關設定建置好
  const response = await axios.get(
    `http://${process.env.AUTH_ADDRESS}/token/` + hashedPassword + '/' + password
  );
  // 同樣先用 dummy response 代替，目前 demo 暫時不發真的 request 到 auth service
  // const response = { status: 200, data: { token: 'abc' } };
  if (response.status === 200) {
    return res.status(200).json({ token: response.data.token });
  }
  return res.status(response.status).json({ message: 'Logging in failed!' });
});

app.listen(8080);
