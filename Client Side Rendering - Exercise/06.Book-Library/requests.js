import { html, render } from './node_modules/lit-html/lit-html.js';
import { templateLoadTableData } from "./templates.js";




export async function loadBooks() {

    try {
        
        let url = 'http://localhost:3030/jsonstore/collections/books'
        let response = await fetch(url);

        if (!response.ok){
            throw new Error(response.statusText)
        }
        let data = await  response.json();
        

        
        let htmlContent = html``;
        for (let key in data){
            console.log(key);
            console.log(data[key].author);
            htmlContent = html`${htmlContent}${templateLoadTableData(key, data[key].title, data[key].author)}`;
            
        }

        console.log(htmlContent);

        render(htmlContent, document.querySelector('tbody'));
        

    } catch (error) {
        alert(error.message)
    }



}

export async function deleteFunction(e){
    try {
        console.log(e.target);
        console.log(e.target.id);
        console.log("Deleted Function");

        let id = e.target.id.split('+')[0];

        let res = await fetch(`http://localhost:3030/jsonstore/collections/books/${id}`, {
            method:'DELETE',
            
        })
        
    } catch (error) {
        alert(error.message);
    }

}


export function updateFunction(e){
    console.log(e.target);
    console.log(e.target.id);
    console.log("Updated Function")

    let d = Array.from(e.target.parentElement.parentElement.children);
    let t = d[0].textContent;
    let a = d[1].textContent;

    document.querySelector('#edit-form input[name="title"]').value = t;
    document.querySelector('#edit-form input[name="author"]').value = a;

    let id = e.target.id.split('+')[0];
    console.log(id);
    document.getElementById('add-form').style.display = 'none';
    document.getElementById('edit-form').style.display = 'block';

    let formElement = document.getElementById('edit-form');
    formElement.addEventListener('submit', async (event) => {
        try {
            event.preventDefault();
            let form = new FormData(formElement)

            let newTitle = form.get('title');
            let newAuthor = form.get('author');
            console.log("modifying");
            console.log(newTitle, newAuthor);

            let url = 'http://localhost:3030/jsonstore/collections/books/';
            let response = await fetch(`${url}${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    "author": newAuthor,
                    "title": newTitle
                  }
                  )
            });
            let dataFromUpdate = await response.json();
            

            document.getElementById('add-form').style.display = 'block';
            document.getElementById('edit-form').style.display = 'none';

            formElement.reset()
        } catch (error) {
            alert(error.message);
        }
        
    });
}


export async function onsubmit(e){
    try {
        e.preventDefault();

        let formEl = e.target;

        let formData = new FormData(formEl);
        let title =    formData.get('title');
        let author = formData.get('author');

        console.log(title, author);

        if (!title || !author){
            throw new Error("Invalid title or author")
        }

        let response = await fetch('http://localhost:3030/jsonstore/collections/books', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({author, title})
        });

        if (!response.ok){
            throw new Error(response.statusText)
        };

        let resData = await response.json();

        console.log(resData);

        
        formEl.reset();



    } catch (error) {
        alert(error.message)
    }




}  
