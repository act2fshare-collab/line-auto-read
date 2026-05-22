const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const CHANNEL_ACCESS_TOKEN = "ここにアクセストークン";

app.post("/webhook", async (req, res) => {

  const events = req.body.events;

  for (const event of events) {

    if (
      event.type === "message" &&
      event.message.markAsReadToken
    ) {

      try {

        await axios.post(
          "https://api.line.me/v2/bot/chat/markAsRead",
          {
            markAsReadToken:
              event.message.markAsReadToken
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization:
                `Bearer ${CHANNEL_ACCESS_TOKEN}`
            }
          }
        );

        console.log("既読成功");

      } catch (err) {
        console.log(err.response?.data || err);
      }
    }
  }

  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log("START");
});
