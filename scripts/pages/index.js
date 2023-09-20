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

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

    async function init() {
       
        const { photographers } = await getPhotographers();
        displayData(photographers);
    }
    
    init();
