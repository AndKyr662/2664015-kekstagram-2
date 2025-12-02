import { createSlider, updateSlider, removeSlider } from './create-effects-slider.js';

const SCALE_STEP = 0.25;
const SCALE_MIN = 0.25;
const SCALE_MAX = 1;
const SCALE_SMALLER_SELECTOR = '.scale__control--smaller';
const SCALE_BIGGER_SELECTOR = '.scale__control--bigger';

const photoScaleElement = document.querySelector('.img-upload__scale');
const scaleValueElement = photoScaleElement.querySelector('.scale__control--value');
const photoElement = document.querySelector('.img-upload__preview img');
const effectsElement = document.querySelector('.effects__list');

let scaleValue = SCALE_MAX;

const scalePhoto = (evt) => {
  if (evt.target.closest(SCALE_SMALLER_SELECTOR)) {
    scaleValue = scaleValue < SCALE_MIN * 2 ? scaleValue : scaleValue - SCALE_STEP;
  } else if (evt.target.closest(SCALE_BIGGER_SELECTOR)) {
    scaleValue = scaleValue > 1 - SCALE_MIN ? scaleValue : scaleValue + SCALE_STEP;
  }

  scaleValueElement.setAttribute('value', `${scaleValue * 100}%`);
  photoElement.style.transform = `scale(${scaleValue})`;
};

const changeEffect = (evt) => {
  if (evt.target.closest('.effects__radio')){
    updateSlider(evt.target.id);
  }
};

const addEditPhotoListener = () => {
  photoScaleElement.addEventListener('click', scalePhoto);
  effectsElement.addEventListener('click', changeEffect);
  createSlider();
};

const removeEditPhotoListener = () => {
  scaleValue = SCALE_MAX;
  scaleValueElement.setAttribute('value', `${scaleValue * 100}%`);
  photoScaleElement.removeEventListener('click', scalePhoto);
  effectsElement.removeEventListener('click', changeEffect);
  removeSlider();
};

export { addEditPhotoListener, removeEditPhotoListener };
