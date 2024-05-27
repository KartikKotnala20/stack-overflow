import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './AskQuestions.css'
import { askQuestion } from '../../Actions/question'


const AskQuestion = () => {
  const [questionTitle, setQuestionTitle] = useState('')
  const [questionBody, setQuestionBody] = useState('')
  const [questionTags, setQuestionTags] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const dispatch = useDispatch()
  const User = useSelector((state) => state.currentUserReducer)
  const navigate = useNavigate()

  const validateForm = () => {
    if (!questionTitle || !questionBody || !questionTags) {
      setError('Please fill in all fields')
      return false
    }
    if (questionTags.length > 5) {
      setError('Please add up to 5 tags only')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!User) {
      setError('Login to ask question')
      return
    }

    if (!validateForm()) return

    setLoading(true)
    try {
      await dispatch(
        askQuestion(
          {
            questionTitle,
            questionBody,
            questionTags,
            userPosted: User.result.name,
          },
          navigate
        )
      )
    } catch (err) {
      setError('An error occurred while submitting your question')
    } finally {
      setLoading(false)
    }
  }

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      setQuestionBody(questionBody + '\n')
    }
  }

  return (
    <div className='ask-question'>
      <div className='ask-ques-container'>
        <h1>Ask a public Question</h1>
        {error && <p className='error'>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className='ask-form-container'>
            <label htmlFor='ask-ques-title'>
              <h4>Title</h4>
              <p>Be specific and imagine you’re asking a question to another person</p>
              <input
                type='text'
                id='ask-ques-title'
                value={questionTitle}
                onChange={(e) => setQuestionTitle(e.target.value)}
                placeholder='e.g. Is there an R function for finding the index of an element in a vector?'
              />
            </label>
            <label htmlFor='ask-ques-body'>
              <h4>Body</h4>
              <p>Include all the information someone would need to answer your question</p>
              <textarea
                id='ask-ques-body'
                value={questionBody}
                onChange={(e) => setQuestionBody(e.target.value)}
                cols="30"
                rows="10"
                onKeyPress={handleEnter}
              ></textarea>
            </label>
            <label htmlFor='ask-ques-tags'>
              <h4>Tags</h4>
              <p>Add up to 5 tags to describe what your question is about</p>
              <input
                type='text'
                id='ask-ques-tags'
                value={questionTags}
                onChange={(e) => setQuestionTags(e.target.value.split(' '))}
                placeholder='e.g. (xml typescript wordpress)'
              />
            </label>
          </div>
          <button type='submit' className='review-btn' disabled={loading}>
            {loading ? 'Submitting...' : 'Review your question'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AskQuestion