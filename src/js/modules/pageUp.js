function pageUp(){
    const btnUp = document.querySelector('.btn-up');
window.addEventListener('scroll', () =>{
  if (window.scrollY > 400) {
    btnUp.style.bottom = '20px';
  } else {
    btnUp.style.bottom = '-100px';
  }
}, { passive: true })

btnUp.addEventListener('click', ()=> {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' 
});
})
}

export default pageUp;