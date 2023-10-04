const button = document.querySelector('.btn_drop');
const icon = document.querySelector('.fa-solid.fa-chevron-down');
const dropdown = document.querySelector('.dropdown_content');
const currentFilterElement = document.querySelector('#current_filter');


const optionButtons = document.querySelectorAll('.dropdown_content button');

function OptionSelection(option) {
    if (option.textContent !== currentFilterElement.textContent) {
        currentFilterElement.textContent = option.textContent;
    }
    closeDropdown();
}

function closeDropdown() {
    button.setAttribute('aria-expanded', 'false');
    icon.classList.remove('rotate');
    dropdown.style.display = 'none';
}

function updateOptions() {
    const currentFilter = currentFilterElement.textContent;
    optionButtons.forEach(function(optionButton) {
        const optionLabel = optionButton.textContent;
        if (currentFilter === 'Popularité') {
            optionButton.style.display = optionLabel === 'Titre' || optionLabel === 'Date' ? 'block' : 'none';
           
        } else if (currentFilter === 'Titre') {
            optionButton.style.display = optionLabel === 'Popularité' || optionLabel === 'Date' ? 'block' : 'none';
            
        } else if (currentFilter === 'Date') {
            optionButton.style.display = optionLabel === 'Popularité' || optionLabel === 'Titre' ? 'block' : 'none';
           
        }
    });
}

window.addEventListener('load', function() {
    button.setAttribute('aria-expanded', 'false');
    dropdown.style.display = 'none';
    updateOptions();
});

button.addEventListener('click', function() {
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
    icon.classList.toggle('rotate', !isExpanded);
    dropdown.style.display = isExpanded ? 'none' : 'block';
    dropdown.setAttribute('aria-hidden', 'false')
})
;


function sortByTitle() {
    const photographMain = document.querySelector(".photographe-main");
    const mediaContainer = Array.from(photographMain.querySelectorAll(".media-container"));

    mediaContainer.forEach(container => container.remove());

    mediaContainer.sort((a, b) => {
        const titleA = a.querySelector('.photographe-main_picture_description h2').textContent;
        const titleB = b.querySelector('.photographe-main_picture_description h2').textContent;
        return titleA.localeCompare(titleB);
    });

    mediaContainer.forEach(container => photographMain.appendChild(container));
    updateMediaItems(mediaContainer);
}




function sortByDate() {
  

    const photographMain = document.querySelector(".photographe-main");
    const mediaContainer = Array.from(photographMain.querySelectorAll(".media-container"));

    mediaContainer.forEach(container => container.remove());

    mediaContainer.sort((a, b) => {
        const dateA = new Date(a.getAttribute('data-media-date'));
        const dateB = new Date(b.getAttribute('data-media-date'));
        return dateA - dateB;
    });

    mediaContainer.forEach(container => {
        photographMain.appendChild(container);
        const dateAttributeValue = container.getAttribute('data-media-date');
    });
    updateMediaItems(mediaContainer);
}





function sortByLikes() {
    const photographMain = document.querySelector(".photographe-main");
    const mediaContainer = Array.from(photographMain.querySelectorAll(".media-container"));

    mediaContainer.forEach(container => container.remove());

    mediaContainer.sort((a, b) => {
        const likesA = parseInt(a.querySelector('.like_content p').textContent);
        const likesB = parseInt(b.querySelector('.like_content p').textContent);
        return likesA - likesB;
    });

    
    mediaContainer.forEach(container => photographMain.appendChild(container));
    
    
    updateMediaItems(mediaContainer);
}


optionButtons.forEach(function(optionButton) {
    optionButton.addEventListener('click', function() {
        OptionSelection(optionButton);
        updateOptions();
        closeDropdown();
        const selectedOption = currentFilterElement.textContent;
        if (selectedOption === 'Date') {
            
           sortByDate();
        } else if (selectedOption === 'Popularité') {
            
            sortByLikes();
        } else if (selectedOption === 'Titre') {
            
            sortByTitle();
        }
    });
});

function updateMediaItems(mediaContainer) {
    mediaItems.length = 0;

    mediaContainer.forEach((container, index) => {
        const mediaElement = container.querySelector('.photographe-main_picture_description h2');
        const mediaTitle = mediaElement ? mediaElement.textContent : '';
        
        const imageElement = container.querySelector('.photographe-main_picture ');
        const videoElement = container.querySelector('.photographe-main_video');
        
        const isImage = !!imageElement;
        const isVideo = !!videoElement;

        mediaItems.push({
            type: isImage ? 'image' : (isVideo ? 'video' : 'unknown'),
            src: isImage ? imageElement.getAttribute('src') : (isVideo ? videoElement.getAttribute('src') : ''),
            title: mediaTitle,
            index: index,
        });
    });

    
    mediaItems.sort((a, b) => a.index - b.index);

    console.log(mediaItems);
}