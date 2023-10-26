export default class View {
  _data;


  /**
   * 
   * @param {*} data 
   * @returns 
   */
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const html = this._generateMarkup();
    this.loadingSpinner();
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', html);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDom.querySelectorAll('*'));
    const currentElements = Array.from(this._parentEl.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const currentEl = currentElements[i];
      // console.log(currentEl ,newEl.isEqualNode(currentEl));

      if (
        !newEl.isEqualNode(currentEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        currentEl.textContent = newEl.textContent;
      }

      //Update attributes
      if (!newEl.isEqualNode(currentEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          currentEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }
  _clear() {
    this._parentEl.innerHTML = '';
  }

  loadingSpinner() {
    const spinner = `
      <div class="spinner">
        <svg>
            <use href="src/img/icons.svg#icon-loader"></use>
        </svg>
      </div>
    `;
    this._parentEl.insertAdjacentHTML('afterbegin', spinner);
    this._parentEl.innerHTML = '';
  }

  renderError(message = this._errorMessage) {
    const errorHtml = `
          <div class="error">
            <div>
              <svg>
                <use href="src/img/icons.svg#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
    `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', errorHtml);
  }
}
