require("dotenv").config();
const app = require("./app");
require("./models/user.model");
require("./database");

async function main() {
  await app.listen(app.get("port"));
  console.log("server is running " + app.get("port"));
}
main();
