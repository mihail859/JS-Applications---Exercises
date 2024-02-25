let myBtn = document.getElementById('submitBtn')
myBtn.addEventListener('click', addData);

async function addData(e){
    e.preventDefault();
    console.log('event prevented');

    let name = document.getElementById('name').value; 
    let area = document.getElementById('area').value; 
    let yearStart = document.getElementById('yearStart').value; 
    let yearEnd = document.getElementById('yearEnd').value; 

    let url = 'http://localhost:3030/jsonstore/landmarks';
    let settings = {
        method: 'Post',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, area, yearStart, yearEnd})
    };
    

    let response = await fetch(url, settings);
    let result = await response.json();

    console.log(result)


}