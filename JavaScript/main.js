function starProgram() {
    presentationAnimation();

    window.addEventListener("mousemove", imagePosition);
}


function presentationAnimation() {
    let letterCounter = -1;
    let arrayPosition = 0;
    const nameAnimation = [
        ["B", "r", "a", "u", "l", "i", "o"],
        ["a", " ", "D", "e", "v", "e", "l", "o", "p", "e", "r"]
    ];
    const containerAnimation = document.querySelector(".bc__presentation__container__animation");

    function printAnimation() {
        letterCounter++;
        containerAnimation.innerHTML += nameAnimation[arrayPosition][letterCounter];

        if (letterCounter === nameAnimation[arrayPosition].length - 1) {
            clearInterval(interval);
            setTimeout(() => {
                interval = setInterval(() => {
                    containerAnimation.innerHTML = "";
                    letterCounter--;
                    nameAnimation[arrayPosition].pop();
                    nameAnimation[arrayPosition].forEach(function (e) {
                        containerAnimation.innerHTML += e;
                    });

                    if (letterCounter < 0) {
                        clearInterval(interval);
                        arrayPosition++;
                        interval = setInterval(printAnimation, 150);
                        if (arrayPosition > 1) {
                            clearInterval(interval);
                            arrayPosition = 0;
                            presentationAnimation();
                        }
                    }
                }, 150);
            }, 1000);
        }

    }
    let interval = setInterval(printAnimation, 150);
}




function imagePosition(e) {
    const mayorQueImage = document.querySelector(".mayor__que__image");
    const menorQueImage = document.querySelector(".menor__que__img");

    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const positionX = e.clientX;
    const positionY = e.clientY;

    
    const MoveImage = () => {
        const porcentX = Math.floor(1000 * 100 / windowWidth);
        const porcentY = Math.floor(500 * 100 / windowHeight)
        const moveX = Math.floor(positionX / porcentX);
        const moveY = positionY / porcentY;

        mayorQueImage.style.transform = `translate(-${moveX}px, -${moveY}px)`;
        menorQueImage.style.transform = `translate(${moveX/2}px, ${moveY/2}px)`
        console.log(moveX)
    }
    MoveImage();
}
window.addEventListener("load", starProgram);