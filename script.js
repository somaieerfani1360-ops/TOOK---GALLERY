// DOM Elements
const hamburgerMenu = document.getElementById('hamburgerMenu');
const closeMenu = document.getElementById('closeMenu');
const mobileNav = document.getElementById('mobileNav');
const supportBtn = document.getElementById('supportBtn');
const closeSupport = document.getElementById('closeSupport');
const supportPanel = document.getElementById('supportPanel');
const adminLoginBtn = document.getElementById('adminLoginBtn');
const cartBtn = document.getElementById('cartBtn');
const wishlistBtn = document.getElementById('wishlistBtn');
const profileBtn = document.getElementById('profileBtn');
const timerElements = document.querySelectorAll('#timer span');
const sliderPrev = document.querySelector('.slider-btn.prev');
const sliderNext = document.querySelector('.slider-btn.next');
const offerProducts = document.querySelector('.offer-products');

// توابع مدیریت منو
function toggleMobileMenu() {
    mobileNav.classList.toggle('active');
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
}

function closeMobileMenu() {
    mobileNav.classList.remove('active');
    document.body.style.overflow = '';
}

// توابع مدیریت پنل پشتیبان
function toggleSupportPanel() {
    supportPanel.classList.toggle('active');
}

function closeSupportPanel() {
    supportPanel.classList.remove('active');
}

// تایمر فروش ویژه
function updateTimer() {
    let hours = parseInt(timerElements[0].textContent);
    let minutes = parseInt(timerElements[1].textContent);
    let seconds = parseInt(timerElements[2].textContent);
    
    seconds--;
    
    if (seconds < 0) {
        seconds = 59;
        minutes--;
        if (minutes < 0) {
            minutes = 59;
            hours--;
            if (hours < 0) {
                // تایمر تمام شده
                hours = 23;
                minutes = 56;
                seconds = 16;
            }
        }
    }
    
    timerElements[0].textContent = hours.toString().padStart(2, '0');
    timerElements[1].textContent = minutes.toString().padStart(2, '0');
    timerElements[2].textContent = seconds.toString().padStart(2, '0');
}

// اسلایدر فروش ویژه
function slidePrev() {
    offerProducts.scrollBy({
        left: -300,
        behavior: 'smooth'
    });
}

function slideNext() {
    offerProducts.scrollBy({
        left: 300,
        behavior: 'smooth'
    });
}

// شبیه‌سازی افزودن به سبد خرید
function simulateAddToCart() {
    const cartBadge = document.querySelector('#cartBtn .badge');
    let currentCount = parseInt(cartBadge.textContent);
    cartBadge.textContent = (currentCount + 1).toString();
    
    // نمایش اعلان
    showNotification('محصول به سبد خرید اضافه شد!');
}

// نمایش اعلان
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #00b894, #00cec9);
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// CSS برای انیمیشن‌های اعلان
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
`;
document.head.appendChild(style);

// ورود به صفحه پشتیبان
function goToAdminPage() {
    const password = prompt('لطفاً رمز عبور پشتیبان را وارد کنید:');
    if (password === 'admin123') { // رمز تستی
        window.location.href = 'admin.html';
    } else if (password !== null) {
        alert('رمز عبور اشتباه است!');
    }
}

// مدیریت کلیک روی محصولات
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart') || 
        e.target.closest('.add-to-cart')) {
        simulateAddToCart();
    }
    
    if (e.target.classList.contains('quick-add') || 
        e.target.closest('.quick-add')) {
        simulateAddToCart();
    }
});

// Event Listeners
hamburgerMenu.addEventListener('click', toggleMobileMenu);
closeMenu.addEventListener('click', closeMobileMenu);
supportBtn.addEventListener('click', toggleSupportPanel);
closeSupport.addEventListener('click', closeSupportPanel);
adminLoginBtn.addEventListener('click', goToAdminPage);

// هدایت به صفحات مختلف
cartBtn.addEventListener('click', () => {
    window.location.href = 'cart.html';
});

wishlistBtn.addEventListener('click', () => {
    window.location.href = 'wishlist.html';
});

profileBtn.addEventListener('click', () => {
    window.location.href = 'profile.html';
});

// اسلایدر
if (sliderPrev && sliderNext) {
    sliderPrev.addEventListener('click', slidePrev);
    sliderNext.addEventListener('click', slideNext);
}

// شروع تایمر
setInterval(updateTimer, 1000);

// بستن منو با کلیک بیرون
document.addEventListener('click', (e) => {
    if (!mobileNav.contains(e.target) && !hamburgerMenu.contains(e.target) && mobileNav.classList.contains('active')) {
        closeMobileMenu();
    }
    
    if (!supportPanel.contains(e.target) && !supportBtn.contains(e.target) && supportPanel.classList.contains('active')) {
        closeSupportPanel();
    }
});

// لود اولیه
document.addEventListener('DOMContentLoaded', () => {
    console.log('Took Gallery loaded successfully!');
    
    // انیمیشن ورود محصولات
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});
