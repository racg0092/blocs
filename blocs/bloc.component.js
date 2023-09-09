var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Bloc_template, _Bloc_innerHTML;
class Bloc extends HTMLElement {
    constructor() {
        super();
        _Bloc_template.set(this, document.createElement('template'));
        _Bloc_innerHTML.set(this, `
        <style>
            .container {
                position: absolute;
                background: linear-gradient(to right, #cc99ff, #cc66ff);
                cursor: nw-resize;
                border-radius: 5px;
                transition: padding ease-in-out .100s;
                padding: 0;
            }

            .content {
                cursor: default;
                width: 100%;
                height: 100%;
            }
        </style>
        <div class="container">
            <div class="content">
                <slot></slot>
            </div>
        </div>        
    `);
        this.attachShadow({ mode: 'open' });
        __classPrivateFieldGet(this, _Bloc_template, "f").innerHTML = __classPrivateFieldGet(this, _Bloc_innerHTML, "f");
        this.shadowRoot.append(__classPrivateFieldGet(this, _Bloc_template, "f").content.cloneNode(true));
    }
    static get observedAttributes() {
        return ['drag', 'resize'];
    }
    attributeChangedCallback(name, ov, nv) {
        setTimeout(() => {
            switch (name) {
                case 'drag':
                    this.draggableFunc();
                    break;
                case 'resize':
                    this.resizableFunc();
                    break;
            }
        }, 500);
    }
    connectedCallback() {
        this.container = this.shadowRoot.querySelector('.container');
        this.content = this.shadowRoot.querySelector('.content');
        this.contentEvents();
    }
    draggableFunc() {
        let xOffset, yOffset;
        const that = this;
        this.content.addEventListener('mousedown', setDragging);
        function setDragging(evt) {
            evt.stopPropagation();
            const rect = that.content.getBoundingClientRect();
            xOffset = evt.clientX - rect.left;
            yOffset = evt.clientY - rect.top;
            document.addEventListener('mousemove', dragging);
            document.addEventListener('mouseup', stopDragging);
        }
        function dragging(evt) {
            evt.stopPropagation();
            const x = evt.clientX - xOffset;
            const y = evt.clientY - yOffset;
            that.container.style.top = `${y}px`;
            that.container.style.left = `${x}px`;
        }
        function stopDragging() {
            document.removeEventListener('mousemove', dragging);
        }
    }
    contentEvents() {
        this.content.addEventListener('mouseenter', () => {
            this.container.style.padding = ".3rem";
        });
        this.container.addEventListener('mouseleave', () => {
            this.container.style.padding = "0";
        });
    }
    resizableFunc() {
        let startW, startH, startX, startY;
        const that = this;
        const div = this.firstElementChild;
        this.container.addEventListener('mousedown', setResize);
        function setResize(evt) {
            startX = evt.clientX;
            startY = evt.clientY;
            const styles = getComputedStyle(that.container);
            startW = parseInt(styles.width, 10);
            startH = parseInt(styles.height, 10);
            document.addEventListener('mousemove', resize);
            document.addEventListener('mouseup', stopResize);
        }
        function resize(evt) {
            const w = startW + (evt.clientX - startX);
            const h = startH + (evt.clientY - startY);
            that.container.style.width = `${w}px`;
            that.container.style.height = `${h}px`;
            div.style.width = `${w}px`;
            div.style.height = `${h}px`;
        }
        function stopResize() {
            document.removeEventListener('mousemove', resize);
        }
    }
}
_Bloc_template = new WeakMap(), _Bloc_innerHTML = new WeakMap();
if (!customElements.get('bloc-wc')) {
    customElements.define('bloc-wc', Bloc);
}
