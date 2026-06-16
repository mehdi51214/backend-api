const students = [
    {
        name: "Mehdi",
        age: 24,
        city: "Islamabad"
    },
    {
        name: "Ali",
        age: 22,
        city: "Islamabad"
    }
];

students.forEach((student) => {
    console.log(student.name);
    console.log(student.age);
    console.log(student.city);

});





  //const express = ""   Express ko import kr rhy hn idr 

    const express = require("express");
  //Server bnaya ha yee idr 

const app = express();
  //Server kochala  ha yee idr 

app.listen(4000, () => {
    console.log("Server running on 4000");
});