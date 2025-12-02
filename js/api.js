import { hideModal, disableSubmitButton } from './show-photo-editor.js';
import { showMessage, addErrorMessage } from './show-messages.js';
import { showFilters, getPhotos } from './filter-photo.js';

const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const Credentials = {
  SAME_ORIGIN: 'same-origin',
};

let photosArray = [];

const loadData = (renderData) => {
  fetch(`${BASE_URL}${Route.GET_DATA}`)
    .then((response) => {
      if (response.ok) {
        showFilters(true);
        return response.json();
      }
      addErrorMessage();
    })
    .then((data) => {
      photosArray = data;
      return getPhotos(data);
    })
    .then ((photos) => {
      renderData(photos);
    })
    .catch(() => {
      addErrorMessage();
    });
};


const submitFormData = (formData) => {
  disableSubmitButton(true);
  fetch(
    `${BASE_URL}${Route.SEND_DATA}`,
    {
      method: Method.POST,
      credentials: Credentials.SAME_ORIGIN,
      body: formData,
    },
  )
    .then((response) => {
      showMessage(response.ok);
      disableSubmitButton(false);
      if (response.ok) {
        hideModal();
      }
    })
    .catch(() => {
      showMessage(false);
      disableSubmitButton(false);
    });
};

export { loadData, submitFormData, photosArray };
