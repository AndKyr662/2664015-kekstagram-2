import { renderComments } from './render-comments.js';

const fullPhotoElement = document.querySelector('.big-picture');
const fullImageElement = fullPhotoElement.querySelector('.big-picture__img img');
const likesCountElement = fullPhotoElement.querySelector('.likes-count');
const closeFullPhotoElement = fullPhotoElement.querySelector('.big-picture__cancel');
const photoDescriptionElement = fullPhotoElement.querySelector('.social__caption');

const onCloseButtonKeydownEsc = (evt) => {
  if (evt.keyCode === 27) {
    hideFullPhoto();
  }
};

const onCloseButtonClick = () => {
  hideFullPhoto();
};

const showFullPhoto = () => {
  fullPhotoElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeFullPhotoElement.addEventListener('click', onCloseButtonClick, {once: true});
  document.addEventListener('keydown', onCloseButtonKeydownEsc);
};

const hideFullPhoto = () => {
  fullPhotoElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onCloseButtonKeydownEsc);
};

const changeFullPhoto = (currentPhotoData) => {
  fullImageElement.src = currentPhotoData.url;
  fullImageElement.alt = currentPhotoData.description;
  photoDescriptionElement.textContent = currentPhotoData.description;
  likesCountElement.textContent = currentPhotoData.likes;
};

const onPhotosClick = (evt, photosData) => {
  evt.preventDefault();
  if (evt.target.closest('.picture')) {
    const photoId = evt.target.closest('.picture').dataset.photoId;
    const currentPhotoData = photosData.find((item) => String(item.id) === String(photoId));
    changeFullPhoto(currentPhotoData);
    showFullPhoto();
    renderComments(currentPhotoData.comments);
  }
};

const initListenerFullPhoto = (photosData, miniPhotosElement) => {
  miniPhotosElement.addEventListener('click', (evt) => onPhotosClick (evt, photosData));
};

export { initListenerFullPhoto };

