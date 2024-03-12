import { html, render } from "../node_modules/lit-html/lit-html.js";
import { navBarLook } from "../utils/navBarView.js";
import page from "//unpkg.com/page/page.mjs";


export async function details(ctx, next){
    try {
        console.log("From details");
        let id = ctx.params.id;

        let url = `http://localhost:3030/data/catalog/${id}`
        let response = await fetch(url)

        if (!response.ok){
            throw new Error(response.statusText)
        }

        let data = await response.json();
        console.log(data);

        render(template(data), document.querySelector(".container"));

        const dataUser = JSON.parse(sessionStorage.getItem("dataUser"));
        if (dataUser && dataUser.id === data._ownerId) {
            
            render(template2(data), document.getElementById('editButtonContainer'));
        } 

    } catch (error) {
        alert(error.message)
    }   
}

let template = (d) => html`
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Furniture Details</h1>
            </div>
        </div>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                        <img src=".${d.img}" />
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <p>Make: <span>${d.make}</span></p>
                <p>Model: <span>${d.model}</span></p>
                <p>Year: <span>${d.year}</span></p>
                <p>Description: <span>${d.description}</span></p>
                <p>Price: <span>${d.price}</span></p>
                <p>Material: <span>${d.material}</span></p>
                <div id="editButtonContainer">

                </div>
            </div>
        </div>
`;
let template2 = (d) =>  html`
    <a href="/edit/${d._id}" class="btn btn-info">Edit</a>
    <a href="/del/${d._id}" class="btn btn-red">Delete</a>
    
`;
