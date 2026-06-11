import { auth, provider } from '../../firebase'
import { signInWithRedirect, getRedirectResult } from 'firebase/auth'
import { useEffect } from 'react'
import './Login.css'

const Login = ({ onLogin }) => {

  useEffect(() => {
    getRedirectResult(auth).then((result) => {
      if (result?.user) {
        onLogin(result.user)
      }
    })
  }, [])

  const handleLogin = () => {
    signInWithRedirect(auth, provider)
  }

  return (
    <div className="login">
      <h1>Gemini Clone</h1>
      <p>Sign in to continue</p>
      <button onClick={handleLogin}>
        Sign in with Google
      </button>
    </div>
  )
}

export default Login