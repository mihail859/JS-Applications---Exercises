console.log('TODO:// Implement Register functionality');

function register(){
    const registerBtn = document.querySelector('button');
    let notificationParagraph = document.querySelector('.notification')
    console.log(notificationParagraph);

    let  form = document.querySelector('form');
    console.log(form);

    registerBtn.addEventListener('click', onRegister);



    async function onRegister(e){
        e.preventDefault();
    
        const formData = new FormData(form);
        let email = formData.get('email');
        let password = formData.get('password');
        let rePass = formData.get('rePass');

        console.log(email, password, rePass);

        if (!email){
            notificationParagraph.textContent = 'Please enter your email';
        }else if (!password){
            notificationParagraph.textContent = 'Please enter your password';
        }else if (rePass !== password){
            notificationParagraph.textContent = 'Both passwords must match!';
        }

        if (email && password && rePass){

        }
    
    }
}




register();