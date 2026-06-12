import { useState, useEffect } from 'react'
import Login from './components/Login/Login'
import Sidebar from './components/Sidebar/Sidebar'
import Main from './components/Main/Main'
import { auth } from './firebase'
import { getRedirectResult } from 'firebase/auth'

const App = () => {
  const [user, setUser] = useState(null)
  const [theme, setTheme] = useState('light')
  const [extended, setExtended] = useState(true) 

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  useEffect(() => {
    getRedirectResult(auth).then((result) => {
      if (result?.user) setUser(result.user)
    })
    const unsubscribe = auth.onAuthStateChanged((u) => {
      if (u) setUser(u)
    })
    return () => unsubscribe()
  }, [])

  if (!user) {
    return <Login onLogin={setUser} />
  }

  return (
    <div className={`app ${theme}`}>
      <Sidebar 
        user={user} 
        toggleTheme={toggleTheme} 
        theme={theme}
        extended={extended}           
        setExtended={setExtended}     
      />
      <Main 
        user={user}
        setExtended={setExtended}    
      />
    </div>
  )
}

export default App