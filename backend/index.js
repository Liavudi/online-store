const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const sessions = require("express-session");
app.use(bodyParser.urlencoded({ extended: true })).use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);
app.use(cookieParser());
const oneDay = 1000 * 60 * 60 * 24;
app.use(
  sessions({
    secret: "secret key",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);

require("./configs/database/mongo-db");
require("./startup/routes")(app);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
