# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Carousel Images (Analytics Page)

The analytics page features an image carousel. To use your own local images:

1.  Create a folder named `images` inside the `public` directory (i.e., `public/images`).
2.  Place your desired images (e.g., `runway1.jpg`, `runway2.jpg`, `runway3.jpg`) into this `public/images` folder.
3.  Update the `carouselImages` array in `src/app/(app)/analytics/page.tsx` to point to these local images. For example:
    ```javascript
    const carouselImages = [
      { src: "/images/runway1.jpg", alt: "Description for Image 1", "data-ai-hint": "relevant keywords" },
      { src: "/images/runway2.jpg", alt: "Description for Image 2", "data-ai-hint": "other keywords" },
      { src: "/images/runway3.jpg", alt: "Description for Image 3", "data-ai-hint": "more keywords" },
    ];
    ```
    Paths for images in the `public` folder should start with a `/`.
    The `next/image` component will automatically serve these images. If an image is not found at the specified local path, a placeholder image from `picsum.photos` will be displayed as a fallback (this behavior is implemented in the `onError` handler in the `Image` component on the analytics page).
```