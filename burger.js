
document.addEventListener('DOMContentLoaded', () => {
    const burgerMenu = document.getElementById('burger-menu');
    const mobileNavbar = document.getElementById('mobile-navbar');
    const body = document.body;

    if (burgerMenu && mobileNavbar) {
        burgerMenu.addEventListener('click', () => {
            burgerMenu.classList.toggle('active');
            mobileNavbar.classList.toggle('active');
            body.classList.toggle('no-scroll');
        });

        const mobileLinks = mobileNavbar.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                burgerMenu.classList.remove('active');
                mobileNavbar.classList.remove('active');
                body.classList.remove('no-scroll');
            });
        });
    }
});