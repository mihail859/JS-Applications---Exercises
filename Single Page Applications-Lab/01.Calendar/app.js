import { loadYears } from "./yearsView.js";

const sections = document.querySelectorAll('section');

sections.forEach((s) => {
    if (s.id === 'years'){
        s.style.visibility = 'visible';
        return;
    }
    	s.style.display = 'none';
});

loadYears();
