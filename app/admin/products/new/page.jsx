'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client'; // Import Supabase browser client
import { uploadMultipleImages } from '@/lib/uploadImage';

export default function AddProductPage() {
  const router = useRouter();
  const supabase = createClient(); // Initialize Supabase
  
  const [formData, setFormData] = useState({
    title: '', description: '', era: '1970s', condition: 'Excellent', 
    size: '', price_zar: '', category: 'Jackets', gender: 'Unisex'
  });
  
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (selectedFiles.length === 0) {
      alert('Please upload at least one image.');
      return;
    }

    setIsUploading(true);
    setUploadProgress(`Uploading ${selectedFiles.length} image(s) to Cloudinary...`);

    try {
      // 1. Upload images to Cloudinary
      const imageUrls = await uploadMultipleImages(selectedFiles);

      setUploadProgress('Saving product to database...');

      // 2. Insert the product into Supabase
      const { data, error } = await supabase
        .from('products')
        .insert([
          {
            title: formData.title,
            description: formData.description,
            era: formData.era,
            condition: formData.condition,
            size: formData.size,
            price_zar: parseFloat(formData.price_zar),
            category: formData.category,
            gender: formData.gender,
            image_url: imageUrls[0], // Main image
            images: imageUrls,       // Array of all images for the gallery
            is_sold: false
          }
        ])
        .select();

      if (error) {
        console.error('Supabase insert error:', error);
        throw new Error(error.message);
      }

      // 3. Success! Redirect to admin dashboard
      router.push('/admin');
      
    } catch (error) {
      console.error(error);
      alert('Failed to save product. Please check the console for details.');
    } finally {
      setIsUploading(false);
      setUploadProgress('');
    }
  };

  // ... (The Input component and JSX remain exactly the same as before)
  const Input = ({ label, name, type = 'text' }) => (
    <div className="relative">
      <input type={type} name={name} value={formData[name]} onChange={handleChange} required placeholder=" "
        className="peer w-full border-b border-luxury-border bg-transparent pt-5 pb-2 text-luxury-text focus:border-luxury-text focus:outline-none transition-colors" />
      <label className="absolute left-0 top-2 text-xs uppercase tracking-wider text-luxury-muted transition-all peer-focus:top-0 peer-focus:text-[10px] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[10px]">
        {label}
      </label>
    </div>
  );

  return (
    <div className="max-w-3xl">
      <h1 className="font-serif text-3xl text-luxury-text mb-2">Add New Piece</h1>
      <p className="text-sm text-luxury-muted mb-10">Fill in the details and upload photos to list a new vintage item.</p>

      <form onSubmit={handleSubmit} className="bg-luxury-card border border-luxury-border p-8 md:p-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="md:col-span-2"><Input label="Product Title" name="title" /></div>
          <div>
            <label className="text-xs uppercase tracking-wider text-luxury-muted block mb-2">Era</label>
            <select name="era" value={formData.era} onChange={handleChange} className="w-full border-b border-luxury-border bg-transparent py-2 text-luxury-text focus:border-luxury-text focus:outline-none">
              <option value="1960s">1960s</option><option value="1970s">1970s</option>
              <option value="1980s">1980s</option><option value="1990s">1990s</option>
            </select>
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-luxury-muted block mb-2">Category</label>
            <select name="category" value={formData.category} onChange={handleChange} className="w-full border-b border-luxury-border bg-transparent py-2 text-luxury-text focus:border-luxury-text focus:outline-none">
              <option value="Jackets">Jackets</option><option value="Coats">Coats</option>
            </select>
          </div>
          <div><Input label="Size (e.g., Medium UK 38)" name="size" /></div>
          <div><Input label="Condition" name="condition" /></div>
          <div><Input label="Price (ZAR)" name="price_zar" type="number" /></div>
          <div>
            <label className="text-xs uppercase tracking-wider text-luxury-muted block mb-2">Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange} className="w-full border-b border-luxury-border bg-transparent py-2 text-luxury-text focus:border-luxury-text focus:outline-none">
              <option value="Men">Men</option><option value="Women">Women</option><option value="Unisex">Unisex</option>
            </select>
          </div>

          {/* Image Upload Area */}
          <div className="md:col-span-2">
            <label className="text-xs uppercase tracking-wider text-luxury-muted block mb-3">Product Images (Select multiple for gallery)</label>
            <div className="border-2 border-dashed border-luxury-border rounded-lg p-8 text-center hover:border-luxury-accent transition-colors cursor-pointer relative">
              <input type="file" accept="image/*" multiple onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" required />
              {selectedFiles.length > 0 ? (
                <div>
                  <p className="text-luxury-text font-medium">{selectedFiles.length} image(s) selected</p>
                  <p className="text-xs text-luxury-muted mt-1">{selectedFiles.map(f => f.name).join(', ')}</p>
                </div>
              ) : (
                <div>
                  <svg className="mx-auto h-12 w-12 text-luxury-muted" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="text-sm text-luxury-muted mt-2">Click or drag images here to upload</p>
                </div>
              )}
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="text-xs uppercase tracking-wider text-luxury-muted block mb-2">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="4"
              className="w-full border border-luxury-border bg-transparent p-3 text-luxury-text focus:border-luxury-text focus:outline-none transition-colors resize-none"
              placeholder="Tell the story of this piece..."></textarea>
          </div>
        </div>

        <div className="flex gap-4 pt-6">
          <button type="submit" disabled={isUploading} className="px-8 py-3 bg-luxury-text text-white text-xs font-semibold tracking-widest uppercase hover:bg-luxury-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
            {isUploading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {uploadProgress}
              </>
            ) : (
              'Publish Piece'
            )}
          </button>
          <button type="button" onClick={() => router.push('/admin')} disabled={isUploading} className="px-8 py-3 border border-luxury-border text-luxury-text text-xs font-semibold tracking-widest uppercase hover:bg-luxury-bg transition-colors disabled:opacity-50">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}