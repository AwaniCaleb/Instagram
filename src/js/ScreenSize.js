/**
 * ScreenSize class:
 *
 * This class is responsible for determining the current screen size and dispatching a custom event
 * to notify other parts of the application when the screen size changes.
 */
export class ScreenSize {
    static currentSize = null;

    /**
     * Initializes the screen size checking mechanism:
     *
     * 1. Attaches an event listener to the 'resize' event of the window to re-check the screen size
     *    whenever the window is resized.
     * 2. Immediately calls the `checkScreenSize` method to determine the initial screen size.
     */
    static init() {
        window.addEventListener('resize', this.checkScreenSize);
        this.checkScreenSize();
    }

    /**
     * Checks the current screen size and dispatches a custom event:
     *
     * 1. Determines the current width of the window.
     * 2. Categorizes the screen size into 'small', 'medium', or 'large' based on the width.
     * 3. Dispatches a 'screenSizeChange' custom event with the determined size as detail.
     *    Other parts of the application can listen to this event to react to screen size changes.
     */
    static checkScreenSize() {
        const width = window.innerWidth;
        let size;

        if (width <= 768) {
            size = 'small';
        } else if (width <= 1024) {
            size = 'medium';
        } else {
            size = 'large';
        }

        // Dispatch the event only if the size has changed
        if (size !== this.currentSize) {
            this.currentSize = size;
            window.dispatchEvent(new CustomEvent('screenSizeChange', { detail: size }));
        }
    }
}
