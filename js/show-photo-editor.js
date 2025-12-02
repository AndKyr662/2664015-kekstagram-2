import { initValidation, removeValidation, isValidForm } from './validation-form.js';
import { addEditPhotoListener, removeEditPhotoListener } from './edit-photo.js';
import { submitFormData } from './api.js';

const PHOTO_TYPES = ['jpg', 'jpeg', 'png'];

const imageUploadElement = document.querySelector('.img-upload');
const imageUploadFormElement = document.querySelector('.img-upload__form');
const imageUploadInputElement = imageUploadElement.querySelector('.img-upload__input');
const imagePreviewElement = imageUploadElement.querySelector('.img-upload__preview img');
const imageEffectPreviewElements = imageUploadElement.querySelectorAll('.effects__preview');
const imageEditingPopupElement = imageUploadElement.querySelector('.img-upload__overlay');
const imageUploadTextElement = imageUploadElement.querySelector('.img-upload__text');
const submitFormElement = imageUploadElement.querySelector('.img-upload__submit');
const closeFormElement = imageUploadElement.querySelector('.img-upload__cancel');

const onCloseButtonKeydownEsc = (evt) => {
  if (evt.keyCode === 27) {
    hideModal();
  }
};

const onCloseButtonClick = () => hideModal();

const onBreakHidePopup = (evt) => {
  if (evt.keyCode === 27) {
    evt.stopPropagation();
  }
};

const disableSubmitButton = (isNeedDisable) => {
  submitFormElement.disabled = isNeedDisable;
};

const onSubmitForm = (evt) => {
  evt.preventDefault();
  if (isValidForm()) {
    const formData = new FormData(imageUploadFormElement);
    submitFormData(formData);
  }
};

const swapPhoto = (photo) => {
  imagePreviewElement.src = URL.createObjectURL(photo);
  imageEffectPreviewElements.forEach((preview) => {
    preview.style.backgroundImage = `url(${URL.createObjectURL(photo)})`;
  });
};

const showModal = () => {
  imageEditingPopupElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeFormElement.addEventListener('click', onCloseButtonClick, {once: true});
  document.addEventListener('keydown', onCloseButtonKeydownEsc);
  imageUploadTextElement.addEventListener('keydown', onBreakHidePopup);
  initValidation();
  imageUploadFormElement.addEventListener('submit', onSubmitForm);
  addEditPhotoListener();
};

function hideModal () {
  imageEditingPopupElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onCloseButtonKeydownEsc);
  imageUploadTextElement.removeEventListener('keydown', onBreakHidePopup);
  removeValidation();
  removeEditPhotoListener();
  imageUploadFormElement.removeEventListener('submit', onSubmitForm);
  imageUploadFormElement.reset();
}

const onChangeInput = () => {
  const file = imageUploadInputElement.files[0];
  const fileName = file.name.toLowerCase();
  if (PHOTO_TYPES.some((format) => fileName.endsWith(format))) {
    swapPhoto(file);
    showModal();
  }
};

const initListenerDownloadPhoto = () => {
  imageUploadInputElement.addEventListener('change', onChangeInput);
};

export { initListenerDownloadPhoto, hideModal, disableSubmitButton };

