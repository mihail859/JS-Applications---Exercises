import {html, render} from './node_modules/lit-html/lit-html.js' 


const btnLoad = document.getElementById('btnLoadTowns');

btnLoad.addEventListener('click', (e) =>{
    e.preventDefault();
    const townsEl = document.getElementById('towns').value;
    let towns  = townsEl.split(', ');
    e.preventDefault();

    let template = html`
        <ul>
            ${towns.map((t) => html`<li>${t}</li>`)}    
        </ul>
    `;

    render(template, document.getElementById('root'))
})