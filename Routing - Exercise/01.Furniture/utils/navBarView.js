export function navBarLook(){
    let dataUser = sessionStorage.getItem('dataUser');
    if (dataUser == null){
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'inline-block';
        return false;
    }else{
        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
        return true;
    }
}