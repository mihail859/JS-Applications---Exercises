

export function loadYears(){
    const yearlySections = document.querySelector('#years');
    yearlySections.addEventListener('click',(e)=>{
        if (e.target.tagName == 'TD'){

            const currYear = e.target.textContent.trim()
            const yearSection = document.getElementById(`year-${currYear}`);

            yearlySections.style.display = 'none';
            yearSection.style.display = 'block';

            yearSection.addEventListener('click', (e) => {
                
            });
        }
    });
}

