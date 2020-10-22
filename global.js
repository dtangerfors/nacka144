// Toggle Hamburger menu 

var hamburger = document.querySelector('.js-toggle-hamburger');
var navMenu = document.querySelector('.js-toggle-menu');
var asideMenu = document.querySelector('.js-aside-menu');
var bodyOverlay = document.querySelector('.body-overlay');
var screenW = window.innerWidth;

hamburger.addEventListener('click', function(e){
  
    hamburger.classList.toggle('is-clicked')

    if(hamburger.classList.contains('is-clicked')) {
        openMenu();
    } else {
        closeMenu();
    }

});

function openMenu() {
    navMenu.classList.add('open-menu');
    bodyOverlay.style.display = 'block';
    gsap.set(bodyOverlay, {x: 0, opacity: 1});
    gsap.from(bodyOverlay, {duration: 0.5, x: 1000, opacity: 0});
    gsap.set(navMenu, {x: 0, opacity: 1});
    gsap.from(navMenu, {x: 500, opacity: 0, duration: 0.3, ease: 'power1'});
}

function closeMenu() {
    navMenu.classList.remove('open-menu');
    gsap.to(bodyOverlay, {duration: 0.3, x: 1000, opacity: 0})
        setTimeout(function() {
            bodyOverlay.style.display = 'none'
        }, 300);
        gsap.to(navMenu, {x: 500, opacity: 0, duration: 0.3, ease: 'power1'});
}

if (screenW <= 1200) {
    navMenu.appendChild(asideMenu)
}

window.addEventListener('resize', function() {
    var screenW = window.innerWidth;
    
    if (screenW <= 1200) {
        navMenu.appendChild(asideMenu)
    } else {
        document.querySelector('.site-content__section').appendChild(asideMenu);
        navMenu.removeAttribute('style');
    }
});

document.addEventListener('click', function(e) {
    if(e.target.className === 'body-overlay') {
        closeMenu();
        hamburger.classList.remove('is-clicked');
    }
})

