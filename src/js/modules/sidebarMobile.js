function sidebarMobile() {

const sidebar = document.querySelector('.sidebar');
const burger = document.querySelector('.burger');
const links = sidebar.querySelectorAll('a');

links.forEach(item=> {
  item.addEventListener('click', ()=> {
    sidebar.classList.remove('active');
    burger.classList.remove('active');
    checkScroll();
  })
})

burger.addEventListener('click', function() {
    sidebar.classList.toggle('active');
    burger.classList.toggle('active');
    checkScroll();
});

document.addEventListener('click', function(event) {
    if (!sidebar.contains(event.target) && !burger.contains(event.target)) {
      sidebar.classList.remove('active');
      burger.classList.remove('active');
      checkScroll();
    }
  });

  function checkScroll() {
    if (sidebar.classList.contains('active')) {
        disableScroll();
    } else {
        enableScroll();
    }
  }

  function disableScroll() {
    window.addEventListener('wheel', preventDefault, { passive: false });
    window.addEventListener('touchmove', preventDefault, { passive: false });
}

function enableScroll() {
    window.removeEventListener('wheel', preventDefault, { passive: false });
    window.removeEventListener('touchmove', preventDefault, { passive: false });
}

function preventDefault(e) {
    e.preventDefault();
}
}

export default sidebarMobile;