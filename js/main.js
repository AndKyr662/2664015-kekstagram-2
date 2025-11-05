import { getPhotoCards } from './create-photo-data.js';
import { renderMiniPhotos, photosElement } from './render-mini-photos.js';
import { renderFullPhoto } from './render-full-photo.js';

const photosData = getPhotoCards();

renderMiniPhotos(photosData);
renderFullPhoto(photosData, photosElement);
