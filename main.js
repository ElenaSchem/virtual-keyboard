import keysLayout from './keysLayout.js'; 

function generateInput() {
    let textarea = document.createElement('textarea');
    textarea.classList.add('text-field');
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

    initilize() {
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
                        keyElement.innerHTML = '<i class = "fas fa-backspace"></i>';
                        keyElement.addEventListener('click', () => {
                            textarea.value = textarea.value.substring(0, textarea.value.length - 1);
                            if (this.properties.shift) {
                                this.properties.shift = false;
                                this.toggleShift();
                            }
                        });
                    break;

                    case 'ShiftLeft':
                        keyElement.classList.add('double', 'dark');
                        keyElement.innerHTML = '<i class = "fas fa-angle-up"></i>';
                        keyElement.addEventListener('click', () => {
                            textarea.focus();
                            this.properties.shift = !this.properties.shift;
                            this.toggleShift();
                        });
                    break;

                    case 'ShiftRight':
                        keyElement.classList.add('dark');
                        keyElement.innerHTML = '<i class = "fas fa-angle-up"></i>';
                        keyElement.addEventListener('click', () => {
                            this.properties.shift = !this.properties.shift;
                            this.toggleShift();
                        });
                    break;

                    case 'Enter':
                        keyElement.classList.add('double', 'dark');
                        keyElement.innerHTML = '<i class = "fas fa-level-down-alt"></i>';
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
                // key.textContent = this.properties.shift ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
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
    keyBoard.initilize();
});

window.addEventListener('keydown', (el) => {
    const keyobj = document.querySelector(`[data-key="${el.code}"]`);
    if (keyobj) {
        keyobj.classList.add('highlighted');
    }
    if (el.code === 'ShiftLeft' || el.code === 'ControlLeft') {
        switchKey[el.code] = true;
    }
});

window.addEventListener('keyup', (el) => {
    const keyobj = document.querySelector(`[data-key="${el.code}"]`);
    if (keyobj) {
        keyobj.classList.remove('highlighted');
    }
    if (el.code === 'ShiftLeft' || el.code === 'ControlLeft') {
        switchKey[el.code] = false;
    }
});