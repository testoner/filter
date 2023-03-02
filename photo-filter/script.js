const inputs = document.querySelectorAll('.filters input')
const root = document.querySelector(':root')
const canvas = document.querySelector('canvas');
const btn = document.querySelector('.btn-next');
const ctx = canvas.getContext("2d");
const filters = document.querySelector('.filters')

/*Filter*/
function handleUpdate(event) {
  const suffix = event.target.dataset.sizing;
  const input = event.target;
  if (event.target.matches('input')) {
    const root = document.querySelector(':root');
    root.style.setProperty(`--${input.name}`, input.value + suffix);
    input.nextElementSibling.value = input.value;
  }
}
filters.addEventListener('input', handleUpdate);
/*Active*/
const button = document.querySelector('.btn-container');
const label = document.querySelector('label[for=btnInput]');
const buttons = document.querySelectorAll('.btn');
button.addEventListener('click', (event) => {
  if (event.target.classList.contains('btn')) {
    label.addEventListener('click', () => {
      label.classList.add('btn-active');
      event.target.classList.remove('btn-active')
    });
    buttons.forEach((el) => {
      if (el.classList.contains('btn-active')) {
        el.classList.remove('btn-active');
      }
    });
    event.target.classList.add('btn-active');
    label.classList.remove('btn-active');
  }
});
/*Reset*/
const reset = document.querySelector('.btn-reset')
reset.addEventListener('click', () => {
  inputs.forEach(input => {
    const suffix = input.dataset.sizing;
    if (input.name == 'saturate') { input.value = 100 } else { input.value = 0 }
    input.nextElementSibling.value = input.value;
    root.style.removeProperty(`--${input.name}`, input.value + suffix);
  });
});
/*Next*/
let folder = '';
const hours = new Date().getHours();
switch (true) {
  case (hours >= 6 && hours < 12):
    folder = "morning";
    break;
  case (hours >= 12 && hours < 18):
    folder = "day";
    break;
  case (hours >= 18 && hours < 24):
    folder = "evening";
    break;
  case (hours >= 0 && hours < 6):
    folder = "night";
    break;
}
const base = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${folder}/`;
const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
let i = 0;
function paintImage(src) {
  const img = new Image();
  img.setAttribute('crossOrigin', 'anonymous');
  img.src = src;
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
  };
}

function nextPicture() {
  const index = i % images.length;
  const imageSrc = base + images[index];
  paintImage(imageSrc);
  i++;
}

paintImage(base + images[0]);
btn.addEventListener('click', nextPicture);



/*Load*/
const fileInput = document.querySelector('input[type="file"]');
const imageContainer = document.querySelector('.image-container');

fileInput.addEventListener('change', function (e) {
  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.setAttribute('crossOrigin', 'anonymous');
    img.src = reader.result;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
    };
    fileInput.value = '';
  }
  reader.readAsDataURL(file);
});



/*Download*/
const download = document.querySelector('.btn-save');

download.addEventListener('click', function (e) {

  const img = new Image();
  img.src = canvas.toDataURL();
  img.onload = function () {
    ctx.filter = `blur(${1.8 * inputs[0].value}px) invert(${inputs[1].value}%) sepia(${inputs[2].value}%) saturate(${inputs[3].value}%) hue-rotate(${inputs[4].value}deg)`;
    ctx.drawImage(img, 0, 0);
    let link = document.createElement('a');
    link.download = 'download.png';
    link.href = canvas.toDataURL();
    link.click();
    link.delete;
    ctx.filter = 'none';
    ctx.drawImage(img, 0, 0);
  }
});





//fullScreen
document.querySelector('.fullscreen').addEventListener('click', fullscreen);
function fullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}