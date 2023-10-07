import { theme_watcher } from './utils/events.utils';


class TopMenu extends HTMLElement  {
    #template = document.createElement('template');
    #html = `
        <style> 
            :host {
                --nord0: #2E3440;
                --nord1: #3B4252;
                --nord2: #434c5e;
                --nord3: #4C566A;
                --nord4: #ECEFF4;
                --nord5: #E5E9F0;
                --nord6: #D8DEE9;
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
        console.log('online')
        

        theme_watcher.funcs.push((theme) => this.onModeChange(theme));
    }


    onModeChange(theme: string) {
        this.setAttribute('mode', theme);
    }

}



if(customElements.get('bloc-top-menu') === undefined) {
    customElements.define('bloc-top-menu', TopMenu)
}