let numberToAnimate;

function startAnimations() {
    animationRightOnload();
    window.addEventListener("scroll", onScroll);

}
window.addEventListener("load", startAnimations);


function animationRightOnload(){
    let animateToRightOnLoad = document.querySelectorAll(".animation__right__on__load");
    animateToRightOnLoad.forEach(function (element) {
        animationRight(element);
    });
}

/* Animination on SCROLL -------------------------------*/

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

    let animateToRight = document.querySelectorAll(".animation__right");
    animateToRight.forEach(function (element) {
        let elementDistance = window.innerHeight - element.getBoundingClientRect().top;
        if (elementDistance >= 100) {
            animationRight(element);
        }
    });

  
    let animateToUp = document.querySelectorAll(".animation__up");
    animateToUp.forEach(function (element) {
        let elementDistance = window.innerHeight - element.getBoundingClientRect().top;
        if (elementDistance >= 100) {
            animationUp(element);
        }
    });
}

/*Animation for LINES -----------------------------------*/

function appearLine(element) {
    element.style.width = "100%";
    element.style.opacity = "1";
    element.style.transition = "all 1.5s ease-out";
}


/*Animation for NUMBERS ---------------------------------*/

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
        } if (counter == elementValue) {
            clearInterval(interval);
        }
    }, 4000 / elementValue);
}

/* Function ANIMATION to move to RIGHT ------------------*/

function animationRight(element) {
    element.style.transform = "translateX(0px)";
    element.style.opacity = "1";
    element.style.transition = "all 1.5s ease-out";

    let btnTransitionReset = document.querySelectorAll(".bc__btn");
    setTimeout(() => {
        btnTransitionReset.forEach(function (element) {
            element.style.transition = "all .5s ease";
        });
    }, 1500);
}


function animationUp(element) {
    element.style.transform = "translateY(0px)";
    element.style.opacity = "1";
    element.style.transition = "all 1.5s ease-out";
}