import { getShow, saveNote, notes } from './state.js';

let currentShowId = null;
let openerButton = null;

export function openDetails(id) {
  currentShowId = Number(id);
  const dialog = document.getElementById('details');
  const show = getShow(currentShowId) || getShow(String(id));
  
  openerButton = document.activeElement;

  document.getElementById('details-title').textContent = show.name;
  
  const summaryEl = document.getElementById('details-summary');
  if (show.summary) {
    const temp = document.createElement('template');
    temp.innerHTML = show.summary;
    summaryEl.textContent = temp.content.textContent || '';
  } else {
    summaryEl.textContent = '—';
  }

  document.getElementById('details-link').href = show.url;

  const form = document.getElementById('note-form');
  form.reset();
  
  const ratingInput = form.elements.rating;
  const noteInput = form.elements.note;
  const errorEl = document.getElementById('note-rating-error');
  
  ratingInput.removeAttribute('aria-invalid');
  ratingInput.removeAttribute('aria-describedby');
  ratingInput.setCustomValidity('');
  if (errorEl) errorEl.textContent = '';

  const savedNote = notes.get(currentShowId) || notes.get(String(currentShowId));
  if (savedNote) {
    ratingInput.value = savedNote.rating;
    if (noteInput) noteInput.value = savedNote.text || savedNote.note || '';
  }

  dialog.showModal();
}

export function initDetails(refresh) {
  const dialog = document.getElementById('details');
  const form = document.getElementById('note-form');

  dialog.addEventListener('close', () => {
    if (openerButton && document.body.contains(openerButton)) {
      openerButton.focus();
    } else if (currentShowId) {
      const newBtn = document.querySelector(`li[data-id="${currentShowId}"] [data-action="details"]`);
      if (newBtn) newBtn.focus();
    }
  });

  dialog.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON' && event.target.textContent.trim() === 'Скасувати') {
      dialog.close();
    }
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault(); 
    
    const ratingVal = parseInt(form.elements.rating.value, 10);
    const noteVal = form.elements.note ? form.elements.note.value.trim() : '';

    saveNote(currentShowId, {
      rating: ratingVal,
      text: noteVal,
      note: noteVal
    });

    refresh(); 
    
    const show = getShow(currentShowId) || getShow(String(currentShowId));
    if (show) {
      document.getElementById('status').textContent = `Нотатку до ${show.name} збережено`;
    }

    dialog.close();
  });

  form.addEventListener('invalid', (event) => {
    event.preventDefault(); 
    const field = event.target;
    const errorEl = document.getElementById('note-rating-error');
    
    if (errorEl) {
      errorEl.textContent = field.validationMessage || 'Помилка';
    }
    
    field.setAttribute('aria-invalid', 'true');
    field.setAttribute('aria-describedby', 'note-rating-error');
    
    if (form.querySelector(':invalid') === field) {
      field.focus();
    }
  }, true);

  form.addEventListener('input', (event) => {
    const field = event.target;
    if (field.hasAttribute('aria-invalid')) {
      field.removeAttribute('aria-invalid');
      field.removeAttribute('aria-describedby');
      field.setCustomValidity(''); 
      const errorEl = document.getElementById('note-rating-error');
      if (errorEl) errorEl.textContent = '';
    }
  });
}