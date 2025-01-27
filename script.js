const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        if (this.x + this.size > canvas.width || this.x - this.size < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y + this.size > canvas.height || this.y - this.size < 0) {
            this.directionY = -this.directionY;
        }
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

function init() {
    particlesArray = [];
    const numberOfParticles = (canvas.height * canvas.width) / 9000;

    for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 5 + 1;
        const x = Math.random() * (canvas.width - size * 2) + size;
        const y = Math.random() * (canvas.height - size * 2) + size;
        const directionX = Math.random() * 2 - 1;
        const directionY = Math.random() * 2 - 1;
        const color = '#ffffff';

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
}

init();
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const scientistModal = document.getElementById('scientist-modal');
const modalTitle = document.getElementById('modal-title');
const modalImage = document.getElementById('modal-image');
const modalDescription = document.getElementById('modal-description');
const closeModal = document.querySelectorAll('.close');

const scientists = {
    bhaskara: {
        title: "Bhaskara II",
        image: "https://mathshistory.st-andrews.ac.uk/Biographies/Bhaskara_II/bhaskara.jpg",
        description: "Bhaskara II was an Indian mathematician and astronomer who designed one of the earliest known perpetual motion machines, Bhaskara's Wheel."
    },
    bessler: {
        title: "Johann Bessler",
        image: "https://upload.wikimedia.org/wikipedia/en/d/d2/Johann_Bessler.gif",
        description: "Johann Bessler, also known as Orffyreus, created the controversial Bessler's Wheel, which he claimed could achieve perpetual motion."
    },
    davinci: {
        title: "Leonardo da Vinci",
        image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcR_hkLPEVVcfmzAN8y_7vVxp3Vk06kMmmMEqdszY1df6fbKRKRN_BIPf5Hs_ARIoDpQjHiYqTRpiavwk0v54K5IeQ",
        description: "Leonardo da Vinci sketched several designs for perpetual motion machines, though he later dismissed the idea as impossible."
    }
};

document.querySelectorAll('.learn-more').forEach(button => {
    button.addEventListener('click', () => {
        const scientist = button.getAttribute('data-scientist');
        modalTitle.textContent = scientists[scientist].title;
        modalImage.src = scientists[scientist].image;
        modalDescription.textContent = scientists[scientist].description;
        scientistModal.style.display = 'flex';
    });
});

const interactiveModal = document.getElementById('interactive-modal');
const interactiveModalTitle = document.getElementById('interactive-modal-title');
const interactiveModalDescription = document.getElementById('interactive-modal-description');

const laws = {
    first: {
        title: "First Law of Thermodynamics",
        description: "Perpetual motion is impossible due to the First Law of Thermodynamics, which states that energy cannot be created or destroyed—only transformed or transferred. A perpetual motion machine would violate this law by requiring infinite energy without input, which is impossible because: \n- Energy Losses: Machines lose energy through friction, heat, resistance, sound, etc. \n- Energy Input/Output Imbalance: Output cannot exceed input, and no system can create energy from nothing. \n- Inefficiencies: Energy transformations are never 100% efficient, leading to unavoidable dissipation. \nAs a result, perpetual motion contradicts the conservation of energy and fundamental physics."
    },
    second: {
        title: "Second Law of Thermodynamics",
        description: "The Second Law of Thermodynamics provides another strong argument against the possibility of perpetual motion. This law states that the total entropy of a closed system always increases over time, and energy transformations are inherently irreversible. Here's why perpetual motion is impossible based on this law:\n\n1. Inefficiency Due to Irreversibility: In every energy transformation or process, some energy is always converted into unusable forms, such as heat. This irreversibility means that no machine can operate at 100% efficiency.\n\n2. Entropy Increase: The Second Law dictates that entropy, a measure of disorder, always increases in a closed system. A perpetual motion machine would require a system to continuously maintain or decrease its entropy, which contradicts this principle.\n\n3. Energy Dissipation: In practical systems, energy dissipates into the surroundings as heat or other forms of waste energy. This makes it impossible to continuously recycle energy within the system without losses.\n\n4. Heat Engines and Efficiency: For machines like heat engines, the Second Law limits efficiency to less than 100%. This limitation means perpetual motion machines cannot recycle energy perfectly, leading to eventual energy depletion.\n\nIn summary, the Second Law of Thermodynamics rules out perpetual motion because of the inevitable increase in entropy and energy dissipation, ensuring that no system can operate indefinitely without external energy input."
    }
};

document.querySelectorAll('.simulate').forEach(button => {
    button.addEventListener('click', () => {
        const law = button.getAttribute('data-law');
        interactiveModalTitle.textContent = laws[law].title;
        interactiveModalDescription.textContent = laws[law].description;
        interactiveModal.style.display = 'flex';
    });
});

// Close Modals
closeModal.forEach(close => {
    close.addEventListener('click', () => {
        scientistModal.style.display = 'none';
        interactiveModal.style.display = 'none';
    });
});

window.addEventListener('click', (event) => {
    if (event.target === scientistModal || event.target === interactiveModal) {
        scientistModal.style.display = 'none';
        interactiveModal.style.display = 'none';
    }
});

// 3D Spinning Diagram
const spinner = document.querySelector('.spinner');
const circle = document.querySelector('.circle');
const ring = document.querySelector('.ring');

let spinSpeed = 1;

spinner.addEventListener('click', () => {
    spinSpeed += 0.5;
    circle.style.animationDuration = `${3 / spinSpeed}s`;
    ring.style.animationDuration = `${5 / spinSpeed}s`;
});

// Gradually slow down
setInterval(() => {
    if (spinSpeed > 1) {
        spinSpeed -= 0.1;
        circle.style.animationDuration = `${3 / spinSpeed}s`;
        ring.style.animationDuration = `${5 / spinSpeed}s`;
    }
}, 1000);