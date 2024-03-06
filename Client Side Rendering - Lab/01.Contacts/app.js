import {html, render } from '../01.Contacts/node_modules/lit-html/lit-html.js';
import { contacts } from './contacts.js';


let h2 = () => html`<h2>Hello world</h2>`;
render(h2(), document.body)

