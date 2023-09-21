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
