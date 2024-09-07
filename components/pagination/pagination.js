const template = document.createElement('template');
template.innerHTML = `
    <link rel="stylesheet" href="/assets/styles/reset.css">
    <link rel="stylesheet" href="/assets/styles/base.css">
    <link rel="stylesheet" href="../components/pagination/pagination.css">
    <div id="pagination" class="pagination__holder">
        <div class="pagination__btn" id="prev-btn">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M15.8332 9.99996H4.1665M4.1665 9.99996L9.99984 15.8333M4.1665 9.99996L9.99984 4.16663" stroke="black" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <a href="#" class="pagination__btn-link">Previous</a>
        </div>
        <div id="page-buttons"></div>
        <div class="pagination__btn" id="next-btn">
            <a href="#" class="pagination__btn-link">Next</a>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4.1665 9.99996H15.8332M15.8332 9.99996L9.99984 4.16663M15.8332 9.99996L9.99984 15.8333" stroke="black" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
    </div>
`;

class PaginationComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        
        this.currentPage = 1; // Initial current page
        this.totalPages = 10; // You can set this dynamically or via attributes
    }

    connectedCallback() {
        this.render();
        this.addEventListeners();
        window.addEventListener('resize', () => this.render()); // Re-render on window resize
    }

    disconnectedCallback() {
        window.removeEventListener('resize', () => this.render()); // Clean up event listener
    }

    addEventListeners() {
        const prevBtn = this.shadowRoot.getElementById('prev-btn');
        const nextBtn = this.shadowRoot.getElementById('next-btn');

        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (this.currentPage > 1) {
                this.currentPage--;
                this.render();
            }
        });

        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
                this.render();
            }
        });
    }

    render() {
        const paginationContainer = this.shadowRoot.getElementById('page-buttons');
        paginationContainer.innerHTML = ''; // Clear previous pagination

        const ul = document.createElement('ul');
        ul.classList.add('pagination');

        const isSmallScreen = window.innerWidth < 576; // Check if the screen width is below 576px

        if (isSmallScreen) {
            // Render pagination for small screens
            ul.appendChild(this.createPageItem(1, this.currentPage === 1));
            // ul.appendChild(this.createPageItem(2, this.currentPage === 2));

            if (this.currentPage > 4) {
                const li = document.createElement('li');
                li.textContent = '...';
                ul.appendChild(li);
            }

            const startPage = Math.max(2, this.currentPage);
            const endPage = Math.min(this.totalPages - 1, this.currentPage);

            for (let page = startPage; page <= endPage; page++) {
                ul.appendChild(this.createPageItem(page, page === this.currentPage));
            }

            if (this.currentPage < this.totalPages - 3) {
                const li = document.createElement('li');
                li.textContent = '...';
                ul.appendChild(li);
            }

            // ul.appendChild(this.createPageItem(this.totalPages - 1, this.currentPage === this.totalPages - 1));
            ul.appendChild(this.createPageItem(this.totalPages, this.currentPage === this.totalPages));
        } else {
            // Render full pagination for larger screens
            for (let page = 1; page <= 3; page++) {
                if (page > this.totalPages) break;
                ul.appendChild(this.createPageItem(page, page === this.currentPage));
            }

            if (this.currentPage > 4) {
                const li = document.createElement('li');
                li.textContent = '...';
                ul.appendChild(li);
            }

            const startPage = Math.max(4, this.currentPage - 1);
            const endPage = Math.min(this.totalPages - 3, this.currentPage + 1);

            for (let page = startPage; page <= endPage; page++) {
                ul.appendChild(this.createPageItem(page, page === this.currentPage));
            }

            if (this.currentPage < this.totalPages - 3) {
                const li = document.createElement('li');
                li.textContent = '...';
                ul.appendChild(li);
            }

            for (let page = this.totalPages - 2; page <= this.totalPages; page++) {
                if (page < 4) continue;
                ul.appendChild(this.createPageItem(page, page === this.currentPage));
            }
        }

        paginationContainer.appendChild(ul);
    }

    createPageItem(page, isActive = false) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.textContent = page;
        a.href = '#';
        li.classList.toggle('active', isActive);
        li.addEventListener('click', (e) => {
            e.preventDefault();
            this.currentPage = page; // Update current page
            this.render(); // Re-render pagination with new current page
        });
        li.appendChild(a);
        return li;
    }

    static get observedAttributes() {
        return ['total-pages', 'current-page'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'total-pages') {
            this.totalPages = parseInt(newValue, 10);
        }
        if (name === 'current-page') {
            this.currentPage = parseInt(newValue, 10);
        }
        this.render(); // Re-render whenever attributes change
    }
}

export {PaginationComponent}