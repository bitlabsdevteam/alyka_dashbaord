# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Carousel Images (Analytics Page)

The analytics page features an image carousel. To use your own local images:

1.  Create a folder named `images` inside the `public` directory (i.e., `public/images`).
2.  Place your desired images (e.g., `gala_image_2.jpeg`, `image_gala_1.jpeg`) into this `public/images` folder.
3.  Update the `carouselImages` array in `src/app/(app)/analytics/page.tsx` to point to these local images. For example:
    ```javascript
    const carouselImages = [
      { src: "/images/gala_image_2.jpeg", alt: "People attending a glamorous gala event", "data-ai-hint": "gala event" },
      { src: "/images/image_gala_1.jpeg", alt: "Elegant guests at a formal gala gathering", "data-ai-hint": "fashion model" },
      // Add more images as needed
    ];
    ```
    Paths for images in the `public` folder should start with a `/`.
    The `next/image` component will automatically serve these images. If an image is not found at the specified local path, a placeholder image from `picsum.photos` will be displayed as a fallback (this behavior is implemented in the `ImageWithFallback` component used on the analytics page). The `data-ai-hint` attribute is used for internal purposes and can contain one or two keywords related to the image.
```