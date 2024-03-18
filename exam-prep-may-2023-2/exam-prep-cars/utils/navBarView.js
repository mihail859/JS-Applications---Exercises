import { html, render } from "../node_modules/lit-html/lit-html.js"

export function  navBarLook(ctx, next){
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
            <a href="/cars">Our Cars</a>
            <a href="/search">Search</a>
          </div>
        <div class="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
        </div>
`;

let templateUser = () => html`

        <div>
            <a href="/cars">Our Cars</a>
            <a href="/search">Search</a>
        </div>

          <!-- Logged-in users -->
          <div class="user">
            <a href="/add">Add Your Car</a>
            <a href="/logout">Logout</a>
          </div>
`;