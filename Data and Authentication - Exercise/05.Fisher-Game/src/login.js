console.log('TODO:// Implement Login functionality');

function logIn(){
    const accessToken = sessionStorage.getItem('accessToken');
    

    if (accessToken){
        document.getElementById('logout').style.display = 'inline';
    }else{
        document.getElementById('logout').style.display = 'none';
    }

    const logInBtn = document.querySelector('button');
    let notificationParagraph = document.querySelector('.notification')
    console.log(notificationParagraph);

    let  form = document.querySelector('form');

    logInBtn.addEventListener('click', onLogin);

    async function onLogin(event){
        event.preventDefault();
    
        const formData = new FormData(form);
        let email = formData.get('email');
        let password = formData.get('password');


        if (!email){
            notificationParagraph.textContent = 'Please enter your email';
        }else if (!password){
            notificationParagraph.textContent = 'Please enter your password';
        }

        if (email && password){
            try {
                let dataUser = {email, password}
                let url = 'http://localhost:3030/users/login';
                let response = await fetch(url, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(dataUser)
                });

                if (!response.ok){
                    throw new Error(response.statusText)
                }

                let registeredData = await response.json();
                
                sessionStorage.setItem('accessToken', registeredData.accessToken);
                sessionStorage.setItem('loggedInUser', registeredData.email);
                sessionStorage.setItem('id', registeredData._id);


                window.location = 'index.html';
            } catch (error) {
                notificationParagraph.textContent = error.message;
            }
        }
    }
}

logIn()