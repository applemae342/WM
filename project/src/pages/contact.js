import Navbar from "@/components/Navbar";
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    address: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here (e.g., send data to backend)
    console.log(formData);
    // Optionally, you can add a success message or redirect after form submission
  };

  return (
    <div className="bg-gradient-to-b from-gray-100 to-white pt-20 md:pt-40">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">Contact Us</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-12">
            Need assistance or want to get in touch with us? Here's how:
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone:</label>
              <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address:</label>
              <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Questions or other concerns:</label>
              <textarea id="message" placeholder="Write it here..." name="message" value={formData.message} onChange={handleChange} rows="4" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"></textarea>
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Submit</button>
          </form>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center items-center mt-8 space-x-8">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><img src="/images/facebook.png" alt="Facebook" className="w-8 h-8" /></a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><img src="/images/twitter.png" alt="Twitter" className="w-8 h-8" /></a>
          <a href="mailto:your.email@example.com"><img src="/images/email.png" alt="Email" className="w-8 h-8" /></a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
