import app from "./src/app";
import { sequelize as db } from "./src/config/db";

db.sync({ force: false }).then(() => {
  app.listen(3001, () => {
    console.log("Server listening at 3001");
  });
});
