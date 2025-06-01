"use strict";
// import functions
import classlist_polyfill from "./modules/classlist_polyfill";
import for_each_polyfill from "./modules/foreach_polyfill";
import type_ratio_interpolation from "./modules/type_ratio_interpolation";
/*
    polyfill to enable use of forEach on node lists in IE11
*/
for_each_polyfill();
/*
    polyfill to allow use of replace method
    on a classList in internet explorer
*/
classlist_polyfill();
/*
    interpolate between type ratio minimum and maximum values,
    and store the result in a CSS custom property
*/
type_ratio_interpolation();

/*
    Back to top button functionality
*/
document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopButton.style.display = 'block';
            } else {
                backToTopButton.style.display = 'none';
            }
        });
        
        // Scroll to top when button is clicked
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Add active state to navigation links based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});