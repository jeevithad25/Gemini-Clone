import React, { useContext, useMemo, useState } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const Main = ({user, setExtended}) => {
  const {onSent, recentPrompt, showResult, loading, resultData, setInput, input, newChat} = useContext(Context)
  const [refreshKey, setRefreshKey] = useState(0)

  const handleVoice = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) return
    const recognition = new SpeechRecognition()
    recognition.lang = 'en-US'
    recognition.start()
    recognition.onresult = (event) => {
      setInput(event.results[0][0].transcript)
    }
  }

  const getSmartSuggestions = () => {
    const defaultCards = [
      { text: "What's the best way to learn programming?", icon: assets.code_icon },
      { text: "Give me creative ideas for a weekend trip", icon: assets.compass_icon },
      { text: "Help me write a professional bio", icon: assets.message_icon },
      { text: "Explain artificial intelligence simply", icon: assets.bulb_icon },
      { text: "What are healthy meal prep ideas?", icon: assets.compass_icon },
      { text: "How to improve my productivity?", icon: assets.bulb_icon },
      { text: "Write a motivational quote for today", icon: assets.message_icon },
      { text: "What skills are in demand in 2027?", icon: assets.code_icon },
    ]
    return defaultCards.sort(() => Math.random() - 0.5).slice(0, 4)
  }

  const smartCards = useMemo(() => getSmartSuggestions(), [refreshKey])

  return (
    <div className="main">

      {/* NAV */}
      <div className="nav">
        <p>Gemini</p>
        <img src={user.photoURL} alt="" />
      </div>

      {/* SCROLLABLE MIDDLE AREA */}
      <div className="main-container">
        {!showResult
          ? <>
              <div className="greet">
                <p><span>Hello, {user.displayName}!</span></p>
                <p>How can I help you today?</p>
                <button
                  onClick={() => setRefreshKey(prev => prev + 1)}
                  style={{
                    background: 'none',
                    border: '1px solid #4a7c6f',
                    color: '#4a7c6f',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    marginTop: '10px'
                  }}
                >
                  🔄 Refresh suggestions
                </button>
              </div>

              <div className="cards">
                {smartCards.map((item, index) => (
                  <div
                    className="card"
                    key={index}
                    onClick={() => setInput(item.text)}
                  >
                    <p>{item.text}</p>
                    <img src={item.icon} alt="" />
                  </div>
                ))}
              </div>
            </>

          : <div className="result">
              <div className="result-title">
                <img src={user.photoURL} alt="" />
                <p>{recentPrompt}</p>
              </div>
              <div className="result-data">
                <img src={assets.gemini_icon} alt="" />
                {loading
                  ? <div className="loader">
                      <hr />
                      <hr />
                      <hr />
                    </div>
                  : <p dangerouslySetInnerHTML={{__html: resultData}}></p>
                }
              </div>
            </div>
        }
      </div>

      {/* INPUT BAR — OUTSIDE scroll area, always at bottom */}
      <div className="main-bottom">
        <div className="search-box">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Enter a prompt here"
          />
          <div>
            <img src={assets.gallery_icon} alt="" />
            <img
              src={assets.mic_icon}
              alt=""
              onClick={handleVoice}
              style={{cursor:'pointer'}}
            />
            {input
              ? <img onClick={() => onSent()} src={assets.send_icon} alt="" />
              : null
            }
          </div>
        </div>
        <p className="bottom-info">
          Gemini may display inaccurate info, including about people, so double-check its response.
        </p>
      </div>
      {/* Mobile bottom nav */}
      <div className="mobile-nav">
       <img src={assets.menu_icon} alt="menu"
       onClick={() => alert('clicked!')} />
       <img src={assets.plus_icon} alt="new chat"
       onClick={() => newChat()} />
       <img src={assets.history_icon} alt="history"
       onClick={() => setExtended(true)} />
       <img src={assets.question_icon} alt="help" />
       <img src={assets.setting_icon} alt="settings" />
      </div>
  </div>
  )
}

export default Main