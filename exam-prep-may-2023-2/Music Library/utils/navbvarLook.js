import { html, render } from "../node_modules/lit-html/lit-html.js"



export function updateNavBar(ctx, next){
    let information = sessionStorage.getItem("userData");

    if (information != null){
        render(templateUser(), document.querySelector("nav"))
    }else{
        render(templateGuest(), document.querySelector("nav"))
    }

    next();
}

let templateGuest = () =>  html`
        <div>
          <a href="/dashboard">Dashboard</a>
        </div>
        <div class="guest">
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </div>
`;

let templateUser = () => html`

        <div>
          <a href="/dashboard">Dashboard</a>
        </div>
        <div class="user">
          <a href="/add">Add Album</a>
          <a  href="/logout">Logout</a>
        </div>
`;


