import { html, render } from "../node_modules/lit-html/lit-html.js"
import page from "../node_modules/page/page.mjs"

export async function logInView(){
    console.log('logInView')
    render(template(), document.querySelector("main"))
    
}

let template = () => html`
    <section id="login">
        <div class="form" @submit=${logIN}>
          <h2>Login</h2>
          <form class="login-form">
            <input type="text" name="email" id="email" placeholder="email" />
            <input type="password" name="password" id="password" placeholder="password" />
            <button type="submit">login</button>
            <p class="message">
              Not registered? <a href="#">Create an account</a>
            </p>
          </form>
        </div>
      </section>
`;

async function logIN(event){
    event.preventDefault();
    try {
        let form = new FormData(event.target)

        let email = form.get('email')
        let password = form.get('password')

        let urlLogin = 'http://localhost:3030/users/login';

        if (!email || !password) {	
            throw new Error("Wrong invalid or password")
        }

        let data = {
            email, 
            password
        }
        let response = await fetch(urlLogin, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });

        if (!response.ok){
            throw new Error(response.statusText)
        }

        let registeredData = await response.json();
        let dataUser = {
            accessToken: registeredData.accessToken,
            loggedInUser: registeredData.email,
            id: registeredData._id
        }

        sessionStorage.setItem('userData', JSON.stringify(dataUser));
        page.redirect('/dashboard')

    } catch (error) {
        alert(error.message)
    }
}