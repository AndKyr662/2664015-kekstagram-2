const photosElement = document.querySelector('.pictures');
const photosFragment = document.createDocumentFragment();
const photoFragment = document.querySelector('#picture').content;
const linkElement = photoFragment.querySelector('.picture');
const imageElement = photoFragment.querySelector('.picture__img');
const likesElemet = photoFragment.querySelector('.picture__likes');
const commentsElement = photoFragment.querySelector('.picture__comments');

const renderMiniPhotos = (photos) => {
  for (const photo of photos) {
    linkElement.dataset.photoId = photo.id;
    imageElement.src = photo.url;
    imageElement.alt = photo.description;
    commentsElement.textContent = photo.comments.length;
    likesElemet.textContent = photo.likes;
    const clonePhotoFragment = photoFragment.cloneNode(true);
    photosFragment.append(clonePhotoFragment);
  }

  photosElement.append(photosFragment);
};

export { renderMiniPhotos, photosElement};

