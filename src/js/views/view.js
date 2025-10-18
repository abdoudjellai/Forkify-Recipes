import icons from 'url:../../img/icons.svg'

export default class View {
    _data ;
    /**
     * Render the received object to the DOM
     * @param {Object | Object[]} data  data to be rendered to the DOM
     * @param {boolean} [render=true] if false , create markup string instead of rendering to the DOM
     * @returns {undefined | string} A markup string is returned if render = false
     */
    render(data , render = true) {
        
        if(!data || (Array.isArray(data) && data.length === 0))  return this.showError()

        this._data = data ; 
        const markup = this.generateMarup() ; 
       if(!render) return markup
        this._clear() ;
        this._parentEl.insertAdjacentHTML('afterbegin' , markup) ;
    }

    update(data) {
        
        this._data = data ; 
        const newMarkup = this.generateMarup() ; 

        const newDOM = document.createRange().createContextualFragment(newMarkup);
        
        const newelements =Array.from (newDOM.querySelectorAll('*'))
        const curElements =Array.from (this._parentEl.querySelectorAll('*')); 
        
        newelements.forEach((el , i) => {
            const curEl = curElements[i];
            
            //update change TEXT
            if(!el.isEqualNode(curEl) &&  el.firstChild?.nodeValue.trim() !== ''){
                curEl.textContent  = el.textContent ;
            }
            
            //update change ATTRIBUTES
            if(!el.isEqualNode(curEl) ) 
                Array.from(el.attributes).forEach(attr => curEl.setAttribute(attr.name , attr.value)) 
        })
    }

    
    _generateMarkupPreview(item) {
        const id = window.location.hash.slice(1); 

        return `
                <li class="preview">
                    <a class="preview__link ${id=== item.id ?'preview__link--active' :''}" href="#${item.id}">
                    <figure class="preview__fig">
                        <img src="${item.image}" alt="Test" />
                    </figure>
                    <div class="preview__data">
                        <h4 class="preview__title">${item.title}</h4>
                        <p class="preview__publisher">${item.publisher}</p>
                        
                    </div>
                </div>
                </a>
            </li> `
        }

    _clear() {
        this._parentEl.innerHTML = ''
    }

    renderSpinner() {
        const spinner = ` 
            <div class="spinner">
                <svg>
                    <use href="${icons}#icon-loader"></use>
                </svg>
            </div>`
        this._clear();
        this._parentEl.insertAdjacentHTML('beforeend' , spinner ) ;
    }

    
    showError(message = this._ErrorMessage) {
        const markup = `
        <div class="error">
        <div>
        <svg>
        <use href="${icons}#icon-alert-triangle"></use>
        </svg>
        </div>
        <p>${message}</p>
        </div> `
        this._clear(); 
        this._parentEl.insertAdjacentHTML('beforeend', markup)
    }
    
    showMessage(message = this._message) {
        const markup = `
        <div class="message">
        <div>
        <svg>
        <use href="${icons}#icon-smile"></use>
        </svg>
        </div>
        <p>${message}</p>
        </div> `
        this._clear(); 
        this._parentEl.insertAdjacentHTML('beforeend', markup)
    }
    
}