require('dotenv').config();

const express = require('express');
const hbs = require('hbs');

const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(express.static('public'));

// 1: in the home,list all the students who took the exam (list all the students)
let {students} = require('./exam-info')

app.get("/", (req, res) => {
  res.render("full-list.hbs", {students: students})
});

app.get("/results", (req, res) => {
  let filtered = students.filter((student) => {
    return student.hasPassed == true
})
let cloneStudents = JSON.parse(JSON.stringify(filtered))
let sorted = cloneStudents.sort(function (a, b) {
  if (a.score > b.score) {
    return -1;
  }
  if (a.score < b.score) {
    return 1;
  }
  return 0;
});
  res.render("results.hbs", {students: sorted})
});

// ... Your code here

// 2: in the '/results' list all the students who passed the test and their score.
// Also, students should be in descending order based on their score.

// ... Your code here

app.listen(process.env.PORT, () =>
  console.log(`App running on ${process.env.PORT}.`)
);
