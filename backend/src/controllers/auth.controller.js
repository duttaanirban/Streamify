import User from '../models/User.js';
import jwt from 'jsonwebtoken';


export async function signup(req, res) {
    // Handle user signup logic here
    const {email, password, fullName} = req.body;

    try {
        if(!email || !password || !fullName) {
            return res.status(400).json({message: "All fields are required"});
        }

        if(password.length < 6) {
            return res.status(400).json({message: "Password must be at least 6 characters long"});
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const idx = Math.floor(Math.random() * 100) + 1;
        const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

        const newUser = await User.create({
            fullName,
            email,
            password,
            profilePicture: randomAvatar,
        });

        // TODO: CREATE THE USER IN STREAM AS WELL

        const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
        
        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            httpOnly: true,
            samesite: "strict",
            secure: process.env.NODE_ENV === "production", // Set to true in production
        })

        res.status(201).json({
            success: true,
            user:newUser
        });
    }
    catch (error) {
        console.log("Error in signup:", error);
        res.status(500).json({message: "Internal server error"});
    }
};

export async function login(req, res) {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({message: "Email and password are required"});
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({message: "Invalid email or password"});
        }

        const isPasswordCorrect = await user.matchPassword(password);
        if (!isPasswordCorrect) {
            return res.status(400).json({message: "Invalid password"});
        }

        const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
        
        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            httpOnly: true,
            samesite: "strict",
            secure: process.env.NODE_ENV === "production", // Set to true in production
        })

        res.status(200).json({
            success: true,
            user
        });


    } catch (error) {
        console.log("Error in controller", error.message);
        res.status(500).json({message: "Internal server error"});
    }
};

export async function logout(req, res) {
    // Handle user logout logic here
    res.send('Logout Route');
};
