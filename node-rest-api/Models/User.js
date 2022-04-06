const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            require: true,
            min: 3,
            max: 20,
            unique: true
        },

        email: {
            type: String,
            require: true,
            max: 50,
            unique: true,
        },

        password: {
            type: String,
            require: true,
            min: 6,
        },

        steamLink: {
            type: String,
            max: 100,
            default: ""
        },

        playstationLink: {
            type: String,
            max: 100,
            default: ""
        },

        xboxLink: {
            type: String,
            max: 100,
            default: ""
        },

        discordLink: {
            type: String,
            max: 100,
            default: ""
        },

        profilePicture: {
            type: String,
            default: ""
        },

        coverPicture: {
            type: String,
            default: ""
        },

        followers: {
            type: Array,
            default: []
        },

        following: {
            type: Array,
            default: []
        },

        isAdmin: {
            type: Boolean,
            default: false,
        },

        description: {
            type: String,
            max: 100,
            default: ""
        },

        city: {
            type: String,
            max: 50,
            default: ""
        },

        from: {
            type: String,
            max: 50,
            default: ""
        },

        relationship: {
            type: String,
            max: 50,
            default: ""
        },
    },

    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);