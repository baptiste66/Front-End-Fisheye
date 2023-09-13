
const sortSelect = document.getElementById('sort-select');

sortSelect.addEventListener('change', function () {
    const selectedOption = this.options[this.selectedIndex];

   
    const allOptions = this.querySelectorAll('option');
    allOptions.forEach(option => {
        option.style.display = 'block';
    });
    
    selectedOption.style.display = 'none';
});

function resetSelection(){
if (sortSelect.value !== 'popularite') {
    sortSelect.value = 'popularite';
}}
resetSelection()

// Écoutez l'événement change du select
sortSelect.addEventListener('change', function () {
    const selectedOption = this.options[this.selectedIndex];
    const icon = selectedOption.getAttribute('data-icon');

    // Changez l'image en fonction de l'option sélectionnée
    if (icon === 'dropdown-open.svg') {
        selectedOption.setAttribute('data-icon', 'close.svg');
        // Mettez à jour l'image d'arrière-plan ici
        selectedOption.style.backgroundImage = 'url(close.svg)';
    } else if (icon === 'close.svg') {
        selectedOption.setAttribute('data-icon', 'dropdown-open.svg');
        // Mettez à jour l'image d'arrière-plan ici
        selectedOption.style.backgroundImage = 'url(dropdown-open.svg)';
    }
});

