const eventCode = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace', 'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter', 'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ControlLeft', 'AltLeft', 'MetaLeft', 'Space', 'MetaRight', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight'];

const eventKeyEng = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '|', 'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter', 'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '▲', 'Ctr', 'Alt', 'Meta', ' ', 'Meta', 'Alt', '◄', '▼', '►'];

const eventKeyRus = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=',
  'Backspace', 'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'ё', 'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter', 'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '/', '▲', 'Ctr', 'Alt', 'Meta', ' ', 'Meta', 'Alt', '◄', '▼', '►'];

// final key array
const keyOnInput = [];


// create textarea
const textarea = document.createElement('textarea');
// create description below keyboard
const description = document.createElement('div');
description.classList.add('description');
const p1 = document.createElement('p');
p1.textContent = 'Created on MacOS';
const p2 = document.createElement('p');
p2.textContent = 'Language change: Сtr + Shift';
description.append(p1, p2);
document.body.append(description);

// add keys from array to html markup

function addAllKeys(arr, arr1) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const button = document.createElement('button');
    button.classList.add('keyboard__key');
    button.setAttribute('data', arr[i]);
    if (button.getAttribute('data') === 'Space') {
      button.classList.add('keyboard__key-wide');
    } else if (button.getAttribute('data') === 'ShiftLeft' || button.getAttribute('data') === 'Enter' || button.getAttribute('data') === 'Backspace' || button.getAttribute('data') === 'Tab' || arr[i] === 'ArrowUp') {
      button.classList.add('keyboard__key-middle');
    } else if (button.getAttribute('data') === 'CapsLock') {
      button.classList.add('keyboard__key-short');
    }
    button.textContent = arr1[i];
    result.push(button);
  }
  return result;
}

// init function: create keyboard, add keys from html markup key and add to document

function init() {
  textarea.classList.add('textarea');

  const keyboard = document.createElement('div');
  keyboard.classList.add('keyboard');

  const keyboardKeys = document.createElement('div');
  keyboardKeys.classList.add('keyboard__keys');

  keyboard.append(keyboardKeys);
  keyboardKeys.append(...addAllKeys(eventCode, eventKeyEng));

  document.body.append(textarea);
  document.body.append(keyboard);
}

// listen for key press function and add key to textarea

function listenKeyPress() {
  document.addEventListener('keypress', (event) => {
    // add Enter for key down
    if (event.code === 'Enter') {
      textarea.value += '\n';
    } else {
      // add all else key

      const key = document.querySelector(`.keyboard__key[data="${event.code}"]`);
      keyOnInput.push(key.textContent);
      textarea.value += keyOnInput[keyOnInput.length - 1];
    }
  });
}

// listen for click on keyboard and add key to textarea

function listenClick() {
  document.querySelectorAll('.keyboard__key').forEach((el) => {
    el.addEventListener('click', (event) => {
      // listen for delete
      if (event.target.textContent === 'Backspace') {
        keyOnInput.pop();
        textarea.value = textarea.value.slice(0, -1);
      } else if (event.target.textContent === 'Ctr' || event.target.textContent === 'Alt' || event.target.textContent === 'Meta' || event.target.textContent === 'Shift') {
        return false;
      } else if (event.target.textContent === 'Enter') {
        enterClick();
      } else if (event.target.textContent === 'Tab') {
        event.preventDefault();
        keyOnInput.push(' ', ' ');
        textarea.value += '  ';
      } else if (event.target.textContent === 'CapsLock') {
        capsLock();
      } else {
        keyOnInput.push(event.target.textContent);
        textarea.value += keyOnInput[keyOnInput.length - 1];
      }
    });
  });
}

// Enter click event

function enterClick() {
  textarea.value += '\n';
}

// click event for CapsLock

let isCapsLock = false;

function capsLock() {
  if (!isCapsLock) {
    document.querySelectorAll('.keyboard__key').forEach((el) => {
      if (el.textContent.length === 1) {
        el.textContent = el.textContent.toUpperCase();
      }
    });
    isCapsLock = true;
  } else {
    document.querySelectorAll('.keyboard__key').forEach((el) => {
      if (el.textContent.length === 1) {
        el.textContent = el.textContent.toLowerCase();
      }
    });
    isCapsLock = false;
  }
}


// add active class on key down and add CapsLock event

function activeClassKeyDown() {
  document.addEventListener('keydown', (event) => {
    // remove active class everywhere
    document.querySelectorAll('button').forEach((e) => {
      e.classList.remove('active');
    });
    // add active class on keydown
    document.querySelector(`.keyboard__key[data="${event.code}"]`).classList.add('active');

    // remove key from keyboard on keydown
    if (event.code === 'Backspace') {
      keyOnInput.pop();
      textarea.value = textarea.value.slice(0, -1);
    }

    if (event.code === 'Tab') {
      event.preventDefault();
      keyOnInput.push(' ', ' ');
      textarea.value += '  ';
    }

    // add CapsLock for key down
    if (event.code === 'CapsLock') {
      capsLock();
    }

    // add key down for arrown to see in textarea
    if (event.code === 'ArrowLeft') {
      keyOnInput.push('◄');
      textarea.value += '◄';
    }
    if (event.code === 'ArrowDown') {
      keyOnInput.push('▼');
      textarea.value += '▼';
    }
    if (event.code === 'ArrowRight') {
      keyOnInput.push('►');
      textarea.value += '►';
    }
    if (event.code === 'ArrowUp') {
      keyOnInput.push('▲');
      textarea.value += '▲';
    }

    // changing language on keydown (pressed is outer variable)
    pressed.push(event.code);
    for (let i = 0; i < pressed.length; i++) {
      if (pressed[i] === 'ControlLeft' && pressed[i + 1] === 'ShiftLeft') {
        changeLanguageOuter();
      }
    }
  });
}


// remove active class on key up

function activeClassKeyUp() {
  document.addEventListener('keyup', () => {
    // remove active class everywhere
    document.querySelectorAll('button').forEach((e) => {
      e.classList.remove('active');
    });
  });
}


// change language on load what language was before

function langOnLoad() {
  if (localStorage.getItem('isEng') === 'true') {
    changeToEng();
  } else if (localStorage.getItem('isEng') === 'false') {
    changeToRus();
  }
}


// changing language functions: working with control + shift

const pressed = [];
let isEng = true;

function changeLanguageOuter() {
  if (!isEng) {
    isEng = true;
    localStorage.setItem('isEng', isEng);
    changeToEng();
  } else {
    isEng = false;
    localStorage.setItem('isEng', isEng);
    changeToRus();
  }
}

function changeToRus() {
  document.querySelectorAll('.keyboard__key').forEach((el, i) => {
    el.textContent = eventKeyRus[i];
  });
  pressed.length = 0;
}

function changeToEng() {
  document.querySelectorAll('.keyboard__key').forEach((el, i) => {
    el.textContent = eventKeyEng[i];
  });
  pressed.length = 0;
}

// function langFromStorage(){
//   localStorage.setItem('isEng', isEng);
// }


// window listener

window.addEventListener('load', () => {
  init();
  listenKeyPress();
  listenClick();
  activeClassKeyDown();
  activeClassKeyUp();
  langOnLoad();
});
