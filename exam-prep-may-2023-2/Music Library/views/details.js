import { html, render} from "../node_modules/lit-html/lit-html.js"
import { detailsViewBasedOnUser } from "../utils/detailsViewUpdate.js";

export async function detailsView(ctx, next){
    console.log("From song details view");

    try {
        let idPublication = ctx.params.id;
        console.log(idPublication)

        let url = `http://localhost:3030/data/albums/${idPublication}`
        let response = await fetch(url)
        if (!response.ok){
            throw new Error(response.statusText)
        }
        let data = await response.json()
        console.log(data)

        render(templateDetails(data), document.querySelector("main"))
        const dataUser = JSON.parse(sessionStorage.getItem("userData"));
        if (dataUser && dataUser.id === data._ownerId) {
            
            render(template2(data), document.getElementById('action-buttons'));
        } 

    } catch (error) {
        alert(error.message)
    }
}

let templateDetails = ( d ) => html`
    <section id="details">
        <div id="details-wrapper">
          <p id="details-title">Album Details</p>
          <div id="img-wrapper">
            <img src="${d.imageUrl}" alt="example1" />
          </div>
          <div id="info-wrapper">
            <p><strong>Band:</strong><span id="details-singer">${d.singer}</span></p>
            <p>
              <strong>Album name:</strong><span id="details-album">${d.album}</span>
            </p>
            <p><strong>Release date:</strong><span id="details-release">${d.release}</span></p>
            <p><strong>Label:</strong><span id="details-label">${d.label}</span></p>
            <p><strong>Sales:</strong><span id="details-sales">${d.sales}</span></p>
          </div>
          <div id="likes">Likes: <span id="likes-count">0</span></div>

          <!--Edit and Delete are only for creator-->

            <div id="action-buttons">
                ${detailsViewBasedOnUser() ? html`
            
                    <a href="/like/${d._id}" id="like-btn">Like</a>` : ''}
            </div>
          
        </div>
      </section>
`;


let template2 = (d) =>  html`
    <a href="/edit/${d._id}" class="btn btn-info">Edit</a>
    <a href="/del/${d._id}" class="btn btn-red">Delete</a>
    
`;
