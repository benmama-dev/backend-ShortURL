const express = require("express");
require('dotenv').config()
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection(process.env.DATABASE_URL);

app.get("/lists", (req, res) => {
  db.query("SELECT * FROM lists", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/create", (req, res) => {
  const longurl = req.body.longurl;
  const shorturlid = req.body.shorturlid;
  const count = req.body.count;

  db.query(
    "INSERT INTO lists (longurl, shorturlid, count) VALUES (?, ?, ?)",
    [longurl, shorturlid, count],
    (err, result) => {
      if (err) {
        console.error(err);
      } else {
        res.send("Values inserted");
      }
    }
  );
});

app.put("/updateurlcount", (req, res) => {
  const shorturlid = req.body.shorturlid;

  db.query(
    "UPDATE lists SET count = count + 1 WHERE shorturlid = ?",
    [shorturlid],
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.send("URL count updated successfully");
      }
    }
  );
});

app.listen("5000", () => {
  console.log("Server is Running post 5000");
});
