let photographName =params.get("name");

// for photographer's information header
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

let customNumber = 0;
let totalLikes = 0;
let totalLikesElement;
const likedImages = new Set();

// for photographer's content information
function mediaTemplateDescription(dataContent, image) {
    let { title, likes, date } = dataContent;
    let likesNumber = parseInt(likes);

    totalLikes += likesNumber; 

    function getContentDOM() {
        const article = document.createElement('article');
        article.setAttribute('class', 'template_content');
       
        const photographMain = document.querySelector(".photographe-main");
    const mediaContainers = Array.from(photographMain.querySelectorAll(".media-container"));

    mediaContainers.forEach(container => {
        container.setAttribute('data-media-date', date);
    });

        const aside = document.createElement('aside')

        const description = document.createElement('span');
        description.setAttribute('class', 'photographe-main_picture_description');

        const like_content =document.createElement('span')
        like_content.setAttribute('class','like_content')
        like_content.setAttribute('role',"group")

        let h2 = document.createElement('h2');
        h2.textContent = title;

        let likesContent = document.createElement('p');
        likesContent.innerHTML = `${likesNumber} `;
        likesContent.setAttribute('aria-label', `likes`);
        const likeButton=document.createElement('button')
        likeButton.innerHTML = '<i class="fas fa-heart"></i>';
        likeButton.setAttribute('aria-hidden', 'true');
        likeButton.setAttribute('aria-label', `likes`);

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
            const currentFilterElement = document.querySelector('#current_filter');
            const selectedOption = currentFilterElement.textContent;
            if (selectedOption === 'Popularité') {
            
                sortByLikes();
            }
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

// for photographer's content in media Factori pattern 
class MediaFactory {
    constructor(photographName= {}) {
        this.photographName = photographName;
    }

    createMedia(dataContent) {
        const { image, video, title } = dataContent;
        const mediaType = video ? 'video' : 'image';
        const mediaContent = `Sample Photos/${photographName}/${mediaType === 'image' ? image : video}`;
        
        const mediaInstance = MediaFactory.createMediaInstance(mediaType, {
            src: mediaContent,
            title: title,
        });

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', '#');
        linkElement.setAttribute('data-target',  'lightbox-container');
        linkElement.setAttribute('aria-label',  'Lilac breasted roller, closeup view');
        linkElement.setAttribute('data-media', dataContent.id);

        linkElement.addEventListener('click', (event) => {
            event.preventDefault();
            const main = document.querySelector('main');
            const elementsInsideMain = main.querySelectorAll('*');
            const header = document.querySelector('header');
            const elementsInsideHeader = header.querySelectorAll('*');

            elementsInsideHeader.forEach((element) => {
                element.setAttribute('tabindex', '-1');
                element.setAttribute('aria-hidden', 'true');
            });

            elementsInsideMain.forEach((element) => {
                element.setAttribute('tabindex', '-1');
                element.setAttribute('aria-hidden', 'true');
            });
            const clickedIndex = mediaItems.findIndex((media) => media.src === mediaContent);
            displayCarousel(mediaContent, mediaInstance, dataContent, image, video, title,clickedIndex);
           
        });

        linkElement.appendChild(mediaInstance.getContentDOM());

        return linkElement;
    }

    static createMediaInstance(type, { src, title }) {
        if (type === 'video') {
            return new VideoMedia(src, title);
        } else {
            return new ImageMedia(src, title);
        }
    }
}

class ImageMedia {
    constructor(src, title = {}) {
        this.src = src;
        this.title = title;
    }

    getContentDOM() {
        const img = document.createElement('img');
        img.setAttribute('src', this.src);
        img.setAttribute('class', 'photographe-main_picture');
        img.setAttribute('aria-label', this.title);
        img.setAttribute('aria-hidden', 'true');

        return img;
    }

    getTitle() {
        return this.title;
    }

    getSrc() {
        return this.src;
    }
}

class VideoMedia {
    constructor(src, title = {}) {
        this.src = src;
        this.title = title;
    }

    getContentDOM() {
        const videoElement = document.createElement('video');
        videoElement.setAttribute('class', 'photographe-main_video');
        videoElement.setAttribute('src', this.src);
        videoElement.setAttribute('aria-label', this.title);
        videoElement.setAttribute('aria-hidden', 'true');

        const source = document.createElement('source');
        source.setAttribute('type', 'video/mp4');
        videoElement.appendChild(source);

        return videoElement;
    }

    getTitle() {
        return this.title;
    }

    getSrc() {
        return this.src;
    }
}


