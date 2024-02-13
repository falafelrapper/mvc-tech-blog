const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Index connecting the models together
// Users can have many associated recipes (through user_id)
// Categories can have many associated recipes (through category_id)
// Recipes belong to users and categories through the associated ids whcih act as foreign keys

User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Post, Comment };