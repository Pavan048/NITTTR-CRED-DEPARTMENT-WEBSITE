// JavaScript to handle the popup functionality
const images = document.querySelectorAll('.popup-trigger');
const popup = document.getElementById('imagePopup');
const popupImage = popup.querySelector('.popup-image');
const closePopup = popup.querySelector('.close-popup');

// Function to show the popup with the clicked image
function showPopup(imageSrc) {
  popupImage.src = imageSrc;
  popup.classList.add('popup-active');
}

// Event listener for each image to open the popup
images.forEach(image => {
  image.addEventListener('click', () => {
    const imageSrc = image.getAttribute('src');
    showPopup(imageSrc);
  });
});

// Event listener to close the popup when the close button is clicked
closePopup.addEventListener('click', () => {
  popup.classList.remove('popup-active');
});
