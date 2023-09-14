let params = new URL(document.location).searchParams;
let id = params.get("id"); 


const getPhotographers = async () => {
    try {
        
        const response = await fetch('./data/photographers.json'); 
        
        const photographersData = await response.json();
        return photographersData;
    } catch (error) {
        console.error('Une erreur est survenue :', error);
        return { photographers: [] };
    }
};


async function displayData(photographer) {
    const photographHeader = document.querySelector(".photograph-header");
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographHeader.appendChild(userCardDOM);
}

async function init() {
    
    const { photographers } = await getPhotographers();
    
    const photographer = photographers.find((p) => p.id.toString() === id);

    if (photographer) {
        displayData(photographer);
        
    } else {
        console.error(`Aucun photographe trouvé avec l'ID ${id}`);
    }
}
init();


async function displaycontent(medias) {
    const photographHeader = document.querySelector(".photographe-main");
    
    photographHeader.innerHTML = '';

    for (const media of medias) {
        const photographerModel = mediaTemplate(media);

        const mediaDOM = photographerModel.getContentDOM();
        photographHeader.appendChild(mediaDOM);
    }
}

async function inits() {
    // Récupère les données des médias
    const { media } = await getPhotographers();
    
    const medias = media.filter((c) => c.photographerId.toString() === id);

    if (medias.length > 0) {
        displaycontent(medias);
    } else {
        console.error(`Aucun contenu pour ce photographe ${id}`);
    }
}

inits();
