function startAnimations() {
    window.addEventListener("scroll", onScroll);
}
window.addEventListener("load", startAnimations);

function onScroll() {
    let linesToAnimate = document.querySelectorAll(".animation__line");
    linesToAnimate.forEach(function (element) {
        let elementDistance = window.innerHeight - element.getBoundingClientRect().top;
        if (elementDistance >= 100) {
            appearLine(element);
        }
    });
}

function appearLine(element){
    element.style.width = "100%";
    element.style.opacity = "1";
    element.style.transition = "all 1.5s ease-out";
}