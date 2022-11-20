const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");


const app = express();

app.use(bodyParser.urlencoded({ extended: true })).use(bodyParser.json());


app.use(cors());

require("./configs/database/mongo-db"); 



const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});