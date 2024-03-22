import { html } from '../../node_modules/lit-html/lit-html.js';
import { getUserData } from '../utils.js';
import { getCarsByName } from '../data/cars.js';

const searchTemplate = (onSearch, foundCars, userData) => html`
    <section id="search">
        <div class="form">
        <h4>Search</h4>
        <form class="search-form">
            <input
              type="text"
              name="search"
              id="search-input"
            />
            <button class="button-list" @click=${onSearch}>Search</button>
          </form>
        </div>
        <h4 id="result-heading">Results:</h4>
        <div class="search-result">
        

            ${foundCars.length > 0
                ? html`
                    ${foundCars.map((car) => foundCarCard(car))}
                `
                : html`
                    <h2 class="no-avaliable">No result.</h2>
                `
            }

        </div>
    </section>
`;

const foundCarCard = (motor) => html`
    <div class="motorcycle">
        <img src=${motor.imageUrl} alt="example1"/>
        <h3 class="model">${motor.model}</h3>
        <a class="details-btn" href="/catalog/${motor._id}">More Info</a>
    </div>
`;

export async function searchPage(ctx) {
    let foundCars = [];
    const userData = getUserData();

    ctx.render(searchTemplate(onSearch, foundCars, userData));

    async function onSearch(e) {
        e.preventDefault();
        const name = document.getElementById('search-input').value;

        if(name == '') {
            return alert('The field is required');
        }

        foundCars = await getCarsByName(name);
        console.log(foundCars);

        ctx.render(searchTemplate(onSearch, foundCars, userData));
    }
}

