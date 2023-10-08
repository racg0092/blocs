
function addColorValues() {
    document.body.style.setProperty("--nord0", "#2E3440")
    document.body.style.setProperty("--nord1", "#3B4252")
    document.body.style.setProperty("--nord2", "#434c5e")
    document.body.style.setProperty("--nord3", "#4C566A")
    document.body.style.setProperty("--nord4", "#ECEFF4")
    document.body.style.setProperty("--nord5", "#E5E9F0")
    document.body.style.setProperty("--nord6", "#D8DEE9")
}


addColorValues();



import './bloc-drag.component';
import './top-menu.component';
import './side-menu.component'
import './top-side-menu.component'
import  { PopUp } from  './pop-up.component';


const popup = PopUp.open("Hello World", 'c-bottom')

