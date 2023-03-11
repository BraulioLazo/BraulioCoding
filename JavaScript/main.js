
function presentationAnimation() {
    let letterCounter = -1;
    let arrayPosition = 0;
    const nameAnimation = [
        ["B", "r", "a", "u", "l", "i", "o"],
        ["a", " ", "J", "u", "n", "i", "o", "r", " ", "D", "e", "v", "e", "l", "o", "p", "e", "r"]
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
window.addEventListener("load", presentationAnimation);