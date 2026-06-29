// lib/uploadImage.js

export async function uploadImage(file) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  // DEBUG: Let's see if the variables are actually loading
  console.log('DEBUG - Cloud Name:', cloudName);
  console.log('DEBUG - Upload Preset:', uploadPreset);

  if (!cloudName || !uploadPreset) {
    throw new Error('Missing Cloudinary environment variables. Check your .env.local file and RESTART the server.');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  formData.append('folder', 'vintage_store');

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  console.log('DEBUG - Request URL:', url);

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    // Get the raw text response to see if it's JSON or an HTML error page
    const responseText = await response.text();
    console.log('DEBUG - Cloudinary Status:', response.status);
    console.log('DEBUG - Cloudinary Raw Response:', responseText);

    if (!response.ok) {
      let errorData = {};
      try {
        errorData = JSON.parse(responseText);
      } catch (e) {
        // If it fails to parse, it wasn't JSON (probably an HTML error page)
      }
      throw new Error(errorData.error?.message || `Upload failed with status ${response.status}`);
    }

    const data = JSON.parse(responseText);
    return data.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
}

export async function uploadMultipleImages(files) {
  const urls = [];
  for (let i = 0; i < files.length; i++) {
    const url = await uploadImage(files[i]);
    urls.push(url);
  }
  return urls;
}