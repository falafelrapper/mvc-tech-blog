const User = require('./User');
const Post = require('./Post');

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

module.exports = { User, Post };