const { resolve } = require("path");
const { config } = require("dotenv");

if (process.env.NODE_ENV === "test") {
  config({ path: resolve(__dirname, "../.env.test") });
} else {
  config({ path: resolve(__dirname, "../../.env") });
}
