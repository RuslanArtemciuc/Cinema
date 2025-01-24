// On windows scroll (x or y)
window.addEventListener('scroll', () => {
  document.querySelector('.navbara').setAttribute('toggle', window.scrollY >= 10 ? 'large' : 'small');
});


setTimeout(() => {
  if (window.scrollY <= 10) {
    document.querySelector('.navbara').setAttribute('toggle', 'small');
  }
}, 1000);