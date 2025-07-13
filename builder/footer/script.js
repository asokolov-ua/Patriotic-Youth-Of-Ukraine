document.addEventListener('DOMContentLoaded', function() {
    // Select all the necessary elements from the DOM
    const radioButtons = document.querySelectorAll('.slider__radio');
    const sliderItems = document.querySelectorAll('.slider__item');
    const bullets = document.querySelectorAll('.bullets__item');
    const numSlides = sliderItems.length;

    /**
     * Updates the styles of all slider items and bullets based on the active slide.
     * @param {number} activeIndex - The index of the currently active slide.
     */
    function updateSlider(activeIndex) {
        // Loop through each slider item to update its style
        sliderItems.forEach((item, i) => {
            // Calculate the shortest distance between the current item and the active one, handling wrap-around
            let diff = (i - activeIndex + numSlides) % numSlides;
            if (diff > numSlides / 2) {
                diff -= numSlides;
            }

            // Reset styles before applying new ones
            item.style.transform = '';
            item.style.opacity = '';
            item.style.zIndex = '';
            item.style.transition = 'all 0.3s ease-out';


            // Apply styles based on the item's position relative to the active slide
            if (diff === 0) {
                // Active slide (center)
                item.style.zIndex = '2';
                item.style.transform = 'translate(0) scale(1)';
                item.style.opacity = '1';
            } else if (diff === 1) {
                // Slide to the right
                item.style.zIndex = '1';
                item.style.transform = 'translateX(100px) scale(0.85)';
                item.style.opacity = '0.6';
            } else if (diff === -1) {
                // Slide to the left
                item.style.zIndex = '1';
                item.style.transform = 'translateX(-100px) scale(0.85)';
                item.style.opacity = '0.6';
            } else if (diff === 2) {
                // Second slide to the right
                item.style.zIndex = '0';
                item.style.transform = 'translateX(200px) scale(0.65)';
                item.style.opacity = '0.3';
            } else if (diff === -2) {
                // Second slide to the left
                item.style.zIndex = '0';
                item.style.transform = 'translateX(-200px) scale(0.65)';
                item.style.opacity = '0.3';
            } else {
                // Hidden slides (far left or far right)
                item.style.zIndex = '-1';
                item.style.opacity = '0';
                if (diff > 0) {
                    item.style.transform = 'translateX(200px) scale(0.65)';
                } else {
                    item.style.transform = 'translateX(-200px) scale(0.65)';
                }
            }
        });

        // Update the active state of the bullet points
        bullets.forEach((bullet, i) => {
            if (i === activeIndex) {
                bullet.classList.add('active');
            } else {
                bullet.classList.remove('active');
            }
        });

        // Also ensure the correct radio button is checked
        if (!radioButtons[activeIndex].checked) {
            radioButtons[activeIndex].checked = true;
        }
    }

    // --- Event Listeners ---

    // Function to get the current active index
    const getActiveIndex = () => {
        let activeIndex = 0;
        radioButtons.forEach((radio, index) => {
            if (radio.checked) {
                activeIndex = index;
            }
        });
        return activeIndex;
    };

    // Add event listeners to radio buttons to update on change
    radioButtons.forEach((radio, index) => {
        radio.addEventListener('change', () => {
            if (radio.checked) {
                updateSlider(index);
            }
        });
    });

    // Add event listeners to the slider items (labels) themselves
    sliderItems.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            // Don't interfere with clicks on links inside the slider item
            if (e.target.tagName.toLowerCase() === 'a') {
                return;
            }
            updateSlider(index);
        });
    });
    
    // Add event listeners to the bullets
    bullets.forEach((bullet, index) => {
        bullet.addEventListener('click', () => {
            updateSlider(index);
        });
    });


    // --- Initial Load ---
    // To make the bullets work, you should add this simple style to your CSS:
    // .bullets__item.active { background: white; }
    // We call the function once on load to set the initial state of the slider.
    updateSlider(getActiveIndex());
});
