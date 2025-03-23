function setupMatrix() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const matrix = document.getElementById('matrix');

    matrix.appendChild(canvas);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters = "01";
    const fontSize = 14;
    const columns = canvas.width / fontSize;

    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
    }

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00FF00';
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            drops[i]++;
        }
    }

    setInterval(draw, 33);
}

function glitchEffect() {
    const logo = document.getElementById('logo');
    const original = logo.innerText;

    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const glitched = original.split('')
                .map((char, idx) => {
                    if (Math.random() > 0.9 && char !== '\n') {
                        return String.fromCharCode(Math.random() * 15 + 33);
                    }
                    return char;
                })
                .join('');

            logo.innerText = glitched;
        }, i * 50);
    }

    setTimeout(() => {
        logo.innerText = original;
    }, 200);
}

window.addEventListener('load', function () {
    setupMatrix();

    setInterval(glitchEffect, 3000);

    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', function (e) {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                document.body.style.backgroundColor = '#0000FF';
                setTimeout(() => {
                    document.body.style.backgroundColor = '#000000';
                }, 1000);
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    window.addEventListener('resize', function () {
        const matrix = document.getElementById('matrix');
        matrix.innerHTML = '';
        setupMatrix();
    });
});
