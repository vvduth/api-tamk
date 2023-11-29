const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database'); // Adjust the path to your Sequelize instance
const User = require('./user'); // Import the User model

class Post extends Model {}

Post.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Post',
    timestamps: true
});

Post.belongsTo(User, {
    foreignKey: {
        name: 'userId',
        allowNull: false
    },
    onDelete: 'CASCADE'
});
User.hasMany(Post, {
    foreignKey: 'userId' 
});

module.exports = Post;
