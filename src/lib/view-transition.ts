export interface ViewTransitionDocument {
  startViewTransition?: (callback: () => Promise<void>) => void;
}

export interface NavigationCompletion {
  complete: Promise<unknown>;
}

export function runViewTransition(documentRef: ViewTransitionDocument, navigation: NavigationCompletion) {
  if (!documentRef.startViewTransition) return undefined;

  return new Promise<void>(resolve => {
    documentRef.startViewTransition?.(async () => {
      resolve();
      await navigation.complete;
    });
  });
}
