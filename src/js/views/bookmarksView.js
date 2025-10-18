import View from "./view";
import icons from 'url:../../img/icons.svg'
import previewView from "./previewView.js";

class bookmarksView extends View {
    _parentEl = document.querySelector('.bookmarks__list')
    _ErrorMessage ='No bookmarks yet. Find a nice recipe and bookmark it :) ';

    addHandlerrestoreBookmarks (handler) {
        window.addEventListener('load' , handler)
    }

    generateMarup() {
        return  this._data.map(result => previewView.render(result, false)).join('') ; 
    }
}
export default new bookmarksView()