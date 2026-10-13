export function readFilters() {
  const form = document.getElementById('filters');
  return {
    query: form.elements.query.value.trim(),
    genre: form.elements.genre.value,
    mine: form.elements.mine.checked
  };
}

export function initFilters(refresh) {
  const form = document.getElementById('filters');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
  });

  form.addEventListener('input', () => {
    refresh();
  });

  form.addEventListener('reset', (event) => {
    event.preventDefault();
    form.elements.query.value = '';
    form.elements.genre.value = '';
    form.elements.mine.checked = false;
    refresh();
  });
}