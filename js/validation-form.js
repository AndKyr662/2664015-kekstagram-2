const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAGS_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;

const imageUploadFormElement = document.querySelector('.img-upload__form');
const hashtagElement = imageUploadFormElement.querySelector('.text__hashtags');
const commentElement = imageUploadFormElement.querySelector('.text__description');
const startHashRegExp = /^#/;
const hashtagRegExp = /^#[a-zа-яё0-9]{1,19}$/i;

let pristine;
let hashtags = [];

const getHashtags = (text) => text.trim().split(' ').filter((word) => word !== '');

const validateCommentLength = (value) => value.length <= MAX_COMMENT_LENGTH;

const isStartsWithHash = () => {
  hashtags = getHashtags(hashtagElement.value);
  hashtags = hashtags.map((hashtag) => hashtag.toLowerCase());
  const isFirstHash = hashtags.every((hashtag) => startHashRegExp.test(hashtag));
  return isFirstHash;
};

const isValidHashtagFormat = () => hashtags.every((hashtag) => hashtagRegExp.test(hashtag));

const isValidHashtagLength = () => hashtags.every((hashtag) => hashtag.length >= MIN_HASHTAG_LENGTH && hashtag.length <= MAX_HASHTAG_LENGTH);

const hasNoDuplicates = () => {
  const uniqueHashtags = new Set (hashtags);
  return uniqueHashtags.size === hashtags.length;
};

const isValidHashtagsCount = () => hashtags.length <= MAX_HASHTAGS_COUNT;

const isValidForm = () => pristine.validate();

const initValidation = () => {
  pristine = new Pristine(imageUploadFormElement, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__field-wrapper--error'
  });

  pristine.addValidator(commentElement, validateCommentLength, `Текст комментария не может превышать ${MAX_COMMENT_LENGTH} символов`);
  pristine.addValidator(hashtagElement, isStartsWithHash, 'Каждый хэштег нужно начать с символа #', 1, true);
  pristine.addValidator(hashtagElement, isValidHashtagLength, `Хэштег должен содержать от ${MIN_HASHTAG_LENGTH} до ${MAX_HASHTAG_LENGTH} символов`, 1, true);
  pristine.addValidator(hashtagElement, isValidHashtagFormat, 'После символа # хэштег должен состоять только из букв и чисел', 1, true);
  pristine.addValidator(hashtagElement, hasNoDuplicates, 'Нельзя использовать одинаковые хэштеги', 1, true);
  pristine.addValidator(hashtagElement, isValidHashtagsCount, `Нельзя использовать более ${MAX_HASHTAGS_COUNT} хэштегов`, 1, true);
};

const removeValidation = () => {
  pristine.destroy();
};

export { initValidation, removeValidation, isValidForm };
