class searchView {
    _parentE1 = document.querySelector('.search');// Formulario
    //Obtener el valor 
    getQuery() {
        const query = this._parentE1.querySelector('.search__field').value;
        this._clearInput();
        return query;
    }

    _clearInput() {
        this._parentE1.querySelector('.search__field').value = ''
    }

    //Submit va a llamar a la función del controller
    addHandlerSearch(handler) {
        this._parentE1.addEventListener('submit', function (e) {
            e.preventDefault();
            handler();
        })
    }

}

export default new searchView()