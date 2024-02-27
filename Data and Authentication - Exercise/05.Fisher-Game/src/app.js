console.log('TODO:// Implement Home functionality');

function app(){
    const accessToken = sessionStorage.getItem('accessToken');
    const loggedUserEmail = sessionStorage.getItem('loggedInUser');

    if (loggedUserEmail) {
        document.querySelector('span').textContent = loggedUserEmail;
    }else{
        document.querySelector('span').textContent = 'quest';
    }
}

app();