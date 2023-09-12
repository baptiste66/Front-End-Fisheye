let photographName =params.get("name");

function photographerTemplate(data) {
    const { name, portrait, country, city, price, tagline } = data;
   
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        const location = document.createElement('span');
        location.setAttribute('class', 'location');

        const img = document.createElement('img');
        img.setAttribute('src', picture);
        img.setAttribute('alt', name); 
        img.setAttribute('class', 'photographePicture')

        const h2 = document.createElement('h2');
        h2.textContent = name;

        const countryParagraph = document.createElement('p');
        countryParagraph.textContent = country + ', '; 
        countryParagraph.setAttribute('aria-label', `Country: ${country}`);

        const cityParagraph = document.createElement('p');
        cityParagraph.textContent = city + ', ';
        cityParagraph.setAttribute('aria-label', `City: ${city}`);

        const priceParagraph = document.createElement('p');
        priceParagraph.textContent = price + '€/jour';
        priceParagraph.setAttribute('class', 'price');
        priceParagraph.setAttribute('aria-label', `Price: ${price} per day`);

        const taglineParagraph = document.createElement('p');
        taglineParagraph.textContent = tagline;
        taglineParagraph.setAttribute('aria-label', `Tagline: ${tagline}`);

        location.appendChild(countryParagraph);
        location.appendChild(cityParagraph);

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(location);
        article.appendChild(taglineParagraph);
        article.appendChild(priceParagraph);
        return article;
    }
    return { name, picture, getUserCardDOM };
}



function mediaTemplate(dataContent) {
    const { image, title, likes } = dataContent;
    const pictureContent = `Sample Photos/${name}/${image}`;
console.log(pictureContent)
    function getContentDOM() {
        const article = document.createElement('article');

        const img = document.createElement('img');
        img.setAttribute('src', pictureContent);
        img.setAttribute('class', 'photographePicture');

        const h1 = document.createElement('h1');
        h1.textContent = title;

        const likesContent = document.createElement('p');
        likesContent.textContent = likes;

        article.appendChild(img);
        article.appendChild(h1);
        article.appendChild(likesContent);

        return article;
    }

    return { getContentDOM };
}