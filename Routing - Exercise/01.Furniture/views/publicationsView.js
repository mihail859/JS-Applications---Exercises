import { html, render } from "../node_modules/lit-html/lit-html.js";
import { navBarLook } from "../utils/navBarView.js";
import page from "//unpkg.com/page/page.mjs";

export async function myPublications(){
    try {
        let id = JSON.parse(sessionStorage.getItem("dataUser")).id;
        let response = await fetch(`http://localhost:3030/data/catalog?where=_ownerId%3D%22${id}%22`);

        if (!response.ok){
            throw new Error(response.statusText)
        }
        let data = await  response.json();

        render(template(data), document.querySelector('.container'))
    } catch (error) {
        alert(error.message);
    }
}

let template = (data) => html`

        <div class="row space-top">
            <div class="col-md-12">
                <h1>My Furniture</h1>
                <p>This is a list of your publications.</p>
            </div>
        </div>
        <div class="row space-top">
            ${data.map(el => html`

            <div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                            <img src=${el.img} />
                            <p>${el.description}</p>
                            <footer>
                                <p>Price: <span>${el.price} $</span></p>
                            </footer>
                            <div>
                                <a href="/details/${el._id}" class="btn btn-info">Details</a>
                            </div>
                    </div>
                </div>
            </div>
            
            `)}
        </div    

`;
