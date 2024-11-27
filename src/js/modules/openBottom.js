function openBottom() {
    const open = document.querySelector('.open');
    const more = document.querySelector('.more');
    open.addEventListener('click', function() {

    more.classList.toggle('active');

    if (more.classList.contains('active')) {
        open.textContent = 'скрыть';
        more.style.maxHeight = '200px';
    } else {
        open.textContent = 'раскрыть';
        more.style.maxHeight = '0';
    }

});
}

export default openBottom;