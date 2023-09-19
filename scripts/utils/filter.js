const customSelect = document.querySelector('.custom-select');
const selectedOption = customSelect.querySelector('.selected');
const options = customSelect.querySelectorAll('.with-border');

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
    } else {
        options.forEach(option => {
            option.style.display = 'none';
        });
        customSelect.classList.remove('open');
    }
});

options.forEach(option => {
    option.addEventListener('click', function () {
        const selectedText = selectedOption.textContent;
        const clickedText = this.textContent;

        selectedOption.textContent = clickedText;
        this.textContent = selectedText;

        customSelect.classList.remove('open');
    });
});

resetSelection();
