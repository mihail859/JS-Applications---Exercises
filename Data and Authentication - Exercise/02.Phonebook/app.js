
const url = 'http://localhost:3030/jsonstore/phonebook';
const ulPhoneBook = document.getElementById('phonebook');

function attachEvents() {

    document.getElementById('btnLoad').addEventListener('click', loadPhones);

    document.getElementById('btnCreate').addEventListener('click', createRecord)
}

attachEvents();

async function loadPhones(){
    try {
        console.log('TODO...');
        let response = await fetch(url);
        let phonesData = await response.json();

        ulPhoneBook.innerHTML = "";
        Object.values(phonesData).forEach(x =>{
            let liElement = document.createElement('li');
            liElement.textContent = `${x.person}: ${x.phone}`;

            let btnDelete = document.createElement('button');
            btnDelete.textContent = 'Delete';
            btnDelete.setAttribute('id', x._id)

            btnDelete.addEventListener('click', deleteEntry)

            liElement.appendChild(btnDelete);
            ulPhoneBook.appendChild(liElement);


        })

    } catch (error) {
        console.log(error.message);
    }
}

async function deleteEntry(e){
    try {
        console.log('works properly', e.target.id);
        let elToDelete = e.target.parentElement;
        let response = await fetch(`${url}/${e.target.id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        });
        let dataToDelete = await response.json();
        elToDelete.remove()
        console.log(dataToDelete);

    } catch (error) {
        console.log(error.message);
    }
}
;

async function createRecord(){
    try {
        console.log('Creating record ..... ')

        let person = document.getElementById('person').value.trim();
        let phone = document.getElementById('phone').value.trim();

        if(person == '' || phone == ''){
            alert('Wrong input data, try Again ):')
            return;
        };

        let obj = {person, phone}
        let settings ={
            'method': 'post',
            'headers': {'Content-Type': 'application/json'},
            'body': JSON.stringify(obj)
        }

        let response  = await fetch(url, settings);
        let data = await response.json();
        console.log(data);

        document.getElementById('person').value = '';
        document.getElementById('phone').value = '';

        loadPhones();


    } catch (error) {
        console.log(error.message);
    }
}