const url = 'http://localhost:3030/jsonstore/messenger';
const textArea = document.getElementById('messages');

function attachEvents() {
    document.getElementById('submit').addEventListener('click', addMessage);
    document.getElementById('refresh').addEventListener('click', refreshMessages);
}


async function addMessage(){
    let authorName = document.querySelector('input[name="author"]').value;
    let msgText = document.querySelector('input[name="content"]').value;

    
        let dataToBeAdd = {
            author: authorName,
            content: msgText,
            }

        let response = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(dataToBeAdd)
        });

        let result = await response.json();

    
}

async function refreshMessages(){

    let toLoadResponse = await fetch(url);
    let dataToShow = await toLoadResponse.json();



    let messages = []
    Object.values(dataToShow).forEach(el => {
        console.log(el);
        messages.push(`${el.author}: ${el.content}`)
    });
    textArea.textContent = messages.join('\n')
}

attachEvents();

