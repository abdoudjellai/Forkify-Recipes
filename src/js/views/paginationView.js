import View from "./view.js";
import icons from 'url:../../img/icons.svg'

class PaginationView extends View {
    _parentEl = document.querySelector('.pagination') ; 
    
    addHandlerClick(handler){
        this._parentEl.addEventListener('click', (e) => {
            const btn = e.target.closest('.btn--inline') ; 
            if(!btn) return
            
            const goToPage = +btn.dataset.goto ; 

            handler(goToPage);
        })
    }
    generateMarup() {
        const pages = Math.ceil(this._data.result.length / this._data.resultsPerPage);
        
        // page 1 ,and  there are other pages 
        if(this._data.page === 1 && pages > 1 ) 
        return `
            <button data-goto = "${this._data.page + 1}" class="btn--inline pagination__btn--next">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
            <span>Page${this._data.page + 1}</span>
            </button>
            `
        
    
    //last page 
    if(this._data.page === pages  && pages > 1 ) 
        return `
        <button data-goto = "${this._data.page - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon"> 
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._data.page - 1}</span>
          </button>
          
    `
    // other page
    if(this._data.page < pages  ) 
        return `
    <button data-goto = "${this._data.page - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._data.page - 1}</span>
          </button>
          <button  data-goto = "${this._data.page + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${this._data.page + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
    ` 
    
    // page 1 , and the are NO other pages 
        return  ''

    }

}
export default new PaginationView();