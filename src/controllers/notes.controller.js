const Note =require('../models/Note')
const notesCtrl = {}

notesCtrl.renderNoteForm = (req,res)=>{
    res.render('notes/new-note')
}

notesCtrl.createNewNote = async (req,res)=>{
    const {title,description} = req.body
    const newNote = new Note({title,description})
    newNote.user = req.user.id
    await newNote.save()
    req.flash('success_msg','Nota agregada correctamente')
    res.redirect('/notes')
}

notesCtrl.renderNotes = async (req,res)=>{
    const notes = await Note.find({user:req.user.id}).lean()
    res.render('notes/all-notes',{ notes })
}

notesCtrl.renderEditForm = async (req,res)=>{
    const note = await Note.findById(req.params.id).lean()
    if (note.user != req.user.id){
        return res.redirect('/notes')
    }
    res.render('notes/edit-note', {note})
}

notesCtrl.updateNote = async (req,res)=>{
    await Note.findByIdAndUpdate(req.params.id,req.body)
    req.flash('success_msg','Nota actualizada correctamente')
    res.redirect('/notes')
}

notesCtrl.deleteNote = async (req,res)=>{
    await Note.findByIdAndDelete(req.params.id)
    req.flash('success_msg','Nota eliminada correctamente')
    res.redirect('/notes')
}

module.exports = notesCtrl