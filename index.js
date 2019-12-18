const express = require("express");
const api = require("./src/api");
const path = require("path");
const app = express();

require("run-middleware")(app);

// accessToken 获取token
app.get('/getAccessToken', (req, res) => {
  api.accessToken(req, res);
});

// 获取 jsapi_ticket 临时票据
app.get("/getTicket", (req, res) => {
  app.runMiddleware("/getAccessToken", function (code, body, headers) {
    const result = JSON.parse(body);
    console.log("User token:", result.access_token);
    api.jsapiTicket(result.access_token, res);
  });
});


// 获取 jsapi_ticket 临时票据
app.get('/getSdkSign', (req, res) => {
  const params = {};
  console.log(req.query)
  params.url = req.query.url;
  /***
   * runMiddleware 请求别的 endPoint 获取 jsapi_ticket
   */
  app.runMiddleware('/getTicket', function (code, body, headers) {
    const result = JSON.parse(body);
    console.log('User ticket:', result.ticket);
    params.ticket = result.ticket;
    api.createSign(params, res);
  });
});

app.listen(3000);
console.log("已在3000端口运行");