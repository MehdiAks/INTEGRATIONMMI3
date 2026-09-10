const targetDate = new Date("December 2, 2027 00:00:00").getTime();

const updateCountdown = () => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        const daysElem = document.getElementById("days");
        const hoursElem = document.getElementById("hours");
        const minutesElem = document.getElementById("minutes");
        const secondsElem = document.getElementById("seconds");

        if (daysElem && hoursElem && minutesElem && secondsElem) {
            daysElem.innerText = String(days).padStart(2, '0');
            hoursElem.innerText = String(hours).padStart(2, '0');
            minutesElem.innerText = String(minutes).padStart(2, '0');
            secondsElem.innerText = String(seconds).padStart(2, '0');
        }
    }
};

document.addEventListener("DOMContentLoaded", () => {
    setInterval(updateCountdown, 1000);
    updateCountdown();
});