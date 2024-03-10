import { html, render } from './node_modules/lit-html/lit-html.js';
import {deleteFunction, loadBooks, updateFunction} from './requests.js'
import { onsubmit } from './requests.js';

let btnLoadBooksTemplate = html`
    <button id="loadBooks" @click=${loadBooks}>LOAD ALL BOOKS</button>
`;


let templateTable = html`

    <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Action</th>
                </tr>
            </thead>

            <tbody>

            </tbody>

    </table>    

`;

let formAddTemplate = html`
    <form id="add-form" @submit=${onsubmit}>
        <h3>Add book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title...">
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author...">
        <input type="submit" value="Submit">
    </form>
`;

let updateForm = html`
    <form id="edit-form">
        <input type="hidden" name="id">
        <h3>Edit book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title...">
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author...">
        <input type="submit" value="Save">
    </form>
`;



export let templateLoadTableData = (key, title, author) =>html`

            <tr>
                <td>${title}</td>
                <td>${author}</td>
                <td>
                    <button id="${key}+edit" @click=${updateFunction}>Edit</button>
                    <button id="${key}+delete" @click=${deleteFunction}>Delete</button>
                </td>
            </tr>
`


export let mainTemplate = html`
${btnLoadBooksTemplate}, ${templateTable}, ${formAddTemplate}, ${updateForm}
`;



