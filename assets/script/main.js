// navbar blur on scroll

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {

  if(window.scrollY > 40){
    navbar.style.background = 'rgba(11,13,16,0.92)';
  } else {
    navbar.style.background = 'rgba(11,13,16,0.75)';
  }

});

// reveal animations

const revealElements = document.querySelectorAll(
  '.project-card, .skill-card, .timeline-item, .about-image, .about-content'
);

const observer = new IntersectionObserver((entries) => {

  entries.forEach((entry) => {

    if(entry.isIntersecting){

      entry.target.classList.add('show');

    }

  });

}, {
  threshold: 0.15
});

revealElements.forEach((el) => {

  el.classList.add('hidden');

  observer.observe(el);

});