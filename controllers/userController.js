const User = require("../models/Users");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, '../data/users.json');

const login = (req, res) => {
    return res.send("I am login page");
}

const importUsers = async (req, res) => {
    try {
        // Read and parse the JSON file
        const users = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        for (const userData of users) {
            // Check if a user with the same email or phone already exists
            const existingUser = await User.findOne({
                $or: [{ email: userData.email }, { phone: userData.phone }],
            });

            if (existingUser) {
                console.log(`User with email ${userData.email} or phone ${userData.phone} already exists.`);
            } else {
                // Hash the password before saving
                const bcrypt = require('bcrypt');
                const salt = await bcrypt.genSalt(10);
                userData.password = await bcrypt.hash(userData.password, salt);

                // Create and save the user
                await User.create(userData);
                console.log(`User with email ${userData.email} has been added.`);
            }
        }
    } catch (err) {
        console.error('Error importing data:', err.message);
    }
}

const register = (req, res) => {
    res.send("I am register page");
}

module.exports = {
    login,
    importUsers,
    register
}