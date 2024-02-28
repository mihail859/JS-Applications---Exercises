const url = 'http://localhost:3030/jsonstore/collections/students';
const tableData = document.querySelector('#results tbody');
const formReference = document.getElementById('form');

formReference.addEventListener('submit', onSubmitFunc);

async function loadElements() {
    try {
        let res = await fetch(url);
        let result = await res.json();
        
        tableData.innerHTML = '';

        let fragment = document.createDocumentFragment();

        Object.values(result).forEach(r => {
            let trElement = document.createElement('tr');
            trElement.innerHTML = `
                <td>${r.firstName}</td>
                <td>${r.lastName}</td>
                <td>${r.facultyNumber}</td>
                <td>${r.grade}</td>
            `;
            fragment.appendChild(trElement);
        });

        tableData.appendChild(fragment);
    } catch (error) {
        console.log(error);
    }
}

async function onSubmitFunc(event) {
    event.preventDefault();

    let form = new FormData(formReference);
    let firstName = form.get('firstName');
    let lastName = form.get('lastName');
    let facultyNumber = form.get('facultyNumber');
    let grade = form.get('grade');

    if (!firstName || !lastName || !facultyNumber || !grade) {
        return;
    }

    let students = {
        firstName,
        lastName,
        facultyNumber,
        grade
    };

    try {
        let response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(students)
        });

        let data = await response.json();
        console.log(data);

        formReference.reset();

        let trElement = document.createElement('tr');
        trElement.innerHTML = `
            <td>${firstName}</td>
            <td>${lastName}</td>
            <td>${facultyNumber}</td>
            <td>${grade}</td>
        `;
        tableData.appendChild(trElement);
    } catch (error) {
        console.log(error);
    }
}

loadElements();
