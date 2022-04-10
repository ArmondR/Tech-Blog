// home page and login page routes

const router = require('express').Router();
const res = require('express/lib/response');
const sequelize = require('../config/connection');
const { Post, User, Comment} = require('../models');

router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id', 'content', 'title', 'created_at'],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({plain: true }));
    // pass a post object into the homepage template
    res.render('homepage', { posts });
})
.catch(err => {
    console.log(err);
    res.status(500).json(err);
    });
});


module.exports = router;