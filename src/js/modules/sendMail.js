function sendMail() {
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
}

export default sendMail;