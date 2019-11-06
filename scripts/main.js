// let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : []

// let itemsArray = []
// localStorage.setItem('items', JSON.stringify(itemsArray))
// const data = JSON.parse(localStorage.getItem('items'))

window.addEventListener("load", function() {
    var form = document.querySelector('#form')
    form.addEventListener('submit', handleFormSubmit)
    // const text = form.input.value;
});



let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : []


localStorage.setItem('items', JSON.stringify(itemsArray))
const data = JSON.parse(localStorage.getItem('items'))


function handleFormSubmit(event) {
    event.preventDefault();
    var form = event.target;
    var input = form.input;
    var text = input.value;
    itemsArray.push(input.value)
    localStorage.setItem('items', JSON.stringify(itemsArray))
    
    input.value = '';
    // itemsArray.push(input.value)
    // localStorage.setItem('items', JSON.stringify(itemsArray))
    
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
        // localStorage.clear()
        // while (note.firstChild) {
        //   note.removeChild(note.firstChild)
        // }
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
 
// data.forEach(div => {
//     mount(div)
//   })


