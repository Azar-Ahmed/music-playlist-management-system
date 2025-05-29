import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchPlaylists,
  addPlaylist,
  updatePlaylist,
  deletePlaylist,
} from '../redux/slice/playlistSlice'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

export default function Playlist() {
  const dispatch = useDispatch()
  const { playlists, loading } = useSelector((state) => state.playlist)

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null,
    editingId: null,
  })

  useEffect(() => {
    dispatch(fetchPlaylists())
  }, [dispatch])

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === 'image') {
      setFormData((prev) => ({ ...prev, image: files[0] }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append('name', formData.name)
    data.append('description', formData.description)
    if (formData.image) data.append('image', formData.image)

    if (formData.editingId) {
      dispatch(updatePlaylist({ id: formData.editingId, formData: data }))
        .unwrap()
        .then(() => {
          toast.success('Playlist updated')
          setFormData({
            name: '',
            description: '',
            image: null,
            editingId: null,
          })
        })
        .catch(toast.error)
    } else {
      dispatch(addPlaylist(data))
        .unwrap()
        .then(() => {
          toast.success('Playlist added')
          setFormData({
            name: '',
            description: '',
            image: null,
            editingId: null,
          })
        })
        .catch(toast.error)
    }
  }

  const handleEdit = (playlist) => {
    setFormData({
      name: playlist.name,
      description: playlist.description,
      image: null,
      editingId: playlist._id,
    })
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this playlist?')) {
      dispatch(deletePlaylist(id))
        .unwrap()
        .then(() => toast.success('Playlist deleted'))
        .catch(toast.error)
    }
  }

  return (
    <div className="p-6 text-white">
      <h2 className="text-3xl font-bold mb-6">Your Playlists</h2>

      <form
        onSubmit={handleSubmit}
        className="mb-10 bg-gray-800 p-4 rounded grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Playlist Name"
          required
          className="p-2 rounded bg-gray-700 text-white"
        />
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
          className="p-2 rounded bg-gray-700 text-white"
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="p-2 rounded bg-gray-700 text-white"
        />
        <button
          type="submit"
          className="col-span-full bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white font-semibold"
        >
          {formData.editingId ? 'Update Playlist' : 'Add Playlist'}
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {loading ? (
          <p>Loading playlists...</p>
        ) : (
          playlists.map(({ _id, name, description, image }) => (
            <div
              key={_id}
              className="bg-gray-900 rounded p-4 flex flex-col hover:bg-green-700 transition"
            >
              <img
                src={image}
                alt={name}
                className="rounded mb-4 object-cover w-full h-48"
              />
              <h3 className="text-xl font-semibold mb-1">
                <Link to={`/playlists/${_id}`}> {name}</Link>
              </h3>
              <p className="text-gray-400 mb-4 flex-grow">{description}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit({ _id, name, description })}
                  className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(_id)}
                  className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
