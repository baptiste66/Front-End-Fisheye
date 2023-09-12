let params = new URL(document.location).searchParams;
let id = params.get("id"); 


const getPhotographers = async () => {
    try {
        // récupérer des données à partir du JSON
        const response = await fetch('./data/photographers.json'); 
        // la réponse de la requête est transformée en données JSON 
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
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    
    // Filtrer le photographe en fonction de l'ID
    const photographer = photographers.find((p) => p.id.toString() === id);

    if (photographer) {
        displayData(photographer);
        console.log(photographer);
    } else {
        console.error(`Aucun photographe trouvé avec l'ID ${id}`);
    }
}
init();






const getSamplePhotos = async () => {
    try {
        // récupérer des données à partir du JSON
        const response = await fetch('./data/photographers.json'); 
        // la réponse de la requête est transformée en données JSON 
        const mediaData = await response.json();
        return mediaData;
    } catch (error) {
        console.error('Une erreur est survenue :', error);
        return { media: [] };
    }
};

async function displaycontent(medias) {
   
    const photographHeader = document.querySelector(".content");
    const photographerModel = mediaTemplate(medias);
    const userCardDOM = photographerModel.getContentDOM();
    photographHeader.appendChild(userCardDOM);
   
}

async function inits() {
    // Récupère les datas des photographes
    const { media } = await getSamplePhotos();
    
    // Filtrer le photographe en fonction de l'ID
    const medias = media.find((c) => c.photographerId.toString() === id);

    if (medias) {
        displaycontent(medias);
        console.log(medias);
    } else {
        console.error(`Aucun contenue pour ce photographe ${id}`);
    }
}

inits();