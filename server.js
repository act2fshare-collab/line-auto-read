const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const CHANNEL_ACCESS_TOKEN = "R2HMlHOlK7H6zLwFc7MMgNoQoSlBc47zHYyZIUw3GyX/h//FpCe8KJcoyld2e8R+gpSybmFkcmPlBt2MLuHQus2pBciv74kSl1gpBF4csF9qgYXyPXaw1ACv6aWZ+95e6W6CEbBpAvOIeD8oE5iXAgdB04t89/1O/w1cDnyilFU=";

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
