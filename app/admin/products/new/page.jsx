'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { uploadMultipleImages } from '@/lib/uploadImage';

// FIX: Moved OUTSIDE the main component
const Input = ({ label, name, type = 'text', value, onChange }) => (
  <div className="relative">
    <input type={type} name={name} value={value} onChange={onChange} required placeholder=" "
      className="peer w-full border-b border-luxury-border bg-transparent pt-5 pb-2 text-luxury-text focus:border-luxury-text focus:outline-none transition-colors" />
    <label className="absolute left-0 top-2 text-xs uppercase tracking-wider text-luxury-muted transition-all peer-focus:top-0 peer-focus:text-[10px] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[10px]">
      {label}
    </label>
  </div>
);

export default function AddProductPage() {
  const router = useRouter();
  const supabase = createClient();
  
  const [formData, setFormData] = useState({
    title: '', description: '', era: '1970s', condition: 'Excellent', 
    size: '', price_zar: '', category: 'Jackets', gender: 'Unisex'
  });
  
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) => setSelectedFiles(Array.from(e.target.files));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedFiles.length === 0) return alert('Please upload at least one image.');

    setIsUploading(true);
    setUploadProgress(`Uploading ${selectedFiles.length} image(s)...`);

    try {
      const imageUrls = await uploadMultipleImages(selectedFiles);
      setUploadProgress('Saving to database...');

      const { error } = await supabase.from('products').insert([{
        title: formData.title, description: formData.description, era: formData.era,
        condition: formData.condition, size: formData.size, price_zar: parseFloat(formData.price_zar),
        category: formData.category, gender: formData.gender,
        image_url: imageUrls[0], images: imageUrls, is_sold: false
      }]);

      if (error) throw error;
      router.push('/admin');
    } catch (error) {
      console.error(error);
      alert('Failed to save product.');
    } finally {
      setIsUploading(false);
      setUploadProgress('');
    }
  };

  return (
    <div className="max-w-3xl">
      <h1 className="font-serif text-3xl text-luxury-text mb-2">Add New Piece</h1>
      <p className="text-sm text-luxury-muted mb-10">Fill in the details and upload photos to list a new vintage item.</p>

      <form onSubmit={handleSubmit} className="bg-luxury-card border border-luxury-border p-8 md:p-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="md:col-span-2"><Input label="Product Title" name="title" value={formData.title} onChange={handleChange} /></div>
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
          <div><Input label="Size (e.g., Medium UK 38)" name="size" value={formData.size} onChange={handleChange} /></div>
          <div><Input label="Condition" name="condition" value={formData.condition} onChange={handleChange} /></div>
          <div><Input label="Price (ZAR)" name="price_zar" type="number" value={formData.price_zar} onChange={handleChange} /></div>
          <div>
            <label className="text-xs uppercase tracking-wider text-luxury-muted block mb-2">Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange} className="w-full border-b border-luxury-border bg-transparent py-2 text-luxury-text focus:border-luxury-text focus:outline-none">
              <option value="Men">Men</option><option value="Women">Women</option><option value="Unisex">Unisex</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="text-xs uppercase tracking-wider text-luxury-muted block mb-3">Product Images (Select multiple)</label>
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
          <button type="submit" disabled={isUploading} className="px-8 py-3 bg-luxury-text text-white text-xs font-semibold tracking-widest uppercase hover:bg-luxury-accent transition-colors disabled:opacity-50 flex items-center gap-2">
            {isUploading ? uploadProgress : 'Publish Piece'}
          </button>
          <button type="button" onClick={() => router.push('/admin')} disabled={isUploading} className="px-8 py-3 border border-luxury-border text-luxury-text text-xs font-semibold tracking-widest uppercase hover:bg-luxury-bg transition-colors disabled:opacity-50">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}