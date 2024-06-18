//This Script is used to make Nav logo clickable without having to change it to an <a> element

const navLogo = document.querySelectorAll(".clickableLogo");

navLogo.forEach((logo) => {
    logo.addEventListener("click", () => {
        window.location.href = "index.html";
    } )
})




