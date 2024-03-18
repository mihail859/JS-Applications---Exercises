import { html, render } from "../node_modules/lit-html/lit-html.js"

export function home(){
    console.log("From home page")
    render(template, document.getElementById("main-element"))
}

let template = html`
        <section id="hero">
          <h1>
            Accelerate Your Passion Unleash the Thrill of Sport Cars Together!
          </h1>
        </section>
`;