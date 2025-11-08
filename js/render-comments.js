const AVATAR_SIDE_SIZE = 35;
const MAX_COMMENTS_PER_LOAD = 5;

const commentsLoaderElement = document.querySelector('.comments-loader');
const commentsCountContainerElement = document.querySelector('.social__comment-count');
const shownCommentsCountElement = commentsCountContainerElement.querySelector('.social__comment-shown-count');
const totalCommentsCountElement = commentsCountContainerElement.querySelector('.social__comment-total-count');
const commentsContainerElement = document.querySelector('.social__comments');

let comments = [];
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

const showCommentsLoaderElement = () => {
  commentsLoaderElement.classList.remove('hidden');
  commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);
};

const hideCommentsLoaderElement = () => {
  commentsLoaderElement.classList.add('hidden');
  commentsLoaderElement.removeEventListener('click', onCommentsLoaderClick);
};

const createCommentsFragment = (currentComments) => {
  const commentsContainerFragment = document.createDocumentFragment();
  for (const comment of currentComments) {
    commentsContainerFragment.append(createCommentElement(comment));
    shownCommentsCount++;
  }
  return commentsContainerFragment;
};

const addCommentsToMarkup = (commentsElement) => {
  if (shownCommentsCount <= MAX_COMMENTS_PER_LOAD) {
    commentsContainerElement.replaceChildren(commentsElement);
  } else {
    commentsContainerElement.append(commentsElement);
  }
};

const renderCurrentComments = () => {
  const commentsSlice = comments.slice(shownCommentsCount, shownCommentsCount + MAX_COMMENTS_PER_LOAD);
  addCommentsToMarkup(createCommentsFragment(commentsSlice));
  shownCommentsCountElement.textContent = shownCommentsCount;
  if (shownCommentsCount >= comments.length) {
    hideCommentsLoaderElement();
  }
};

const onCommentsLoaderClick = () => {
  renderCurrentComments();
};

const renderComments = (commentsData) => {
  comments = commentsData;
  shownCommentsCount = 0;
  showCommentsLoaderElement();
  renderCurrentComments();
  totalCommentsCountElement.textContent = comments.length;
};

export { renderComments };
