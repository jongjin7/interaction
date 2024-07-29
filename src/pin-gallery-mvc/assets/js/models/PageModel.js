export default class PageModel {
  constructor() {
    this.currentPage = 'home';
  }

  togglePage() {
    this.currentPage = this.currentPage === 'home' ? 'list' : 'home';
    return this.currentPage;
  }

  getCurrentPage() {
    return this.currentPage;
  }
}
