let params = new URL(document.location).searchParams;
let id = params.get("id"); 


const getPhotographers = async () => {
    try {
        const response = await fetch('./data/photographers.json'); 
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Une erreur est survenue :', error);
        return { photographers: [] };
    }
};

// for photographer's information header
async function displayData(photographer) {
    const photographHeader = document.querySelector(".photograph-header");
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographHeader.appendChild(userCardDOM);
}


mediaItems=[]
async function displaycontentVisualAndDescription(medias, photographName) {
    const photographMain = document.querySelector(".photographe-main");
    
    for (let i = 0; i < medias.length; i++) {
        const media = medias[i];
        const mediaFactory = new MediaFactory(photographName);

        const photographerWorkVisual = mediaFactory.createMedia(media);


        const photographerWorkDescription = mediaTemplateDescription(media, photographName);

        const visualDOM = photographerWorkVisual;
        const descriptionDOM = photographerWorkDescription.getContentDOM();

        const mediaContainer = document.createElement('div');
        mediaContainer.classList.add('media-container');

        mediaContainer.appendChild(visualDOM);
        mediaContainer.appendChild(descriptionDOM);

        mediaItems.push({
            type: media.video ? 'video' : 'image',
            src: media.video ? `../Sample Photos/${photographName}/${media.video}` :
             `../Sample Photos/${photographName}/${media.image}`,
            title: media.title,
            index: i 
        });

        photographMain.appendChild(mediaContainer);
    }
}




async function init() {
    let photographName = params.get("name");

    const { photographers, media } = await getPhotographers();
    const photographer = photographers.find((p) => p.id.toString() === id);
    if (photographer) {
        displayData(photographer);
    } else {
        console.error(`Aucun photographe trouvé avec l'ID ${id}`);
    }

    const mediasForPhotographer = media.filter((c) => c.photographerId.toString() === id);

    if (mediasForPhotographer.length > 0) {
        displaycontentVisualAndDescription(mediasForPhotographer, photographName);
       
    } else {
        console.error(`Aucun contenu visuel pour ce photographe ${id}`);
    } sortByLikes()
}
init() 