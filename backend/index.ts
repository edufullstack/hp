import app from "./src/app.ts";
import { sequelize as db } from "./src/config/db.ts";

db.sync({ force: true }).then(() => {
  app.listen(3001, () => {
    console.log("Server listening at 3001");
  });
});
