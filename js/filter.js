// Add these at the top of the script
import noUiSlider from "https://cdn.skypack.dev/nouislider@15.5.0";
import wNumb from "https://cdn.skypack.dev/wnumb@1.2.0";

// Initialize Price Slider
const priceSlider = document.getElementById("priceRange");
const minPriceInput = document.getElementById("minPrice");
const maxPriceInput = document.getElementById("maxPrice");

noUiSlider.create(priceSlider, {
  start: [0, 500000000],
  connect: true,
  range: {
    min: 0,
    max: 500000000,
  },
  format: wNumb({
    decimals: 0,
    thousand: ",",
    prefix: "₦ ",
  }),
});

priceSlider.noUiSlider.on("update", (values) => {
  const [min, max] = values.map((v) => parseInt(v.replace(/[^0-9]/g, "")));
  minPriceInput.value = min;
  maxPriceInput.value = max;
  filterProperties();
});

[minPriceInput, maxPriceInput].forEach((input) => {
  input.addEventListener("change", (e) => {
    priceSlider.noUiSlider.set([
      minPriceInput.value || 0,
      maxPriceInput.value || 500000000,
    ]);
  });
});

// Enhanced Filter Function
function filterProperties() {
  const activeCategory =
    document.querySelector(".filter-btn.active").dataset.category;
  const locationFilter = document.getElementById("locationFilter").value;
  const typeFilter = document.getElementById("typeFilter").value;
  const [minPrice, maxPrice] = priceSlider.noUiSlider
    .get()
    .map((v) => parseInt(v.replace(/[^0-9]/g, "")));

  propertyCards.forEach((card) => {
    const cardPrice = parseInt(card.querySelector(".price-tag").dataset.value);
    const cardLocation = card.dataset.location;
    const cardType = card.dataset.type;
    const categoryMatch =
      activeCategory === "all" || card.dataset.category === activeCategory;
    const priceMatch = cardPrice >= minPrice && cardPrice <= maxPrice;
    const locationMatch = !locationFilter || cardLocation === locationFilter;
    const typeMatch = !typeFilter || cardType === typeFilter;

    card.style.display =
      categoryMatch && priceMatch && locationMatch && typeMatch
        ? "block"
        : "none";
  });
}

// Update property cards with data attributes (add these to your HTML)

<article
  class="property-card animate-rise"
  data-category="3bed"
  data-location="Banana Island"
  data-type="Residential"
  data-price="85000000"
>
  <div class="price-tag" data-value="85000000">
    ₦85M
  </div>
</article>;

// Add event listeners for new filters
document
  .getElementById("locationFilter")
  .addEventListener("change", filterProperties);
document
  .getElementById("typeFilter")
  .addEventListener("change", filterProperties);
