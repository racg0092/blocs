import { SideMenu } from './side-menu.component';
import { TopMenu } from './top-menu.component';



export class TopSideMenus extends HTMLElement {
    #template = document.createElement("template");
    #html =  `
        <bloc-top-menu>
            <slot name="top-menu"></slot>
        </bloc-top-menu>
        <bloc-side-menu>
            <slot name="side-menu"></slot>
        </bloc-side-menu>
    `
    

    constructor() {
        super();
        this.attachShadow({mode:'open'});
        this.#template.innerHTML = this.#html;
        this.shadowRoot.append(this.#template.content.cloneNode(true));
    }

    connectedCallback() {
        this.adjustMenuPositions();
    }

    adjustMenuPositions() {
        const top = this.shadowRoot.querySelector('bloc-top-menu') as TopMenu;
        const side = this.shadowRoot.querySelector('bloc-side-menu') as SideMenu;
        const {height, bottom } = top.getBoundingClientRect();
        side.style.height = `${window.innerHeight-height}px`;
        side.style.top = `${bottom}px`;
    }

}



if(customElements.get("bloc-ts-menus") === undefined) {
    customElements.define("bloc-ts-menus", TopSideMenus);
}