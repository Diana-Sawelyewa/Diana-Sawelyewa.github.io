function clickPhoto() {
    const avatar = document.querySelector('.change');
    avatar.addEventListener('click', ()=> {
      avatar.classList.toggle('change1');
      avatar.classList.toggle('change2');
    })
}

export default clickPhoto;