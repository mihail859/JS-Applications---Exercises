

export function home(){
    
    const allSections = document.querySelectorAll('.view-section');
    allSections.forEach(sec =>{
        sec.style.display = 'none';

    });

    let homeView = document.getElementById('home-page');
    let movies = document.getElementById('movie')

    homeView.style.display = 'block';
    movies.style.display = 'block';
}

export function logInPageView(){
    const allSections = document.querySelectorAll('.view-section');
    allSections.forEach(sec =>{
        sec.style.display = 'none';

    })
    document.getElementById('form-login').style.display = 'block';

    let navBar = document.querySelectorAll('.navbar a');
    navBar.forEach(a => {
        if (a.textContent.includes('Welcome') || a.textContent === 'Logout'){
            a.style.display = 'none';
        }
    })
}

export function isUserLoggedIn() {
    // Check if the sessionStorage contains the necessary information indicating that the user is logged in
    const accessToken = sessionStorage.getItem('accessToken');
    const loggedInUser = sessionStorage.getItem('loggedInUser');

    // Return true if both accessToken and loggedInUser are truthy values, indicating that the user is logged in
    return accessToken && loggedInUser;
};


export async function loadMovies(){
    try {
        let url = 'http://localhost:3030/data/movies';
        let response = await fetch(url);

        if (!response.ok){
            throw new Error('Wrong')
        }

        let moviesData = await response.json();
        console.log(moviesData);
    } catch (error) {
        alert(error.message)
    }

    
}
