import fs from "fs";
import path from "path";

// if (!fs.existsSync(UPLOAD_DIR)) {
//   fs.mkdirSync(UPLOAD_DIR, { recursive: true });
// }

const accessLogStream = fs.createWriteStream(path.join("storage", "http.log"), {
  flags: "a",
});
