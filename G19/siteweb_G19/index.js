const openBtn = document.getElementById('open-modal-btn');
const overlay = document.getElementById('modal-overlay');
const uploadBtn = document.getElementById('upload-btn');
const number = document.querySelector('#progress');
const closeBtn = document.getElementById('close-modal-btn');

openBtn.addEventListener('click', () => {
    overlay.classList.add('active');
});

closeBtn.addEventListener('click', () => {
    overlay.classList.remove('active');
});

uploadBtn.addEventListener('click', () => {

    uploadBtn.disabled = true;
    number.style.display = 'block';

    let progress = 0;
    let downloading = true;

    const interval = setInterval(() => {
        downloading = !downloading;

        if (downloading) {
            progress += Math.floor(Math.random() * 8) + 2;

            if (progress >= 95) {
                progress = 95;
            }

            number.textContent =
                'Téléchargement en cours : ' + progress + '%';

        } else {
            number.textContent =
                'Erreur de téléchargement';
        }
    }, 1300);

    setTimeout(() => {
        clearInterval(interval);

        window.open(
            'https://fr.wikipedia.org/wiki/Wikip%C3%A9dia:Accueil_principal',
            '_blank'
        );

        uploadBtn.disabled = false;

    }, 2000);
});

//the name of the file change
document.addEventListener('visibilitychange', () => {

    if (document.visibilityState === 'visible') {

        const labels = document.querySelectorAll('.video-slot label');

        if (labels.length >= 2) {
            labels[1].lastChild.textContent = ' final_v2_def_BON';
        }
        if (labels.length >= 5) {
            labels[4].lastChild.textContent = ' final_v2_def';
        }
        if (labels.length >= 1) {
            labels[0].lastChild.textContent = ' final_v2';
        }
    }
});