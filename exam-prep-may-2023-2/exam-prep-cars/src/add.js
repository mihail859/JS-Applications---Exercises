import { html, render } from "../node_modules/lit-html/lit-html.js"
import page from "../node_modules/page/page.mjs"

export async function createView(){
    console.log("To be created")
    render(template(), document.querySelector("main"))
}

let template  = () => html`

        <section id="create">
          <div class="form form-auto" @submit=${addNewAlbum}>
            <h2>Share Your Car</h2>
            <form class="create-form">
              <input type="text" name="model" id="model" placeholder="Model"/>
              <input
                type="text"
                name="imageUrl"
                id="car-image"
                placeholder="Your Car Image URL"
              />
              <input
                type="text"
                name="price"
                id="price"
                placeholder="Price in Euro"
              />
              <input
                type="number"
                name="weight"
                id="weight"
                placeholder="Weight in Kg"
              />
              <input
                type="text"
                name="speed"
                id="speed"
                placeholder="Top Speed in Kmh"
              />
              <textarea
                id="about"
                name="about"
                placeholder="More About The Car"
                rows="10"
                cols="50"
              ></textarea>
              <button type="submit">Add</button>
            </form>
          </div>
        </section>

`;


async function addNewAlbum(event){
    event.preventDefault();
    console.log("Event default prevented function")

    try {
        
        let form = new FormData(event.target);
        

        let model = form.get("model");
        let imageUrl = form.get("imageUrl");
        let price = form.get("price");
        let weight = form.get("weight");
        let speed = form.get("speed");
        let about = form.get("about");

        if (!model || !imageUrl || !price || !weight || !speed || !about){
            return;
        }

        let body = { model,imageUrl, price, weight, speed, about } 
          
        const accessToken = JSON.parse(sessionStorage.getItem("userData")).accessToken;
        
        let response = await fetch("http://localhost:3030/data/cars", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': accessToken
            },
            body: JSON.stringify(body)
        })

        if (!response.ok){
            throw new Error(response.statusText)
        }

        let result = await response.json();
        console.log(result);

        page.redirect("/cars")

        

    } catch (error) {
        alert(error.message)
    }

}