import { html, render } from "./node_modules/lit-html/lit-html.js";
import { template } from "./template.js";

async function loadElements(){
   try {
      let url = 'http://localhost:3030/jsonstore/advanced/table';
      let response = await fetch(url);
      if (!response.ok){
         throw new Error(response.statusText)
      }
      let data = await response.json();
      render(Object.values(data).map(x => template(x)), document.querySelector('tbody'))

   } catch (error) {
      alert(error.message);
   }
}



async function solve() {

   await loadElements();
   document.querySelector('#searchBtn').addEventListener('click', onClick);

   function onClick() {
      let searched = document.getElementById('searchField').value;
      if (!searched){
         return;
      }
      let rows = Array.from(document.querySelectorAll('tbody tr'));

      rows.forEach(row => row.classList.remove('select'));

      for (let row of rows) {
         let rowTd = Array.from(row.children);
         for (let child of rowTd){
            console.log(child.textContent.toLocaleLowerCase().includes(searched.toLocaleLowerCase()));

            if (child.textContent.toLocaleLowerCase().includes(searched.toLocaleLowerCase())){
               row.setAttribute('class', 'select')
            }
         }

         console.log('---- //---- ');
      }

      document.getElementById('searchField').value = '';


   }
}

await solve();
