import View from './view.js';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  addHandlerClick(handler){
    this._parentEl.addEventListener('click', function(e){
        const btn = e.target.closest('.btn--inline'); 
        if(!btn) return;
        const goto = +btn.dataset.goto;
        handler(goto);
    })
  }

  _generateMarkup(){
    const numPages = Math.ceil(this._data.results.length / 10);
    //Page1 and there are other pages
    if(this._data.page === 1 && numPages > 1){
        return `
        <button data-goto="${this._data.page + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${this._data.page + 1}</span>
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
        </button>
        `;
    }

    //last page
    if(this._data.page === numPages && numPages > 1){
        return `
        <button data-goto="${this._data.page - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._data.page - 1}</span>
        </button>
        `;
    }

    //any other page
    if(this._data.page < numPages){
        return `
        <button data-goto="${this._data.page - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._data.page - 1}</span>
        </button>
        <button data-goto="${this._data.page + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${this._data.page + 1}</span>
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
        </button>
        `;
    }

    return '';

  }
}
export default new PaginationView();