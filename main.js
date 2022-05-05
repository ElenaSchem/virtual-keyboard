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
                            };
                            this.setCaretPosition(this.properties.lastCaretPos);
                        });
                    break;


                }
            })
        });

        // toggleShift() {

        // }
    }
};
