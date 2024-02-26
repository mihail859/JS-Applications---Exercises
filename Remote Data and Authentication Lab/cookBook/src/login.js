let form = document.querySelector('form');
form.addEventListener('submit', login);

async function login(e){
    e.preventDefault();

    let formData = new FormData(form);
    let url = 'http://localhost:3030/users/login';
    let settings = {
        method: 'post', 
        headers: {'content-Type': 'application/json'},
        body: JSON.stringify({
            email: formData.get('email'), 
            password: formData.get('password')

        })
    };

    let response = await fetch(url, settings);
    let result = await response.json();

    sessionStorage.setItem('accessToken', result.accessToken);

    window.location = '/index.html'


}