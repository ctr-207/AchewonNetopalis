/* ============================================================================
   HERO PHOTOS. This is the only place you need to edit to change what shows
   in the rotating photo on the homepage.

   HOW TO ADD A PHOTO:
   1. Drop the image file into the assets/Hero folder.
   2. Add its filename (exactly as it's spelled, including .jpg/.jpeg/.png) to
      the list below, one per line.
   3. Save this file. That's it, no other code needs to change.

   A true "just look at what's in the folder" auto-detect isn't possible for a
   plain website with no server behind it (a browser can't list a folder's
   contents on its own). This list is the closest thing to it: one line per
   photo, nothing else to touch.

   You can list as many or as few photos as you want. One photo = it just sits
   there. Two or more = they crossfade through automatically, evenly.
   ============================================================================ */

const HERO_IMAGES = [
  'IMG_3923.jpeg'
];


/* ============================================================================
   Nothing below this line needs to be touched to add or remove a photo.
   ============================================================================ */

/* Builds the rotating photo slides inside the given container and crossfades
   between them. Uses a simple JS interval + CSS opacity transition instead of
   fixed CSS keyframes, so it works correctly no matter how many photos are
   listed above (one photo, five photos, whatever). */
function initHeroPhotos(containerId, secondsPerPhoto) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (HERO_IMAGES.length === 0) {
    const placeholder = document.createElement('div');
    placeholder.className = 'hero-slide placeholder-img';
    placeholder.style.opacity = '1';
    placeholder.textContent = '[ Add photos to assets/Hero and list them in hero-images.js ]';
    container.insertBefore(placeholder, container.firstChild);
    return;
  }

  const slides = HERO_IMAGES.map(function (filename, i) {
    const slide = document.createElement('div');
    slide.className = 'hero-slide';
    slide.style.backgroundImage = "url('assets/Hero/" + filename + "')";
    slide.style.opacity = i === 0 ? '1' : '0';
    container.insertBefore(slide, container.firstChild);
    return slide;
  });

  if (slides.length < 2) return;

  let current = 0;
  setInterval(function () {
    const next = (current + 1) % slides.length;
    slides[current].style.opacity = '0';
    slides[next].style.opacity = '1';
    current = next;
  }, (secondsPerPhoto || 5) * 1000);
}
