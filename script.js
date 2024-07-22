let globalSelectedRating = null;
let globalSelectedRadioRating = null;

document.addEventListener('DOMContentLoaded', () => {
    const ratingItems = document.querySelectorAll('.rating-item');
    const selectedRatingSpan = document.getElementById('selected-rating');
    const radioLabels = document.querySelectorAll('#radio-rating-container label');
    const selectedRadioRatingSpan = document.getElementById('selected-radio-rating');

    function selectRating(selectedItem) {
        ratingItems.forEach(item => item.classList.remove('selected'));
        selectedItem.classList.add('selected');
        globalSelectedRating = selectedItem.dataset.value;
        selectedRatingSpan.textContent = globalSelectedRating;
        console.log('Selected rating (div):', globalSelectedRating);
    }

    function updateRadioRating(label) {
        const input = document.getElementById(label.getAttribute('for'));
        input.checked = true;
        globalSelectedRadioRating = input.value;
        selectedRadioRatingSpan.textContent = globalSelectedRadioRating;
        console.log('Selected rating (radio):', globalSelectedRadioRating);
    }

    function handleArrowNavigation(items, currentIndex, direction) {
        const newIndex = currentIndex + direction;
        if (newIndex >= 0 && newIndex < items.length) {
            items[newIndex].focus();
        }
    }

    ratingItems.forEach((item, index) => {
        item.addEventListener('focus', () => {
            item.style.borderColor = 'orange';
        });

        item.addEventListener('blur', () => {
            item.style.borderColor = '';
        });

        item.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                selectRating(item);
            } else if (event.key === 'ArrowRight') {
                handleArrowNavigation(ratingItems, index, 1);
            } else if (event.key === 'ArrowLeft') {
                handleArrowNavigation(ratingItems, index, -1);
            }
        });
    });

    radioLabels.forEach((label, index) => {
        label.addEventListener('focus', () => {
            label.style.borderColor = 'orange';
        });

        label.addEventListener('blur', () => {
            label.style.borderColor = '';
        });

        label.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                updateRadioRating(label);
            } else if (event.key === 'ArrowRight') {
                handleArrowNavigation(radioLabels, index, 1);
            } else if (event.key === 'ArrowLeft') {
                handleArrowNavigation(radioLabels, index, -1);
            }
        });

        label.addEventListener('click', () => {
            updateRadioRating(label);
        });
    });
});
