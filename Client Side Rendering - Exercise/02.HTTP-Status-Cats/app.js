// import { cats } from "./catSeeder.js";
// import { html, render } from "./node_modules/lit-html/lit-html.js";

// const sectionAllCats = document.getElementById('allCats');

// let template = html`
//     <ul>
//         ${cats.map((cat) => html`
//         <li>
//             <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
//                     <div class="info" >
//                         <button class="showBtn"  @click=${onClick}>Show status code</button>
//                         <div class="status" style="display: none" id=${cat.id}>
//                             <h4>Status Code: ${cat.statusCode}</h4>
//                             <p>${cat.statusMessage}</p>
//                         </div>
//                     </div>
//         </li>        
//         `)}
//     </ul>`;

// render(template, sectionAllCats);

// function onClick(e){
//     console.log('you clicked on the button');
//     console.log(e.target);

//     let divEl = e.target.parentNode;
//     let status = divEl.querySelector('.status');

//     status.style.display = status.style.display === 'none' ? 'block' : 'none';
//     e.target.textContent = e.target.textContent === 'Show status code' ? 'Hide status code' : 'Show status code'
    
    
// }

import { cats } from "./catSeeder.js";
import { html, render } from "./node_modules/lit-html/lit-html.js";

const sectionAllCats = document.getElementById('allCats');

function onClick(e){
    e.preventDefault();
    console.log('you clicked on the button');
    console.log(e.target);

    let divEl = e.target.parentElement;
    let status = divEl.querySelector('.status');

    // Toggling the display style of the status div
status.style.display = status.style.display === 'none' ? 'block' : 'none';

// Toggling the button text content
e.target.textContent = e.target.textContent === 'Show status code' ? 'Hide status code' : 'Show status code';

    
    
}

let template = html`
    <ul>     
        ${cats.map((cat) => html`
        <li>
            <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
                    <div class="info" >
                        <button class="showBtn"  @click=${onClick}>Show status code</button>
                        <div class="status" style="display: none" id=${cat.id}>
                            <h4>Status Code: ${cat.statusCode}</h4>
                            <p>${cat.statusMessage}</p>
                        </div>
                    </div>
        </li>        
        `)}
    </ul>`;

render(template, sectionAllCats);

