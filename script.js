// Countdown Timer
const weddingDate = new Date('December 25, 2025 00:00:00').getTime();

// Check if countdown element exists before running interval
if (document.getElementById('countdown')) {
    const countdown = setInterval(() => {
        const now = new Date().getTime();
        const gap = weddingDate - now;

        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const textDay = Math.floor(gap / day);
        const textHour = Math.floor((gap % day) / hour);
        const textMinute = Math.floor((gap % hour) / minute);
        const textSecond = Math.floor((gap % minute) / second);

        if (document.getElementById('days')) {
            document.getElementById('days').innerText = textDay;
            document.getElementById('hours').innerText = textHour;
            document.getElementById('minutes').innerText = textMinute;
            document.getElementById('seconds').innerText = textSecond;
        }

        if (gap < 0) {
            clearInterval(countdown);
            if (document.getElementById('countdown')) {
                document.getElementById('countdown').innerHTML = "<h3>The Big Day is Here!</h3>";
            }
        }
    }, 1000);
}

// Smooth Scrolling for Navbar Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu if open
            navLinks.classList.remove('active');
        }
    });
});

// Mobile Menu Logic
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Gallery Tabs Logic
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        // Add active class to clicked button
        btn.classList.add('active');

        // Show corresponding content
        const tabId = btn.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});


// Lightbox Logic
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const captionText = document.getElementById('caption');
const closeBtn = document.querySelector('.close-lightbox');
const galleryImages = document.querySelectorAll('.gallery-item img');

let currentIndex = 0;
const imagesArray = Array.from(galleryImages);

if (lightbox) {
    galleryImages.forEach((img, index) => {
        img.addEventListener('click', () => {
            lightbox.style.display = "block";
            lightboxImg.src = img.src;
            captionText.innerHTML = img.alt;
            currentIndex = index;
        });
    });

    closeBtn.addEventListener('click', () => {
        lightbox.style.display = "none";
    });

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg && !e.target.classList.contains('prev') && !e.target.classList.contains('next')) {
            lightbox.style.display = "none";
        }
    });
}

function changeSlide(n) {
    currentIndex += n;
    if (currentIndex >= imagesArray.length) {
        currentIndex = 0;
    }
    if (currentIndex < 0) {
        currentIndex = imagesArray.length - 1;
    }
    lightboxImg.src = imagesArray[currentIndex].src;
    captionText.innerHTML = imagesArray[currentIndex].alt;
}
