const url = 'http://localhost:3030/jsonstore/collections/books';

const loadAllBooks = document.getElementById('loadBooks');
loadAllBooks.addEventListener('click', loadBooksFunction);

const tbody = document.querySelector('tbody');
console.log(tbody);


const formElement = document.querySelector('form');
formElement.addEventListener('submit', addBook);

async function loadBooksFunction(){
    let response = await fetch(url);
    let data = await response.json();

    Object.entries(data).forEach(([k, e]) => {

        console.log(k, e);
        let trElement = document.createElement('tr');
        let td1 = document.createElement('td');
        td1.textContent = e.author;

        let td2 = document.createElement('td');
        td2.textContent = e.title;

        let td3 = document.createElement('td');

        let btnEdit = document.createElement('button');
        btnEdit.textContent = 'Edit';
        btnEdit.classList.add(k);

        let btnDelete = document.createElement('button');
        btnDelete.textContent = 'Delete';
        btnDelete.classList.add(k);

        td3.appendChild(btnEdit);
        td3.appendChild(btnDelete);

        trElement.appendChild(td2);
        trElement.appendChild(td1);
        trElement.appendChild(td3);

        tbody.appendChild(trElement)
    })
};


async function addBook(e){
    try {
        e.preventDefault();

        let form = new FormData(formElement);

        let title = form.get('title');
        let author = form.get('author');

        if (!title || !author){
            throw new Error('Invalid input data')
        }

        let bookData = {
            title,
            author
        }

        let postRequest = await fetch(url, {
            
        })
    } catch (error) {
        alert(error)
    }


}