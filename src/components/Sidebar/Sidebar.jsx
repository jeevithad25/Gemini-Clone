import React, { useContext, useState } from 'react'
import "./Sidebar.css"
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'
import { auth } from '../../firebase'
import { signOut } from 'firebase/auth'

const Sidebar = ({user, toggleTheme, theme, extended, setExtended}) => {
  const [activePanel, setActivePanel] = useState(null)
  const {onSent, prevPrompts, setRecentPrompt, newChat} = useContext(Context)

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt)
    await onSent(prompt)
  }

  const togglePanel = (panel) => {
    setActivePanel(activePanel === panel ? null : panel)
  }

  return (
    <div className={`sidebar $extended ? 'extended':"}`}>

      <div className="top">
        <img onClick={()=>setExtended(prev=>!prev)} className="menu" src={assets.menu_icon} alt="" />
        <div onClick={()=>newChat()} className="new-chat">
          <img src={assets.plus_icon} alt="" />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended
          ? <div className="recent">
              <p className="recent-title">Recent</p>
              {prevPrompts.map((item, index) => (
                <div onClick={()=>loadPrompt(item)} className="recent-entry" key={index}>
                  <img src={assets.message_icon} alt="" />
                  <p>{item.slice(0,18)} ...</p>
                </div>
              ))}
            </div>
          : null
        }
      </div>

      <div className="bottom">
        <div onClick={()=>togglePanel('help')} className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extended ? <p>Help</p> : null}
        </div>
        <div onClick={()=>togglePanel('activity')} className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extended ? <p>Activity</p> : null}
        </div>
        <div onClick={()=>togglePanel('settings')} className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>

      {activePanel === 'help' && (
        <div className="sidebar-panel">
          <h3>Help</h3>
          <p>🖥 How to use: Type a prompt and press send</p>
          <p>💡 Tips: Be specific for better results</p>
          <p>⌨ Shortcuts: Enter to send</p>
          <p>📞 Contact: support@geminiclone.com</p>
          <p>❓ FAQ: Visit our website</p>
          <p>ℹ About: Gemini Clone v1.0</p>
        </div>
      )}

      {activePanel === 'activity' && (
        <div className="sidebar-panel">
          <h3>Activity</h3>
          <p>🟢 Recent Chats:</p>
          {prevPrompts.map((item, index) => (
            <p key={index} onClick={()=>loadPrompt(item)} style={{cursor:'pointer'}}>• {item.slice(0,25)}...</p>
          ))}
          <p style={{cursor:'pointer', color:'red'}} onClick={()=>localStorage.clear()}>🗑 Clear History</p>
        </div>
      )}

      {activePanel === 'settings' && (
        <div className="sidebar-panel">
          <h3>Settings</h3>
          <p>👤 {user?.displayName} - {user?.email}</p>
          <p onClick={toggleTheme} style={{cursor:'pointer'}}>
            {theme === 'light' ? '🌙 Dark Mode' : '🌞 Light Mode'}
          </p>
          <p>🌐 Language (coming soon)</p>
          <p>📱 About App: Gemini Clone v1.0</p>
          <p>🔒 Privacy Policy</p>
          <p>📄 Terms of Service</p>
          <p style={{cursor:'pointer', color:'red'}}
            onClick={()=>signOut(auth).then(()=>window.location.reload())}>
            🚪 Sign Out
          </p>
        </div>
      )}

    </div>
  )
}

export default Sidebar