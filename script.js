// Generate floating particles
const particlesContainer = document.getElementById('particles');
for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.width = Math.random() * 5 + 2 + 'px';
    particle.style.height = particle.style.width;
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 20 + 's';
    particle.style.animationDuration = Math.random() * 20 + 20 + 's';
    particlesContainer.appendChild(particle);
}

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Profile menu toggle
const profileBtn = document.getElementById('profileBtn');
const profileMenu = document.getElementById('profileMenu');
const profileMenuClose = document.getElementById('profileMenuClose');
const overlay = document.getElementById('overlay');

profileBtn.addEventListener('click', () => {
    profileMenu.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
});

profileMenuClose.addEventListener('click', closeProfileMenu);
overlay.addEventListener('click', closeProfileMenu);

function closeProfileMenu() {
    profileMenu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close profile menu when clicking on a link
const profileMenuLinks = document.querySelectorAll('.profile-menu-nav a');
profileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        closeProfileMenu();
    });
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuClose = document.getElementById('mobileMenuClose');

hamburger.addEventListener('click', () => {
    mobileMenu.classList.add('active');
});

mobileMenuClose.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
});

// Close mobile menu when clicking on a link
const mobileLinks = document.querySelectorAll('.mobile-menu-links a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, var(--primary), var(--secondary));
        color: white;
        padding: 2rem 3rem;
        border-radius: 15px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        z-index: 2000;
        text-align: center;
        animation: fadeInUp 0.5s ease;
    `;
    successMessage.innerHTML = `
        <h3 style="margin-bottom: 1rem;">Terima kasih, ${name}!</h3>
        <p>Pesan Anda telah terkirim. Saya akan segera menghubungi Anda.</p>
    `;
    document.body.appendChild(successMessage);
    
    // Reset form
    this.reset();
    
    // Remove message after 3 seconds
    setTimeout(() => {
        successMessage.style.animation = 'fadeOut 0.5s ease';
        setTimeout(() => {
            document.body.removeChild(successMessage);
        }, 500);
    }, 3000);
});

// Add fade out animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        to { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
    }
`;
document.head.appendChild(style);

// Theme toggle (placeholder for future implementation)
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
    // Placeholder for dark/light mode toggle
    const icon = themeToggle.querySelector('i');
    if (icon.classList.contains('fa-moon')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});
// Tambahkan kode ini di file JavaScript Anda

// Fungsi untuk menampilkan notifikasi
function showNotification(message) {
    // Hapus notifikasi yang sudah ada
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Buat notifikasi baru
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Tampilkan notifikasi
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Sembunyikan notifikasi setelah 3 detik
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Fungsi untuk menyimpan gambar ke localStorage
function saveProfileImage(imageData) {
    localStorage.setItem('profileImageData', imageData);
}

// Fungsi untuk memuat gambar dari localStorage
function loadProfileImage() {
    const savedImage = localStorage.getItem('profileImageData');
    if (savedImage) {
        // Update semua gambar dengan ID yang sama
        const profileImages = document.querySelectorAll('#profileImage');
        profileImages.forEach(img => {
            img.src = savedImage;
        });
    }
}

// Event listener untuk tombol ganti foto
document.getElementById('changePhotoBtn').addEventListener('click', function() {
    document.getElementById('profileImageInput').click();
});

// Event listener untuk input file
document.getElementById('profileImageInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    
    if (file) {
        // Validasi tipe file
        if (!file.type.startsWith('image/')) {
            showNotification('Harap pilih file gambar!');
            return;
        }
        
        // Validasi ukuran file (maksimal 5MB)
        if (file.size > 5 * 1024 * 1024) {
            showNotification('Ukuran gambar maksimal 5MB!');
            return;
        }
        
        const reader = new FileReader();
        
        reader.onload = function(event) {
            const imageData = event.target.result;
            
            // Update semua gambar profil
            const profileImages = document.querySelectorAll('#profileImage');
            profileImages.forEach(img => {
                img.src = imageData;
            });
            
            // Simpan ke localStorage
            saveProfileImage(imageData);
            
            // Tampilkan notifikasi
            showNotification('Foto profil berhasil diperbarui!');
        };
        
        reader.onerror = function() {
            showNotification('Gagal membaca file gambar!');
        };
        
        reader.readAsDataURL(file);
    }
    
    // Reset input
    this.value = '';
});

// Event listener untuk klik pada gambar profil (opsional)
document.querySelector('.profile-avatar').addEventListener('click', function() {
    document.getElementById('profileImageInput').click();
});

// Load gambar saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    loadProfileImage();
});