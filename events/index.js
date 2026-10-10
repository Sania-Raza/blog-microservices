const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const events = [];

app.post("/events", async (req, res) => {
  const event = req.body;
  events.push(event);
  const services = [
    "http://localhost:4000/events",
    "http://localhost:4001/events",
    "http://localhost:4002/events",
    "http://localhost:4003/events",

    "http://localhost:4006/events",
    "http://localhost:4007/events",
  ];

  for (const url of services) {
    try {
      await axios.post(url, event);
    } catch (error) {
      console.error(`Failed to forward event to ${url}`);
      if (axios.isAxiosError(error)) {
        console.error(error.response?.status, error.response?.data);
      }
    }
  }

  res.status(200).send({ status: "OK" });
});

app.get('/events',(req, res)=>{
  res.send(events);
});
app.listen(4005, () => {
  console.log("Listening on 4005");
});
