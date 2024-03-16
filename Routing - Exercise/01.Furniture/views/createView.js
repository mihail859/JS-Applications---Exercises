import { html, render } from "../node_modules/lit-html/lit-html.js";
import { navBarLook } from "../utils/navBarView.js";
import page from "//unpkg.com/page/page.mjs";


export async function createView(){
    console.log('Creating');
    render(template, document.querySelector('.container'))


};


let template = html`
    <div class="row space-top">
            <div class="col-md-12">
                <h1>Create New Furniture</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit=${createNewFurniture}>
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-make">Make</label>
                        <input class="form-control" id="new-make" type="text" name="make">
                    </div>
                    <div class="form-group has-success">
                        <label class="form-control-label" for="new-model">Model</label>
                        <input class="form-control" id="new-model" type="text" name="model">
                    </div>
                    <div class="form-group has-danger">
                        <label class="form-control-label" for="new-year">Year</label>
                        <input class="form-control" id="new-year" type="number" name="year">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-description">Description</label>
                        <input class="form-control" id="new-description" type="text" name="description">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-price">Price</label>
                        <input class="form-control" id="new-price" type="number" name="price">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-image">Image</label>
                        <input class="form-control" id="new-image" type="text" name="img">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-material">Material (optional)</label>
                        <input class="form-control" id="new-material" type="text" name="material">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Create" />
                </div>
            </div>
        </form>
`;

async function createNewFurniture(event){
    try {
        event.preventDefault();
        console.log("Submit from the form create")
        let form = new FormData(event.target);

        let make = form.get('make');
        let model = form.get('model');
        let year = form.get('year');
        let description = form.get('description');
        let price = form.get('price');
        let img = form.get('img');
        let material = form.get('material');


        let makeElement = document.getElementById("new-make");
        let modelElement = document.getElementById("new-model");
        let yearElement = document.getElementById("new-year");
        let descriptionElement = document.getElementById("new-description");
        let priceElement = document.getElementById("new-price");
        let imageElement = document.getElementById("new-image");
    
        // Remove previous classes
        makeElement.classList.remove("is-invalid", "is-valid");
        modelElement.classList.remove("is-invalid", "is-valid");
        yearElement.classList.remove("is-invalid", "is-valid");
        descriptionElement.classList.remove("is-invalid", "is-valid");
        priceElement.classList.remove("is-invalid", "is-valid");
        imageElement.classList.remove("is-invalid", "is-valid");


        if (make.length < 4){
            document.getElementById("new-make").classList.add("is-invalid");
            throw new Error("Model must be at least 4 characters long");
        }else{
            document.getElementById("new-make").classList.add("is-valid");
        }


        if (model.length < 4){
            document.getElementById("new-model").classList.add("is-invalid");
            throw new Error("Model must be at least 4 characters long");
        }else{
            document.getElementById("new-model").classList.add("is-valid");
        }
        if(year >= 1950 && year <= 2050){
            document.getElementById("new-year").classList.add("is-valid");
        }else{
            document.getElementById("new-year").classList.add("is-invalid");
            throw new Error("The year must be between 1950 and 2050");
        }

        if (description.length < 10){
            document.getElementById("new-description").classList.add("is-invalid");
            throw new Error("The description must be at least 10 characters long");
        }else{
            document.getElementById("new-description").classList.add("is-valid");
        }

        if (price < 0){
            document.getElementById("new-price").classList.add("is-invalid");
            throw new Error("The price must be positive number");
        }else{
            document.getElementById("new-price").classList.add("is-valid");
        }

        if (!img){
            document.getElementById("new-image").classList.add("is-invalid");
            throw new Error("Image is required");
        }else{
            document.getElementById("new-image").classList.add("is-valid");
        }
        
        

        let url = 'http://localhost:3030/data/catalog';
        let accessToken = JSON.parse(sessionStorage.getItem("dataUser")).accessToken;
        console.log(accessToken);

        let response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' , 'X-Authorization': accessToken},
            body: JSON.stringify( { make, model, year, description, price, img, material } )
        });
        if (!response.ok){
            throw new Error(response.statusText)
        }
        let data = await  response.json();
        console.log(data);
        
        page.redirect("/")

    } catch (error) {
        alert(error.message);
    }
    
}