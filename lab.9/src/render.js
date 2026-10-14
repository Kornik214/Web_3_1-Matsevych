import { notes, watchlist } from './state.js';

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

    const fill = (field, text) => {
      const el = clone.querySelector(`[data-field="${field}"]`);
      if (el) el.textContent = text;
    };

    fill('name', show.name);
    fill('year', show.year || '—');
    fill('rating', show.rating || '—');
    fill('genres', (show.genres && show.genres.length > 0) ? show.genres.join(', ') : '—');

    const btnToggle = clone.querySelector('[data-action="toggle"]');
    if (btnToggle) {
      btnToggle.setAttribute('aria-label', `До списку: ${show.name}`);
      btnToggle.setAttribute('aria-pressed', watchlist.has(Number(show.id)) || watchlist.has(String(show.id)) ? 'true' : 'false');
    }

    const btnDetails = clone.querySelector('[data-action="details"]');
    if (btnDetails) {
      btnDetails.setAttribute('aria-label', `Детальніше про ${show.name}`);
    }

     const noteData = notes.get(show.id);
    const mineEl = clone.querySelector('.card__mine');
    const noteEl = clone.querySelector('[data-field="note"]');

    if (noteData) {
      clone.querySelector('[data-field="my-rating"]').textContent = String(noteData.rating);
      mineEl.hidden = false;

      if (noteData.text) {
        noteEl.textContent = noteData.text;
        noteEl.hidden = false;
      }
    }

    fragment.appendChild(clone);
  }

  results.appendChild(fragment);
}