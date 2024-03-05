import { homeFunction } from './home.js'
import { logoutFunction } from './logout.js'
import { loginFunction } from './login.js'
import { registerFunction } from './register.js'
import { home } from './utils.js'

const hrefLinks = {
    '/': homeFunction,
    '/logout':logoutFunction ,
    '/login': loginFunction,
    '/register': registerFunction
}


let navBar = document.querySelectorAll('.navbar a');
navBar.forEach(link =>{
    link.addEventListener('click', (e)=>{
        e.preventDefault();
        console.log(e.target.tagName);

        const url = new URL(link.href);
        const path = url.pathname

        console.log(path);
        if (hrefLinks.hasOwnProperty(path)){
            let callFunc = hrefLinks[path];
            callFunc();
        }
    })
});

homeFunction()



