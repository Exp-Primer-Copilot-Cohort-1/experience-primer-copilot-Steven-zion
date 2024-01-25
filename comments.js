// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

// Import database
const { Comment } = require('./models');

// Root path
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Get all comments
app.get('/comments', (req, res) => {
    Comment.findAll().then(comments => {
        res.json(comments);
    });
});

// Get comment by id
app.get('/comments/:id', (req, res) => {
    Comment.findByPk(req.params.id).then(comment => {
        res.json(comment);
    });
});

// Create new comment
app.post('/comments', (req, res) => {
    Comment.create({
        username: req.body.username,
        content: req.body.content,
        PostId: req.body.postId
    }).then(comment => {
        res.json(comment);
    }).catch(err => {
        console.log(err);
    });
});

// Update comment
app.put('/comments/:id', (req, res) => {
    Comment.update({
        username: req.body.username,
        content: req.body.content,
        PostId: req.body.postId
    }, {
        where: {
            id: req.params.id
        }
    }).then(comment => {
        res.json(comment);
    }).catch(err => {
        console.log(err);
    });
});

// Delete comment
app.delete('/comments/:id', (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    }).then(comment => {
        res.json(comment);
    }).catch(err => {
        console.log(err);
    });
});

// Listen on port 3000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});