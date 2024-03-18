import { html, render } from "../node_modules/lit-html/lit-html.js"

export function searchFunction(){
    console.log("From search function")
    render(template, document.querySelector("main"))
}


let template = html`
        <section id="search">
          <div class="form">
            <h4>Search</h4>
            <form class="search-form" @submit=${searchEngine}>
              <input type="text" name="search" id="search-input" />
              <button class="button-list">Search</button>
            </form>
          </div>
          <div class="search-result">

          </div>
            
        </section>
`;

let templateResults = (data) => html`
            ${data.map( x => html`
          
            <div class="car">
              <img src="${x.imageUrl}" alt="example1"/>
              <h3 class="model">${x.model}</h3>
              <a class="details-btn" href="/details/${x._id}">More Info</a>
            </div>

          `)}
`;

let templateNoResults = html`
    <h2 class="no-avaliable">No result.</h2>
`;


async function searchEngine(event){
    event.preventDefault();

    try {
        let form = new FormData(event.target);
        let search = form.get("search");
        let url = `http://localhost:3030/data/cars?where=model%20LIKE%20%22${search}%22`;

        let response = await fetch(url);
        if (!response.ok){
            throw new Error(response.statusText)
        }
        if (response.status === 204){
            render(templateNoResults, document.querySelector('.search-result'))
        }else{
            let data = await response.json();
            if (data.length === 0) {
                render(templateNoResults, document.querySelector('.search-result'));
            } else {
                render(templateResults(data), document.querySelector('.search-result'));
            }
        }
    } catch (error) {
        alert("Error", error.message)
    }
}