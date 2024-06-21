import app from "./src/app.js";
import { sequelize as db } from "./src/config/db.js";

db.sync({ force: false }).then(() => {
  app.listen(3001, () => {
    console.log("Server listening at 3001");
  });
});
