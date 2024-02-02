var booklist = []

function bookObj(name, author, pages, read){
    this.name = name
    this.author = author
    this.pages = pages
    this.readIt = read
}


function addBook(evt){
    evt.preventDefault()
    var fromEntries = new FormData(evt.currentTarget)
    var EntriesBook = Object.fromEntries(fromEntries)
    var book = new bookObj(EntriesBook.name, EntriesBook.author, EntriesBook.pages, EntriesBook.readIt)
    var tr = document.createElement('tr')
    var nameCell  = document.createElement('td')
    nameCell.appendChild(document.createTextNode(book.name))
    nameCell.classList.add('tableCell')

    var authorCell  = document.createElement('td')
    authorCell.appendChild(document.createTextNode(book.author))
    authorCell.classList.add('tableCell')

    var pagesCell  = document.createElement('td')
    pagesCell.appendChild(document.createTextNode(book.pages))
    pagesCell.classList.add('tableCell')

    var readCell  = document.createElement('td')
    var check = document.createElement('input')
    check.type = 'checkbox'
    if (book.readIt == 'on'){
        check.checked = 'checked'
    }
    readCell.appendChild(check)
    readCell.classList.add('tableCell')

    var buttonCell = document.createElement('td')
    buttonCell.classList.add('tableCell')
    var delButton = document.createElement('button')
    delButton.appendChild(document.createTextNode('Delete'))
    delButton.classList.add('delButton')
    buttonCell.appendChild(delButton)

    tr.appendChild(nameCell)
    tr.appendChild(authorCell)
    tr.appendChild(pagesCell)
    tr.appendChild(readCell)
    tr.appendChild(buttonCell)

    var table = document.querySelector('tbody')
    table.appendChild(tr)
    booklist.push(book)

    this.reset()
    this.style.display = 'none'
    this.parentNode.style.display = 'none'
}

function getTd(evt, index){
    return evt.target.parentNode.parentNode.childNodes[index].textContent
}

function clearBooklist(booklist, evt){
    booklist.forEach( (element, index) =>{
        if (element.name == getTd(evt, 0) && element.author == getTd(evt, 1) && element.pages == getTd(evt, 2)){
            booklist.splice(index, 1)
        }
    })
}

function delBook(evt){
    console.log(evt.target)
    if (evt.target.classList.contains('delButton')){

        var table = document.querySelector('#mainTable>tbody')
        console.log(getTd(evt, 0), getTd(evt, 1), getTd(evt, 2), getTd(evt, 3))
        table.removeChild(evt.target.parentNode.parentNode)
        clearBooklist(booklist, evt)
        console.log(booklist);
    }
}

var bookForm = document.getElementById('bookForm')
var bookFormDiv = document.getElementById('bookFormDiv')
var addButton = document.querySelector('.topButton')
var exampleBook = new bookObj('As crônicas de Nárnia: a última batalha', 'C.s Lewis', '180', 'sim')
var submitForm = document.querySelector('.bookForm')
var delButton = document.querySelectorAll('.delButton')
var tbody = document.querySelector('#tbody')

addButton.addEventListener('click', (evt) => {
    bookForm.style.display = bookForm.style.display == 'none' ? 'block' : 'none'; 
    bookFormDiv.style.display = bookFormDiv.style.display == 'none' ? 'block' : 'none';
                                                }, false)

submitForm.addEventListener('submit', addBook)

tbody.addEventListener('click', delBook)