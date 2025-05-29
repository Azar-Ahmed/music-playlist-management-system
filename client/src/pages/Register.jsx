import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/slice/authSlice'; // ✅ import register thunk

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', password: '', profileImage: null,
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profileImage') {
      setFormData({ ...formData, profileImage: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    for (const key in formData) {
      payload.append(key, formData[key]);
    }

    const result = await dispatch(register(payload));

    if (register.fulfilled.match(result)) {
      navigate('/'); // ✅ Redirect on success
    }
    // No need to manually show error here; it's already in Redux state
  };

  return (
    <div className="max-w-md mx-auto mt-24 p-6 rounded shadow-md dark:bg-gray-800 dark:text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextField label="Name" name="name" value={formData.name} onChange={handleChange} fullWidth />
        <TextField label="Email" name="email" value={formData.email} onChange={handleChange} fullWidth />
        <TextField label="Phone" name="phone" value={formData.phone} onChange={handleChange} fullWidth />
        <TextField label="Password" type="password" name="password" value={formData.password} onChange={handleChange} fullWidth />

        <input
          type="file"
          name="profileImage"
          accept="image/*"
          onChange={handleChange}
          className="text-white"
        />

        {preview && <img src={preview} alt="Preview" className="w-24 h-24 rounded-full object-cover mt-2" />}

        <button
          type="submit"
          className="mt-4 bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white font-semibold transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>

        {error && <p className="text-red-500">{error}</p>}

        <p>
          Already Registered?{' '}
          <Link to="/login">
            <b>Login</b>
          </Link>
        </p>
      </form>
    </div>
  );
}
