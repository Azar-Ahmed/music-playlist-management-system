import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout, updateProfile } from '../redux/slice/authSlice'; // import updateProfile
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading } = useSelector((state) => state.auth);

  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
  });

  const [imagePreview, setImagePreview] = useState(user.profileImage || '');
  const [profileImage, setProfileImage] = useState(null);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const toggleEdit = async () => {
    if (editMode) {
      const formData = new FormData();
      formData.append('name', profile.name);
      formData.append('email', profile.email);
      formData.append('phone', profile.phone);
      if (profileImage) {
        formData.append('profileImage', profileImage);
      }

      await dispatch(updateProfile(formData));
    }
    setEditMode(!editMode);
  };

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="p-6 text-white max-w-lg mx-auto">
      <h2 className="text-3xl font-bold mb-6">Profile</h2>

      {loading && <p className="text-green-400 mb-4">Updating...</p>}

      <div className="flex justify-center mb-6">
        <label className="cursor-pointer">
          <img
            src={imagePreview}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-white shadow-lg"
          />
          {editMode && (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          )}
        </label>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-gray-400 mb-1">Name</label>
          {editMode ? (
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          ) : (
            <p>{profile.name}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-400 mb-1">Email</label>
          {editMode ? (
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          ) : (
            <p>{profile.email}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-400 mb-1">Phone</label>
          {editMode ? (
            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          ) : (
            <p>{profile.phone}</p>
          )}
        </div>

        <div className="mt-6 flex gap-4">
          <button
            onClick={toggleEdit}
            className={`px-6 py-2 ${editMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'} rounded font-semibold transition`}
          >
            {editMode ? 'Save' : 'Edit Profile'}
          </button>

          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded font-semibold transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
