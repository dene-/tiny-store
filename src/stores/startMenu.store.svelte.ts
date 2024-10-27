class UseStartMenuStore {
  isOpened = $state(false);

  toggle() {
    this.isOpened = !this.isOpened;
  }
}

export const startMenuStore = new UseStartMenuStore();
