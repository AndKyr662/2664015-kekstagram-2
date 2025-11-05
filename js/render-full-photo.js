const AVATAR_SIDE_SIZE = 35;
const MAX_COMMENTS_PER_LOAD = 5;

const fullPhotoElement = document.querySelector('.big-picture');
const fullImageElement = fullPhotoElement.querySelector('.big-picture__img img');
const likesCountElement = fullPhotoElement.querySelector('.likes-count');
const commentsLoaderElement = fullPhotoElement.querySelector('.comments-loader');
const commentsCountContainerElement = fullPhotoElement.querySelector('.social__comment-count');
const shownCommentsCountElement = commentsCountContainerElement.querySelector('.social__comment-shown-count');
const totalCommentsCountElement = commentsCountContainerElement.querySelector('.social__comment-total-count');
const commentsContainerElement = fullPhotoElement.querySelector('.social__comments');
const closeFullPhotoElement = fullPhotoElement.querySelector('.big-picture__cancel');
const photoDescriptionElement = fullPhotoElement.querySelector('.social__caption');

let shownCommentsCount = 0;

const createCommentElement = (commentData) => {
  const commentElement = document.createElement('li');
  const imageElement = document.createElement('img');
  const messsageElement = document.createElement('p');
  commentElement.classList.add('social__comment');
  imageElement.classList.add('social__picture');
  imageElement.src = commentData.avatar;
  imageElement.alt = commentData.name;
  imageElement.width = AVATAR_SIDE_SIZE;
  imageElement.height = AVATAR_SIDE_SIZE;
  messsageElement.classList.add('social__text');
  messsageElement.textContent = commentData.message;
  commentElement.append(imageElement);
  commentElement.append(messsageElement);
  return commentElement;
};

const addComments = (comments) => {
  const commentsSlice = comments.slice(shownCommentsCount, shownCommentsCount + MAX_COMMENTS_PER_LOAD);
  const commentsContainerFragment = document.createDocumentFragment();

  for (const comment of commentsSlice) {
    commentsContainerFragment.append(createCommentElement(comment));
    shownCommentsCount++;
    if (shownCommentsCount >= comments.length) {
      commentsLoaderElement.classList.add('hidden');
    }
  }

  if (shownCommentsCount <= MAX_COMMENTS_PER_LOAD) {
    commentsContainerElement.replaceChildren(commentsContainerFragment);
  } else {
    commentsContainerElement.append(commentsContainerFragment);
  }

  shownCommentsCountElement.textContent = shownCommentsCount;
};

const renderFullPhoto = (photosById, miniPhotosElement) => {
  const onPhotosClick = (evt) => {
    if (evt.target.closest('.picture')) {
      const photoId = evt.target.closest('.picture').dataset.photoId;

      const onCommentsLoaderClick = addComments.bind(null, photosById[photoId].comments);
      const onCloseButtonKeydownEsc = (e) => {
        if (e.keyCode === 27) {
          fullPhotoElement.classList.add('hidden');
          document.body.classList.remove('modal-open');
          document.removeEventListener('keydown', onCloseButtonKeydownEsc);
          shownCommentsCount = 0;
          commentsLoaderElement.removeEventListener('click', onCommentsLoaderClick);
        }
      };
      const onCloseButtonClick = () => {
        fullPhotoElement.classList.add('hidden');
        document.body.classList.remove('modal-open');
        document.removeEventListener('keydown', onCloseButtonKeydownEsc);
        shownCommentsCount = 0;
        commentsLoaderElement.removeEventListener('click', onCommentsLoaderClick);
      };

      fullPhotoElement.classList.remove('hidden');
      document.body.classList.add('modal-open');
      commentsLoaderElement.classList.remove('hidden');
      fullImageElement.src = photosById[photoId].url;
      fullImageElement.alt = photosById[photoId].description;
      photoDescriptionElement.textContent = photosById[photoId].description;
      likesCountElement.textContent = photosById[photoId].likes;
      totalCommentsCountElement.textContent = photosById[photoId].comments.length;
      addComments(photosById[photoId].comments);
      commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);
      closeFullPhotoElement.addEventListener('click', onCloseButtonClick, {once: true});
      document.addEventListener('keydown', onCloseButtonKeydownEsc);
    }
  };

  miniPhotosElement.addEventListener('click', onPhotosClick);
};

export { renderFullPhoto };
