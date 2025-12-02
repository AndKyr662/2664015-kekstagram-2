import { loadData } from './api.js';
import { renderMiniPhotos } from './render-mini-photos.js';
import { initListenerFullPhoto } from './render-full-photo.js';
import { initListenerDownloadPhoto } from './show-photo-editor.js';

const renderPage = (data) => {
  renderMiniPhotos(data);
  initListenerFullPhoto(data);
  initListenerDownloadPhoto();
};

loadData(renderPage);
