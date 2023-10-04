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


function mediaTemplateVisual(dataContent, photographName) {
    let { image, video, title } = dataContent;
    let pictureContent = `Sample Photos/${photographName}/${image}`;
    let videoContent = `Sample Photos/${photographName}/${video}`;

    function getContentDOM() {
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', '#');
        linkElement.setAttribute('data-target', 'lightbox-container');
        linkElement.setAttribute('aria-label', 'Lilac breasted roller, closeup view')
        linkElement.setAttribute('data-media', dataContent.id);

        linkElement.addEventListener('click', (event) => {
            event.preventDefault(); 
            const main = document.querySelector('main');
            const elementsInsideMain = main.querySelectorAll('*');
            const header = document.querySelector('header');
          const elementsInsideHeader = header.querySelectorAll('*');

            elementsInsideHeader.forEach((element) => {
                element.setAttribute('tabindex', '-1');
                element.setAttribute('aria-hidden', 'true')
            });

            elementsInsideMain.forEach((element) => {
                element.setAttribute('tabindex', '-1');
                element.setAttribute('aria-hidden', 'true')
            });
            displayCarousel(pictureContent, videoContent, dataContent, image, video, title)
          });

        if (video) {
            const videoElement = document.createElement('video');
            videoElement.setAttribute('class', 'photographe-main_video')
            const source = document.createElement('source');
            videoElement.setAttribute('src', videoContent);
            source.setAttribute('type', 'video/mp4');
            videoElement.setAttribute('aria-label', 'Lilac breasted roller, closeup view')
            videoElement.setAttribute('aria-hidden', 'true');

            videoElement.appendChild(source);
            linkElement.appendChild(videoElement);
        } else  {
            let img = document.createElement('img');
            img.setAttribute('src', pictureContent);
            img.setAttribute('class', 'photographe-main_picture');
            img.setAttribute('aria-label', 'Lilac breasted roller, closeup view')
            img.setAttribute('aria-hidden', 'true');

            linkElement.appendChild(img);
        }
        
        return linkElement;
        
    }
    return { getContentDOM };
}