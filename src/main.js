import './style.css';

// Toggle Menu Mobile
const menuToggle = document.querySelector('.menu-toggle');
const navUl = document.querySelector('nav ul');

if (menuToggle && navUl) {
  menuToggle.addEventListener('click', () => {
    navUl.classList.toggle('show');
  });
}

// Service Items Expansion
const serviceItems = document.querySelectorAll('.service-item');

serviceItems.forEach(item => {
  item.addEventListener('click', () => {
    // Toggle the clicked item
    item.classList.toggle('active');
  });
});

// Shop Modal Logic
const shopModal = document.getElementById('shopModal');
const closeModal = document.getElementById('closeModal');
const shopButtons = document.querySelectorAll('.card .btn');

// Elements to populate in modal
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalPrice = document.getElementById('modalPrice');

if (shopModal && closeModal) {
  // Close modal on X click
  closeModal.addEventListener('click', () => {
    shopModal.classList.remove('active');
  });

  // Close modal on outside click
  window.addEventListener('click', (e) => {
    if (e.target === shopModal) {
      shopModal.classList.remove('active');
    }
  });

  // Open modal on 'Dettagli' click - DELEGATION for dynamic lists if needed, but direct attach works for static
  // Re-selecting buttons in case of sorting might be needed, but sticking to static for now.
  // If we sort elements, we move them in DOM, events should stay attached if we move elements.

  // Better approach: Event Delegation for 'Dettagli' buttons to handle sorting which moves elements
  const cardsContainer = document.querySelector('.cards');
  if (cardsContainer) {
    cardsContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('btn') && e.target.innerText === "DETTAGLI") { // Check uppercase text-transform might affect this? "Dettagli" in HTML
        e.preventDefault();
        const btn = e.target;
        // Get data from the card (Parent of the button)
        const card = btn.closest('.card');
        if (card) {
          const title = card.querySelector('h3').innerText;
          const desc = card.querySelector('p').innerText;
          const priceMatch = card.innerHTML.match(/€\s*[\d,.]+/);
          const price = priceMatch ? priceMatch[0] : 'Prezzo su richiesta';

          if (modalTitle) modalTitle.innerText = title;
          if (modalDescription) modalDescription.innerText = desc + "\n\n(Qui potremmo aggiungere dettagli tecnici più specifici, foto aggiuntive, o stato di conservazione dettagliato.)";
          if (modalPrice) modalPrice.innerText = price;

          shopModal.classList.add('active');
        }
      }
    });
  }
}

// Fallback for static button binding if delegation above is tricky with text match
shopButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    if (shopModal && !e.defaultPrevented) { // Check if not handled by delegation or just use this
      e.preventDefault();
      const card = btn.closest('.card');
      if (card) {
        const title = card.querySelector('h3').innerText;
        const desc = card.querySelector('p').innerText;
        const priceMatch = card.innerHTML.match(/€\s*[\d,.]+/);
        const price = priceMatch ? priceMatch[0] : 'Prezzo su richiesta';

        if (modalTitle) modalTitle.innerText = title;
        if (modalDescription) modalDescription.innerText = desc + "\n\n(Qui potremmo aggiungere dettagli tecnici più specifici, foto aggiuntive, o stato di conservazione dettagliato.)";
        if (modalPrice) modalPrice.innerText = price;

        shopModal.classList.add('active');
      }
    }
  });
});


// Contact Form Simulation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('name');
    const name = nameInput ? nameInput.value : 'Cliente';
    alert(`Grazie ${name}! Il tuo messaggio è stato inviato. Ti risponderemo a breve.`);
    contactForm.reset();
  });
}

// Shop Search & Sort
const shopSearch = document.getElementById('shopSearch');
const shopFilter = document.getElementById('shopFilter');
const cardsContainer = document.querySelector('.cards');

if (shopSearch && cardsContainer) {
  shopSearch.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const cards = cardsContainer.querySelectorAll('.card');

    cards.forEach(card => {
      const title = card.querySelector('h3').innerText.toLowerCase();
      const desc = card.querySelector('p').innerText.toLowerCase();

      if (title.includes(searchTerm) || desc.includes(searchTerm)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

if (shopFilter && cardsContainer) {
  shopFilter.addEventListener('change', (e) => {
    const sortValue = e.target.value;
    const cards = Array.from(cardsContainer.querySelectorAll('.card'));

    const parsePrice = (card) => {
      const priceMatch = card.innerHTML.match(/€\s*([\d,.]+)/);
      if (priceMatch) {
        return parseFloat(priceMatch[1].replace(',', '').replace('.', '')); // Simple parse assumption
        // Be careful with Italy format 1.000,00 vs 1000.00
        // In our HTML it is "450,00" -> 45000 if replaced blindly? No.
        // "450,00" -> "450" (if removing comma for decimal??)
        // Let's assume format is "450,00" -> replace ',' with '.' -> "450.00"
        // If format is 1.200,00 -> remove . replace , with . -> 1200.00
        let clean = priceMatch[1].replace(/\./g, '').replace(',', '.');
        return parseFloat(clean);
      }
      return 0;
    };

    if (sortValue === 'price-asc') {
      cards.sort((a, b) => parsePrice(a) - parsePrice(b));
    } else if (sortValue === 'price-desc') {
      cards.sort((a, b) => parsePrice(b) - parsePrice(a));
    } else if (sortValue === 'az') {
      cards.sort((a, b) => {
        const titleA = a.querySelector('h3').innerText.toLowerCase();
        const titleB = b.querySelector('h3').innerText.toLowerCase();
        return titleA.localeCompare(titleB);
      });
    }

    // Append sorted cards back to container
    cards.forEach(card => cardsContainer.appendChild(card));
  });
}
