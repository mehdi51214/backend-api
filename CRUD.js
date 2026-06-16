const connectDB = require("./db");
const User = require("./models/user");

connectDB();
const express = require("express");

const app = express();

app.use(express.json());

let users = [
    { id: 1, name: "Hassan", age: 24 },
    { id: 2, name: "Ali", age: 22 
    },
     { id: 3, name: "Mehdi", age: 24 },
    { id: 4, name: "Hussain", age: 22 
    }
];

// GET all users  2oo mean successfull,2o1 mean created,400 Bad Request404,Not Found 500 Server Error!
app.get("/users", async (req, res) => {
    // data connect kiuya ha to ye line use ki ha get API ky liay 
    const users = await User.find();
    res.json(users);
}); 
// ye sb data lany ky liay ha 
app.get("/users/:id", (req, res) => {

    const userId = parseInt(req.params.id);

    const user = users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.json(user);
});

// POST new user
app.post("/users", (req, res) => {

    // validation agr user glt data enter kry 
    if (!req.body ||!req.body.name || !req.body.age) {
        return res.status(400).json({
            message: "Name and age is required"
        });
    }

    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        age: req.body.age
    };

    users.push(newUser);

    res.status(201).json(newUser);
});

// PUT update user
app.put("/users/:id", (req, res) => {

    const userId = parseInt(req.params.id);

    let user = users.find(u => u.id === userId);

    // user not found
    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    // validation  is me agr user wrong data ko krna chaiy to error aiy 
    if (!req.body|| !req.body.name || !req.body.age) {
        return res.status(400).json({
            message: "Name and age required"
        });
    }

    user.name = req.body.name;
    user.age = req.body.age;

    res.status(200).json({
        message: "User updated",
        user
    });
});
// DELETE user
app.delete("/users/:id", (req, res) => {

    const userId = parseInt(req.params.id);

    const user = users.find(u => u.id === userId);

    if (!user ) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    users = users.filter(u => u.id !== userId);

    res.status(200).json({
        message: "User deleted"
    });

});
app.listen(5001, () => {
    console.log("Server running on 5001");
});