import { html, render } from './node_modules/lit-html/lit-html.js'

const menu = document.getElementById('menu');
const formElement = document.querySelector('form');
formElement.addEventListener('submit', addItem);

let url = 'http://localhost:3030/jsonstore/advanced/dropdown';

async function loadOptions(){
    try {
        
        let res = await fetch(url);
        if (!res.ok){
            throw new Error('Failed to load')
        }
        let optionsArr = Object.values(await res.json());
        
        let template = html`
            ${optionsArr.map((o) => html`<option value=${o._id}>${o.text}</option>`)}
        `;

        render(template, menu)
    } catch (error) {
        alert(error.ErrorMessage)
    }
}

await loadOptions();

async function addItem(e) {
    try {
        e.preventDefault();

        let txt = document.getElementById('itemText').value;
        if (!txt){
            throw new error;
        }
        let res = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({text: txt})
        });

        await loadOptions();
        formElement.reset();
    } catch (error) {
        alert('Error loading')
    }
}