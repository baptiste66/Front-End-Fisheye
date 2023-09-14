let photographName =params.get("name");

function photographerTemplate(data) {
    let { name, portrait, country, city, price, tagline } = data;

   const contactModal = document.getElementById('contact_modal');
   let modalTitle = contactModal.querySelector('h2');
   modalTitle.textContent = `Contactez-moi ${name}`;
   modalTitle.setAttribute('class', 'modalTitle')

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
        priceParagraph.setAttribute('class', 'photographer-price');
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

let totalLikes = 0;
let totalLikesElement;
const likedImages = new Set();

function mediaTemplate(dataContent) {
    let { image, title, likes, video } = dataContent;
    let pictureContent = `Sample Photos/${photographName}/${image}`;
    let likesNumber = parseInt(likes);

    totalLikes += likesNumber; // Ajoutez les likes de cet élément au total

    function getContentDOM() {
        const article = document.createElement('article');
        article.setAttribute('class', 'template_content');

        const description = document.createElement('span');
        description.setAttribute('class', 'photographe-main_picture_description');

        let h2 = document.createElement('h2');
        h2.textContent = title;

        let likesContent = document.createElement('p');
        likesContent.innerHTML = `${likesNumber} `;
        likesContent.setAttribute('aria-label', `likes`);

        if (video) {
            const videoElement = document.createElement('video');
            videoElement.setAttribute('class', 'photographe-main_video');
            videoElement.setAttribute('controls', 'controls');

            const source = document.createElement('source');
            source.setAttribute('src', `Sample Photos/${photographName}/${video}`);
            source.setAttribute('type', 'video/mp4');

            videoElement.appendChild(source);
            article.appendChild(videoElement);
        } else {
            let img = document.createElement('img');
            img.setAttribute('src', pictureContent);
            img.setAttribute('class', 'photographe-main_picture');
            article.appendChild(img);
        }

        // Créez un bouton pour le like/unlike
        const likeButton = document.createElement('button');
        likeButton.innerHTML = '<i class="fas fa-heart"></i>';
        likeButton.className = likedImages.has(image) ? 'liked' : ''; // Applique la classe 'liked' si l'image est déjà likée

        likeButton.addEventListener('click', () => {
            if (!likedImages.has(image)) {
                likedImages.add(image);
                likesNumber += 1;
                likesContent.innerHTML = `${likesNumber} `;
                totalLikes += 1;
                totalLikesElement.innerHTML = `${totalLikes} <i class="fas fa-heart"></i>`;
                likeButton.classList.add('liked');
            } else {
                likedImages.delete(image);
                likesNumber -= 1;
                likesContent.innerHTML = `${likesNumber} `;
                totalLikes -= 1;
                totalLikesElement.innerHTML = `${totalLikes} <i class="fas fa-heart"></i>`;
                likeButton.classList.remove('liked');
            }
        });

        // Ajoutez le bouton like/unlike à l'article
        article.appendChild(likeButton);

        article.appendChild(description);

        description.appendChild(h2);
        description.appendChild(likesContent);

        return article;
    }

    if (!totalLikesElement) {
        totalLikesElement = document.createElement('p');
        totalLikesElement.setAttribute('class', 'photographer-TotalLikes');
        document.querySelector(".photograph-header").appendChild(totalLikesElement);
    }

    totalLikesElement.innerHTML = `${totalLikes} <i class="fas fa-heart"></i>`;

    return { getContentDOM };
}



