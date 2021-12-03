const {Router} = require('express');
const router = Router();
const NotesCtrl = require('../controllers/notes.controller');
const { isAuthenticated } = require('../helpers/auth');


   
// ver el formulario y agregar notes
router.get('/notes/add',isAuthenticated,NotesCtrl.renderNoteForm)
router.post('/notes/new-note',isAuthenticated,NotesCtrl.createNewNote)

// obtener todas las notes 
router.get('/notes',isAuthenticated,NotesCtrl.renderNotes)

//edit notes
router.get('/notes/edit/:id',isAuthenticated,NotesCtrl.renderEditForm)
router.put('/notes/edit-note/:id',isAuthenticated,NotesCtrl.updateNote)

//delete note
router.delete('/notes/delete/:id',isAuthenticated,NotesCtrl.deleteNote)

module.exports = router