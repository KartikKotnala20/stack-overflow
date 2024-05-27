import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateProfile } from '../../Actions/users'

const EditProfileForm = ({ currentUser, setSwitch }) => {
  const [name, setName] = useState(currentUser?.result?.name || '')
  const [about, setAbout] = useState(currentUser?.result?.about || '')
  const [tags, setTags] = useState(currentUser?.result?.tags || [])
  const dispatch = useDispatch()

  useEffect(() => {
    setName(currentUser?.result?.name || '')
    setAbout(currentUser?.result?.about || '')
    setTags(currentUser?.result?.tags || [])
  }, [currentUser])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (tags.length === 0 || (tags.length === 1 && tags[0] === '')) {
      alert('Please update the tags field')
    } else {
      dispatch(updateProfile(currentUser?.result?._id, { name, about, tags }))
      setSwitch(false)
    }
  }

  return (
    <div>
      <h1 className='edit-profile-title'>Edit Your Profile</h1>
      <h2 className='edit-profile-title-2'>Public information</h2>
      <form className='edit-profile-form' onSubmit={handleSubmit}>
        <label htmlFor='name'>
          <h3>Display name</h3>
          <input
            type='text'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label htmlFor='about'>
          <h3>About me</h3>
          <textarea
            id='about'
            cols='30'
            rows='10'
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          ></textarea>
        </label>
        <label htmlFor='tags'>
          <h3>Watched tags</h3>
          <p>Add tags separated by 1 space</p>
          <input
            type='text'
            id='tags'
            value={tags.join(' ')}
            onChange={(e) => setTags(e.target.value.split(' ').filter(tag => tag))}
          />
        </label>
        <br />
        <input type='submit' value='Save profile' className='user-submit-btn' />
        <button
          type='button'
          className='user-cancel-btn'
          onClick={() => setSwitch(false)}
        >
          Cancel
        </button>
      </form>
    </div>
  )
}

export default EditProfileForm
