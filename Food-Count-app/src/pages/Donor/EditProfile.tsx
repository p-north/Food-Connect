import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/shared/Button';
import Container from '../../components/shared/Container';
import InputField from '../../components/shared/InputField';

const EditDonorProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: 'City Bakery',
    address: '123 Main St',
    city: 'Foodville',
    state: 'CA',
    zip: '12345',
    phone: '(555) 123-4567',
    email: 'contact@citybakery.com',
    description: 'We specialize in fresh baked goods and aim to reduce food waste.',
    website: 'www.citybakery.com'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Would normally submit to API here
    console.log("Profile updated:", profile);
    navigate('/donor/profile');
  };

  return (
    <Container>
      <div className="max-w-3xl mx-auto py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">Business Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <InputField
                    label="Business Name"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <InputField
                    label="Address"
                    name="address"
                    value={profile.address}
                    onChange={handleChange}
                    required
                  />
                </div>
                <InputField
                  label="City"
                  name="city"
                  value={profile.city}
                  onChange={handleChange}
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    label="State"
                    name="state"
                    value={profile.state}
                    onChange={handleChange}
                    required
                  />
                  <InputField
                    label="ZIP Code"
                    name="zip"
                    value={profile.zip}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Phone Number"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  required
                />
                <InputField
                  label="Email"
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={handleChange}
                  required
                />
                <div className="md:col-span-2">
                  <InputField
                    label="Website (Optional)"
                    name="website"
                    value={profile.website}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">About Your Business</h2>
              <div>
                <label className="block text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={profile.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Tell recipients about your business and the types of food you typically donate.
                </p>
              </div>
            </div>

            <div className="border-t pt-6 flex justify-end space-x-4">
              <button 
                type="button" 
                onClick={() => navigate('/donor/profile')}
                className="px-6 py-2 border rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default EditDonorProfile;