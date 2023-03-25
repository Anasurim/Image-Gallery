const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadBtn: document.querySelector('.load-more'),
};

refs.form.addEventListener('submit', e => {
  e.preventDefault();
  console.log(e.currentTarget.elements.query.value);
});
