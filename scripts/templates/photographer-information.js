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
        const aside = document.createElement('aside')

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
        priceParagraph.setAttribute('class', 'photographer-price ');
        priceParagraph.setAttribute('aria-label', `Prix: ${price} par jour`);

        let taglineParagraph = document.createElement('p');
        taglineParagraph.textContent = tagline;
        taglineParagraph.setAttribute('aria-label', `Tagline: ${tagline}`);

        location.appendChild(cityParagraph);
        location.appendChild(countryParagraph);
        
        information.appendChild(h1)
        information.appendChild(location);
        information.appendChild(taglineParagraph);

        aside.appendChild(priceParagraph);

        article.appendChild(aside)
        article.appendChild(img);
        article.appendChild(information);
       
        return article;
    }
    return { name, picture, getUserCardDOM };
}

let currentIndex = 0;
function mediaTemplateVisual(dataContent) {
    let { image, video } = dataContent;
    let pictureContent = `../Sample Photos/${photographName}/${image}`;

    function getContentDOM() {
        
        if (video) {
            const videoElement = document.createElement('video');
            videoElement.setAttribute('class', 'photographe-main_video');
            videoElement.setAttribute('controls','controls')

            const source = document.createElement('source');
            source.setAttribute('src', `../Sample Photos/${photographName}/${video}`);
            source.setAttribute('type', 'video/mp4');

            videoElement.appendChild(source);
            
            return videoElement;
        } else {
            let img = document.createElement('img');
            img.setAttribute('src', pictureContent);
            img.setAttribute('class', 'photographe-main_picture');
            
            return img;
        }
    }
    return { getContentDOM };
}



let totalLikes = 0;
let totalLikesElement;
const likedImages = new Set();

function mediaTemplateDescription(dataContent, image) {
    let { title, likes, date } = dataContent;
    let likesNumber = parseInt(likes);

    totalLikes += likesNumber; 

    function getContentDOM() {
        const article = document.createElement('article');
        article.setAttribute('class', 'template_content');
        article.setAttribute('data-media-date',date);

        const aside = document.createElement('aside')

        const description = document.createElement('span');
        description.setAttribute('class', 'photographe-main_picture_description');

        const like_content =document.createElement('span')
        like_content.setAttribute('class','like_content')

        let h2 = document.createElement('h2');
        h2.textContent = title;

        let likesContent = document.createElement('p');
        likesContent.innerHTML = `${likesNumber} `;
        likesContent.setAttribute('aria-label', `likes`);
        const likeButton=document.createElement('button')
        likeButton.innerHTML = '<i class="fas fa-heart"></i>';

        likeButton.addEventListener('click', () => {
            if (!likeButton.classList.contains('liked')) {
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
            sortAndDisplayMediaByLikes();
        });
        article.appendChild(description);
        article.appendChild(aside)    
        
        description.appendChild(h2);
        description.appendChild(like_content)

        like_content.appendChild(likesContent);
        like_content.appendChild(likeButton);
        return article;
    }

    if (!totalLikesElement) {
        totalLikesElement = document.createElement('p');
        totalLikesElement.setAttribute('class', 'photographer-TotalLikes');
        document.querySelector("aside").appendChild(totalLikesElement);
    }

    totalLikesElement.innerHTML = `${totalLikes} <i class="fas fa-heart"></i>`;

    return { getContentDOM };

}
