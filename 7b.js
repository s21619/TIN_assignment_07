const fs = require("fs");

fs.watch("./test/", (eventType, fileName) => {
    console.log(`File modified: ${fileName}`);
    console.log(`Changes to the file: ${eventType}`);
});