import View from "./view.js";
import icons from 'url:../../img/icons.svg'
import previewView from "./previewView.js";
class ResultsView extends View {
    _parentEl = document.querySelector('.results') ; 
    _ErrorMessage = 'No recipes found for your query , try again ;) '
    _message =''; 
    
    generateMarup() {
        return  this._data.map(result => previewView.render(result, false)).join('') ; 
        
    } 
}
export default new ResultsView() ; 