import { auth, provider } from '../../firebase'
import { signInWithPopup } from 'firebase/auth'
import './Login.css'

const Login = ({ onLogin }) => {

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      onLogin(result.user)
    } catch (error) {
      console.error(error)
      alert(error.message)
    }
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