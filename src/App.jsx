import { useMemo, useState } from 'react'
import KnowledgeUniverse from './components/KnowledgeUniverse'
import { knowledgeDomains } from './data/knowledge'

function DetailPanel({ selected, onClose }) {
  if (!selected) return null
  const domain = knowledgeDomains.find((item) => item.id === selected.id) || selected

  return (
    <aside className="detail-panel">
      <button className="close-button" onClick={onClose} aria-label="关闭详情">×</button>
      <div className="panel-orb" style={{ '--orb-color': domain.color }} />
      <span className="eyebrow">KNOWLEDGE DOMAIN</span>
      <h2>{domain.name}</h2>
      <p className="panel-subtitle">{domain.subtitle}</p>
      <p className="panel-stats">{domain.stats}</p>
      <div className="panel-line" />
      <p className="panel-copy">
        这里会连接到你的真实知识分类、文章列表和项目。第一版先验证“知识星球即导航”的交互体验。
      </p>
      <button className="explore-button">EXPLORE DOMAIN <span>↗</span></button>
    </aside>
  )
}

export default function App() {
  const [selected, setSelected] = useState(null)
  const selectedIndex = useMemo(
    () => knowledgeDomains.findIndex((item) => item.id === selected?.id),
    [selected],
  )

  return (
    <main className="app-shell">
      <div className="noise" />
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Xuan.Z 首页">
          <span className="brand-mark">X</span>
          <span>
            <strong>XUAN.Z</strong>
            <small>PERSONAL NOTES</small>
          </span>
        </a>
        <nav>
          <a href="#universe">Universe</a>
          <a href="#learning">Learning</a>
          <a href="#projects">Projects</a>
          <a href="#notes">Notes</a>
        </nav>
        <span className="status"><i /> KNOWLEDGE SYSTEM ONLINE</span>
      </header>

      <section id="universe" className="hero">
        <div className="universe-canvas">
          <KnowledgeUniverse selected={selected} setSelected={setSelected} />
        </div>

        <div className={`hero-copy ${selected ? 'is-dimmed' : ''}`}>
          <span className="eyebrow">XUAN.Z · KNOWLEDGE UNIVERSE</span>
          <h1>
            I BUILD MY OWN
            <em>UNIVERSE OF KNOWLEDGE.</em>
          </h1>
          <p>
            每一颗星辰，代表一个持续探索的知识领域。拖动视线，靠近它，进入我的学习、项目与思考。
          </p>
          <div className="hero-hint"><span>↙</span> HOVER A PLANET · CLICK TO FOCUS</div>
        </div>

        <div className="domain-rail" aria-label="知识领域导航">
          {knowledgeDomains.map((domain, index) => (
            <button
              key={domain.id}
              className={selectedIndex === index ? 'active' : ''}
              onClick={() => setSelected({ ...domain, position: { x: 0, y: 0, z: 0 } })}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              {domain.name}
            </button>
          ))}
        </div>

        <DetailPanel selected={selected} onClose={() => setSelected(null)} />

        <div className="corner-copy left">SCROLL TO DESCEND<br />INTO THE ARCHIVE ↓</div>
        <div className="corner-copy right">06 DOMAINS<br />∞ CONNECTIONS</div>
      </section>

      <section className="manifesto" id="learning">
        <span className="eyebrow">THE IDEA</span>
        <h2>知识不是目录，是一个不断形成引力的宇宙。</h2>
        <p>
          首屏负责建立世界观；进入文章以后回到清晰、克制、高可读的博客体验。3D 是导航和记忆点，不是阅读负担。
        </p>
      </section>
    </main>
  )
}
