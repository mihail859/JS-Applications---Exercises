const url = 'http://localhost:3030/jsonstore/messenger';
const textArea = document.getElementById('messages');

function attachEvents() {
    document.getElementById('submit').addEventListener('click', addMessage);
    document.getElementById('refresh').addEventListener('click', refreshMessages);
}

attachEvents();
async function addMessage(){
    alert('the message has been added');
    let author = document.querySelector('input[name="author"]').value;
    let content = document.querySelector('input[name="content"]').value;

    if (author && content){
        let dataToBeAdd = {
            author,
            content
        }

        let response = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(dataToBeAdd)
        });

        let result = await response.json();

        console.log(result);

    }
}

async function refreshMessages(){

    let toLoadResponse = await fetch(url);
    let dataToShow = await toLoadResponse.json();



    Object.values(dataToShow).forEach(el => {
        console.log(el);
        textArea.textContent += `${el.author}: ${el.content}\n`
    })

}

