import express from "express";
import { db } from "./database/controller";

// ================================================== 

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(__dirname + "/public"));

// ================================================== 

const PORT = process.env.PORT || 8000;
db.connect()
  .then(() =>
    app.listen(PORT, () => console.log("Listening in port: " + PORT))
  )
  .catch((error: Error) => console.log(error));

// ================================================== 

