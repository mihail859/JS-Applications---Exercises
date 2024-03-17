import { html, render } from "../node_modules/lit-html/lit-html.js" 
import page from "../node_modules/page/page.mjs"

export async  function editView(ctx, next){
    try {
        console.log("Edit view")
        let id = ctx.params.id;
        console.log(id);

        let responseGetData = await fetch("http://localhost:3030/data/albums/" + id);
        let dataResult = await responseGetData.json();

        render(templateEditForm(dataResult), document.querySelector("main"))

        console.log(dataResult)
        
    } catch (error) {
        alert(error.message)
    }
}

let templateEditForm = (d) => html`
    <section id="edit">
        <div class="form">
            <h2>Edit Album</h2>
            <form class="edit-form" @submit=${editFunctionality} data-id=${d._id}>
                <input type="text" name="singer" id="album-singer" value="${d.singer}" />
                <input type="text" name="album" id="album-album" value="${d.album}" />
                <input type="text" name="imageUrl" id="album-img" value="${d.imageUrl}" />
                <input type="text" name="release" id="album-release" value="${d.release}" />
                <input type="text" name="label" id="album-label" value="${d.label}" />
                <input type="text" name="sales" id="album-sales" value="${d.sales}" />

                <button type="submit">Post</button>
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
        const accessToken = JSON.parse(sessionStorage.getItem("userData")).accessToken;
        
        let response = await fetch("http://localhost:3030/data/albums/" + id, {
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