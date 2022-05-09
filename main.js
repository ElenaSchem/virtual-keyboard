import keysLayout from './keysLayout.js'; 

document.body.innerHTML = `
    <h1 class="title">Virtual Keyboard</h1>
    <p class="hint">Use left <kbd>Ctrl</kbd> + <kbd>Shift</kbd> to switch language</kbd></p>
`;

let textarea;

function generateInput() {
    textarea = document.createElement('textarea');
    textarea.classList.add('text-area');
    textarea.setAttribute('placeholder', 'Start type something...');
    textarea.setAttribute('cols', '100');
    textarea.setAttribute('rows', '10');
    document.body.appendChild(textarea);
}

const switchKey = {
    ShiftLeft: false,
    ControlLeft: false,
};

const keyBoard = {
    elements: {
        main: null,
        keys: [],
    },

    properties: {
        value: '',
        capslock: false,
        shift: false,
        lang: localStorage.getItem('lang') || 'eng',
        lastCaretPos: 0,
    },

    init() {
        localStorage.setItem('isRus', this.properties.isRus);
        this.elements.main = document.createElement('div');
        this.elements.main.classList.add('keyboard');
        this.elements.main.appendChild(this.createKeys());
        this.elements.keys = this.elements.main.querySelectorAll('.key');
        document.body.appendChild(this.elements.main);
    },

    createKeys() {
        const fragment = document.createDocumentFragment();
        keysLayout.forEach((line) => {
            const row = document.createElement('div');
            row.classList.add('keyboard-row');

            line.forEach((key) => {
                const keyElement = document.createElement('button');
                keyElement.setAttribute('type', 'button');
                keyElement.setAttribute('data-key', `${key.code}`);
                keyElement.classList.add('key');

                switch (key.code) {
                    case 'Backspace':
                        keyElement.classList.add('backspace', 'dark');
                        keyElement.innerHTML = '<span>Backspace</span><i class = "fas fa-backspace"></i>';
                        keyElement.addEventListener('click', () => {
                            textarea.value = textarea.value.substring(0, textarea.value.length - 1);
                            if (this.properties.shift) {
                                this.properties.shift = false;
                                this.toggleShift();
                            }
                        });
                    break;

                    case 'Delete':
                        keyElement.classList.add('del', 'dark');
                        keyElement.innerHTML = '<span>Del</span>';
                        keyElement.addEventListener('click', () => {
                            textarea.value = textarea.value.substring(0, textarea.value.length - 1);
                            if (this.properties.shift) {
                                this.properties.shift = false;
                                this.toggleShift();
                            }
                        });
                    break;

                    case 'ShiftLeft':
                        keyElement.classList.add('shift', 'dark');
                        keyElement.innerHTML = '<span>Shift</span><i class = "fas fa-angle-up"></i>';
                        keyElement.addEventListener('click', () => {
                            textarea.focus();
                            this.properties.shift = !this.properties.shift;
                            this.toggleShift();
                        });
                    break;

                    case 'ShiftRight':
                        keyElement.classList.add('shift', 'dark');
                        keyElement.innerHTML = '<span>Shift</span><i class = "fas fa-angle-up"></i>';
                        keyElement.addEventListener('click', () => {
                            this.properties.shift = !this.properties.shift;
                            this.toggleShift();
                        });
                    break;

                    case 'Enter':
                        keyElement.classList.add('enter', 'dark');
                        keyElement.innerHTML = '<span>Enter</span>';
                        keyElement.addEventListener('click', () => {
                            const idx = this.getCaretPosition();
                            this.properties.lastCaretPos = idx + 1;
                            textarea.value = `${textarea.value.slice(0, idx)}\n${textarea.value.slice(idx)}`;
                            if (this.properties.shift) {
                                this.properties.shift = false;
                                this.toggleShift();
                            }
                            this.setCaretPosition(this.properties.lastCaretPos);
                        });
                    break;

                    case 'Tab':
                        keyElement.classList.add('tab', 'dark');
                        keyElement.innerHTML = '<span>Tab</span>';
                        keyElement.addEventListener('click', () => {
                            const idx = this.getCaretPosition();
                            this.properties.lastCaretPos = idx + 4;
                            textarea.value = `${textarea.value.slice(0, idx)}    ${textarea.value.slice(idx)}`;
                            if (this.properties.shift) {
                                this.properties.shift = false;
                                this.toggleShift();
                            }
                            this.setCaretPosition(this.properties.lastCaretPos);
                        });
                    break;

                    case 'ControlLeft':
                    case 'ControlRight':
                        keyElement.classList.add('ctrl', 'dark');
                        keyElement.innerHTML = '<span>Ctrl</span>';
                        keyElement.addEventListener('click', () => {
                            if (this.properties.shift) {
                                this.properties.shift = false;
                                this.toggleShift();
                            }
                        });
                    break;

                    case 'AltLeft':
                    case 'AltRight':
                        keyElement.classList.add('dark');
                        keyElement.innerHTML = '<span>Alt</span>';
                        keyElement.addEventListener('click', (event) => {
                            event.preventDefault();
                            if (this.properties.shift) {
                                this.properties.shift = false;
                                this.toggleShift();
                            }
                        });
                    break;

                    case 'Space':
                        keyElement.classList.add('space');
                        keyElement.addEventListener('click', () => {
                            const idx = this.getCaretPosition();
                            this.properties.lastCaretPos = idx + 1;
                            textarea.value = `${textarea.value.slice(0, idx)} ${textarea.value.slice(idx)}`;
                            if (this.properties.shift) {
                                this.properties.shift = false;
                                this.toggleShift();
                            }
                            this.setCaretPosition(this.properties.lastCaretPos);
                        });
                    break;

                    case 'MetaLeft':
                        keyElement.classList.add('dark');
                        keyElement.innerHTML = '<i class="fab fa-windows"></i>';
                        keyElement.addEventListener('click', () => {
                            if (this.properties.shift) {
                                this.properties.shift = false;
                                this.toggleShift();
                            }
                        });
                    break;

                    case 'CapsLock':
                        keyElement.classList.add('double', 'dark');
                        keyElement.innerHTML = '<span>Caps Lock</span>';
                        keyElement.addEventListener('click', () => {
                            textarea.focus();
                            this.toggleCapsLock();
                            if (this.properties.shift) {
                                this.properties.shift = false;
                                this.toggleShift();
                            }
                        });
                    break;

                    case 'ArrowUp':
                        keyElement.classList.add('dark');
                        keyElement.innerHTML = '<i class="fas fa-arrow-up"></i>';
                        keyElement.addEventListener('click', () => {
                            if (this.properties.shift) {
                                this.properties.shift = false;
                                this.toggleShift();
                            }
                            // const 
                        });
                    break;

                    case 'ArrowLeft':
                        keyElement.classList.add('dark');
                        keyElement.innerHTML = '<i class="fas fa-arrow-left"></i>';
                        keyElement.addEventListener('click', () => {
                            if (this.properties.shift) {
                                this.properties.shift = false;
                                this.toggleShift();
                            }
                            // const 
                        });
                    break;

                    case 'ArrowDown':
                        keyElement.classList.add('dark');
                        keyElement.innerHTML = '<i class="fas fa-arrow-down"></i>';
                        keyElement.addEventListener('click', () => {
                            if (this.properties.shift) {
                                this.properties.shift = false;
                                this.toggleShift();
                            }
                            // const 
                        });
                    break;

                    case 'ArrowRight':
                        keyElement.classList.add('dark');
                        keyElement.innerHTML = '<i class="fas fa-arrow-right"></i>';
                        keyElement.addEventListener('click', () => {
                            if (this.properties.shift) {
                                this.properties.shift = false;
                                this.toggleShift();
                            }
                            // const 
                        });
                    break;

                    default:
                        const keyValue = this.properties.lang === 'rus' ? key.value2 : key.value1;
                        keyElement.textContent = keyValue;
                        keyElement.addEventListener('click', () => {
                            const idx = this.getCaretPosition();
                            this.properties.lastCaretPos = idx + 1;
                            if (this.properties.capslock || this.properties.shift) {
                                textarea.value = textarea.value.slice(0, idx) + keyElement.textContent.toUpperCase() + textarea.value.slice(idx);
                            } else {
                                textarea.value = textarea.value.slice(0, idx) + keyElement.textContent.toLowerCase() + textarea.value.slice(idx);
                            }
                            if (this.properties.shift) {
                                this.properties.shift = false;
                                this.toggleShift();
                            }
                            this.setCaretPosition(this.properties.lastCaretPos);
                        });
                    break;
                }

                row.appendChild(keyElement);
            });
            fragment.appendChild(row);
        });
        return fragment;
    },

    toggleShift() {
        const flatKeys = keysLayout.reduce((prev, item) => prev.concat(item), []);
        this.elements.keys.forEach((key) => {
            if (key.childElementCount === 0) {
                const idx = flatKeys.findIndex((el) => el.code === key.dataset.key);
                if (this.properties.lang === 'rus') {
                    if (this.properties.shift) {
                        key.textContent = flatKeys[idx].alt2;
                    } else {
                        key.textContent = flatKeys[idx].value2;
                    }
                } else if (this.properties.shift) {
                    key.textContent = flatKeys[idx].alt1;
                } else {
                    key.textContent = flatKeys[idx].value1;
                }
            }
        });
    },

    toggleCapsLock() {
        this.properties.capslock = !this.properties.capslock;
        this.elements.keys.forEach((key) => {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capslock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        });
    },

    languageChange() {
        this.properties.isRus = !this.properties.isRus;
        if (this.properties.lang === 'rus') this.properties.lang = 'eng';
        else this.properties.lang = 'rus';
        localStorage.removeItem('isRus');
        localStorage.setItem('isRus', this.properties.isRus);
        localStorage.setItem('lang', this.properties.lang);
        const flatKeys = keysLayout.reduce((prev, item) => prev.concat(item), []);
        this.elements.keys.forEach((key) => {
            if (key.childElementCount === 0) {
                const idx = flatKeys.findIndex((el) => el.code === key.dataset.key);
                key.textContent = this.properties.lang === 'rus' ? flatKeys[idx].value2 : flatKeys[idx].value1;
            }
        });
    },

    getCaretPosition() {
        return textarea.selectionStart;
    },

    setCaretPosition(position) {
        textarea.focus();
        textarea.setSelectionRange(position, position);
    },
};

window.addEventListener('DOMContentLoaded', () => {
    generateInput();
    keyBoard.init();
});

window.addEventListener('keydown', (el) => {
    const keyobj = document.querySelector(`[data-key="${el.code}"]`);
    if (keyobj) keyobj.classList.add('highlighted');
    if (el.code === 'ShiftLeft' || el.code === 'ControlLeft') switchKey[el.code] = true;
    if (Object.values(switchKey).every((el) => el === true)) keyBoard.languageChange();
});

window.addEventListener('keyup', (el) => {
    const keyobj = document.querySelector(`[data-key="${el.code}"]`);
    if (keyobj) keyobj.classList.remove('highlighted');
    if (el.code === 'ShiftLeft' || el.code === 'ControlLeft') switchKey[el.code] = false;
    if (el.code === 'CapsLock') keyBoard.toggleCapsLock();
});