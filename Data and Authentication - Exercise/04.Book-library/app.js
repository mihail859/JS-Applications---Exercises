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

        td3.appendChild(btnEdit);
        td3.appendChild(btnDelete);

        trElement.appendChild(td2);
        trElement.appendChild(td1);
        trElement.appendChild(td3);

        tbody.appendChild(trElement)
    })
};

async function editInfo(e){
    console.log(e.target);
    let classEl = e.target.getAttribute("class");
    let h3Form = document.querySelector('h3');
    h3Form.textContent = 'Edit FORM';

    let btnSave = document.querySelector('form button');
    btnSave.textContent = 'Save';

    let resp = await fetch(`${url}/${classEl}`);
    let dataReturned = await resp.json();

    console.log(dataReturned);

    

    let inputElement = document.querySelector('input[name="title"]');
    inputElement.value = dataReturned.title;

    let inputElement2 = document.querySelector('input[name="author"]');
    inputElement2.value = dataReturned.author;
    

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