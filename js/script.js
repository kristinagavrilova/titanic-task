class Controller {
    constructor(model, view) {
        this.model = model
        this.view = view
        this.view.bindClearSearch(this.cancelFilter)
        this.view.bindSearchBtn(this.filterPersons)
        this.view.bindScroll(this.scroll)
        this.model.bindTodoListChanged(this.onPersonDataChanged)
    }

    cancelFilter = () => {
        this.view.removeAllLi()
        this.model.cancelFilter()
    }
    filterPersons = (value) => {
        this.view.removeAllLi();
        this.model.filterPersons(value);
    }
    scroll = () => {
        this.model.scroll();
    }
    onPersonDataChanged = () => {
        this.view.showPersonData(this.model.offset, this.model.pageSize, this.model.actualArr)
    }
}

new Controller(new Model(), new View())