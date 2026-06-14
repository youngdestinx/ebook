
document.addEventListener("DOMContentLoaded", () => {

    const year = document.getElementById("year");
    const month = document.getElementById("month");
    const today = new Date();

    year.textContent = today.getFullYear();
    month.textContent = today.toLocaleString("en-US", { month: "long" });

    const tests = document.querySelector(".tests")
    const cards = Array.from(tests.children);
    const dots = Array.from(document.querySelector(".dots").children);
    const right = document.querySelector(".right");
    const left = document.querySelector(".left");
    let current = 0;
    const total = cards.length;

    function getOffset(idx) {
        if (idx === 0) return 0;
        const cardW = cards[0].offsetWidth;
        const gap = 16;
        return idx * (cardW + gap)
    }

    function go(idx) {
        current = Math.max(0, Math.min(total -1, idx));
        tests.style.transform = `translateX(-${getOffset(current)}px)`;
        cards.forEach((c, i) => c.classList.toggle("active", i === current));
        dots.forEach((d, i) => d.classList.toggle("active", i === current));
        left.disabled = current === 0;
        right.disabled = current === total - 1
    }

    left.addEventListener("click", ()=> go(current - 1))
    right.addEventListener("click", ()=> go(current + 1))

    tests.addEventListener("touchstart", e => {
        startX = e.touches[0].clientX;
        moved = false;
    }, {passive: true});

    tests.addEventListener("touchmove", e => {
        if (Math.abs(e.touches[0].clientX - startX) > 5) moved = true;
    }, { passive: true});

    tests.addEventListener("touchend", e => {
        if (!moved) return;
        const diff = e.changedTouches[0].clientX - startX;
        if (diff < -50) go(current + 1);
        else if (diff > 50) go(current - 1);
    });
});





