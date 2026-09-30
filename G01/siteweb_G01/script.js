let Var = 0;
const audio = new Audio("./Gave.mp3");
const cri = new Audio("./Cri.mp3");

function ajouterUn() {
    Var += 1;
    document.getElementById("affichage").textContent = Var;
    document.body.style.setProperty("--darkness", Math.min(Var * 0.05, 0.95));

    audio.pause();
    audio.currentTime = 0.8;
    audio.play().catch((error) => {
        console.error("Impossible de lire Gave.mp3 :", error);
    });
    setTimeout(() => {
        audio.pause();
    }, 1600);

    if (Var === 10) {
        cri.pause();
        cri.currentTime = 0;
        cri.play().catch((error) => {
            console.error("Impossible de lire Cri.mp3 :", error);
        });
    }

    if (Var >= 10) {
        document.getElementById("image-container").hidden = false;
    }

    if (Var === 20) {
        cri.pause();
        cri.currentTime = 0;
        cri.play().catch((error) => {
            console.error("Impossible de lire Cri.mp3 :", error);
        });
    }

    if (Var >= 20) {
        document.getElementById("video-container").hidden = false;
    }
}
