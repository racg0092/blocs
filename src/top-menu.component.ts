import { theme_watcher } from './utils/events.utils';


export class TopMenu extends HTMLElement  {
    #template = document.createElement('template');
    #html = `
        <style> 
            :host {
                position: var(--position, absolute);
                top: 0;
                left:0;
                width: 100vw;
                min-height: 2vh;
                display: flex;
                flex-flow: row nowrap;
                gap: .7rem;
                align-items: baseline;
                background-color: var(--nord5);
                color: var(--nord1);
            }

            :host([mode=dark]) {
                background-color: var(--nord2);
                color: var(--nord5);
            }

            :host([mode=light]) {
                background-color: var(--nord5);
                color: var(--nord1);
            }

            ::slotted(*:nth-child(1)) {
                padding-left: var(--left-pad, .5rem);
            }

            ::slotted(*) {
                cursor: pointer;
            }
        </style>
        <slot></slot>
    `

    constructor() {
        super();
        this.attachShadow({mode:'open'})
        this.#template.innerHTML = this.#html;
        this.shadowRoot.append(this.#template.content.cloneNode(true));
    }


    connectedCallback() {
        theme_watcher.funcs.push((theme) => this.onModeChange(theme));
    }


    onModeChange(theme: string) {
        this.setAttribute('mode', theme);
    }

}



if(customElements.get('bloc-top-menu') === undefined) {
    customElements.define('bloc-top-menu', TopMenu)
}