import { html, render } from "../node_modules/lit-html/lit-html.js"

export function homeView(){
    console.log("From home section");
    render(template(), document.querySelector("main"))
}

let template = () => html`
        <section id="home">
        <img src="./images/landing.png" alt="home" />

        <h2 id="landing-text"><span>Add your favourite albums</span> <strong>||</strong> <span>Discover new ones right
            here!</span></h2>
      </section>
`;