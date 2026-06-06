// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const multer = require("multer");
// const fs = require("fs");

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Create uploads folder if not exists
// if (!fs.existsSync("./uploads")) {
//     fs.mkdirSync("./uploads");
// }

// // ------------------ MongoDB Connection ------------------
// mongoose.connect("mongodb+srv://it25103868_db_user:TWv52jYYOIYOQDfP@cluster0.4y0jgxq.mongodb.net/")
//     .then(() => console.log("MongoDB Connected"))
//     .catch(err => console.log(err));


// // ------------------ Girl Schema ------------------
// const girlSchema = new mongoose.Schema({
//     name: String,
//     age: Number,
//     location: String,
//     image: String
// });
// const Girl = mongoose.model("Girl", girlSchema);


// // ------------------ Boy Schema ------------------
// const boySchema = new mongoose.Schema({
//     name: String,
//     age: Number,
//     location: String,
//     image: String
// });
// const Boy = mongoose.model("Boy", boySchema);


// // ------------------ Multer Image Upload ------------------
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => cb(null, "uploads/"),
//     filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
// });
// const upload = multer({ storage });

// app.use("/uploads", express.static("uploads"));


// // =====================================================
// //                   GIRLS API
// // =====================================================

// // Add Girl
// app.post("/girls/add", upload.single("image"), async (req, res) => {
//     try {
//         const girl = new Girl({
//             name: req.body.name,
//             age: req.body.age,
//             location: req.body.location,
//             image: req.file.filename
//         });

//         await girl.save();
//         res.json({ msg: "Girl added successfully!" });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// // Get All Girls
// app.get("/girls", async (req, res) => {
//     const girls = await Girl.find();
//     res.json(girls);
// });

// // Update Girl
// app.put("/girls/update/:id", async (req, res) => {
//     try {
//         await Girl.findByIdAndUpdate(req.params.id, req.body);
//         res.json({ msg: "Girl updated successfully!" });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// // Delete Girl
// app.delete("/girls/delete/:id", async (req, res) => {
//     try {
//         await Girl.findByIdAndDelete(req.params.id);
//         res.json({ msg: "Girl deleted successfully!" });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });


// // =====================================================
// //                   BOYS API
// // =====================================================

// // Add Boy
// app.post("/boys/add", upload.single("image"), async (req, res) => {
//     try {
//         const boy = new Boy({
//             name: req.body.name,
//             age: req.body.age,
//             location: req.body.location,
//             image: req.file.filename
//         });

//         await boy.save();
//         res.json({ msg: "Boy added successfully!" });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// // Get All Boys
// app.get("/boys", async (req, res) => {
//     const boys = await Boy.find();
//     res.json(boys);
// });

// // Update Boy
// app.put("/boys/update/:id", async (req, res) => {
//     try {
//         await Boy.findByIdAndUpdate(req.params.id, req.body);
//         res.json({ msg: "Boy updated successfully!" });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// // Delete Boy
// app.delete("/boys/delete/:id", async (req, res) => {
//     try {
//         await Boy.findByIdAndDelete(req.params.id);
//         res.json({ msg: "Boy deleted successfully!" });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });


// // ------------------ START SERVER ------------------
// app.listen(5000, () => {
//     console.log("Backend running on http://localhost:5000");
// });


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

// Create uploads folder
if (!fs.existsSync("./uploads")) {
    fs.mkdirSync("./uploads");
}

// ------------------ MongoDB ------------------
mongoose.connect(
    "mongodb+srv://lakip8267_db_user:LpHy9jSmuPZKqTFW@cluster0.vd4iovn.mongodb.net/"
)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// ------------------ USER SCHEMA ------------------
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String
});
const User = mongoose.model("User", userSchema);

// ------------------ GIRL SCHEMA ------------------
const girlSchema = new mongoose.Schema({
    name: String,
    age: Number,
    location: String,
    image: String
});
const Girl = mongoose.model("Girl", girlSchema);

// ------------------ BOY SCHEMA ------------------
const boySchema = new mongoose.Schema({
    name: String,
    age: Number,
    location: String,
    image: String
});
const Boy = mongoose.model("Boy", boySchema);

// ------------------ AUTH API ------------------

// REGISTER
app.post("/auth/register", async (req, res) => {
    const { username, password } = req.body;

    const userExist = await User.findOne({ username });
    if (userExist) {
        return res.json({ msg: "Username already exists" });
    }

    const user = new User({ username, password });
    await user.save();
    res.json({ msg: "Account created successfully" });
});

// LOGIN
app.post("/auth/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username, password });
    if (!user) {
        return res.json({ msg: "Invalid username or password" });
    }

    res.json({ msg: "Login success", username });
});

// ------------------ IMAGE UPLOAD ------------------
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

app.use("/uploads", express.static("uploads"));

// ------------------ GIRLS API ------------------
app.post("/girls/add", upload.single("image"), async (req, res) => {
    const girl = new Girl({
        name: req.body.name,
        age: req.body.age,
        location: req.body.location,
        image: req.file.filename
    });
    await girl.save();
    res.json({ msg: "Girl added successfully!" });
});

app.get("/girls", async (req, res) => {
    res.json(await Girl.find());
});

app.put("/girls/update/:id", async (req, res) => {
    await Girl.findByIdAndUpdate(req.params.id, req.body);
    res.json({ msg: "Girl updated successfully!" });
});

app.delete("/girls/delete/:id", async (req, res) => {
    await Girl.findByIdAndDelete(req.params.id);
    res.json({ msg: "Girl deleted successfully!" });
});

// ------------------ BOYS API ------------------
app.post("/boys/add", upload.single("image"), async (req, res) => {
    const boy = new Boy({
        name: req.body.name,
        age: req.body.age,
        location: req.body.location,
        image: req.file.filename
    });
    await boy.save();
    res.json({ msg: "Boy added successfully!" });
});

app.get("/boys", async (req, res) => {
    res.json(await Boy.find());
});

app.put("/boys/update/:id", async (req, res) => {
    await Boy.findByIdAndUpdate(req.params.id, req.body);
    res.json({ msg: "Boy updated successfully!" });
});

app.delete("/boys/delete/:id", async (req, res) => {
    await Boy.findByIdAndDelete(req.params.id);
    res.json({ msg: "Boy deleted successfully!" });
});

// ------------------ SERVER ------------------
app.listen(5000, () => {
    console.log("Backend running on http://localhost:5000");
});
