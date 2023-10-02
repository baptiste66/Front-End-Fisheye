const lightboxMedia = document.querySelector('.lightbox_media');
const closeCarousel = document.querySelector('.close_carousel');
const nextButton = document.querySelector('.btn_next');
const previousButton = document.querySelector('.btn_previous');
const lightboxTitle = document.querySelector('.lightbox_title')
let currentIndex = 0;

function displayCarousel(pictureContent, videoContent, dataContent, image, video, title) {

  const lightboxMedia = document.querySelector('.lightbox_media');
  lightboxMedia.innerHTML = '';
  lightboxTitle.innerHTML = ''; 
    let h2 = document.createElement('h2');
    h2.textContent = title;
    lightboxTitle.appendChild(h2)

  if (image) {
    const img = document.createElement('img');
    img.setAttribute('src', pictureContent);
    img.setAttribute('alt', 'Current Media');
    img.setAttribute('class', 'carousel_content');
    lightboxMedia.appendChild(img);
  } else  {
    const video = document.createElement('video');
    video.setAttribute('controls', 'controls');
    video.setAttribute('class', 'carousel_content');

    const source = document.createElement('source');
    source.setAttribute('src', videoContent);
    source.setAttribute('type', 'video/mp4');

    video.appendChild(source);
    lightboxMedia.appendChild(video);
  }
  const modal = document.getElementById("lightbox_container");
  modal.style.display = "flex";

  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % mediaItems.length;
      console.log('next')
      console.log(title)
    updateCarousel(pictureContent, videoContent, dataContent, image, video);
    lightboxTitle.innerHTML = ''; 
    let h2 = document.createElement('h2');
    h2.textContent = mediaItems[currentIndex].title;
    lightboxTitle.appendChild(h2); 
  });
  
  
  previousButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + mediaItems.length) % mediaItems.length;
    updateCarousel(pictureContent, videoContent, dataContent, image, video);
    lightboxTitle.innerHTML = ''; 
    let h2 = document.createElement('h2');
    h2.textContent = mediaItems[currentIndex].title;
    lightboxTitle.appendChild(h2); 
  });
    
}

function updateTitle(title) {
  lightboxTitle.innerHTML = ''; 
  let h2 = document.createElement('h2');
  h2.textContent = title;
  lightboxTitle.appendChild(h2); 
}



if (closeCarousel) {
  closeCarousel.addEventListener('click', () => {
    closeCarouselFunction();
  });

  closeCarousel.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      closeCarouselFunction();
    }
  });
}

function closeCarouselFunction() {
  const modal = document.getElementById("lightbox_container");
  modal.style.display = "none";
  const allElements = document.querySelectorAll('#lightbox_container');
  allElements.forEach((element) => {
    element.setAttribute('aria-hidden', 'false');
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



