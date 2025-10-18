import recipeView from "./recipeView.js";
import View from "./view.js";
import icons from 'url:../../img/icons.svg'

class AddRecipeView extends View {
    
    _window = document.querySelector('.add-recipe-window')
    _parentEl = document.querySelector('.upload ')
    _message = 'Recipe was successfully uploaded'
    _overlay = document.querySelector('.overlay')
    _btn = document.querySelector('.nav__btn--add-recipe')
    _closeBtn = document.querySelector('.btn--close-modal')

    
    constructor() {
        super() ;
        this._addHandlerShowform();
        this._addHnadlerHideForm();
        
        }

    toggleWindow() {
        this._window.classList.toggle('hidden')
        this._overlay.classList.toggle('hidden');
    }

    _addHandlerShowform() {
        this._btn.addEventListener('click' , this.toggleWindow.bind(this))
    }
    _addHnadlerHideForm() {
        this._closeBtn.addEventListener('click',this.toggleWindow.bind(this))
        this._overlay.addEventListener('click',this.toggleWindow.bind(this))
    }   

    addHnadlerUpload(handl) {
        this._parentEl.addEventListener('submit' , function(e)   {
            e.preventDefault();
            const dataArr = [...new FormData(this)];
            const data = Object.fromEntries(dataArr)
            handl(data);
    
        })
    }
}
export default new AddRecipeView();