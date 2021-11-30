const {Router} = require('express');
const router = Router();
const NotesCtrl = require('../controllers/notes.controller')

   
// ver el formulario y agregar notes
router.get('/notes/add',NotesCtrl.renderNoteForm)
router.post('/notes/new-note',NotesCtrl.createNewNote)

// obtener todas las notes 
router.get('/notes',NotesCtrl.renderNotes)

//edit notes
router.get('/notes/edit/:id',NotesCtrl.renderEditForm)
router.put('/notes/edit-note/:id',NotesCtrl.updateNote)

//delete note
router.delete('/notes/delete/:id',NotesCtrl.deleteNote)

module.exports = router