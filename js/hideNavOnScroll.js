let prevScrollPos = window.scrollY;

const mobileNavBar = document.querySelector(".mobile-nav");

function handleHideNav() {

    var currentScrollPos = window.scrollY;
    const mobileMenu = document.querySelector(".mobile-menu")

    if (prevScrollPos < currentScrollPos && currentScrollPos > 100 && !mobileMenu.classList.contains('mobile-menu-active') ) {
        mobileNavBar.classList.add('scrolledMobileNav');
    } else {
        mobileNavBar.classList.remove('scrolledMobileNav');
    }
    prevScrollPos = currentScrollPos;
}

window.addEventListener("resize", () => {
    mobileNavBar.classList.remove('scrolledMobileNav')
});


window.addEventListener("scroll", handleHideNav)


