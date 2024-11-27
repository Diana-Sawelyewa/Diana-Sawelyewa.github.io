window.addEventListener('DOMContentLoaded', () => {

//сайдбар
const sidebar = document.querySelector('.sidebar');
const burger = document.querySelector('.burger');
//const close = document.querySelector('.close-sidebar');
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
    // Проверяем, кликнули ли мы вне сайдбара и бургер-меню
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




//кнопка открыть (резюме)
const open = document.querySelector('.open');
const more = document.querySelector('.more');
open.addEventListener('click', function() {

    //тогл класса для доп блока
    more.classList.toggle('active');

    //изменение внутренностей на закрыть
    if (more.classList.contains('active')) {
        open.textContent = 'скрыть';
        more.style.maxHeight = '200px';
    } else {
        open.textContent = 'раскрыть';
        more.style.maxHeight = '0';
    }

});



//табы для проектов

const projects = document.querySelectorAll('.project');
projects.forEach(item => {
    makeTabs(item);
})

function makeTabs(container) {
    const buttons = container.querySelectorAll('.buttons div'); //здесь лежат 2 кнопки 0(i) - описание, 1(i) - технологии
    const contents = container.querySelectorAll('.content');

    function showTab(i=0) {
        buttons.forEach(item => {
            item.classList.remove('active');
        })
        contents.forEach(item => {
            item.classList.remove('active');
        })
        buttons[i].classList.add('active');
        contents[i].classList.add('active');
    }
    showTab();

        buttons.forEach((but,i)=> {
            but.addEventListener('click', () => {
                showTab(i);
            })
        })

}




//слайдер
  /* const modal = document.querySelector('.modal');
  const close = modal.querySelector('.close');
  
  const sliders = document.querySelector('.about-projects').querySelectorAll('.slider'); 
  const slidersModal = modal.querySelectorAll('.slider');



  close.addEventListener('click', ()=> {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
      slidersModal.forEach(item => {
        item.style.display = "none";
      })
  })



  sliders.forEach((slider, i)=> {
    makeSlider(slider, i, true);
  })
  slidersModal.forEach((slider, i)=> {
    makeSlider(slider, i, false);
  })

  function makeSlider (slider, i, bool) {
    let sliderList = slider.querySelector('.slider-list'),
    sliderTrack = slider.querySelector('.slider-track'),
    slides = slider.querySelectorAll('.slide'),
    arrows = slider.querySelectorAll('.slider-button'),
    prev = arrows[0],
    next = arrows[1],
    slideWidth = bool ? sliderList.offsetWidth : window.innerWidth,
    slideIndex = 0,
    posInit = 0,
    posX1 = 0,
    posX2 = 0,
    posY1 = 0,
    posY2 = 0,
    posFinal = 0,
    isSwipe = false,
    isScroll = false,
    allowSwipe = true,
    transition = true,
    nextTrf = 0,
    prevTrf = 0,
    lengthSlides = slides.length - 1,
    lastTrf = lengthSlides * slideWidth,
    posThreshold = slideWidth * 0.05,
    trfRegExp = /([-0-9.]+(?=px))/;


const getEvent = function() {
      return (event.type.search('touch') !== -1) ? event.touches[0] : event;
    };


    const slide = function() {
      if (0 <= slideIndex  && lengthSlides >= slideIndex) {
      if (transition) {
        sliderTrack.style.transition = 'transform .5s';
      }
      sliderTrack.style.transform = `translate3d(-${slideIndex * slideWidth}px, 0px, 0px)`;
  } else if (slideIndex < 0) {
    slideIndex = lengthSlides;
    slide();
  } else if (slideIndex > lengthSlides) {
    slideIndex = 0;
    slide();
  }

      prev.classList.toggle('disabled', slideIndex === 0);
      next.classList.toggle('disabled', slideIndex === lengthSlides);


    }
  
    
    const swipeStart = function() {
      let evt = getEvent();
      if (allowSwipe) {
        transition = true;
        nextTrf = (slideIndex + 1) * -slideWidth;
        prevTrf = (slideIndex - 1) * -slideWidth;
        posInit = posX1 = evt.clientX;
        posY1 = evt.clientY;
        sliderTrack.style.transition = '';
        document.addEventListener('touchmove', swipeAction);
        document.addEventListener('mousemove', swipeAction);
        document.addEventListener('touchend', swipeEnd);
        document.addEventListener('mouseup', swipeEnd);
        sliderList.classList.remove('grab');
        sliderList.classList.add('grabbing');
      }
    };
    const swipeAction = function() {
      let evt = getEvent(),
        style = sliderTrack.style.transform,
        transform = +style.match(trfRegExp)[0];
      posX2 = posX1 - evt.clientX;
      posX1 = evt.clientX;
      posY2 = posY1 - evt.clientY;
      posY1 = evt.clientY;
      if (!isSwipe && !isScroll) {
        let posY = Math.abs(posY2);
        if (posY > lengthSlides || posX2 === 0) {
          isScroll = true;
          allowSwipe = false;
        } else if (posY < lengthSlides) {
          isSwipe = true;
        }
      }
      if (isSwipe) {
        if (slideIndex === 0) {
          if (posInit < posX1) {
            setTransform(transform, 0);
            return;
          } else {
            allowSwipe = true;
          }
        }
        if (slideIndex === lengthSlides) {
          if (posInit > posX1) {
            setTransform(transform, lastTrf);
            return;
          } else {
            allowSwipe = true;
          }
        }
        if (posInit > posX1 && transform < nextTrf || posInit < posX1 && transform > prevTrf) {
          reachEdge();
          return;
        }
        sliderTrack.style.transform = `translate3d(${transform - posX2}px, 0px, 0px)`;
      }
  
    };
    const swipeEnd = function() {
      posFinal = posInit - posX1;
      isScroll = false;
      isSwipe = false;
      document.removeEventListener('touchmove', swipeAction);
      document.removeEventListener('mousemove', swipeAction);
      document.removeEventListener('touchend', swipeEnd);
      document.removeEventListener('mouseup', swipeEnd);
      sliderList.classList.add('grab');
      sliderList.classList.remove('grabbing');
      if (allowSwipe) {
        if (Math.abs(posFinal) > posThreshold) {
          if (posInit < posX1) {
            slideIndex--;
          } else if (posInit > posX1) {
            slideIndex++;
          }
        }
        if (posInit !== posX1) {
          allowSwipe = false;
          slide();
        } else {
          allowSwipe = true;
        }
  
      } else {
        allowSwipe = true;
      }
    };
    const setTransform = function(transform, comapreTransform) {
      if (transform >= comapreTransform) {
        if (transform > comapreTransform) {
          sliderTrack.style.transform = `translate3d(${comapreTransform}px, 0px, 0px)`;
        }
      }
      allowSwipe = false;
    };

const reachEdge = function() {
      transition = false;
      swipeEnd();
      allowSwipe = true;
    };
  sliderTrack.style.transform = 'translate3d(0px, 0px, 0px)';
  sliderList.classList.add('grab');
  sliderTrack.addEventListener('transitionend', () => allowSwipe = true);
  slider.addEventListener('touchstart', swipeStart); 
  slider.addEventListener('mousedown', swipeStart); 



  arrows.forEach(item=> {
  item.addEventListener('click', function() {
    let target = event.target;
    if (target.classList.contains('next')) {
      slideIndex++;
    } else if (target.classList.contains('prev')) {
      slideIndex--;
    } else {
      return;
    }
    slide();
  })});



  window.addEventListener('resize', ()=> {
slideWidth = bool ? slider.querySelector('.slider-list').offsetWidth : window.innerWidth;
sliderTrack.style.transform = `translate3d(-${slideIndex * slideWidth}px, 0px, 0px)`;
})


const slidesOn = slider.querySelectorAll('.on');
slidesOn.forEach((item,n)=> {
      item.onclick=()=> {
        modal.classList.add('active');
        modal.style.backgroundColor = setColor(i);
        document.body.style.overflow = 'hidden';
        slidersModal[i].style.display = 'flex';
        slidersModal[i].querySelector('.slider-track').style.transform = `translate3d(-${n * window.innerWidth}px, 0px, 0px)`;
   
        const arrows = slidersModal[i].querySelectorAll('.slider-button'),
        prev = arrows[0],
        next = arrows[1];
        
        prev.classList.toggle('disabled', slideIndex === 0);
        next.classList.toggle('disabled', slideIndex === lengthSlides);


      }
  })
  }

  function setColor(i) {
    if (i < 2) {
      return 'rgba(255, 184, 180, .8)';
    } else if (i > 1 && i < 4) {
      return 'rgba(121,212,211,.8)';
    } else if (i > 3 && i < 6) {
      return 'rgba(94,190,148,.8)';
    } else {
      return 'rgba(255,209,207,.8)';
    }
  } */












  const modal = document.querySelector('.modal');
  const close = modal.querySelector('.close');
  
  const sliders = document.querySelector('.about-projects').querySelectorAll('.slider'); 
  const slidersModal = modal.querySelectorAll('.slider');



  close.addEventListener('click', ()=> {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
      slidersModal.forEach(item => {
        item.style.display = "none";
      })
  })



  sliders.forEach((slider, i)=> {
    makeSlider(slider, i, true);
  })
/*   slidersModal.forEach((slider, i)=> {
    makeSlider(slider, i, false);
  }) */

  function makeSlider (slider, i, bool, slideIndex = 0) {
    let sliderList = slider.querySelector('.slider-list'),
    sliderTrack = slider.querySelector('.slider-track'),
    slides = slider.querySelectorAll('.slide'),
    arrows = slider.querySelectorAll('.slider-button'),
    prev = arrows[0],
    next = arrows[1],
    slideWidth = bool ? sliderList.offsetWidth : window.innerWidth,
    /* slideIndex = 0, */
    posInit = 0,
    posX1 = 0,
    posX2 = 0,
    posY1 = 0,
    posY2 = 0,
    posFinal = 0,
    isSwipe = false,
    isScroll = false,
    allowSwipe = true,
    transition = true,
    nextTrf = 0,
    prevTrf = 0,
    lengthSlides = slides.length - 1,
    lastTrf = lengthSlides * slideWidth,
    posThreshold = slideWidth * 0.05,
    trfRegExp = /([-0-9.]+(?=px))/;


const getEvent = function() {
      return (event.type.search('touch') !== -1) ? event.touches[0] : event;
    };


    const slide = function() {
      if (0 <= slideIndex  && lengthSlides >= slideIndex) {
      if (transition) {
        sliderTrack.style.transition = 'transform .5s';
      }
      sliderTrack.style.transform = `translate3d(-${slideIndex * slideWidth}px, 0px, 0px)`;
  } else if (slideIndex < 0) {
    slideIndex = lengthSlides;
    slide();
  } else if (slideIndex > lengthSlides) {
    slideIndex = 0;
    slide();
  }

      prev.classList.toggle('disabled', slideIndex === 0);
      next.classList.toggle('disabled', slideIndex === lengthSlides);


    }
  
    if(!bool){
    const swipeStart = function() {
      let evt = getEvent();
      if (allowSwipe) {
        transition = true;
        nextTrf = (slideIndex + 1) * -slideWidth;
        prevTrf = (slideIndex - 1) * -slideWidth;
        posInit = posX1 = evt.clientX;
        posY1 = evt.clientY;
        sliderTrack.style.transition = '';
        document.addEventListener('touchmove', swipeAction);
        document.addEventListener('mousemove', swipeAction);
        document.addEventListener('touchend', swipeEnd);
        document.addEventListener('mouseup', swipeEnd);
        sliderList.classList.remove('grab');
        sliderList.classList.add('grabbing');
      }
    };
    const swipeAction = function() {
      let evt = getEvent(),
        style = sliderTrack.style.transform,
        transform = +style.match(trfRegExp)[0];
      posX2 = posX1 - evt.clientX;
      posX1 = evt.clientX;
      posY2 = posY1 - evt.clientY;
      posY1 = evt.clientY;
      if (!isSwipe && !isScroll) {
        let posY = Math.abs(posY2);
        if (posY > lengthSlides || posX2 === 0) {
          isScroll = true;
          allowSwipe = false;
        } else if (posY < lengthSlides) {
          isSwipe = true;
        }
      }
      if (isSwipe) {
        if (slideIndex === 0) {
          if (posInit < posX1) {
            setTransform(transform, 0);
            return;
          } else {
            allowSwipe = true;
          }
        }
        if (slideIndex === lengthSlides) {
          if (posInit > posX1) {
            setTransform(transform, lastTrf);
            return;
          } else {
            allowSwipe = true;
          }
        }
        if (posInit > posX1 && transform < nextTrf || posInit < posX1 && transform > prevTrf) {
          reachEdge();
          return;
        }
        sliderTrack.style.transform = `translate3d(${transform - posX2}px, 0px, 0px)`;
      }
  
    };
    const swipeEnd = function() {
      posFinal = posInit - posX1;
      isScroll = false;
      isSwipe = false;
      document.removeEventListener('touchmove', swipeAction);
      document.removeEventListener('mousemove', swipeAction);
      document.removeEventListener('touchend', swipeEnd);
      document.removeEventListener('mouseup', swipeEnd);
      sliderList.classList.add('grab');
      sliderList.classList.remove('grabbing');
      if (allowSwipe) {
        if (Math.abs(posFinal) > posThreshold) {
          if (posInit < posX1) {
            slideIndex--;
          } else if (posInit > posX1) {
            slideIndex++;
          }
        }
        if (posInit !== posX1) {
          allowSwipe = false;
          slide();
        } else {
          allowSwipe = true;
        }
  
      } else {
        allowSwipe = true;
      }
    };
    const setTransform = function(transform, comapreTransform) {
      if (transform >= comapreTransform) {
        if (transform > comapreTransform) {
          sliderTrack.style.transform = `translate3d(${comapreTransform}px, 0px, 0px)`;
        }
      }
      allowSwipe = false;
    };

const reachEdge = function() {
      transition = false;
      swipeEnd();
      allowSwipe = true;
    };
  sliderTrack.style.transform = 'translate3d(0px, 0px, 0px)';
  sliderList.classList.add('grab');
  sliderTrack.addEventListener('transitionend', () => allowSwipe = true);
  slider.addEventListener('touchstart', swipeStart); 
  slider.addEventListener('mousedown', swipeStart); 
}


  arrows.forEach(item=> {
  item.addEventListener('click', function() {
    let target = event.target;
    if (target.classList.contains('next')) {
      slideIndex++;
    } else if (target.classList.contains('prev')) {
      slideIndex--;
    } else {
      return;
    }
    slide();
  })});



  window.addEventListener('resize', ()=> {
slideWidth = bool ? slider.querySelector('.slider-list').offsetWidth : window.innerWidth;
sliderTrack.style.transform = `translate3d(-${slideIndex * slideWidth}px, 0px, 0px)`;
})



if(!bool) {
document.addEventListener('keydown', function(event) {
 
  if (modal.classList.contains('active')) {
    
      if (event.key === 'ArrowRight') {
          slideIndex++;
          if (slideIndex < slides.length) {
          slide();  
          } else {
            slideIndex--;
          }
      } else if (event.key === 'ArrowLeft') {
          slideIndex--;    
          if (slideIndex > -1) {
            slide();  
            }    else {
              slideIndex++;
            }    
      } else if (event.key === 'Escape') {
        modal.classList.remove('active');
      } else {
        return;
      }
  }
});
}



//это и ниже под условие бул
function makeModalSlider (n) {

  //может в конец?
  //для одного
  makeSlider(slidersModal[i], i, false, n);

  modal.classList.add('active');
  modal.style.backgroundColor = setColor(i);
  document.body.style.overflow = 'hidden';
  slidersModal[i].style.display = 'flex';
  slidersModal[i].querySelector('.slider-track').style.transform = `translate3d(-${n * window.innerWidth}px, 0px, 0px)`;

  const arrows = slidersModal[i].querySelectorAll('.slider-button'),
  prev = arrows[0],
  next = arrows[1];
  prev.classList.toggle('disabled', slideIndex === 0);
  next.classList.toggle('disabled', slideIndex === lengthSlides);
}

const slidesOn = slider.querySelectorAll('.on');
slidesOn.forEach((item,n)=> {


      //item.addEventListener('click', ()=> makeModalSlider(n))
      item.onclick=()=> {
        makeModalSlider(n);
      }

  })
  }



  function setColor(i) {
    if (i < 2) {
      return 'rgba(255, 184, 180, .8)';
    } else if (i > 1 && i < 4) {
      return 'rgba(121,212,211,.8)';
    } else if (i > 3 && i < 6) {
      return 'rgba(94,190,148,.8)';
    } else {
      return 'rgba(255,209,207,.8)';
    }
  }










//замена фото - проверить на талефоне

const avatar = document.querySelector('.change');
avatar.addEventListener('click', ()=> {
  avatar.classList.toggle('change1');
  avatar.classList.toggle('change2');
})








//отправка письма

const form = document.querySelector('#contact-form');
form.addEventListener('submit', ()=>formSend(event));
const error = form.querySelector('.error');
const loading = form.querySelector('.loading');
const ready = form.querySelector('.ready');
const button = form.querySelector('button');

  const userId = 'p7ji1V5uJ3GpXfhhr';
  const serviceId = 'service_bwvhufn';
  const templateId = 'template_k3bpgjz';
  const accessToken = 'uOpqKNdP7xHdjn_4kye8u';





async function formSend(event) {



  event = event || window.event;
  event.preventDefault();


  if (form.querySelector('textarea[name="message"]').value.trim() !== "") {

    loading.style.display = 'block';
    button.style.opacity= '0.5';
    button.style.pointerEvents = 'none';

  const postfields = {
    user_id: userId,
    service_id: serviceId,
    template_id: templateId,
    "template_params": {
        "message": form.querySelector('textarea[name="message"]').value, 
    },
    accessToken,
  };


    
    let response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      body: JSON.stringify(postfields),
      headers: {
          "Content-Type": "application/json; charset=UTF-8"
      }
    });
    if (response.ok) {
      loading.style.display = 'none';
      ready.style.display = 'block';
            setTimeout(() => {
              ready.style.display = 'none';
              button.style.opacity= '1';
              button.style.pointerEvents = 'auto';
      }, "10000");
      form.reset();
    } else {
      loading.style.display = 'none';
      error.style.display = 'block';
 
    }
  } 
}




//кнопка подъема


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
    behavior: 'smooth' // это позволяет прокрутке быть плавной
});
})











































})


