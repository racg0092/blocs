


/**
 * ## Listens for mode Change
 * Watches the body element for a mode attribute when value is dark changes all the components to 
 * dark mode otherwise to light mode
 */
class ThemeWatcher {
    static instance: ThemeWatcher;
    funcs: Array<(theme: string) => void> = [];

    constructor() {
        if(ThemeWatcher.instance === undefined) {
            ThemeWatcher.instance = this;
            this.watcher();
            return ThemeWatcher.instance;
        }

        return ThemeWatcher.instance;
    }


    watcher() {
        const targetNode = document.body;
        const observer = new MutationObserver((list, observer ) => {
            for(let mutation of list) {
                if(mutation.type === 'attributes' && mutation.attributeName === 'mode') {
                    for(let func of this.funcs) {
                        func(targetNode.getAttribute('mode'));
                    }
                }
            }
        })
        observer.observe(targetNode, {attributes: true});
    }


}





export const theme_watcher = new ThemeWatcher();