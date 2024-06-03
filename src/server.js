import express from "express";
import bodyParser from "body-parser";
import initWebRoute from "./routes/routes";
import connectDB from "./config/connectDB";
const cors = require("cors");
import cookieParser from "cookie-parser";
require("dotenv").config();

let app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

initWebRoute(app);
connectDB.connectDB();

let port = process.env.PORT || 8080;

app.listen(port, () => {
  //callback
  console.log("Back-end NodeJS is running on the port: " + port);
});
