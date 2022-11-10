class View {
    constructor() {
        this.ulTableContent = document.querySelector('.table-content');
        this.inputSearch = document.querySelector('.search');
        this.searchBtn = document.querySelector('.search-btn');
        this.cleanBtn = document.querySelector('.clean-btn');
        this.windowHeight = document.documentElement.clientHeight;
    }

    removeAllLi() {
        let lists = document.querySelectorAll('.table-content > li');
        for (let i = 1; i < lists.length; i++) {
            lists[i].remove();
        }
    }

    createLi(personData) {
        const {name, ticket, cabin} = personData;
        const age = this.getAge(personData.age);
        const status = personData.survived ? 'Survived' : 'Not survived';
        const gender = this.getGender(personData.gender);

        this.ulTableContent.innerHTML += `<li>
                <ul class="table-row">
                    <li>${name}</li>
                    <li>${gender}</li>
                    <li>${age}</li>
                    <li>${status}</li>
                    <li>${ticket}</li>
                    <li>${cabin}</li>
                </ul>
            </li>`
    }

    getAge(age) {
        if (age < 1) {
            return Math.floor(age * 12) + 'm';
        } else {
            return Math.floor(age) + 'y';
        }
    }

    getGender(gender) {
        if (gender === 'female') {
            return 'F'
        } else {
            return 'M'
        }
    }

    showPersonData(offset, pageSize, array) {
        for (let i = offset; i < offset + pageSize; i++) {
            if (i <= array.length - 1) {
                this.createLi(array[i]);
            }
        }
    }

    bindClearSearch(handler) {
        this.cleanBtn.addEventListener('click', event => {
            this.inputSearch.value = '';
            handler()
        })
    }

    bindSearchBtn(handler) {
        this.searchBtn.addEventListener('click', event => {
            const value = this.inputSearch.value;
            handler(value)
        })
    }

    bindScroll(handler) {
        document.addEventListener('scroll', () => {
            const loadMoreBlockPos = this.ulTableContent.getBoundingClientRect().top + pageYOffset;
            const loadMoreBlockHeight = this.ulTableContent.offsetHeight;
            if (pageYOffset >= (loadMoreBlockPos + loadMoreBlockHeight) - this.windowHeight) {
                handler();
            }
        })
    }
}