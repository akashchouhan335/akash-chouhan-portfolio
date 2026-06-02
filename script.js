        // --- 1. Loader & Initialization ---
        window.addEventListener('load', () => {
            const loader = document.getElementById('loader');
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                AOS.init({ duration: 1000, easing: 'ease-out-cubic', once: true, offset: 50 });
            }, 500);
        });

        document.getElementById('year').textContent = new Date().getFullYear();

        // --- 2. Custom Cursor ---
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorOutline = document.querySelector('.cursor-outline');

        if (window.innerWidth > 768) {
            window.addEventListener('mousemove', (e) => {
                const posX = e.clientX;
                const posY = e.clientY;
                cursorDot.style.left = `${posX}px`; cursorDot.style.top = `${posY}px`;
                setTimeout(() => {
                    cursorOutline.style.left = `${posX}px`; cursorOutline.style.top = `${posY}px`;
                }, 50);
            });

            document.querySelectorAll('a, button, input, textarea, .gal-item').forEach(el => {
                el.addEventListener('mouseenter', () => cursorOutline.classList.add('cursor-hover'));
                el.addEventListener('mouseleave', () => cursorOutline.classList.remove('cursor-hover'));
            });
        }

        // --- 3. Typing Animation ---
        new Typed('#typed-text', {
            strings: ['Java Developer.', 'Problem Solver.', 'Event Leader.'],
            typeSpeed: 50, backSpeed: 30, backDelay: 1500, loop: true, cursorChar: '_'
        });

        // --- 4. Navbar & Scroll-to-Top Logic ---
        const navbar = document.getElementById('navbar');
        const scrollTopBtn = document.getElementById('scroll-top');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('nav-scrolled');
                scrollTopBtn.classList.add('scroll-top-visible');
            } else {
                navbar.classList.remove('nav-scrolled');
                scrollTopBtn.classList.remove('scroll-top-visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // --- 5. Mobile Menu Toggle ---
        // --- 5. Mobile Menu Toggle ---
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileIcon = mobileMenuBtn.querySelector('i'); // Selects the <i> tag inside the button

        mobileMenuBtn.addEventListener('click', () => {
            // Toggle the menu visibility
            mobileMenu.classList.toggle('hidden');

            // Toggle the scroll lock on the body
            document.body.classList.toggle('no-scroll');

            // Swap between the hamburger (bars) and the X (times) icons
            if (mobileMenu.classList.contains('hidden')) {
                mobileIcon.classList.remove('fa-times');
                mobileIcon.classList.add('fa-bars');
            } else {
                mobileIcon.classList.remove('fa-bars');
                mobileIcon.classList.add('fa-times');
            }
        });
        // Close menu and UNFREEZE screen when a link is clicked
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                document.body.classList.remove('no-scroll'); // Unfreezes the screen
                mobileIcon.classList.remove('fa-times');
                mobileIcon.classList.add('fa-bars');
            })
        });

        // // Close menu, restore scroll, and reset icon when a link is clicked
        // document.querySelectorAll('#mobile-menu a').forEach(link => {
        //     link.addEventListener('click', () => {
        //         mobileMenu.classList.add('hidden');
        //         document.body.classList.remove('no-scroll');
        //         mobileIcon.classList.remove('fa-times');
        //         mobileIcon.classList.add('fa-bars');
        //     });
        // });

        // --- 6. Scroll Triggered Skill Bars & Counters ---
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    bar.style.width = bar.getAttribute('data-width');
                    skillsObserver.unobserve(bar);
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.skill-progress').forEach(bar => {
            skillsObserver.observe(bar);
        });

        const counters = document.querySelectorAll('.counter');
        const counterSection = document.getElementById('counter-section');
        let hasCounted = false;

        const counterObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !hasCounted) {
                hasCounted = true;
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const duration = 2000;
                    const increment = target / (duration / 16);
                    let current = 0;

                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.innerText = Math.ceil(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCounter();
                });
            }
        }, { threshold: 0.5 });

        if (counterSection) counterObserver.observe(counterSection);

        // --- 7. Lightbox Gallery ---
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxCaption = document.getElementById('lightbox-caption');
        const lightboxCounter = document.getElementById('lightbox-counter');
        const lightboxPrev = document.getElementById('lightbox-prev');
        const lightboxNext = document.getElementById('lightbox-next');

        let currentGallery = [];
        let currentIndex = 0;

        // Add your 15-20 photos here! Just replace the 'src' URLs with your actual image links.
        const galleries = {
            ecell: [
                { src: 'Ecell/h1.jpg', caption: 'Ecell Summit' }
            ],
            nss: [
                { src: 'NSS/Camp/1.jpg', caption: 'NSS Campaign - NSS CAMP 2025' },
                { src: 'NSS/Camp/2.jpg', caption: 'Bouquet to Vice Chancellor' },
                { src: 'NSS/Camp/3.jpg', caption: 'NSS Campaign - Volunteers' },
                { src: 'NSS/Camp/4.jpg', caption: 'NSS CAMP DAY - 1' },
                { src: 'NSS/Camp/5.jpg', caption: 'NSS Campaign' },
                { src: 'NSS/Camp/6.jpg', caption: 'Appriciated by Faculty' },
                { src: 'NSS/Camp/7.jpg', caption: 'NSS CAMP DAY - 2' },
                { src: 'NSS/Camp/8.jpg', caption: 'NSS Education Campaign' },
                { src: 'NSS/Camp/9.jpg', caption: 'Last Day Speech' },
                { src: 'NSS/Camp/10.jpg', caption: 'NSS Campaign - Raily' },
            ],
            workshop: [
                // ⚠️ MAKE SURE THIS FIRST URL MATCHES YOUR HTML POSTER URL ⚠️
                { src: 'Ecell/1.jpg', caption: 'Workshop Session - SIH Presentation' },
                { src: 'Ecell/2.jpg', caption: 'Workshop Session - Team' },
                { src: 'Ecell/5.jpg', caption: 'Esummit - Photo Session' },
                { src: 'Ecell/6.jpg', caption: 'Esummit - Photo Session' },
                // Add the rest of your Workshop photos here...

            ],
            team: [
                { src: 'NSS/Orientation 2026/1.jpg', caption: 'Team Coordination - Team Leader' },
                { src: 'NSS/Orientation 2026/2.jpg', caption: 'Team Coordination - Certificate Distribution' },
                { src: 'NSS/Orientation 2026/3.jpg', caption: 'Team Coordination - Execution' },
                { src: 'NSS/Orientation 2026/4.jpg', caption: 'Team Coordination - Execution' }
                // Add the rest of your Team photos here...
            ]
        };

        function updateLightboxContent() {
            if (currentGallery.length > 0) {
                lightboxImg.src = currentGallery[currentIndex].src;
                lightboxCaption.textContent = currentGallery[currentIndex].caption;
                lightboxCounter.textContent = `${currentIndex + 1} / ${currentGallery.length}`;

                lightboxCounter.style.display = 'block';
                lightboxPrev.style.display = 'flex';
                lightboxNext.style.display = 'flex';
            }
        }

        // Opens a multi-image gallery
        window.openGallery = function (galleryId) {
            if (galleries[galleryId]) {
                currentGallery = galleries[galleryId];
                currentIndex = 0;
                updateLightboxContent();
                showLightbox();
            }
        }

        // Opens a single image (keeps your other images working perfectly!)
        window.openLightbox = function (src, caption) {
            currentGallery = []; // Clear gallery mode
            lightboxImg.src = src;
            lightboxCaption.textContent = caption;

            lightboxCounter.style.display = 'none';
            lightboxPrev.style.display = 'none';
            lightboxNext.style.display = 'none';
            showLightbox();
        }

        function showLightbox() {
            lightbox.classList.add('active');
            setTimeout(() => {
                lightbox.style.opacity = '1';
                lightboxImg.classList.add('lightbox-img-active');
            }, 10);
        }

        window.closeLightbox = function (e) {
            if (e) e.stopPropagation();
            lightbox.style.opacity = '0';
            lightboxImg.classList.remove('lightbox-img-active');
            setTimeout(() => {
                lightbox.classList.remove('active');
                currentGallery = []; // Reset
            }, 300);
        }

        // Handle Next/Prev clicking
        window.navigateLightbox = function (direction, e) {
            if (e) e.stopPropagation();
            if (currentGallery.length === 0) return;

            lightboxImg.style.opacity = '0'; // Quick fade out

            setTimeout(() => {
                currentIndex += direction;

                // Loop around if they go past the end or beginning
                if (currentIndex < 0) currentIndex = currentGallery.length - 1;
                if (currentIndex >= currentGallery.length) currentIndex = 0;

                updateLightboxContent();
                lightboxImg.style.opacity = '1'; // Fade back in
            }, 200);
        }

        // Keyboard support: Left/Right arrows to swipe, Esc to close
        document.addEventListener('keydown', (e) => {
            if (lightbox.classList.contains('active')) {
                if (e.key === 'Escape') closeLightbox();
                if (e.key === 'ArrowLeft') navigateLightbox(-1);
                if (e.key === 'ArrowRight') navigateLightbox(1);
            }
        });


        // --- 8. REAL Contact Form AJAX Submission ---
        const contactForm = document.getElementById('contact-form');
        const formMessage = document.getElementById('form-message');

        if (contactForm) {
            contactForm.addEventListener('submit', async function (e) {
                e.preventDefault();

                const btn = this.querySelector('button[type="submit"]');
                const originalText = btn.innerHTML;

                // Show the spinning animation
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                btn.disabled = true;
                formMessage.style.display = 'none';

                try {
                    // Grab all the form data (including the new hidden field)
                    const formData = new FormData(this);

                    // Send to Netlify exactly how they require it
                    const response = await fetch("/", {
                        method: "POST",
                        headers: { "Content-Type": "application/x-www-form-urlencoded" },
                        body: new URLSearchParams(formData).toString()
                    });

                    if (response.ok) {
                        formMessage.textContent = "Message sent successfully!";
                        formMessage.style.color = "#4ade80"; // Green success text
                        this.reset(); // Clear the form fields
                    } else {
                        formMessage.textContent = "Oops! There was a problem sending your message.";
                        formMessage.style.color = "#ef4444"; // Red error text
                    }
                } catch (error) {
                    formMessage.textContent = "Network error. Please try again later.";
                    formMessage.style.color = "#ef4444";
                }

                // Restore the button and show the message
                formMessage.style.display = 'block';
                btn.innerHTML = originalText;
                btn.disabled = false;

                // Hide the message after 4 seconds
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 4000);
            });
        }

        // --- 9. Smoke Effect on Hover ---
        const smokeTarget = document.getElementById('smoke-target');

        if (smokeTarget) {
            smokeTarget.addEventListener('mousemove', (e) => {
                const particle = document.createElement('span');
                particle.classList.add('smoke-particle');

                const rect = smokeTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // 1. Calculate how far across the word the mouse is (0.0 to 1.0)
                const progress = Math.max(0, Math.min(1, x / rect.width));

                // 2. Interpolate between Primary (0, 240, 255) and Secondary (121, 40, 202)
                const r = Math.round(0 + (121 - 0) * progress);
                const g = Math.round(240 + (40 - 240) * progress);
                const b = Math.round(255 + (202 - 255) * progress);

                // 3. Apply the dynamic color
                particle.style.backgroundColor = `rgba(${r}, ${g}, ${b}, 0.8)`;

                particle.style.left = `${x}px`;
                particle.style.top = `${y}px`;

                const randomX = (Math.random() - 0.5) * 60;
                particle.style.setProperty('--dx', `${randomX}px`);

                smokeTarget.appendChild(particle);

                setTimeout(() => {
                    particle.remove();
                }, 3000);
            });
        }

        // --- 10. Hero Interactive Particle Canvas ---
        const canvas = document.getElementById('hero-canvas');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            const heroSection = document.getElementById('home');
            let particlesArray;
            let mouse = { x: null, y: null, radius: 150 };

            // Track mouse ONLY inside the hero section
            heroSection.addEventListener('mousemove', function (event) {
                const rect = heroSection.getBoundingClientRect();
                mouse.x = event.clientX - rect.left;
                mouse.y = event.clientY - rect.top;
            });

            // Stop tracking when mouse leaves the hero section
            heroSection.addEventListener('mouseleave', function () {
                mouse.x = null;
                mouse.y = null;
            });

            function resizeCanvas() {
                canvas.width = heroSection.offsetWidth;
                canvas.height = heroSection.offsetHeight;
                init(); // Recreate particles if window resizes
            }
            window.addEventListener('resize', resizeCanvas);

            class Particle {
                constructor() {
                    this.x = Math.random() * canvas.width;
                    this.y = Math.random() * canvas.height;
                    this.size = Math.random() * 2 + 1; // Dot size
                    this.speedX = (Math.random() * 1) - 0.5; // Drift speed
                    this.speedY = (Math.random() * 1) - 0.5;
                }
                update() {
                    this.x += this.speedX;
                    this.y += this.speedY;
                    // Bounce off edges of the hero section
                    if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
                    if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
                }
                draw() {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(0, 240, 255, 0.4)'; // Cyan dots
                    ctx.fill();
                }
            }

            function init() {
                particlesArray = [];
                // Calculate how many particles to show based on screen size
                let numberOfParticles = (canvas.width * canvas.height) / 8000;
                for (let i = 0; i < numberOfParticles; i++) {
                    particlesArray.push(new Particle());
                }
            }

            function animate() {
                requestAnimationFrame(animate);
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                for (let i = 0; i < particlesArray.length; i++) {
                    particlesArray[i].update();
                    particlesArray[i].draw();

                    // Draw lines from particle to mouse if close enough
                    if (mouse.x !== null && mouse.y !== null) {
                        let dx = mouse.x - particlesArray[i].x;
                        let dy = mouse.y - particlesArray[i].y;
                        let distance = Math.sqrt(dx * dx + dy * dy);

                        if (distance < mouse.radius) {
                            ctx.beginPath();
                            // Purple lines that fade out as they get further from the cursor
                            ctx.strokeStyle = `rgba(121, 40, 202, ${1 - distance / mouse.radius})`;
                            ctx.lineWidth = 1;
                            ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                            ctx.lineTo(mouse.x, mouse.y);
                            ctx.stroke();
                        }
                    }
                }
            }

            // Start it up
            resizeCanvas();
            animate();
        }

        // --- 11. Scrolling Timeline Dot ---
        const timelineWrapper = document.querySelector('.timeline-wrapper');
        const scrollDot = document.getElementById('timeline-dot');

        if (timelineWrapper && scrollDot) {
            window.addEventListener('scroll', () => {
                const rect = timelineWrapper.getBoundingClientRect();
                const viewportCenter = window.innerHeight / 2;

                // Calculate how far the center of the screen has scrolled past the top of the timeline
                let progress = (viewportCenter - rect.top) / rect.height;

                // Keep the progress locked exactly between 0 (top) and 1 (bottom)
                progress = Math.max(0, Math.min(1, progress));

                // Physically move the dot down the line
                scrollDot.style.top = `${progress * 100}%`;

                // Change color seamlessly based on which section it's passing
                if (progress < 0.5) {
                    scrollDot.style.backgroundColor = 'var(--primary)';
                    scrollDot.style.boxShadow = '0 0 15px var(--primary)';
                } else {
                    scrollDot.style.backgroundColor = 'var(--secondary)';
                    scrollDot.style.boxShadow = '0 0 15px var(--secondary)';
                }
            });
        }

        // --- 12. Interactive 3D Patent Tracking ---
        const patentWrap = document.querySelector('.patent-wrap');
        const patentInner = document.querySelector('.patent-inner');

        if (patentWrap && patentInner) {
            patentWrap.addEventListener('mousemove', (e) => {
                const rect = patentWrap.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // Calculate tilt (-5 to 5 degrees) based on cursor position
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -5;
                const rotateY = ((x - centerX) / centerX) * 5;

                // Apply CSS Variables instantly for snappy tracking
                patentInner.style.transition = 'none';
                patentInner.style.setProperty('--rot-x', `${rotateX}deg`);
                patentInner.style.setProperty('--rot-y', `${rotateY}deg`);
                patentInner.style.setProperty('--mouse-x', `${x}px`);
                patentInner.style.setProperty('--mouse-y', `${y}px`);
            });

            patentWrap.addEventListener('mouseleave', () => {
                // Smoothly reset back to center when cursor leaves
                patentInner.style.transition = 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)';
                patentInner.style.setProperty('--rot-x', `0deg`);
                patentInner.style.setProperty('--rot-y', `0deg`);
                patentInner.style.setProperty('--mouse-x', `50%`);
                patentInner.style.setProperty('--mouse-y', `50%`);
            });

            // Interactive Patent ID Copy Feature
            const patentIdBtn = document.querySelector('.patent-id');
            if (patentIdBtn) {
                patentIdBtn.addEventListener('click', () => {
                    navigator.clipboard.writeText('IN-202521100865');
                    const originalText = patentIdBtn.innerHTML;
                    patentIdBtn.innerHTML = '<i class="fas fa-check"></i> Copied to Clipboard!';
                    setTimeout(() => patentIdBtn.innerHTML = originalText, 2500);
                });
            }
        }

