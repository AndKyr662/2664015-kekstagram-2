import { getRandomInteger, getUniqueId } from './util.js';

const PHOTO_COUNT = 25;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;
const AVATAR_COUNT = 6;
const MIN_LIKES = 15;
const MAX_LIKES = 200;

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Михаил',
  'Александр',
  'Артём',
  'Матвей',
  'Тимофей',
  'Иван',
  'Максим',
  'Лев',
  'Дмитрий',
  'Роман',
  'София',
  'Ева',
  'Анна',
  'Мария',
  'Варвара',
  'Виктория',
  'Анастасия',
  'Екатерина',
  'Елена',
  'Ольга'
];

const getCommentId = getUniqueId(1, PHOTO_COUNT * MAX_COMMENTS * 3);

const getComments = (commentsCount = getRandomInteger(MIN_COMMENTS, MAX_COMMENTS)) =>
  Array.from({ length: commentsCount }, () => (
    { id: getCommentId(),
      avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
      message: COMMENTS[getRandomInteger(0, COMMENTS.length - 1)],
      name: NAMES[getRandomInteger(0, NAMES.length - 1)],
    }
  ));


const getPhotoCards = (photoCount) =>
  Array.from({ length: photoCount }, (value, i) => (
    {
      id: i + 1,
      url: `photos/${i + 1}.jpg`,
      description: 'Замечательное фото',
      likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
      comments: getComments()
    }
  ));

console.log(getPhotoCards(PHOTO_COUNT));

