const keys = [
  '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
  'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '|',
  'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '"', 'Enter',
  'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '▲',
  'Ctr', 'Opt', 'Cmd', 'Space', 'Cmd', 'Opt', '◄', '▼', '►',
];

const keysBrake = ['Backspace', '|', 'Enter', '▲'];


function addAllKeys(arr) {
  const keysArray = [];
  for (let i = 0; i < arr.length; i++) {
    const br = document.createElement('br');
    const button = document.createElement('button');
    button.classList.add('keyboard__key');
    if (arr[i] === 'Space') {
      button.classList.add('keyboard__key-wide');
    } else if (arr[i] === 'Shift' || arr[i] === 'Enter' || arr[i] === 'Backspace' || arr[i] === 'Tab' || arr[i] === '▲') {
      button.classList.add('keyboard__key-middle');
    } else if (arr[i] === 'CapsLock') {
      button.classList.add('keyboard__key-short');
    }
    button.textContent = arr[i];
    keysArray.push(button);
    if (keysBrake.indexOf(arr[i]) !== -1) {
      keysArray.push(br);
    }
  }
  return keysArray;
}

function init() {
  const textarea = document.createElement('textarea');
  textarea.classList.add('textarea');

  const keyboard = document.createElement('div');
  keyboard.classList.add('keyboard');

  const keyboardKeys = document.createElement('div');
  keyboardKeys.classList.add('keyboard__keys');

  keyboard.append(keyboardKeys);
  keyboardKeys.append(...addAllKeys(keys));

  document.body.append(textarea);
  document.body.append(keyboard);
}


window.addEventListener('load', () => {
  init();
});
