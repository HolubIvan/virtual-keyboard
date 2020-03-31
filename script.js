const eventCode = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace', 'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter', 'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ControlLeft', 'AltLeft', 'MetaLeft', 'Space', 'MetaRight', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight'];

const eventKeyEng = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '|', 'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter', 'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '▲', 'Ctr', 'Alt', 'Meta', ' ', 'Meta', 'Alt', '◄', '▼', '►'];

const eventKeyRus = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=',
  'Backspace', 'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'ё', 'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter', 'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '/', '▲', 'Ctr', 'Alt', 'Meta', ' ', 'Meta', 'Alt', '◄', '▼', '►'];

// final key array
const keyOnInput = [];

const textarea = document.createElement('textarea');

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
    keyOnInput.push(event.key);
    textarea.value += keyOnInput[keyOnInput.length - 1];
  });
}

// listen for click on keyboard and add key to textarea

function listenClick() {
  document.addEventListener('click', (event) => {

    // listen for delete
    if (event.target.textContent === 'Backspace') {
      keyOnInput.pop();
      textarea.value = keyOnInput.join('');
    } else if (event.target.textContent === 'Ctr' || event.target.textContent === 'Alt' || event.target.textContent === 'Meta' || event.target.textContent === 'Tab' || event.target.textContent === 'Shift' || event.target.textContent === 'Enter' || event.target.textContent === 'CapsLock') {
      return false;
    } else {
      keyOnInput.push(event.target.textContent);
      textarea.value += keyOnInput[keyOnInput.length - 1];
    }
  });

  // document.querySelector('[data="CapsLock"]').addEventListener('click', (event) => {

  // });
}


// add active class on key down
function activeClassKeyDown() {
  document.addEventListener('keydown', (event) => {
    document.querySelectorAll('button').forEach((e) => {
      e.classList.remove('active');
    });
    document.querySelector(`.keyboard__key[data="${event.code}"]`).classList.add('active');
  });
}

// remove active class on key up

function activeClassKeyUp() {
  document.addEventListener('keyup', () => {
    document.querySelectorAll('button').forEach((e) => {
      e.classList.remove('active');
    });
  });
}


window.addEventListener('load', () => {
  init();
  listenKeyPress();
  listenClick();
  activeClassKeyDown();
  activeClassKeyUp();
});
