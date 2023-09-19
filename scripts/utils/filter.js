const customSelect = document.querySelector('.custom-select');
const selectedOption = customSelect.querySelector('.selected');
const options = customSelect.querySelectorAll('.with-border');
const icon = customSelect.querySelector('i');

function resetSelection() {
    selectedOption.textContent = 'Popularité';
    options.forEach(option => {
        option.style.display = 'none';
    });
}

customSelect.addEventListener('click', function () {
    const isOpen = customSelect.classList.contains('open');

    if (!isOpen) {
        options.forEach(option => {
            option.style.display = 'block';
        });
        customSelect.classList.add('open');
        icon.classList.add('rotate'); // Ajoute la classe pour faire tourner l'icône dans le sens inverse
    } else {
        options.forEach(option => {
            option.style.display = 'none';
        });
        customSelect.classList.remove('open');
        icon.classList.remove('rotate'); // Retire la classe pour réinitialiser l'icône
    }
});

options.forEach(option => {
    option.addEventListener('click', function () {
        const selectedText = selectedOption.textContent;
        const clickedText = this.textContent;

        selectedOption.textContent = clickedText;
        this.textContent = selectedText;

        customSelect.classList.remove('open');
        icon.classList.remove('rotate'); // Retire la classe lorsque l'option est sélectionnée
    });
});

resetSelection();
