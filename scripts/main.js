
document.addEventListener("DOMContentLoaded", () => {
    const faders = document.querySelectorAll('.fade-in');

    const options = {
        threshold: 0.5, // when 10% of element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // fade in only once
            }
        });
    }, options);

    faders.forEach(fader => observer.observe(fader));
});




