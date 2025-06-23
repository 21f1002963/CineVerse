const bcrypt = require("bcrypt");
const UserModel = require("../MODEL/UserModel");
require("./connectWithDB");

async function UpdateModelUtil(model) {
    if (!model) {
        console.error("Model is required");
        process.exit(1);
    }
    try {
        const allTheElements = await model.find();
        for (let i = 0; i < allTheElements.length; i++) {
            let entity = allTheElements[i];
            entity.password = await bcrypt.hash(entity.password, 10);
            await entity.save();
        }
    } catch (err) {
        console.error("Migration error:", err);
        process.exit(1);
    }
}

UpdateModelUtil(UserModel).then(() => {
    console.log("Task is done");
}).catch(console.log);


