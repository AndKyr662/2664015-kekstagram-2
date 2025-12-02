const sliderContainerElement = document.querySelector('.img-upload__effect-level');
const sliderInputElement = sliderContainerElement.querySelector('.effect-level__value');
const sliderElement = sliderContainerElement.querySelector('.effect-level__slider');
const photoElement = document.querySelector('.img-upload__preview img');

const effects = [
  {
    effect: 'effect-none',
    filter: 'none',
    measure: '',
  },
  {
    effect: 'effect-chrome',
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    measure: '',
  },
  {
    effect: 'effect-sepia',
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    measure: '',
  },
  {
    effect: 'effect-marvin',
    filter: 'invert',
    min: 0,
    max: 100,
    step: 1,
    measure: '%',
  },
  {
    effect: 'effect-phobos',
    filter: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    measure: 'px',
  },
  {
    effect: 'effect-heat',
    filter: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    measure: '',
  },
];

let currentEffectData;

const createSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
  });

  hideSlider();
};

function hideSlider () {
  sliderContainerElement.classList.add('hidden');
  sliderContainerElement.setAttribute('disabled', true);
  photoElement.style.filter = 'none';
}

const showSlider = () => {
  sliderContainerElement.classList.remove('hidden');
  sliderContainerElement.removeAttribute('disabled');
  sliderElement.noUiSlider.on('update', () => {
    const sliderValue = `${sliderElement.noUiSlider.get()}${currentEffectData.measure}`;
    photoElement.style.filter = `${currentEffectData.filter}(${sliderValue})`;
    sliderInputElement.setAttribute('value', +sliderElement.noUiSlider.get());
  });
};

const updateSlider = (currentEffect) => {
  if (currentEffect === effects[0].effect) {
    hideSlider();
  } else {
    currentEffectData = effects.find((element) => element.effect === currentEffect);
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: currentEffectData.min,
        max: currentEffectData.max,
      },
      start: currentEffectData.max,
      step: currentEffectData.step,
    });
    showSlider();
  }
};

const removeSlider = () => {
  sliderElement.noUiSlider.destroy();
};

export { createSlider, updateSlider, removeSlider };
