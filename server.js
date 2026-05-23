const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Server is alive ✅");
});

const CHANNEL_ACCESS_TOKEN =
process.env.CHANNEL_ACCESS_TOKEN;
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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`START PORT ${PORT}`);
});
