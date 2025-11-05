import { COMMENTS, NAMES } from './data.js';
import { getRandomInteger, getUniqueId } from './utils.js';

const PHOTO_COUNT = 25;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;
const AVATAR_COUNT = 6;
const MIN_LIKES = 15;
const MAX_LIKES = 200;

const getCommentId = getUniqueId(1, PHOTO_COUNT * MAX_COMMENTS * 3);

const getComments = (commentsCount = getRandomInteger(MIN_COMMENTS, MAX_COMMENTS)) =>
  Array.from({ length: commentsCount }, () => (
    { id: getCommentId(),
      avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
      message: COMMENTS[getRandomInteger(0, COMMENTS.length - 1)],
      name: NAMES[getRandomInteger(0, NAMES.length - 1)],
    }
  ));


const getPhotoCards = () =>
  Array.from({ length: PHOTO_COUNT }, (value, i) => (
    {
      id: i,
      url: `photos/${i + 1}.jpg`,
      description: 'Замечательное фото',
      likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
      comments: getComments()
    }
  ));

export { getPhotoCards };

