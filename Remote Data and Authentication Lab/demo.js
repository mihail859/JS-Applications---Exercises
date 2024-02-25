let myBtn = document.getElementById('submitBtn')
myBtn.addEventListener('click', addData);

async function addData(e){
    e.preventDefault();
    console.log('event prevented');

    let name = document.getElementById('name').value; 
    let area = document.getElementById('area').value; 
    let yearStart = document.getElementById('yearStart').value; 
    let yearEnd = document.getElementById('yearEnd').value; 

    

}