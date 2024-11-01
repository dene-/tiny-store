export class Modal {
  modal: HTMLDialogElement | null = $state(null);

  isLoading = $state(false);
  error = $state('');

  open = () => {
    this.modal?.showModal();
  };

  close = () => {
    this.modal?.close();
  };
}
