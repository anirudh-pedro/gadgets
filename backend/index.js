import mongoose from "mongoose";
import express from "express";
import 'dotenv/config';
import bcrypt from "bcrypt";
import cors from "cors";
import jwt from "jsonwebtoken";
import Gadget from './models/gadget.js';
import User from "./models/user.js";

const server = express();
let port = 3000;
mongoose.connect(process.env.Mongo_uri,{
    autoIndex : true
})

server.use(express.json());
server.use(cors());

server.post('/register',async (req,res) => {
    const {username,email,password} = req.body;
    try{
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ error: "Email already in use" });
        }
        const existingUsername = await User.findOne({ username });
        if (existingUsername){
            return res.status(400).json({error : 'Username already exists'});
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            username,
            email,
            password: hashedPassword, 
        });
        await newUser.save();

        const token = jwt.sign(
            { id: newUser._id, username: newUser.username, email: newUser.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
          );


          res.status(201).json({ 
            message: "User registered successfully",
            token,
            user: {
              username: newUser.username,
              email: newUser.email
            }
          });
          
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})


server.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Invalid email or password" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid email or password" });
      }
  
      const token = jwt.sign(
        { id: user._id, username: user.username, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );
  
      res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email
        }
      });
  
    } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  server.post('/add-gadget', async (req, res) => {
    try {
      const newGadget = new Gadget(req.body);
      await newGadget.save();
      res.status(201).json({ message: "Gadget added successfully", gadget: newGadget });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to add gadget" });
    }
  });


  server.get('/gadgets', async (req, res) => {
    try {
      const gadgets = await Gadget.find();
      res.status(200).json(gadgets);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch gadgets" });
    }
  });
  
  server.get('/gadgets/:id', async (req, res) => {
    try {
      const gadget = await Gadget.findById(req.params.id);
      if (!gadget) return res.status(404).json({ error: "Gadget not found" });
      res.status(200).json(gadget);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch gadget" });
    }
  });


server.listen(port,() => {
    console.log("server is listening " + port);
})