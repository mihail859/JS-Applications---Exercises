console.log('TODO:// Implement Home functionality');

function app(){
    const accessToken = sessionStorage.getItem('accessToken');
    const loggedUserEmail = sessionStorage.getItem('loggedInUser');

    if (loggedUserEmail) {
        document.querySelector('span').textContent = loggedUserEmail;
    }else{
        document.querySelector('span').textContent = 'quest';
    }

    if (accessToken){
        document.getElementById('login').style.display = 'none';
        document.getElementById('register').style.display = 'none';
        document.getElementById('logout').style.display = 'inline';
    }else{
        document.getElementById('login').style.display = 'inline';
        document.getElementById('register').style.display = 'inline';
        document.getElementById('logout').style.display = 'none';
    }
}

app();