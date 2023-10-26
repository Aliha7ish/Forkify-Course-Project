class SearchView {
   _parentEl = document.querySelector('.search');
  searchInputResult() {
    return this._parentEl.querySelector('.search__field').value;
  }

  clearInput(){
    this._parentEl.querySelector('.search__field').value = '';
  }

  addHandlerResult(handler){
    this._parentEl.addEventListener('submit', function(e){
        e.preventDefault();
        handler();
    })
  }
}

export default new SearchView();
