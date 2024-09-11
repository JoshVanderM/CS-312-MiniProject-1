import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let blogs = [];

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", {
        blogs: blogs
    })
});

app.post("/submit", (req, res) => {
    const blog = {
        author: req.body.author,
        blog_title: req.body.blog_title,
        blog: req.body.blog,
        date: new Date().toLocaleString()
    };
    blogs.push(blog)
    res.redirect("/");
});

app.post("/delete", (req, res) => {
    const blogIndex = req.body.index;
    blogs.splice(blogIndex, 1);
    res.redirect("/")
});

app.get("/edit/:index", (req, res) => {
    const blogIndex = req.params.index;
    const blog = blogs[blogIndex];
    res.render("edit.ejs", {
        blog: blog,
        index: blogIndex
    })
});

app.post("/update/:index", (req,res) => {
    const blogIndex = req.params.index;
    blogs[blogIndex] = {
        author: req.body.author,
        blog_title: req.body.blog_title,
        blog: req.body.blog,
        date: new Date().toLocaleString()
    };
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}.`)
});

