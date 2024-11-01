export function resizeImageToWebp(imageFile: File, newFileName: string): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === 'string' && reader.result !== null) {
        img.src = reader.result;
      }
    };

    reader.onerror = error => reject(error);

    img.onload = () => {
      const maxDimension = 1280;
      let { width, height } = img;

      if (width > maxDimension || height > maxDimension) {
        const aspectRatio = width / height;
        if (width > height) {
          width = maxDimension;
          height = maxDimension / aspectRatio;
        } else {
          height = maxDimension;
          width = maxDimension * aspectRatio;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        blob => {
          if (blob) {
            const webpFile = new File([blob], `${newFileName}.webp`, {
              type: 'image/webp',
            });
            resolve(webpFile);
          } else {
            reject(new Error('Canvas toBlob returned null'));
          }
        },
        'image/webp',
        0.8, // Quality factor (0.8 for a good balance between quality and file size)
      );
    };

    img.onerror = error => reject(error);

    reader.readAsDataURL(imageFile);
  });
}

export function resizeImagesToWebp(imageFiles: File[], newFileNames: string[]): Promise<File[]> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      reject(new Error('Could not get canvas context'));
      return;
    }

    const processImage = (imageFile: File, newFileName: string): Promise<File> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        const objectUrl = URL.createObjectURL(imageFile);
        img.src = objectUrl;

        img.onload = () => {
          const maxDimension = 1280;
          let { width, height } = img;

          if (width > maxDimension || height > maxDimension) {
            const aspectRatio = width / height;
            if (width > height) {
              width = maxDimension;
              height = maxDimension / aspectRatio;
            } else {
              height = maxDimension;
              width = maxDimension * aspectRatio;
            }
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          URL.revokeObjectURL(objectUrl); // Clean up memory

          canvas.toBlob(
            blob => {
              if (blob) {
                const webpFile = new File([blob], `${newFileName}.webp`, {
                  type: 'image/webp',
                });
                resolve(webpFile);
              } else {
                reject(new Error('Canvas toBlob returned null'));
              }
            },
            'image/webp',
            0.85,
          );
        };

        img.onerror = error => {
          URL.revokeObjectURL(objectUrl); // Clean up memory in case of error
          reject(error);
        };
      });
    };

    const promises = imageFiles.map((file, index) => processImage(file, newFileNames[index]));
    Promise.all(promises).then(resolve).catch(reject);
  });
}
