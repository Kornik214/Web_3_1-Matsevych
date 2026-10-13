import { toggle, watchlist } from './state.js';
import { openDetails } from './details.js';

export function initList(refresh) {
  const results = document.getElementById('results');
  const counter = document.getElementById('watchlist-count');
  const heading = document.getElementById('results-heading');

  updateCounter();

  if (results._clickHandler) {
    results.removeEventListener('click', results._clickHandler);
  }

  results._clickHandler = (event) => {
    const targetElement = event.target instanceof Element ? event.target : event.target.parentElement;
    const btnToggle = targetElement.closest('[data-action="toggle"]');
    const btnDetails = targetElement.closest('[data-action="details"]');

    if (btnToggle) {
      const li = btnToggle.closest('li');
      const id = Number(li.dataset.id);

      toggle(id);
      updateCounter();

      const allCards = Array.from(results.querySelectorAll('li'));
      const currentIndex = allCards.indexOf(li);

      refresh();

      const newBtn = document.querySelector(`li[data-id="${id}"] [data-action="toggle"]`);

      if (newBtn) {
        newBtn.focus();
      } else {
        const nextCard = allCards[currentIndex + 1];
        const prevCard = allCards[currentIndex - 1];

        let focusTarget = null;
        if (nextCard && document.querySelector(`li[data-id="${nextCard.dataset.id}"]`)) {
          focusTarget = document.querySelector(`li[data-id="${nextCard.dataset.id}"] [data-action="toggle"]`);
        } else if (prevCard && document.querySelector(`li[data-id="${prevCard.dataset.id}"]`)) {
          focusTarget = document.querySelector(`li[data-id="${prevCard.dataset.id}"] [data-action="toggle"]`);
        }

        if (focusTarget) {
          focusTarget.focus();
        } else {
          heading.tabIndex = -1;
          heading.focus();
        }
      }
    } else if (btnDetails) {
      const li = btnDetails.closest('li');
      const id = Number(li.dataset.id);
      openDetails(id);
    }
  };

  results.addEventListener('click', results._clickHandler);

  function updateCounter() {
    counter.textContent = watchlist.size.toString();
  }
}