let numberToAnimate;

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

    numberToAnimate = document.querySelectorAll(".number__to__animate");
    numberToAnimate.forEach(function (element) {
        let elementDistance = window.innerHeight - element.getBoundingClientRect().top;
        if (elementDistance >= 100) {
            if (parseInt(element.innerHTML) == 0) {
                animateNumber(element);
            }
        }
    });
}

function appearLine(element) {
    element.style.width = "100%";
    element.style.opacity = "1";
    element.style.transition = "all 1.5s ease-out";
}

function animateNumber(element) {
    let counter = 0;
    let elementValue = parseInt(element.getAttribute("data-value"));
    const interval = setInterval(() => {
        counter++;
        if (element == numberToAnimate[0]) {
            element.innerHTML = "+" + counter;
            element.style.opacity = "1";
            element.style.transition = "all 1.5s ease-out";
        } else {
            element.innerHTML = counter;
            element.style.opacity = "1";
            element.style.transition = "all 1.5s ease-out";
        }
        if (counter == elementValue) {
            clearInterval(interval);
        }
    }, 2000 / elementValue);
}