const TITANIC_DATA_URL = 'https://raw.githubusercontent.com/altkraft/for-applicants/master/frontend/titanic/passengers.json';

class Model {
    constructor() {
        this.globalArr = [];
        this.actualArr = [];
        this.offset = 0;
        this.pageSize = 30;

        fetch(TITANIC_DATA_URL)
            .then(response => response.json())
            .then(array => {
                this.globalArr = array
                this.actualArr = [...this.globalArr];
                this.onPersonDataChanged()
                this.increaseOffset()
            });

    }

    filterPersons(value) {
        this.zeroOffset();
        this.actualArr = this.actualArr.filter((element) => this.filterByValue(element, value));
        this.onPersonDataChanged();
    }

    scroll() {
        this.increaseOffset();
        this.onPersonDataChanged();
    }

    cancelFilter() {
        this.zeroOffset();
        this.actualArr = [...this.globalArr];
        this.onPersonDataChanged();
    }

    zeroOffset() {
        this.offset = 0;
    }

    increaseOffset() {
        this.offset += this.pageSize;
    }

    bindTodoListChanged(callback) {
        this.onPersonDataChanged = callback
    }

    filterByValue(e, value) {
        const {name, age, survived, gender} = e;

        if (value.length > 1) {
            if (name.toUpperCase().includes(value.toUpperCase()) || age === +value ||
                (survived && value.toUpperCase() === 'SURVIVED' || survived === false && value.toUpperCase() === 'NOT SURVIVED')) {
                return true;
            }
        } else if (value.toUpperCase() === 'F' || value.toUpperCase() === 'M') {
            return this.getGender(gender) === value;
        } else {
            return false;
        }
    }

    getGender(gender) {
        if (gender === 'female') {
            return 'F'
        } else {
            return 'M'
        }
    }
}