import { html, render } from "../node_modules/lit-html/lit-html.js";
import { navBarLook } from "../utils/navBarView.js";
import page from "//unpkg.com/page/page.mjs";

export async function editPublication(cxt, next){
    console.log(cxt.params.id)
    console.log("Editing the publication...");
    
    try {
        console.log(cxt.params.id)
        let id = cxt.params.id;
        console.log("Editing the publication...");
        let url = `http://localhost:3030/data/catalog/${id}`;
        let response = await fetch(url);
        if(!response.ok){
            throw new Error(response.statusText)
        };
        let info = await response.json();
        render(templateFormEditing(info), document.querySelector('.container'))

    } catch (error) {
        alert(error.message)
    }
}

let templateFormEditing = (d) => html`
    <div class="row space-top">
            <div class="col-md-12">
                <h1>Edit Furniture</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit=${(e) => edit(e, d._id)} >
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-make">Make</label>
                        <input class="form-control" id="new-make" type="text" name="make" value="${d.make}">
                    </div>
                    <div class="form-group has-success">
                        <label class="form-control-label" for="new-model">Model</label>
                        <input class="form-control" id="new-model" type="text" name="model" value="${d.model}">
                    </div>
                    <div class="form-group has-danger">
                        <label class="form-control-label" for="new-year">Year</label>
                        <input class="form-control" id="new-year" type="number" name="year" value="${d.year}">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-description">Description</label>
                        <input class="form-control" id="new-description" type="text" name="description" value="${d.description}">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-price">Price</label>
                        <input class="form-control" id="new-price" type="number" name="price" value="${d.price}">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-image">Image</label>
                        <input class="form-control" id="new-image" type="text" name="img" value="${d.img}">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-material">Material (optional)</label>
                        <input class="form-control" id="new-material" type="text" name="material" value="${d.material}">
                    </div>
                    <input type="submit" class="btn btn-info" value="Edit" />
                </div>
            </div>
        </form>
`;

async function edit(event, id){
        try {
            event.preventDefault();

        let form = new FormData(event.target);

        let make = form.get('make');
        let model = form.get('model');
        let year = form.get('year');
        let description = form.get('description');
        let price = form.get('price');
        let img = form.get('img');
        let material = form.get('material');

        let accessToken = JSON.parse(sessionStorage.getItem("dataUser")).accessToken;
        console.log(accessToken);
        let url = `http://localhost:3030/data/catalog/${id}`
        let response = await fetch(url, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json', 'X-Authorization': accessToken},
            body: JSON.stringify({make, model, year, description, price, img, material})
        });

        if (!response.ok) {
            throw new Error(response.statusText)
        }

        let resultData = await response.json();
        console.log(resultData);

        page.redirect("/")
    } catch (error) {
        alert(error.message)
    }
}