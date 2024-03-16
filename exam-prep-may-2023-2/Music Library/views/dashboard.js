import { html, render } from "../node_modules/lit-html/lit-html.js"


export async function dashBoardView(){
    console.log("From dashboard view");
    try {
        let url = "http://localhost:3030/data/albums?sortBy=_createdOn%20desc"
        let response = await fetch( url )

        if (!response.ok){
            throw new Error(response.statusText)
        }
        let albums = await response.json()

        if (albums.length == 0){
            render(templateNoAlbums(), document.querySelector("main"))
        }else{
            render(template(albums), document.querySelector("main"))
        }


    } catch (error) {
        alert(error.message);
    }
}

let template = ( data ) => html`
    <section id="dashboard">
    <h2>Albums</h2>

        <ul class="card-wrapper">
            ${data.map(a => html`
                
                
                <!-- Display a li with information about every post (if any)-->
                <li class="card">
                    <img src="${a.imageUrl}" alt="travis" />
                    <p>
                    <strong>Singer/Band: </strong><span class="singer">${a.singer}</span>
                    </p>
                    <p>
                    <strong>Album name: </strong><span class="album">${a.album}</span>
                    </p>
                    <p><strong>Sales:</strong><span class="sales">${a.sales}</span></p>
                    <a class="details-btn" href="/details">Details</a>
                </li>
                
            `)}

        </ul>    
    </section>    
`;

let templateNoAlbums = ( data ) => html`
    <section id="dashboard">
        <h2>Albums</h2>
        <h2>There are no albums added yet.</h2>
    </section>    
`;