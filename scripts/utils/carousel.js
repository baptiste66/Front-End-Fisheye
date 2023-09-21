const lightboxMedia = document.querySelector('.lightbox_media');
const closeCarousel = document.querySelector('.close_carousel');


function displayCarousel(photoURL) {
  const lightboxMedia = document.querySelector('.lightbox_media');
  lightboxMedia.innerHTML = '';
  const img = document.createElement('img');
  img.setAttribute('src', photoURL);
  img.setAttribute('alt', 'Current Media');
  img.setAttribute('class', 'carousel_content')
  lightboxMedia.appendChild(img);

  const modal = document.getElementById("lightbox_container");
  modal.style.display = "flex";
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
}

const nextButton = document.querySelector('.btn_next');
const previousButton = document.querySelector('.btn_previous');
let currentIndex = 0;




  
  function updateCarousel(dataContent) {
    let { image, video } = dataContent;

nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % mediaItems.length;
    console.log('next')
  updateCarousel();
});


previousButton.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + mediaItems.length) % mediaItems.length;
  updateCarousel();
});

    const lightboxMedia = document.querySelector('.lightbox_media');
    lightboxMedia.innerHTML = '';

const mediaItems = [
    { type: 'image', src: `../Sample Photos/${photographName}/${image}` },
    { type: 'video', src: `../Sample Photos/${photographName}/${video}` },
  ];
  
    const currentMedia = mediaItems[currentIndex];
  
    if (currentMedia.type === 'image') {

      const img = document.createElement('img');
      img.setAttribute('src', currentMedia.src); 
      img.setAttribute('alt', 'Current Media');
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
updateCarousel();