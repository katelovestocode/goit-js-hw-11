/**
 * webformatURL - link to a small image for the list of cards.
largeImageURL - link to a large image.
tags - line with image description. Suitable for the alt attribute.
likes - number of likes.
views - number of views.
comments - number of comments.
downloads - number of downloads.
 */

export function galleryTemplateMarkup(images) {
  const markup = images
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<div class="photo-card">
  <a class="link" href="${largeImageURL}"> 
  <img src="${webformatURL}" alt="${tags}" loading="lazy" /> </a>
  <div class="info">
    <p class="info-item">
      <b>Likes </b> ${likes}
    </p>
    <p class="info-item">
      <b>Views </b> ${views}
    </p>
    <p class="info-item">
      <b>Comments </b> ${comments}
    </p>
    <p class="info-item">
      <b>Downloads </b> ${downloads}
    </p>
  </div>
</div>`
    )
    .join('');

  return markup;
}
