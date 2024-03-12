import { html, render } from "../node_modules/lit-html/lit-html.js";
import { navBarLook } from "../utils/navBarView.js";

export async function dashboard(){
    navBarLook();
    let url = 'http://localhost:3030/data/catalog';
    try {
        let res = await fetch(url);
        if (!res.ok){
            throw new Error(res.statusText);
        }
        let data = await res.json();
        console.log(data);

        render(template(data), document.querySelector('.container'))

    } catch (error) {
        alert(error)
    }
}


let template = (u) => html`
    <div class="row space-top">
            <div class="col-md-12">
                <h1>Welcome to Furniture System</h1>
                <p>Select furniture from the catalog to view details.</p>
            </div>
        </div>
        <div class="row space-top">
            ${u.map(el => html`
            <div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                            <img src="${el.img}" />
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
        </div>    
`;

