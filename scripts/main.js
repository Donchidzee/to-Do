window.addEventListener("load", function() {
    var form = document.querySelector('#form')
    form.addEventListener('submit', handleFormSubmit)
    initializeNotes()
});

function handleFormSubmit(event) {
    event.preventDefault();
    var form = event.target;
    var input = form.input;
    var text = input.value;
    window.activeNotesArray.push(text)
    console.log(window.activeNotesArray)
    localStorage.setItem('activeNotes', JSON.stringify(window.activeNotesArray))
    input.value = '';
    var notesActiveContainer = document.querySelector('.notes__active');
    mount(notesActiveContainer, createNote(text));
}

function createNote(innerText) {
    var note = document.createElement('div');
    note.className = 'note';
    note.innerText = innerText;
    mount(note, createTrashButton(note));
    mount(note, createCheckbox(note));
    return note;
}

function createTrashButton(note) {
    var trashButton = document.createElement("button");
    trashButton.className = 'note__trash-button';
    var trashIcon = document.createElement('i');
    trashIcon.className = 'fa fa-trash';
    trashButton.addEventListener("click", function() {
        note.parentNode.removeChild(note);
    })
  
    mount(trashButton, trashIcon)
    return trashButton;
}

function createCheckbox(note) {
    var checkbox = document.createElement('input')
    checkbox.className = 'note__checkbox'
    checkbox.type = 'checkbox'
    checkbox.addEventListener('input', function(e) {
        if (e.target.checked) {
            goToDone(note) 
        } else {
            goToActive(note)
        }
        
    })
    return checkbox
}

// Монтирование DOM элемента
function mount(parentNode, childNode) {
    if (!parentNode || !childNode) {
        throw Error('parentNode and child node can not be null')
    }
    parentNode.appendChild(childNode)
}

function goToDone(note) {
    var done = document.querySelector('.notes__done')
    mount(done, note)
}

function goToActive(note) {
    var notesActiveContainer = document.querySelector('.notes__active')
    mount(notesActiveContainer, note)
}

function mountNotes(container, notes) {
    for (var i = 0; i < notes.length; i++) {
        mount(container, createNote(notes[i]))
    }
}

function initializeNotes() {
    var doneNotesArray = localStorage.getItem('doneNotes') ? JSON.parse(localStorage.getItem('doneNotes')) : []
    var activeNotesArray = localStorage.getItem('activeNotes') ? JSON.parse(localStorage.getItem('activeNotes')) : []
    window.doneNotesArray = doneNotesArray;
    window.activeNotesArray = activeNotesArray;
    var notesActiveContainer = document.querySelector('.notes__active');
    var notesDoneContainer = document.querySelector('.notes__done');
    mountNotes(notesDoneContainer, doneNotesArray);
    mountNotes(notesActiveContainer, activeNotesArray);
}