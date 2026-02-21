const starsContainers = document.querySelectorAll('.stars');

starsContainers.forEach(stars => {
    const starSpans = stars.querySelectorAll('span');
    
    starSpans.forEach(star => {
        star.addEventListener('mouseover', () => {
            
            const val = parseInt(star.dataset.value);
            starSpans.forEach(s => {
                s.classList.toggle('filled', parseInt(s.dataset.value) <= val);
            });
        });

        star.addEventListener('click', () => {

            const val = parseInt(star.dataset.value);
            starSpans.forEach(s => {
                s.classList.toggle('filled', parseInt(s.dataset.value) <= val);
            });
        });

        star.addEventListener('mouseout', () => {
            starSpans.forEach(s => s.classList.remove('filled'));
        });
    });
});