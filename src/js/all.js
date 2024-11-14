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

class ImageResizer {
    static MAX_SIZE_MB = 2;  // Maximum size before resizing (2 MB)
    
    /**
     * Resizes an image to a lower resolution if it exceeds the specified size.
     * @param {Object} options - Contains either 'source' (image URL/base64) or 'image' (HTML image element).
     * @returns {Promise<string>} - URL of the resized image.
     */
    static async renderLowerResImage({ source = null, image = null }) {
        let imgElement;

        if (source) {
            imgElement = await ImageResizer.loadImage(source);
        } else if (image) {
            imgElement = image;
            source = image.src;
        } else {
            throw new Error("Provide either 'source' or 'image' in options.");
        }

        const fileSizeMB = await ImageResizer.getFileSizeMB(source);
        if (fileSizeMB <= ImageResizer.MAX_SIZE_MB) {
            return source; // Return original if size is within limit
        }

        return ImageResizer.resizeImage(imgElement, 0.5); // Resize to 50% resolution
    }

    /**
     * Resizes the image using a canvas element.
     * @param {HTMLImageElement} img - The image element to resize.
     * @param {number} scaleFactor - Factor to scale down the image (e.g., 0.5 for 50%).
     * @returns {string} - Data URL of the resized image.
     */
    static resizeImage(img, scaleFactor) {
        const canvas = document.createElement("canvas");
        canvas.width = img.width * scaleFactor;
        canvas.height = img.height * scaleFactor;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        return canvas.toDataURL("image/jpeg", 0.9); // Adjust quality if needed
    }

    /**
     * Loads an image from a URL or base64 string.
     * @param {string} src - The source URL or base64 string.
     * @returns {Promise<HTMLImageElement>} - Loaded image element.
     */
    static loadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    }

    /**
     * Fetches the file size in MB for a given image URL.
     * @param {string} src - The source URL of the image.
     * @returns {Promise<number>} - File size in MB.
     */
    static async getFileSizeMB(src) {
        const response = await fetch(src);
        const blob = await response.blob();
        return blob.size / (1024 * 1024); // Convert bytes to MB
    }

    /**
     * Automatically processes all images with the "low-rez" attribute on page load.
     */
    static async processAllLowRezImages() {
        const lowRezImages = document.querySelectorAll("img[low-rez]");
        for (const img of lowRezImages) {
            const newSrc = await ImageResizer.renderLowerResImage({ image: img });
            img.src = newSrc;
        }
    }
}

// Run on page load
window.addEventListener("DOMContentLoaded", () => {
    ImageResizer.processAllLowRezImages();
});

// Initialize the ScreenSize class to start monitoring screen size changes
ScreenSize.init();

// Initialize the ContentHandler class to listen for screen size changes and adjust content
ContentHandler.init();