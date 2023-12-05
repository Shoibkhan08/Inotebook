const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Notes = require("../model/Note");
// const User = require('../model/User');
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get All the Notes using: GET "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
//ROUTE 2: Add a  new Note using: POST "/api/notes" . login require
router.post('/addnote', fetchuser, [
    body("title", 'enter a valid title').isLength({ min: 3 }),
    body("description", 'Description must be atleast 5 characters').isLength({ min: 5 })], async (req, res) => {
        try {

            const { title, description, tag } = req.body;

            const result = validationResult(req);
            if (!result.isEmpty()) {
                return res.send({ errors: result.array() });
            }
            const note = new Notes({
                title, description, tag, user: req.user.id
            })
            const savedNote = await note.save()

            res.json(savedNote)
        } catch (error) {
            console.error(error.message);
            res.send({ error: "internel server error" })
        }

    });

// ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote". Login required

router.put('/updatenote/:id',fetchuser, async (req,res)=>{
    const {title,description,tag} = req.body;

    const newNote = {};
    if (title) { newNote.title = title};
    if (description) {newNote.description = description};
    if (tag) {newNote.tag = tag};
    //find the note tobe updated and update it
    let note = await Notes.findById(req.params.id);
    if (!note) {
        return res.send({error:"Not Found "})
    }

    if (note.user.toString() !== req.user.id) {
        return res.send({error:"Not Allowed"})
    }

    note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json({note})
})

// ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote". Login required

router.delete('/deletenote/:id',fetchuser, async(req,res)=>{
    let note = await Notes.findById(req.params.id);
    if (!note) {
        return res.send({error:"Not Found "})
    }

    if (note.user.toString() !== req.user.id) {
        return res.send({error:"Not Allowed"})
    }
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({"success":"Note has been deleted",note: note})
})

module.exports = router