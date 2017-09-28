function createBuffer(image, area) {
    const buffer = document.createElement('canvas');
    buffer.width = area.w;
    buffer.height = area.h;
    buffer.getContext('2d').drawImage(image.data, area.x, area.y, area.w, area.h, 0, 0, area.w, area.h);
    return buffer;
}

export function createSprite(image, area) {
  return new Promise(resolve => {
    const buffer = createBuffer(image, area);
    if (buffer.width === 0 || buffer.height === 0) {
      return resolve(false);
    }

    buffer.toBlob(blob => {
      const url = URL.createObjectURL(blob);
      const sprite = Object.assign(area, {url});
      return resolve(sprite);
    });
  });
}
