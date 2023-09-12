function photographerTemplate(data) {
    const { name, portrait, country, city, price, id, tagline } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );

        const link = document.createElement('a');
        link.setAttribute("href", `photographer.html?id=${id}`);
        link.setAttribute("alt", name);

        const location =document.createElement('span')
        location.setAttribute("class", "location")


        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        const countryParagraph = document.createElement('p')
        countryParagraph.textContent= country 
        countryParagraph.setAttribute('aria-label', `${country}`);
        
        const cityParagraph = document.createElement('p')
        cityParagraph.textContent= city+ ',';
        cityParagraph.setAttribute('aria-label', `${city}`);

        const priceParagraph = document.createElement('p')
        priceParagraph.textContent= price+ '€/jour';
        priceParagraph.setAttribute("class", "price")
        priceParagraph.setAttribute('aria-label', `${price} par jour`);

        const taglineParagraph = document.createElement('p')
        taglineParagraph.textContent= tagline
        taglineParagraph.setAttribute('aria-label', `${tagline}`);

        link.appendChild(img);
        link.appendChild(h2);

        location.appendChild(cityParagraph);
        location.appendChild(countryParagraph);

        article.appendChild(link);
        article.appendChild(location);
        article.appendChild(taglineParagraph);
        article.appendChild(priceParagraph);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}