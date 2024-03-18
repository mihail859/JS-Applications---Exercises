import { html, render} from "../node_modules/lit-html/lit-html.js"



export async function detailsView(ctx, next){
    console.log("From car details view");

    try {
        let idCar = ctx.params.id;
        console.log(idCar)

        let url = `http://localhost:3030/data/cars/${idCar}`
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

let templateDetails = ( x ) => html`
    <section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${x.imageUrl}" alt="example1" />
            <p id="details-title">${x.model}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p class="price">Price: €${x.price}</p>
                <p class="weight">Weight: ${x.weight} kg</p>
                <p class="top-speed">Top Speed: ${x.speed} kph</p>
                <p id="car-description">${x.about}</p>
              </div>
              <!--Edit and Delete are only for creator-->
              <div id="action-buttons">
                
              </div>
            </div>
          </div>
        </section>
`;


let template2 = (d) =>  html`
    

    <a href="/edit/${d._id}" id="edit-btn">Edit</a>
    <a href="/del/${d._id}" id="delete-btn">Delete</a>
    
`;