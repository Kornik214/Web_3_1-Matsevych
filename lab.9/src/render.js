import { notes } from './state.js';

export function renderShows(list) {
  const results = document.getElementById('results');
  const template = document.getElementById('show-card');
  const status = document.getElementById('status');

  results.replaceChildren();

  if (list.length === 0) {
    status.textContent = 'Нічого не знайдено';
    return;
  }

  status.textContent = `Знайдено: ${list.length} з 30`;

  const fragment = document.createDocumentFragment();

  for (const show of list) {
    const clone = template.content.cloneNode(true);
    const li = clone.querySelector('li');
    li.dataset.id = show.id;

    clone.querySelector('[data-field="name"]').textContent = show.name;
    clone.querySelector('[data-field="year"]').textContent = show.year || '—';
    clone.querySelector('[data-field="rating"]').textContent = show.rating || '—';
    clone.querySelector('[data-field="genres"]').textContent = 
      (show.genres && show.genres.length > 0) ? show.genres.join(', ') : '—';

    const btnToggle = clone.querySelector('[data-action="toggle"]');
    btnToggle.setAttribute('aria-label', `До списку: ${show.name}`);

    const btnDetails = clone.querySelector('[data-action="details"]');
    btnDetails.setAttribute('aria-label', `Детальніше про ${show.name}`);

    const noteData = notes.get(show.id);
    const myRatingEl = clone.querySelector('[data-field="my-rating"]');
    const myNoteEl = clone.querySelector('[data-field="my-note"]');

    if (myRatingEl && myNoteEl) {
      if (noteData) {
        myRatingEl.textContent = `Моя оцінка: ${noteData.rating}/10`;
        myNoteEl.textContent = noteData.text || '';
      } else {
        myRatingEl.textContent = '';
        myNoteEl.textContent = '';
      }
    }

    fragment.appendChild(clone);
  }

  results.appendChild(fragment);
}