import app from "./app.js";
import { dbConnect } from "./database/dbConnect.js";

const port = process.env.PORT || 8000;

dbConnect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Listening at Port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
