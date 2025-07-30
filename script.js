const booksContainer = document.querySelector('.books-container');
const dialog = document.querySelector('dialog');
const addButton = document.querySelector('.add-button');
const submitButton = document.querySelector('.submit');


const myLibrary = [
    new Book("HarryPotter", "J.K.ROWLING", 290, "Read"),
    new Book("Fiction", "ErinMorgenstern", 387, "NotRead")
];

function Book(title, author, pages, isRead) {

    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;

}


function addBookToLibrary(aTitle, aAuthor, aPages, aIsRead) {

    const book = new Book(aTitle, aAuthor, aPages, aIsRead);

    myLibrary.push(book);

}

function removeBook(id) {
    const targetBook = myLibrary.findIndex(book => book.id === id);

    if (targetBook !== null) {
        myLibrary.splice(targetBook,1)
        booksContainer.innerHTML = '';
        displayBooks();
    }
}

function displayBooks() {

    myLibrary.forEach(book => {

        const bookDiv = document.createElement('div');
        const title = document.createElement('span');
        const author = document.createElement('span');
        const pages = document.createElement('span');
        const isread = document.createElement('span');
        const removeButton = document.createElement('button');
        const StatusButton = document.createElement('button');

        title.textContent = `Title : ${book.title}`;
        author.textContent = `Author : ${book.author}`;
        pages.textContent = `Pages : ${book.pages}`;
        isread.textContent = book.isRead;
        removeButton.textContent = "RemoveBook"
        StatusButton.textContent = "UpdateStatus"

        removeButton.classList.add("remove-button")
        StatusButton.classList.add("status-button");
        bookDiv.classList.add('book');
        bookDiv.setAttribute("data-id", book.id)

        bookDiv.appendChild(title);
        bookDiv.appendChild(author);
        bookDiv.appendChild(pages);
        bookDiv.appendChild(isread);
        bookDiv.appendChild(removeButton);
        bookDiv.appendChild(StatusButton);

        booksContainer.appendChild(bookDiv);

        removeButton.addEventListener('click', () => {
            removeBook(book.id);
        });

        StatusButton.addEventListener("click", () => {
            book.isRead = isread.textContent === "Read" ? "NotRead" : "Read"
            isread.textContent = book.isRead
        })
    })

}

let title = "";
let author = "";
let pages = "";
let isread = "";

addButton.addEventListener('click', () => {
    dialog.showModal();

});

submitButton.addEventListener('click', (event) => {
    event.preventDefault();

    title = document.getElementById('title').value;
    author = document.getElementById('author').value;
    pages = document.getElementById('pages').value;
    isRead = document.getElementById('isread').checked;

    isRead = isRead ? "Read" : "NotRead"

    if (!title || !author || isNaN(pages) || pages <= 0 || pages === "") {
        alert("Please Enter Valid Inputs!")
    }
    else {
        addBookToLibrary(title, author, pages, isRead);

        booksContainer.innerHTML = '';

        displayBooks();

        dialog.close();
    }
})

displayBooks();