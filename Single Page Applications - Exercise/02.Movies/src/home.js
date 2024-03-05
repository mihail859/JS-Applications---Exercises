
import {home, isUserLoggedIn, loadMovies } from "./utils.js"
export function homeFunction(){
    home();

    if (isUserLoggedIn()) {
        console.log('User is logged in');
        let navBar = document.querySelectorAll('.navbar a');
        navBar.forEach(a => {
            if (a.textContent.includes('Welcome')){
                const loggedInUser = sessionStorage.getItem('loggedInUser');
                a.style.display = 'inline-block';
                a.textContent = `Welcome, ${loggedInUser}`
            }
        })
    } else {
        console.log('User is not logged in');
    }

    loadMovies();
}