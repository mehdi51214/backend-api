
  //const express = ""   Express ko import kr rhy hn idr 
    //const express = require("express");

  //Server bnaya ha yee idr 
//const app = express();
/*
 user ko screen py show ho ga like ky usyy ye dekhy ga  a
  app ik server object ha 
.get   ye GET request handle karna ,  browser se data lena
   "/"   yee URL path (route) ha 
(req, res)
   | Part | Meaning            |
| ---- | ------------------ |
| req  | user ki request    |
| res  | server ka response | 
res.send().... browser ko data bhejna

app.get("/users", (req, res) => {
    res.json([
        { name: "Mehdi", age: 24, city: "Islamabad" },
        { name: "Ali", age: 22 , city: "Kashmir" },
        { name: "Sara", age: 20, city: "Lahore" }
    ]);
});
app.get("/", (req, res) => {
    res.send("<h1>Home Page</h1>");
});

app.get("/about", (req, res) => {
    res.send("<h1>About Page</h1>");
});

app.get("/contact", (req, res) => {
    res.send("<h1>Contact Page</h1>");
});
  //Server ko chala  ha yee idr 
app.listen(5000, () => {
    console.log("Server running on 5000");
});
  //idr sy dynamic route bny ga mean ky value aiy gi Jab URL mein value change hoti rahe, usko dynamic route kehte hain.

app.get("/user/:id", (req, res) => {

    const userId = req.params.id;

    res.send("User ID is: " + userId);

});
 // Query Parameters (req.query) Ye bhi dynamic data hota hai, lekin URL ke andar ? ke baad aata hai.
app.get("/search", (req, res) => {

    const name = req.query.name;

    res.send("Search result for: " + name);

});
  //Perfect 👍 ab Step 5: POST Request (real backend ka core) start karte hain.
app.use(express.json());

app.post("/user", (req, res) => {

    const data = req.body;

    res.send({
        message: "User received",
        user: data
    });

}); 
const express = require("express");
const app = express();

app.use(express.json());

// GET routes
app.get("/", (req, res) => {
    res.send("<h1>Home Page</h1>");
});

app.get("/about", (req, res) => {
    res.send("<h1>About Page</h1>");
});

app.get("/contact", (req, res) => {
    res.send("<h1>Contact Page</h1>");
});

app.get("/users", (req, res) => {
    res.json([
        { name: "Mehdi", age: 24, city: "Islamabad" },
        { name: "Ali", age: 22, city: "Kashmir" },
        { name: "Sara", age: 20, city: "Lahore" }
    ]);
});

// Dynamic route
app.get("/user/:id", (req, res) => {
    res.send("User ID is: " + req.params.id);
});

// Query route
app.get("/search", (req, res) => {
    res.send("Search result for: " + req.query.name);
});

// POST route
app.post("/user", (req, res) => {
    res.send({
        message: "User received",
        user: req.body
    });
});

// Server start (LAST)
app.listen(5000, () => {
    console.log("Server running on 5000");
});*/



const express = require("express");
const app = express();

const connectDB = require("./db");
const User = require("./models/users");

app.use(express.json());

// Connect DB
connectDB();


// 🟢 GET all users
app.get("/users", async (req, res) => {
    const users = await User.find();
    res.json(users);
});


// 🟢 GET single user
app.get("/users/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Invalid ID" });
    }
});


// 🟢 POST new user
app.post("/users", async (req, res) => {
    try {
        if (!req.body.name || !req.body.age) {
            return res.status(400).json({ message: "Name and age required" });
        }

        const user = new User(req.body);
        await user.save();

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// 🟢 PUT update user
app.put("/users/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Invalid ID" });
    }
});


// 🟢 DELETE user
app.delete("/users/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User deleted" });
    } catch (error) {
        res.status(500).json({ message: "Invalid ID" });
    }
});


// Server start
app.listen(5001, () => {
    console.log("Server running on port 5001");
});
