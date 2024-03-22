import { html, render } from "../node_modules/lit-html/lit-html.js"


export async function dashBoardView(){
    console.log("From dashboard view");
    try {
        let url = "http://localhost:3030/data/cars?sortBy=_createdOn%20desc"
        let response = await fetch( url )

        if (!response.ok){
            throw new Error(response.statusText)
        }
        let cars = await response.json()
        console.log(cars)

        if (cars.length == 0){
            render(templateNoAlbums(), document.querySelector("main"))
        }else{
            render(template(cars), document.querySelector("main"))
        }


    } catch (error) {
        alert(error.message);
    }
}

let template = ( data ) => html`
    <h3 class="heading">Our Cars</h3>
        <section id="dashboard">
          
          ${data.map( x => html`
          
                <div class="car">
                    <img src="${x.imageUrl}" alt="example1" />
                    <h3 class="model">${x.model}</h3>
                    
                    <div class="specs">
                    <p class="price">Price: €${x.price}</p>
                    <p class="weight">Weight: ${x.weight} kg</p>
                    <p class="top-speed">Top Speed: ${x.speed} kph</p>
                    </div>
                    <a class="details-btn" href="/details/${x._id}">More Info</a>
                </div>
          `)}
          
        </section>
        
        
`;

let templateNoAlbums = (  ) => html`
    <h3 class="heading">Our Cars</h3>  

    <h3 class="nothing">Nothing to see yet</h3>
`;