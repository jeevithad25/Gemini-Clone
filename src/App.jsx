import { useState } from 'react'
import Login from './components/Login/Login'
import Sidebar from './components/Sidebar/Sidebar'
import Main from './components/Main/Main'

const App = () => {
  const [user, setUser] = useState(null)
  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  if(!user) {
    return <Login onLogin={setUser}/>
  }

  return (
    <div className={`app ${theme}`}>
      <Sidebar user={user} toggleTheme={toggleTheme} theme={theme}/>
      <Main user={user}/>
    </div>
  )
}

export default App