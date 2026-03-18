import { useState, useRef, useEffect } from 'react'

const BOT_NAME = 'Faisal AI'

const KNOWLEDGE = {
  name: 'Faisal Hossain',
  role: 'Aspiring Python Full-Stack Developer',
  location: 'Bangladesh',
  github: 'https://github.com/HAVIC-47',
  facebook: 'https://www.facebook.com/HAVIC47',
  instagram: 'https://www.instagram.com/visuals_of_faisal',
  discord: 'https://discord.gg/pgakM24PEs',
  languages: ['Python', 'C', 'Java', 'Prolog', 'HTML', 'CSS', 'JavaScript'],
  frameworks: ['Django', 'Apache'],
  tools: ['Git', 'GitHub', 'MySQL', 'Notion', 'Canva', 'Jupyter Notebooks'],
  concepts: ['Machine Learning', 'Data Analysis', 'Algorithms', 'OS Concepts', 'Compiler Design', 'DBMS', 'Web Development'],
  projects: [
    { name: 'Machine Strike', desc: 'AI-powered board game from Horizon Forbidden West using Python with minimax and alpha-beta pruning', tech: 'Python, AI' },
    { name: 'NoteSwap', desc: 'Web app for students to share and exchange notes, built with Django through 3 iterations', tech: 'Python, Django, CSS' },
    { name: 'Life Expectancy Prediction', desc: 'ML project predicting life expectancy using data analysis and predictive modeling', tech: 'Jupyter, ML' },
    { name: 'EventEase', desc: 'Event management web application with clean UI', tech: 'HTML, CSS, JavaScript' },
    { name: 'Compiler', desc: 'Compiler implementation with lexical analysis and parsing', tech: 'Python' },
    { name: 'OS Scheduling Algorithms', desc: 'FCFS and SJF CPU scheduling implementations', tech: 'Python' },
    { name: 'AI Lab Projects', desc: 'AI coursework in Prolog — logic programming and search algorithms', tech: 'Prolog' },
  ],
  education: 'BSc in Computer Science & Engineering (ongoing)',
  interests: ['AI', 'Systems Programming', 'Photography'],
}

function getResponse(input) {
  const q = input.toLowerCase().trim()

  // Greetings
  if (/^(hi|hello|hey|yo|sup|greetings|assalamu|salam)/i.test(q)) {
    return `Hey there! 👋 I'm ${BOT_NAME}, Faisal's virtual assistant. I can tell you about his skills, projects, education, or how to contact him. What would you like to know?`
  }

  // Name / who
  if (/who (is|are)|your name|about (faisal|him|you)|tell me about/i.test(q)) {
    return `**${KNOWLEDGE.name}** is an ${KNOWLEDGE.role} from ${KNOWLEDGE.location}. He's passionate about building real-world applications — from AI-powered games to web platforms. He's currently pursuing a BSc in Computer Science & Engineering.`
  }

  // Projects
  if (/project|built|portfolio|work|made|create/i.test(q)) {
    const list = KNOWLEDGE.projects.map(p => `• **${p.name}** — ${p.desc}`).join('\n')
    return `Here are Faisal's key projects:\n\n${list}\n\nWant details on any specific one?`
  }

  // Specific project queries
  if (/machine.?strike|board.?game|horizon/i.test(q)) {
    return `**Machine Strike** is a recreation of the Horizon Forbidden West in-game board game. It features an AI opponent built with minimax and alpha-beta pruning algorithms in Python. It's a deep dive into game theory and adversarial search! 🎮`
  }
  if (/noteswap|note.?swap|notes/i.test(q)) {
    return `**NoteSwap** is a web app where students can share and exchange notes. Faisal built it with Django and went through 3 iterations to refine the UX and features. It's one of his most iterated-upon projects! 📝`
  }
  if (/life.?expect|prediction|ml project/i.test(q)) {
    return `**Life Expectancy Prediction** is a machine learning project that analyzes health and economic indicators to predict life expectancy. Built with Jupyter Notebooks using data analysis and predictive modeling techniques. 📊`
  }
  if (/event|eventease/i.test(q)) {
    return `**EventEase** is an event management web app built with HTML, CSS, and JavaScript. It lets users organize, track, and manage events with a clean, intuitive interface. 📅`
  }
  if (/compiler/i.test(q)) {
    return `Faisal built a **Compiler** in Python that explores lexical analysis, parsing, and code generation — essentially understanding how programming languages work under the hood! 🔧`
  }

  // Skills / languages / tech
  if (/skill|language|tech|stack|know|proficien|tools|framework/i.test(q)) {
    return `Faisal's tech stack:\n\n**Languages:** ${KNOWLEDGE.languages.join(', ')}\n**Frameworks:** ${KNOWLEDGE.frameworks.join(', ')}\n**Tools:** ${KNOWLEDGE.tools.join(', ')}\n**Concepts:** ${KNOWLEDGE.concepts.join(', ')}\n\nPython is his strongest language — he's working toward becoming a full-stack Python developer.`
  }

  // Python specific
  if (/python/i.test(q)) {
    return `Python is Faisal's primary language! He uses it for web development (Django), AI/ML projects, game development (Machine Strike), compiler design, and OS concepts. He's on a path to becoming a **Python full-stack developer**. 🐍`
  }

  // Education
  if (/educat|study|university|college|degree|school|cgpa|gpa/i.test(q)) {
    return `Faisal is currently pursuing a **BSc in Computer Science & Engineering**. His coursework includes Operating Systems, AI, Compiler Design, Data Structures, and DBMS. He's been coding since 2023 and has built 15+ projects since then. 🎓`
  }

  // Contact / social
  if (/contact|reach|email|social|connect|hire|message/i.test(q)) {
    return `You can reach Faisal through:\n\n• **GitHub:** [HAVIC-47](${KNOWLEDGE.github})\n• **Facebook:** [HAVIC47](${KNOWLEDGE.facebook})\n• **Instagram:** [@visuals_of_faisal](${KNOWLEDGE.instagram})\n• **Discord:** [Join server](${KNOWLEDGE.discord})\n\nOr use the **Contact page** to send him a message directly!`
  }

  // Location
  if (/where|location|country|live|from/i.test(q)) {
    return `Faisal is from **${KNOWLEDGE.location}**. He's a CS student there, building projects and growing as a developer. 🌍`
  }

  // AI / ML
  if (/\bai\b|artificial|machine.?learn|deep.?learn|neural/i.test(q)) {
    return `Faisal is deeply interested in AI & ML! He's built:\n\n• **Machine Strike** — AI game with minimax/alpha-beta pruning\n• **Life Expectancy Prediction** — ML predictive modeling\n• **AI Lab Projects** — Logic programming in Prolog\n\nHe's currently expanding into deep learning and neural networks. 🤖`
  }

  // Photography / Instagram
  if (/photo|instagram|visual|camera/i.test(q)) {
    return `Beyond coding, Faisal is into **visual storytelling** and photography! Check out his work on Instagram: [@visuals_of_faisal](${KNOWLEDGE.instagram}) 📸`
  }

  // Experience / years
  if (/experience|year|how long|journey/i.test(q)) {
    return `Faisal has been coding for **3+ years** (since 2023). He started with C and Python, expanded into web dev with Django, then dove into ML and AI. He's built **15+ projects** across multiple domains — from games to web apps to ML models.`
  }

  // Hiring / freelance
  if (/hire|freelance|avail|open to|looking for/i.test(q)) {
    return `Faisal is always open to interesting opportunities and collaborations! Whether it's a project, internship, or just a tech conversation — reach out through the **Contact page** or connect on his socials. 🤝`
  }

  // Thanks
  if (/thank|thanks|thx|appreciate/i.test(q)) {
    return `You're welcome! 😊 Feel free to ask me anything else about Faisal, or head over to the **Contact page** to get in touch directly.`
  }

  // Goodbye
  if (/bye|goodbye|see ya|later|cya/i.test(q)) {
    return `See you later! 👋 Don't forget to check out Faisal's projects and connect with him. Have a great day!`
  }

  // Help
  if (/help|what can you|what do you/i.test(q)) {
    return `I can help you learn about:\n\n• 🧑 **Who Faisal is** — background & education\n• 💻 **His projects** — Machine Strike, NoteSwap, and more\n• 🛠️ **Tech skills** — languages, frameworks, tools\n• 📬 **Contact info** — socials & how to reach him\n• 🤖 **AI/ML work** — his AI projects\n• 📸 **Photography** — his visual work\n\nJust ask away!`
  }

  // Fallback
  const fallbacks = [
    `Hmm, I'm not sure about that! I know all about Faisal's **projects**, **skills**, **education**, and **contact info**. Try asking about one of those!`,
    `That's a bit outside my knowledge 😅 But I can tell you about Faisal's tech stack, projects, or how to contact him. What interests you?`,
    `I'm best at answering questions about Faisal! Try asking about his **projects**, **skills**, or **background**. 💡`,
  ]
  return fallbacks[Math.floor(Math.random() * fallbacks.length)]
}

// Simple markdown-like rendering
function renderMessage(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/\n/g, '<br/>')
}

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { from: 'bot', text: `Hey! 👋 I'm **${BOT_NAME}**, Faisal's virtual assistant. Ask me anything about his skills, projects, or how to connect!` }
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const messagesEnd = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  function send() {
    const text = input.trim()
    if (!text) return
    setMessages(prev => [...prev, { from: 'user', text }])
    setInput('')
    setTyping(true)

    // Simulate thinking delay
    const delay = 400 + Math.random() * 800
    setTimeout(() => {
      const response = getResponse(text)
      setMessages(prev => [...prev, { from: 'bot', text: response }])
      setTyping(false)
    }, delay)
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Toggle chat"
        style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 1100,
          width: 56, height: 56, borderRadius: '50%',
          background: 'var(--accent)', color: '#fff', border: 'none',
          cursor: 'pointer', fontSize: '1.4rem',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(108,99,255,0.4)',
          transition: 'all 0.3s ease',
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
        }}
      >
        <i className={open ? 'ri-close-line' : 'ri-robot-2-line'}></i>
      </button>

      {/* Chat Window */}
      <div style={{
        position: 'fixed', bottom: 92, right: 24, zIndex: 1099,
        width: 380, maxWidth: 'calc(100vw - 48px)',
        height: open ? 520 : 0,
        maxHeight: 'calc(100vh - 120px)',
        background: 'var(--bg-secondary)',
        border: open ? '1px solid var(--border)' : 'none',
        borderRadius: 16,
        overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        boxShadow: open ? '0 12px 40px rgba(0,0,0,0.3)' : 'none',
        transition: 'height 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s ease',
        opacity: open ? 1 : 0,
      }}>
        {/* Header */}
        <div style={{
          padding: '1rem 1.25rem',
          background: 'var(--bg-card)',
          borderBottom: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', gap: '0.75rem',
          flexShrink: 0,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'var(--accent-glow)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--accent)', fontSize: '1.1rem',
          }}>
            <i className="ri-robot-2-fill"></i>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.95rem' }}>
              {BOT_NAME}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }}></span>
              Online
            </div>
          </div>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1, overflowY: 'auto', padding: '1rem',
          display: 'flex', flexDirection: 'column', gap: '0.75rem',
        }}>
          {messages.map((msg, i) => (
            <div key={i} style={{
              display: 'flex',
              justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start',
            }}>
              <div style={{
                maxWidth: '85%',
                padding: '0.65rem 1rem',
                borderRadius: msg.from === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                background: msg.from === 'user' ? 'var(--accent)' : 'var(--bg-card)',
                color: msg.from === 'user' ? '#fff' : 'var(--text-primary)',
                fontSize: '0.875rem',
                lineHeight: 1.55,
                border: msg.from === 'bot' ? '1px solid var(--border)' : 'none',
                wordBreak: 'break-word',
              }}
                dangerouslySetInnerHTML={{ __html: renderMessage(msg.text) }}
              />
            </div>
          ))}

          {typing && (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div style={{
                padding: '0.65rem 1rem', borderRadius: '14px 14px 14px 4px',
                background: 'var(--bg-card)', border: '1px solid var(--border)',
                display: 'flex', gap: 4, alignItems: 'center',
              }}>
                <span className="typing-dot" style={{ animationDelay: '0s' }}></span>
                <span className="typing-dot" style={{ animationDelay: '0.15s' }}></span>
                <span className="typing-dot" style={{ animationDelay: '0.3s' }}></span>
              </div>
            </div>
          )}

          <div ref={messagesEnd} />
        </div>

        {/* Input */}
        <div style={{
          padding: '0.75rem 1rem',
          borderTop: '1px solid var(--border)',
          background: 'var(--bg-card)',
          display: 'flex', gap: '0.5rem', alignItems: 'center',
          flexShrink: 0,
        }}>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask about Faisal..."
            style={{
              flex: 1, padding: '0.6rem 0.85rem',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: 10, color: 'var(--text-primary)',
              fontFamily: 'var(--font-body)', fontSize: '0.85rem',
              outline: 'none', transition: 'border-color 0.2s',
            }}
            onFocus={e => e.target.style.borderColor = 'var(--accent)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'}
          />
          <button
            onClick={send}
            disabled={!input.trim()}
            style={{
              width: 38, height: 38, borderRadius: 10,
              background: input.trim() ? 'var(--accent)' : 'var(--bg-secondary)',
              color: input.trim() ? '#fff' : 'var(--text-muted)',
              border: 'none', cursor: input.trim() ? 'pointer' : 'default',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1rem', transition: 'all 0.2s ease',
              flexShrink: 0,
            }}
          >
            <i className="ri-send-plane-fill"></i>
          </button>
        </div>
      </div>

      <style>{`
        .typing-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--text-muted); display: inline-block;
          animation: typingBounce 1s ease-in-out infinite;
        }
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </>
  )
}
