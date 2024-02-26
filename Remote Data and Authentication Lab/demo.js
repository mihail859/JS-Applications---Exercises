let myBtn = document.getElementById('submitBtn')
myBtn.addEventListener('click', addData);

let btnSeeLandmarks = document.getElementById('seeData');
btnSeeLandmarks.addEventListener('click', seeLandmarksFunc)

let tbody = document.querySelector('tbody');

async function seeLandmarksFunc(){
    try {
        let url = 'http://localhost:3030/jsonstore/landmarks';
        let response = await fetch(url);
        let returningData = await response.json();

        let valuesData = [...Object.values(returningData)]

        tbody.replaceChildren();
        valuesData.forEach(obj => {

            console.log(obj.yearStart);
            
            let trElement = document.createElement('tr');
            let td1 = document.createElement('td')
            td1.textContent = obj.name;

            let td2 = document.createElement('td')
            td2.textContent = obj.area

            let td3 = document.createElement('td')
            td3.textContent = obj.yearStart;

            let td4 = document.createElement('td')
            td4.textContent = obj.yearEnd;

            trElement.appendChild(td1);
            trElement.appendChild(td2);
            trElement.appendChild(td3);
            trElement.appendChild(td4);

            tbody.appendChild(trElement)
        })

    } catch (error) {
        console.log(error);
    }
}




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
    let btnParent = e.target.parentElement;
    btnParent.reset();

}