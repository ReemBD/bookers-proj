export const cloudinaryService = {
  uploadImg,
};

export const CLOUD_NAME = 'dt8is0jga';

async function uploadImg(file: any, params?: any) {
  const CLOUD_NAME = 'dt8is0jga';
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload?${params}`;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'dt8is0jga');
  try {
    const res = await fetch(UPLOAD_URL, {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}
