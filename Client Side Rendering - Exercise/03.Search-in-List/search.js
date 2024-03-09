import { towns } from "./towns.js";
import { html, render } from "./node_modules/lit-html/lit-html.js";

const btnSearch = document.querySelector('button')
btnSearch.addEventListener('click', search)

function loadListItems(){
   let template = html`
      <ul>
         ${towns.map((t) => html`<li id=${t}>${t}</li>`)}
      </ul>
   `;

   render(template, document.getElementById('towns'))
}

loadListItems();

function search(e) {
   e.preventDefault();

   console.log('works.... ');
   let searchedWord = document.getElementById('searchText').value;

   let matches = 0;
   towns.forEach((t) => {
      if (t.includes(searchedWord)){
         document.getElementById(t).setAttribute('class', 'active');
         console.log('Towns', t);
         matches++;
      }
   })
   document.getElementById('result').textContent = `${matches} matches found`

}

