import { ScreenSize } from './ScreenSize.js';

/**
 * ContentHandler class:
 *
 * This class listens for the 'screenSizeChange' event dispatched by the ScreenSize class.
 * Based on the received screen size, it triggers appropriate actions to adjust the page content.
 */
class ContentHandler {
    /**
     * Initializes the event listener for screen size changes:
     *
     * 1. Attaches an event listener to the 'screenSizeChange' event.
     * 2. When the event is triggered, it extracts the screen size from the event detail.
     * 3. Calls either `hideContent()` or `showContent()` based on the screen size.
     */
    static init() {
        window.addEventListener('screenSizeChange', (event) => {
            let size = event.detail;

            if (size === 'small') {
                this.hideContent();
            } else {
                this.showContent();
            }

            // Initial check on page load
            ScreenSize.checkScreenSize();
        });

        // Immediately run logic based on the initial screen size
        let initialSize = ScreenSize.currentSize;
        if (initialSize === 'small') {
            this.hideContent();
        } else {
            this.showContent();
        }
    }

    /**
     * Cleans the HTML content for small screens:
     *
     * This method should implement the specific logic to hide or remove unnecessary content
     * on small screens.
     */
    static hideContent() {
        document.getElementById("unsupported-device").classList.remove("hidden");

        document.querySelectorAll("[d-c='page-content']").forEach(element => {
            element.classList.add("hidden");
        });
    }

    /**
     * Restores the original HTML content for larger screens:
     *
     * This method should implement the logic to display the full content or revert any changes
     * made by the `hideContent` method.
     */
    static showContent() {
        document.getElementById("unsupported-device").classList.add("hidden");

        document.querySelectorAll("[d-c='page-content']").forEach(element => {
            element.classList.remove("hidden");
        });
    }
}

// Initialize the ScreenSize class to start monitoring screen size changes
ScreenSize.init();

// Initialize the ContentHandler class to listen for screen size changes and adjust content
ContentHandler.init();