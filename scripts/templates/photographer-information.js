let photographName =params.get("name");


function photographerTemplate(data) {
    const { name, portrait, country, city, price, tagline } = data;

   const contactModal = document.getElementById('contact_modal');
   const modalTitle = contactModal.querySelector('h2');
   modalTitle.textContent = `Contactez-moi ${name}`;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');

        const information = document.createElement('div')
        information.setAttribute('class', 'information')

        const location = document.createElement('span');
        location.setAttribute('class', 'location');


        let img = document.createElement('img');
        img.setAttribute('src', picture);
        img.setAttribute('alt', name); 
        img.setAttribute('class', 'photographePicture')

        let h1 = document.createElement('h1');
        h1.textContent = name;

        let countryParagraph = document.createElement('p');
        countryParagraph.textContent = country ; 
        countryParagraph.setAttribute('aria-label', `pays: ${country}`);

        let cityParagraph = document.createElement('p');
        cityParagraph.textContent = city + ', ';
        cityParagraph.setAttribute('aria-label', `ville: ${city}`);

        let priceParagraph = document.createElement('p');
        priceParagraph.textContent = price + '€/jour';
        priceParagraph.setAttribute('class', 'price');
        priceParagraph.setAttribute('aria-label', `Prix: ${price} par jour`);

        let taglineParagraph = document.createElement('p');
        taglineParagraph.textContent = tagline;
        taglineParagraph.setAttribute('aria-label', `Tagline: ${tagline}`);

        location.appendChild(cityParagraph);
        location.appendChild(countryParagraph);
        
        information.appendChild(h1)
        information.appendChild(location);
        information.appendChild(taglineParagraph);
        article.appendChild(priceParagraph);

        article.appendChild(img);
        article.appendChild(information);
       
        return article;
    }
    return { name, picture, getUserCardDOM };
}



function mediaTemplate(dataContent) {
    let { image, title, likes } = dataContent;
    let pictureContent = `Sample Photos/${photographName}/${image}`;
   

    function getContentDOM() {
        const article = document.createElement('article');
        article.setAttribute('class', 'template_content')

        const description = document.createElement('span');
        description.setAttribute('class', 'photographe-main_picture_description') 

        let img = document.createElement('img');
        img.setAttribute('src', pictureContent);
        img.setAttribute('class', 'photographe-main_picture');

        let h2 = document.createElement('h2');
        h2.textContent = title;

        let likesContent = document.createElement('p');
        likesContent.innerHTML = `${likes} <i class="fas fa-heart"></i>`;

        article.appendChild(img);
        article.appendChild(description)
        
        description.appendChild(h2);
        description.appendChild(likesContent);

        return article;
    }

    return { getContentDOM };
}