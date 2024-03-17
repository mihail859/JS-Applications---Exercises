import { html, render } from "../node_modules/lit-html/lit-html.js"
import page from "../node_modules/page/page.mjs"

export async function createView(){
    console.log("To be created")
    render(template(), document.querySelector("main"))
}

let template  = () => html`

    <section id="create">
        <div class="form">
          <h2>Add Album</h2>
          <form class="create-form" @submit=${addNewAlbum}>
            <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" />
            <input type="text" name="album" id="album-album" placeholder="Album" />
            <input type="text" name="imageUrl" id="album-img" placeholder="Image url" />
            <input type="text" name="release" id="album-release" placeholder="Release date" />
            <input type="text" name="label" id="album-label" placeholder="Label" />
            <input type="text" name="sales" id="album-sales" placeholder="Sales" />

            <button type="submit">post</button>
          </form>
        </div>
      </section>

`;


async function addNewAlbum(event){
    event.preventDefault();
    console.log("Event Default Prevented");
    try {
        
        let form = new FormData(event.target);

        let singer = form.get("singer");
        let album = form.get("album");
        let imageUrl = form.get("imageUrl");
        let release = form.get("release");
        let label = form.get("label");
        let sales = form.get("sales");

        if (!singer || !album || !imageUrl || !release || !label || !sales){
            return;
        }

        let body = { singer, album, imageUrl, release, label, sales }
        let accessToken = JSON.parse(sessionStorage.getItem("userData")).accessToken;

        console.log(accessToken);
        
        let response = await fetch("http://localhost:3030/data/albums", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' , 'X-Authorization': accessToken},
            body: JSON.stringify({ singer, album, imageUrl, release, label, sales })
        })

        if (!response.ok){
            throw new Error(response.statusText)
        }

        let result = await response.json();
        console.log(result);

        page.redirect("/dashboard")

    } catch (error) {
        alert(error.message)
    }
}
