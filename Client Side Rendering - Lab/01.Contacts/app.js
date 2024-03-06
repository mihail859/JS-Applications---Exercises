import {html, render } from '../01.Contacts/node_modules/lit-html/lit-html.js';
import { contacts } from './contacts.js';



let contactsStructure = (elem) => html`
        <div class="contact card">
            <div>
                <i class="far fa-user-circle gravatar"></i>
            </div>
            <div class="info">
                <h2>Name: ${elem.name}</h2>
                <button class="detailsBtn" @click=${() => showDetails(elem)}>Details</button>
                <div class="details" id="${elem.id}">
                    <p>Phone number: ${elem.phoneNumber}</p>
                    <p>Email: ${elem.email}</p>
                </div>
            </div>
        </div>`;


start();

async function start(){
    let contactsField = document.getElementById('contacts');
    render(contacts.map(contactsStructure), contactsField);
}

function showDetails(contact) {
    const detailsElement = document.getElementById(contact.id);

    detailsElement.style.display = detailsElement.style.display ===  'none' ? 'block' : 'none';
}




