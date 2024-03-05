import { logInPageView } from "./utils.js";
import {home } from "./utils.js"
import { homeFunction } from "./home.js";

export function loginFunction(){
    logInPageView();
    

    const formElem = document.getElementById("login-form");
    formElem.addEventListener('submit', onLogin);

    async function onLogin(e){
        e.preventDefault();
    
        let form = new FormData(formElem);
        let email = form.get('email');
        let password = form.get('password');
    
        if (!email || !password){
            alert ('Invalid email or password');
        }
        try {
            let dataUser = { email, password };
            let response = await fetch(`http://localhost:3030/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataUser)
            });
            if (!response.ok){
                throw new Error(response.statusText)
            }
    
            let registeredData = await response.json();
            
            sessionStorage.setItem('accessToken', registeredData.accessToken);
            sessionStorage.setItem('loggedInUser', registeredData.email);
            sessionStorage.setItem('id', registeredData._id);
    
            
            homeFunction();
    

        } catch (error) {
            alert(error.message);
        }
       
    }

    
}



