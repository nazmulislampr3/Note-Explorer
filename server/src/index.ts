import dotenv from "dotenv";
dotenv.config();
//
import connectMongo from "./db/connectMongo";
import app from "./app";
import "./utils/cloudinary/cloudinary";
import "./utils/mailer/transporter.mailer";

const port = process.env.PORT || 5000;

connectMongo().then(() => {
  app.listen(Number(port), "0.0.0.0", () =>
    console.log(`Server is running on http://localhost:${port}`)
  );
});
