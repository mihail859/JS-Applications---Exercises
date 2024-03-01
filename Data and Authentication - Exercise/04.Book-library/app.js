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
        btnEdit.addEventListener('click', editInfo)

        let btnDelete = document.createElement('button');
        btnDelete.textContent = 'Delete';
        btnDelete.classList.add(k);
        btnDelete.addEventListener('click', deleteInfo);

        td3.appendChild(btnEdit);
        td3.appendChild(btnDelete);

        trElement.appendChild(td2);
        trElement.appendChild(td1);
        trElement.appendChild(td3);

        tbody.appendChild(trElement)
    })
};

async function deleteInfo(e){
    let id = e.target.classList[0];
    console.log(id);
    let row = e.target.parentElement.parentElement;

    let deleteResp = await fetch(`${url}/${id}`, {
        method: 'DELETE',
    });
    let deleted = await deleteResp.json();
    
    console.log(deleted);

    row.remove()
}

async function editInfo(e){
    try {

        let previousEventListener = formElement.onsubmit;
        let classEl = e.target.classList[0]; // Getting the class from button's classList
        let h3Form = document.querySelector('h3');
        h3Form.textContent = 'Edit FORM';

        // Fetch the book data using the class id
        let resp = await fetch(`${url}/${classEl}`);
        let dataReturned = await resp.json();

        // Update form fields with existing book data
        let inputElementTitle = document.querySelector('input[name="title"]');
        inputElementTitle.value = dataReturned.title;

        let inputElementAuthor = document.querySelector('input[name="author"]');
        inputElementAuthor.value = dataReturned.author;

        // Change submit button text and add class for edit functionality
        let btnSave = document.querySelector('form button');
        btnSave.textContent = 'Save';

        // Add event listener to handle saving the edited data
        formElement.removeEventListener('submit', addBook); // Remove existing listener
        formElement.addEventListener('submit', (event) => saveEditedBook(event, classEl));

        h3Form.textContent = 'FORM';
        btnSave.textContent = 'Submit';


        formElement.onsubmit = previousEventListener;

    } catch (error) {
        console.error(error);
    }
};

async function saveEditedBook(event, classId) {
    try {
        event.preventDefault();

        let form = new FormData(formElement);
        let title = form.get('title');
        let author = form.get('author');

        if (!title || !author) {
            throw new Error('Invalid input data');
        }

        let bookData = {
            title,
            author
        };

        // Send PATCH request to update the book data
        let patchRequest = await fetch(`${url}/${classId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookData)
        });

        let result = await patchRequest.json();
        console.log(result);

        // Reset form and reload books after editing
        formElement.reset();
        tbody.innerHTML = ''; // Clear existing table rows
        await loadBooksFunction(); // Reload books


        let btnSave = document.querySelector('form button');
        btnSave.textContent = 'Submit';
        formElement.removeEventListener('submit', saveEditedBook);
        formElement.addEventListener('submit', addBook);

    } catch (error) {
        console.error(error);
        alert(error);
    }
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

        let result = await postRequest.json();
        console.log(result);
    } catch (error) {
        alert(error)
    }

    formElement.reset();


}