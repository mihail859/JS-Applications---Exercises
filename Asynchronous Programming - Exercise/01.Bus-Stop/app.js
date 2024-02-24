async function getInfo() {
    const busesUlList = document.getElementById('buses')

    const stopId = document.getElementById('stopId').value;

    const response = await fetch(`http://localhost:3030/jsonstore/bus/businfo/${stopId}`);

    const data = await response.json();

    
    document.getElementById('stopName').textContent = data.name;

    for (let [busId, time] of Object.entries(data.buses)){
        const liElement = document.createElement('li');
        liElement.textContent = `Bus ${busId} arrives in ${time} minutes`;

        busesUlList.appendChild(liElement)

    }
}