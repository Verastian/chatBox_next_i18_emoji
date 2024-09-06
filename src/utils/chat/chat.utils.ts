
export const hasVerticalScrollBar = (element: HTMLElement | null): boolean => {
    if (typeof window === 'undefined' || !element) {
        // Si estamos en SSR o no hay elemento, devuelve falso
        return false;
    }
    return element.scrollHeight > element.clientHeight;
};