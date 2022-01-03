import { useState } from 'react'
import axios from 'axios'

const projectID = '826c8e32-62a8-4e86-9ea5-376619a1922f'

const Modal = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()

    const authObject = {
      'Project-ID': projectID,
      'User-Name': username,
      'User-Secret': password,
    }

    try {
      await axios.get('https://api.chatengine.io/chats', {
        headers: authObject,
      })

      localStorage.setItem('username', username)
      localStorage.setItem('password', password)

      window.location.reload()
      setError('')
    } catch (err) {
      setError('Somthing is wrong, incorrect credentials.')
    }
  }

  return (
    <div className='wrapper'>
      <div className='form'>
        <h1 className='title'>My Chat Application</h1>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            value={username}
            onChange={e => setUsername(e.target.value)}
            className='input'
            placeholder='Username'
            required
          />
          <input
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            className='input'
            placeholder='Password'
            required
          />
          <div align='center'>
            <button type='submit' className='button'>
              <span>Join</span>
            </button>
          </div>
        </form>
        <h1>{error}</h1>
      </div>
    </div>
  )
}

export default Modal
