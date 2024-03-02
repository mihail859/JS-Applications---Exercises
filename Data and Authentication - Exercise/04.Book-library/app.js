const url = 'http://localhost:3030/jsonstore/collections/books';

const loadAllBooks = document.getElementById('loadBooks');
loadAllBooks.addEventListener('click', loadBooksFunction);

const formUpdate = document.getElementById('formUpdate');
formUpdate.addEventListener('submit', formUpdateFunction);

const tbody = document.querySelector('tbody');
const formElement = document.querySelector('form');
formElement.addEventListener('submit', addBook);

let currentEditingId = null; // Track the current editing book ID

async function formUpdateFunction(e){
    try {
        e.preventDefault();

        let formUpdateArr = new FormData(formUpdate);

        let title = formUpdateArr.get('title');
        let author = formUpdateArr.get('author');

        if (!title || !author){
            throw new Error('Invalid input data')
        }

        let bookData = {
            title,
            author
        }

        let postRequest = await fetch(`${url}/${currentEditingId}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(bookData)
        });

        if (!postRequest.ok) {
            throw new Error('Failed to update book');
        }

        let result = await postRequest.json();
        console.log(result);

        formUpdate.reset();
        formUpdate.style.display = 'none';
        formElement.style.display = 'block';

    } catch (error) {
        console.error('Error updating book:', error);
        alert('Error updating book. Please try again later.');
    }
}

async function loadBooksFunction(){
    formUpdate.style.display = 'none';
    formElement.style.display = 'block';

    tbody.innerHTML = '';

    try {
        let response = await fetch(url);

        if (!response.ok) {
            throw new Error('Failed to load books');
        }

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
            btnEdit.addEventListener('click', editInfo);

            let btnDelete = document.createElement('button');
            btnDelete.textContent = 'Delete';
            btnDelete.classList.add(k);
            btnDelete.addEventListener('click', deleteInfo);

            td3.appendChild(btnEdit);
            td3.appendChild(btnDelete);

            trElement.appendChild(td2);
            trElement.appendChild(td1);
            trElement.appendChild(td3);

            tbody.appendChild(trElement);
        });
    } catch (error) {
        console.error('Error loading books:', error);
        alert('Error loading books. Please try again later.');
    }
}
async function editInfo(e){
    formUpdate.style.display = 'block';
    formElement.style.display = 'none';

    try {
        currentEditingId = e.target.classList[0]; // Set the current editing ID

        let dataToEditResp = await fetch(`${url}/${currentEditingId}`);

        if (!dataToEditResp.ok) {
            throw new Error('Failed to fetch book data for editing');
        }

        let dataToEdit = await dataToEditResp.json();

        document.getElementById('title').value = dataToEdit.title;
        document.getElementById('author').value = dataToEdit.author;
    } catch (error) {
        console.error('Error editing book:', error);
        alert('Error editing book. Please try again later.');
    }
}


async function deleteInfo(e){
    let id = e.target.classList[0];
    console.log(id);
    let row = e.target.parentElement.parentElement;

    let deleteResp = await fetch(`${url}/${id}`, {
        method: 'DELETE',
    });

    if (!deleteResp.ok) {
        throw new Error('Failed to delete book');
    }
    
    let deleted = await deleteResp.json();
    
    console.log(deleted);

    row.remove();
}

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
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(bookData)
        });

        if (!postRequest.ok) {
            throw new Error('Failed to add book');
        }

        let result = await postRequest.json();
        console.log(result);

        formElement.reset();
    } catch (error) {
        console.error('Error adding book:', error);
        alert('Error adding book. Please try again later.');
    }
}
