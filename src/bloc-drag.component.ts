


type attr = 'drag' | 'resize';

class DragRiseze extends HTMLElement {
    #template = document.createElement('template');
    #innerHTML = `
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
    `
    container: HTMLDivElement;
    content: HTMLDivElement;

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.#template.innerHTML = this.#innerHTML;
        this.shadowRoot.append(this.#template.content.cloneNode(true));
    }


    static get observedAttributes() {
        return ['drag', 'resize']
    }

    attributeChangedCallback(name: attr, ov: string, nv: string) {
        setTimeout(() => {
            switch(name) {
                case 'drag':
                    this.draggableFunc();
                    break;
                case 'resize':
                    this.resizableFunc();
                    break;
            }
        }, 500)
    }

    connectedCallback() {
        this.container = this.shadowRoot.querySelector('.container');
        this.content = this.shadowRoot.querySelector('.content');


        this.contentEvents();
    }


    draggableFunc() {
        let xOffset, yOffset;
        const that = this;
        this.content.addEventListener('mousedown', setDragging)
        
        function setDragging(evt: MouseEvent) {
            evt.stopPropagation();
            const rect = that.content.getBoundingClientRect();
            xOffset = evt.clientX - rect.left;
            yOffset = evt.clientY - rect.top;         
            
            document.addEventListener('mousemove', dragging)
            document.addEventListener('mouseup', stopDragging)
        }
        
        function dragging(evt: MouseEvent) {
            evt.stopPropagation()
            const x = evt.clientX - xOffset;
            const y = evt.clientY - yOffset;
            that.container.style.top = `${y}px`;
            that.container.style.left = `${x}px`;
        }

        function stopDragging() {
            document.removeEventListener('mousemove', dragging)
        }
    }

    contentEvents() {
        this.content.addEventListener('mouseenter', () => {
            this.container.style.padding = ".3rem";
        })
        this.container.addEventListener('mouseleave', () => {
            this.container.style.padding = "0";
        })
    }


    //todo: make optional
    resizableFunc() {
        let startW, startH, startX, startY;
        const that = this;
        const div = this.firstElementChild as HTMLElement;


        this.container.addEventListener('mousedown', setResize);
        
        function setResize(evt: MouseEvent) {
            startX = evt.clientX;
            startY = evt.clientY;
            const styles = getComputedStyle(that.container);
            startW = parseInt(styles.width, 10);
            startH = parseInt(styles.height,  10);

            document.addEventListener('mousemove', resize);
            document.addEventListener('mouseup', stopResize);
        }

        function resize(evt: MouseEvent) {
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



if(!customElements.get('bloc-drag')) {
    customElements.define('bloc-drag', DragRiseze);
}