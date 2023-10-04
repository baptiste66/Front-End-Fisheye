const lightboxMedia = document.querySelector('.lightbox_media');
const closeCarousel = document.querySelector('.close_carousel');
const nextButton = document.querySelector('.btn_next');
const previousButton = document.querySelector('.btn_previous');
const lightboxTitle = document.querySelector('.lightbox_title')



function displayCarousel(clickedMedia, mediaInstance, dataContent, image, video, title,clickedIndex) {
  currentIndex = clickedIndex;
  const lightboxMedia = document.querySelector('.lightbox_media');
  lightboxMedia.innerHTML = '';
  lightboxTitle.innerHTML = ''; 
    let h2 = document.createElement('h2');
    h2.textContent = title;
    lightboxTitle.appendChild(h2)

  if (image) {
    const img = document.createElement('img');
    img.setAttribute('src', clickedMedia);
    img.setAttribute('alt', 'Current Media');
    img.setAttribute('class', 'carousel_content');
    lightboxMedia.appendChild(img);
  } else  {
    const video = document.createElement('video');
    video.setAttribute('controls', 'controls');
    video.setAttribute('class', 'carousel_content');

    const source = document.createElement('source');
    source.setAttribute('src', mediaInstance.getSrc());
    source.setAttribute('type', 'video/mp4');

    video.appendChild(source);
    lightboxMedia.appendChild(video);
  }
  const modal = document.getElementById("lightbox_container");
  modal.style.display = "flex";


  nextButton.removeEventListener('click', NextClick);
  previousButton.removeEventListener('click', PreviousClick);

 
  nextButton.addEventListener('click', NextClick);
  previousButton.addEventListener('click', PreviousClick);
}


function NextClick() {
  currentIndex = (currentIndex + 1) % mediaItems.length;
  updateCarousel();
  lightboxTitle.innerHTML = ''; 
  let h2 = document.createElement('h2');
  h2.textContent = mediaItems[currentIndex].title;
  lightboxTitle.appendChild(h2); 
}


function PreviousClick() {
  currentIndex = (currentIndex - 1 + mediaItems.length) % mediaItems.length;
  updateCarousel();
  lightboxTitle.innerHTML = ''; 
  let h2 = document.createElement('h2');
  h2.textContent = mediaItems[currentIndex].title;
  lightboxTitle.appendChild(h2); 
}



  closeCarousel.addEventListener('click', () => {
    closeCarouselFunction();
  });

  closeCarousel.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      closeCarouselFunction();
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeCarouselFunction();
    }
  });

function closeCarouselFunction() {
  const modal = document.getElementById("lightbox_container");
  modal.style.display = "none";
  const main = document.querySelector('main');
  const elementsInsideMain = main.querySelectorAll('*');
  const header = document.querySelector('header');
const elementsInsideHeader = header.querySelectorAll('*');
  elementsInsideHeader.forEach((element) => {
    element.removeAttribute('tabindex');
    element.removeAttribute('aria-hidden');
});elementsInsideMain.forEach((element) => {
  element.removeAttribute('tabindex');
    element.removeAttribute('aria-hidden');
});
}

  function updateCarousel() {
  
    const lightboxMedia = document.querySelector('.lightbox_media');
    lightboxMedia.innerHTML = '';
    
    const currentMedia = mediaItems[currentIndex];
  
    if (currentMedia.type === 'image') {

      const img = document.createElement('img');
      img.setAttribute('src', currentMedia.src); 
      img.setAttribute('alt', 'Current Media');
      img.setAttribute('class', 'carousel_content')
      lightboxMedia.appendChild(img);

    } else if (currentMedia.type === 'video') {

      const videoElement = document.createElement('video');
      videoElement.setAttribute('class', 'photographe-main_video');
      videoElement.setAttribute('controls', 'controls');
  
      const source = document.createElement('source');
      source.setAttribute('src', currentMedia.src); 
      source.setAttribute('type', 'video/mp4');
  
      videoElement.appendChild(source);
      lightboxMedia.appendChild(videoElement);
    }
  }