import { html, render } from "../node_modules/lit-html/lit-html.js" 
import page from "../node_modules/page/page.mjs"

export async  function editView(ctx, next){
    try {
        console.log("Edit view")
        let id = ctx.params.id;
        console.log(id);

        let responseGetData = await fetch("http://localhost:3030/data/cars/" + id);

        if (!responseGetData) {
            throw new Error(responseGetData.statusText)
        }
        let dataResult = await responseGetData.json();

        render(templateEditForm(dataResult), document.querySelector("main"))

        console.log(dataResult)
        
    } catch (error) {
        alert(error.message)
    }
}

let templateEditForm = (x) => html`
    <section id="edit">
          <div class="form form-auto">
            <h2>Edit Your Car</h2>
            <form class="edit-form"  @submit=${editFunctionality} data-id=${x._id}>
              <input type="text" name="model" id="model" value=${x.model}/>
              <input
                type="text"
                name="imageUrl"
                id="car-image"
                value=${x.imageUrl}
              />
              <input
                type="text"
                name="price"
                id="price"
                value=${x.price}
              />
              <input
                type="number"
                name="weight"
                id="weight"
                value=${x.weight}
              />
              <input
                type="text"
                name="speed"
                id="speed"
                value=${x.speed}
              />
              <textarea
                id="about"
                name="about"
                rows="10"
                cols="50"
              >${x.about}</textarea>
              <button type="submit">Edit</button>
            </form>
          </div>
        </section>
`;



async function editFunctionality(event){
    event.preventDefault();
    console.log("Event default prevented function")

    try {
        
        let form = new FormData(event.target);
        let id = event.target.dataset.id;

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
        
        let response = await fetch("http://localhost:3030/data/cars/" + id, {
            method: "PUT",
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

        page.redirect("/details/" + id)

        

    } catch (error) {
        alert(error.message)
    }


}