import { html, render } from "../node_modules/lit-html/lit-html.js";
import page from "//unpkg.com/page/page.mjs";


export async function loginFunction(){
    console.log("From login function");
    render(template(), document.querySelector('.container'))

}

let template = () => html`
    <div class="row space-top">
            <div class="col-md-12">
                <h1>Login User</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit=${onSubmit}>
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="email">Email</label>
                        <input class="form-control" id="email" type="text" name="email">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="password">Password</label>
                        <input class="form-control" id="password" type="password" name="password">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Login" />
                </div>
            </div>
        </form>
`;

async function onSubmit(e){
   try {
        e.preventDefault();
        let form  = new FormData(e.target)
        let email = form.get('email');
        let password = form.get('password');

        if (!email || !password){
            throw new Error('Please enter a valid input')
        }

        let urlLogin = 'http://localhost:3030/users/login';
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

        sessionStorage.setItem('dataUser', JSON.stringify(dataUser));
        page.redirect('/')


        
        // sessionStorage.setItem('accessToken', registeredData.accessToken);
        // sessionStorage.setItem('loggedInUser', registeredData.email);
        // sessionStorage.setItem('id', registeredData._id);

   } catch (error) {
        alert(error.message)
   }
}