import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import './App.css'

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#goal', label: 'Goal' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

const SKILLS = [
  'HTML5',
  'CSS3',
  'JavaScript (ES6+)',
  'React',
  'Tailwind CSS',
  'Git & GitHub',
  'Responsive Web Design',
  'UI Development',
]

const LANGUAGES = [
  { level: 'NATIVE', name: 'Uzbek', width: '100%' },
  { level: 'ADVANCED', name: 'English', width: '85%' },
  { level: 'FLUENT', name: 'Russian', width: '90%' },
]

const INTERESTS = [
  'Web Development',
  'Frontend Development',
  'Responsive Design',
  'UI/UX Design',
  'Modern Web Technologies',
  'Open Source',
  'Continuous Learning',
]

const SOFT_SKILLS = [
  { title: 'Problem Solving', desc: 'Breaking down challenges into workable steps.' },
  { title: 'Teamwork', desc: 'Collaborating well with others toward a shared goal.' },
  { title: 'Communication', desc: 'Explaining ideas clearly and listening closely.' },
  { title: 'Time Management', desc: 'Staying organized and meeting deadlines.' },
  { title: 'Adaptability', desc: 'Adjusting quickly to new tools and situations.' },
  { title: 'Creativity', desc: 'Finding fresh angles on familiar problems.' },
  { title: 'Attention to Detail', desc: 'Getting the small things right, every time.' },
]

const PROJECTS = [
  {
    icon: '🌦️',
    title: 'Weather App',
    desc: 'A responsive web app that shows real-time weather data for any city using a weather API.',
    chips: ['HTML', 'CSS', 'JavaScript', 'API'],
  },
  {
    icon: '✅',
    title: 'To-Do List App',
    desc: 'A task management app that lets users add, edit, mark as complete, and delete daily tasks.',
    chips: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    icon: '💰',
    title: 'Expense Tracker',
    desc: 'A personal finance app for tracking income and expenses, calculating total balance, and managing transactions.',
    chips: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    icon: '👕',
    title: 'Clothing Store Website',
    desc: 'A responsive online clothing store with a product list, categories, and a modern shopping interface.',
    chips: ['React', 'Tailwind CSS'],
  },
  {
    icon: '👥',
    title: 'User Cards',
    desc: 'A project that dynamically displays user cards using React components, props, and the map() method.',
    chips: ['React', 'CSS'],
  },
  {
    icon: '💼',
    title: 'Personal Portfolio Website',
    desc: 'A modern, responsive portfolio site showcasing my skills, projects, and experience.',
    chips: ['React', 'Tailwind CSS'],
  },
]

function ProjectCard({ icon, title, desc, chips }) {
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    const rotY = ((x - cx) / cx) * 8
    const rotX = -((y - cy) / cy) * 8
    card.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`
  }

  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = 'rotateX(0deg) rotateY(0deg)'
  }

  return (
    <div className="pcard" ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <div className="picon">{icon}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
      <div className="chip-row">
        {chips.map((chip) => (
          <span className="chip" key={chip}>
            {chip}
          </span>
        ))}
      </div>
    </div>
  )
}

function App() {
  const heroCanvasRef = useRef(null)
  const aboutCanvasRef = useRef(null)
  const projectsCanvasRef = useRef(null)

  useEffect(() => {
    const heroCanvas = heroCanvasRef.current
    const aboutCanvas = aboutCanvasRef.current
    const projectsCanvas = projectsCanvasRef.current
    if (!heroCanvas || !aboutCanvas || !projectsCanvas) return

    /* ============ HERO: floating wireframe model ============ */
    const heroScene = new THREE.Scene()
    const heroCam = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    )
    heroCam.position.z = 26
    const heroRenderer = new THREE.WebGLRenderer({ canvas: heroCanvas, antialias: true, alpha: true })
    heroRenderer.setSize(window.innerWidth, window.innerHeight)
    heroRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const heroGeo = new THREE.IcosahedronGeometry(8, 1)
    const heroMat = new THREE.MeshBasicMaterial({
      color: 0xc8ff4d,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    })
    const heroMesh = new THREE.Mesh(heroGeo, heroMat)
    heroMesh.position.set(9, -1, -4)
    heroScene.add(heroMesh)

    const heroGeo2 = new THREE.IcosahedronGeometry(6.6, 0)
    const heroMat2 = new THREE.MeshBasicMaterial({
      color: 0x9b7fff,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    })
    const heroMesh2 = new THREE.Mesh(heroGeo2, heroMat2)
    heroMesh2.position.copy(heroMesh.position)
    heroScene.add(heroMesh2)

    const sGeo = new THREE.BufferGeometry()
    const sCount = 700
    const sPos = new Float32Array(sCount * 3)
    for (let i = 0; i < sCount; i++) {
      sPos[i * 3] = (Math.random() - 0.5) * 200
      sPos[i * 3 + 1] = (Math.random() - 0.5) * 200
      sPos[i * 3 + 2] = (Math.random() - 0.5) * 200
    }
    sGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3))
    const sMat = new THREE.PointsMaterial({ color: 0xebeef5, size: 0.5, transparent: true, opacity: 0.6 })
    const starPts = new THREE.Points(sGeo, sMat)
    heroScene.add(starPts)

    let hMouseX = 0
    let hMouseY = 0
    const handleMouseMove = (e) => {
      hMouseX = e.clientX / window.innerWidth - 0.5
      hMouseY = e.clientY / window.innerHeight - 0.5
    }
    window.addEventListener('mousemove', handleMouseMove)

    let heroAnim
    const animateHero = () => {
      heroAnim = requestAnimationFrame(animateHero)
      heroMesh.rotation.y += 0.0025
      heroMesh.rotation.x += 0.0009
      heroMesh2.rotation.y -= 0.0016
      starPts.rotation.y += 0.0002
      heroCam.position.x += (hMouseX * 5 - heroCam.position.x) * 0.02
      heroCam.position.y += (-hMouseY * 3 - heroCam.position.y) * 0.02
      heroCam.lookAt(heroScene.position)
      heroRenderer.render(heroScene, heroCam)
    }
    animateHero()

    /* ============ ABOUT: model that EXPLODES into particles on scroll ============ */
    const aboutScene = new THREE.Scene()
    const aboutCam = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    )
    aboutCam.position.z = 30
    const aboutRenderer = new THREE.WebGLRenderer({ canvas: aboutCanvas, antialias: true, alpha: true })
    aboutRenderer.setSize(window.innerWidth, window.innerHeight)
    aboutRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const particleCount = 2200
    const baseGeo = new THREE.IcosahedronGeometry(9, 6)
    const basePositions = baseGeo.attributes.position.array
    const total = Math.min(particleCount, basePositions.length / 3)

    const explodeGeo = new THREE.BufferGeometry()
    const startPos = new Float32Array(total * 3)
    const targetPos = new Float32Array(total * 3)
    const currentPos = new Float32Array(total * 3)

    for (let i = 0; i < total; i++) {
      const ix = i * 3
      const px = basePositions[ix]
      const py = basePositions[ix + 1]
      const pz = basePositions[ix + 2]
      startPos[ix] = px
      startPos[ix + 1] = py
      startPos[ix + 2] = pz
      currentPos[ix] = px
      currentPos[ix + 1] = py
      currentPos[ix + 2] = pz

      const dir = new THREE.Vector3(px, py, pz).normalize()
      const force = 14 + Math.random() * 22
      targetPos[ix] = px + dir.x * force + (Math.random() - 0.5) * 8
      targetPos[ix + 1] = py + dir.y * force + (Math.random() - 0.5) * 8
      targetPos[ix + 2] = pz + dir.z * force + (Math.random() - 0.5) * 8
    }
    explodeGeo.setAttribute('position', new THREE.BufferAttribute(currentPos, 3))

    const colorChoices = [0xc8ff4d, 0x9b7fff, 0xff6ec7]
    const colors = new Float32Array(total * 3)
    const tmpColor = new THREE.Color()
    for (let i = 0; i < total; i++) {
      tmpColor.set(colorChoices[i % colorChoices.length])
      colors[i * 3] = tmpColor.r
      colors[i * 3 + 1] = tmpColor.g
      colors[i * 3 + 2] = tmpColor.b
    }
    explodeGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const explodeMat = new THREE.PointsMaterial({
      size: 0.55,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    })
    const explodeMesh = new THREE.Points(explodeGeo, explodeMat)
    aboutScene.add(explodeMesh)

    let explodeProgress = 0
    let explodeTriggered = false

    const aboutSection = document.getElementById('about')
    const explodeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) explodeTriggered = true
        })
      },
      { threshold: 0.35 },
    )
    if (aboutSection) explodeObserver.observe(aboutSection)

    let aboutAnim
    const animateAbout = () => {
      aboutAnim = requestAnimationFrame(animateAbout)

      if (explodeTriggered && explodeProgress < 1) {
        explodeProgress += 0.012
        if (explodeProgress > 1) explodeProgress = 1
      }

      const posAttr = explodeMesh.geometry.attributes.position
      const eased = 1 - Math.pow(1 - explodeProgress, 3)
      for (let i = 0; i < total; i++) {
        const ix = i * 3
        posAttr.array[ix] = startPos[ix] + (targetPos[ix] - startPos[ix]) * eased
        posAttr.array[ix + 1] = startPos[ix + 1] + (targetPos[ix + 1] - startPos[ix + 1]) * eased
        posAttr.array[ix + 2] = startPos[ix + 2] + (targetPos[ix + 2] - startPos[ix + 2]) * eased
      }
      posAttr.needsUpdate = true

      explodeMesh.rotation.y += 0.0018
      explodeMesh.rotation.x += 0.0006

      aboutRenderer.render(aboutScene, aboutCam)
    }
    animateAbout()

    /* ============ PROJECTS: purple smoke burst ============ */
    const projScene = new THREE.Scene()
    const projCam = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    )
    projCam.position.z = 32
    const projRenderer = new THREE.WebGLRenderer({ canvas: projectsCanvas, antialias: true, alpha: true })
    projRenderer.setSize(window.innerWidth, window.innerHeight)
    projRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // soft round texture for smoke sprites
    function makeSmokeTexture() {
      const c = document.createElement('canvas')
      c.width = c.height = 128
      const ctx = c.getContext('2d')
      const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64)
      g.addColorStop(0, 'rgba(255,255,255,0.9)')
      g.addColorStop(0.4, 'rgba(255,255,255,0.35)')
      g.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, 128, 128)
      return new THREE.CanvasTexture(c)
    }
    const smokeTex = makeSmokeTexture()

    const smokeColors = [0x9b7fff, 0xff6ec7, 0xc86bff, 0x6e4ff2]
    const smokeCount = 160
    const smokeParticles = []
    const smokeGroup = new THREE.Group()

    for (let i = 0; i < smokeCount; i++) {
      const mat = new THREE.SpriteMaterial({
        map: smokeTex,
        color: smokeColors[i % smokeColors.length],
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
      const sprite = new THREE.Sprite(mat)
      const scale = 4 + Math.random() * 7
      sprite.scale.set(scale, scale, 1)

      const dir = new THREE.Vector3(
        Math.random() - 0.5,
        Math.random() - 0.3,
        (Math.random() - 0.5) * 0.6,
      ).normalize()
      smokeParticles.push({
        sprite,
        dir,
        speed: 0.02 + Math.random() * 0.05,
        life: Math.random(), // 0..1, staggered start
        lifeSpeed: 0.0028 + Math.random() * 0.0025,
        baseOpacity: 0.35 + Math.random() * 0.4,
        drift: (Math.random() - 0.5) * 0.01,
      })
      sprite.position.set(0, 0, 0)
      smokeGroup.add(sprite)
    }
    projScene.add(smokeGroup)

    let projTriggered = false
    const projSection = document.getElementById('projects')
    const projObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) projTriggered = true
        })
      },
      { threshold: 0.2 },
    )
    if (projSection) projObserver.observe(projSection)

    let projAnim
    const animateProjects = () => {
      projAnim = requestAnimationFrame(animateProjects)

      if (projTriggered) {
        smokeParticles.forEach((p) => {
          p.life += p.lifeSpeed
          if (p.life > 1) p.life = 0 // loop -> continuous smoke

          const eased = 1 - Math.pow(1 - p.life, 2)
          const dist = eased * 16
          p.sprite.position.set(
            p.dir.x * dist,
            p.dir.y * dist + Math.sin(p.life * Math.PI) * 2,
            p.dir.z * dist,
          )
          // fade in then out across life
          const fade = Math.sin(p.life * Math.PI)
          p.sprite.material.opacity = fade * p.baseOpacity
          p.sprite.rotation.z += p.drift
        })
        smokeGroup.rotation.y += 0.0008
      }

      projRenderer.render(projScene, projCam)
    }
    animateProjects()

    /* ============ RESIZE ============ */
    const handleResize = () => {
      heroCam.aspect = window.innerWidth / window.innerHeight
      heroCam.updateProjectionMatrix()
      heroRenderer.setSize(window.innerWidth, window.innerHeight)

      aboutCam.aspect = window.innerWidth / window.innerHeight
      aboutCam.updateProjectionMatrix()
      aboutRenderer.setSize(window.innerWidth, window.innerHeight)

      projCam.aspect = window.innerWidth / window.innerHeight
      projCam.updateProjectionMatrix()
      projRenderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(heroAnim)
      cancelAnimationFrame(aboutAnim)
      cancelAnimationFrame(projAnim)
      explodeObserver.disconnect()
      projObserver.disconnect()
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      heroRenderer.dispose()
      aboutRenderer.dispose()
      projRenderer.dispose()
      smokeTex.dispose()
    }
  }, [])

  return (
    <>
      <nav>
        <div className="logo">
          mubina<span>.dev</span>
        </div>
        <ul className="nav-links">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      <section className="hero">
        <canvas ref={heroCanvasRef} id="hero-canvas"></canvas>
        <div className="hero-content">
          <div className="eyebrow">Web Developer · Uzbekistan</div>
          <h1>
            Mubina <span>Muydinova</span>
          </h1>
          <p>
            Passionate Web Developer creating modern, responsive, and user-friendly websites that
            combine clean design with functional code.
          </p>
        </div>
        <div className="scroll-hint">
          <div className="line"></div>SCROLL
        </div>
      </section>

      <section id="about" className="about">
        <canvas ref={aboutCanvasRef} id="about-canvas"></canvas>
        <div className="about-grid">
          <div className="about-text">
            <div className="label">// 01 — About Me</div>
            <h2 className="title">Hi! I&apos;m Mubina, a passionate Web Developer from Uzbekistan.</h2>
            <p>
              I enjoy creating modern, responsive, and user-friendly websites that combine{' '}
              <strong>clean design</strong> with <strong>functional code</strong>. I am constantly
              improving my skills by building projects, learning new technologies, and exploring the
              latest trends in web development.
            </p>
            <p>
              I have experience working with{' '}
              <strong>HTML, CSS, JavaScript, React, Tailwind CSS, Git, and GitHub</strong>. I focus
              on writing clean, maintainable code and developing websites that provide a smooth user
              experience across all devices.
            </p>
            <p>
              I am a fast learner, a creative problem solver, and someone who enjoys turning ideas
              into real-world web applications. I believe that continuous learning and consistent
              practice are the keys to becoming a successful developer.
            </p>
            <p>
              Outside of coding, I enjoy exploring new technologies, improving my design skills, and
              working on personal projects that challenge me to grow.
            </p>
            <div className="bio-strip">
              <div>
                BASED IN <span>Uzbekistan</span>
              </div>
              <div>
                ROLE <span>Web Developer</span>
              </div>
              <div>
                FOCUS <span>Frontend</span>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </section>

      <section id="skills">
        <div className="label">// 02 — Skills</div>
        <h2 className="title">Tools &amp; technologies I work with</h2>
        <div className="card-grid">
          {SKILLS.map((skill) => (
            <div className="skill-card" key={skill}>
              <div className="tag-dot"></div>
              <h4>{skill}</h4>
            </div>
          ))}
        </div>
      </section>

      <section id="languages">
        <div className="label">// 03 — Languages</div>
        <h2 className="title">What I speak</h2>
        <div className="lang-grid">
          {LANGUAGES.map((lang) => (
            <div className="lang-card" key={lang.name}>
              <div className="lvl">{lang.level}</div>
              <h4>{lang.name}</h4>
              <div className="bar">
                <i style={{ width: lang.width }}></i>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="interests">
        <div className="label">// 04 — Interests</div>
        <h2 className="title">What I&apos;m into</h2>
        <div className="chip-row">
          {INTERESTS.map((interest) => (
            <span className="chip" key={interest}>
              {interest}
            </span>
          ))}
        </div>
      </section>

      <section id="soft-skills">
        <div className="label">// 05 — Soft Skills</div>
        <h2 className="title">How I work</h2>
        <div className="soft-grid">
          {SOFT_SKILLS.map((skill) => (
            <div className="soft-card" key={skill.title}>
              <h4>{skill.title}</h4>
              <p>{skill.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="goal">
        <div className="label">// 06 — Career Goal</div>
        <h2 className="title">Where I&apos;m headed</h2>
        <div className="goal-box">
          <p>
            My goal is to become a professional web developer who builds high-quality, scalable, and
            user-focused web applications. I am committed to continuously learning new technologies,
            improving my technical skills, and contributing to meaningful projects that make a
            positive impact.
          </p>
        </div>
      </section>

      <section id="projects" className="projects">
        <canvas ref={projectsCanvasRef} id="projects-canvas"></canvas>
        <div className="projects-inner">
          <div className="label">// 07 — Loyihalar</div>
          <h2 className="title">Projects</h2>
        </div>
        <div className="project-grid">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </section>

      <section id="contact">
        <div className="label">// 08 — Contact</div>
        <h2 className="contact-title">Let&apos;s build something together.</h2>
        <div className="contact-links">
          <a href="mailto:mubinamuydinova07@gmail.com">EMAIL — mubinamuydinova07@gmail.com</a>
          <a href="#">GITHUB — /mubina</a>
          <a href="#">LINKEDIN — /in/mubina</a>
        </div>
      </section>

      <footer>
        <div>© 2026 Mubina Muydinova</div>
        <div>Uzbekistan</div>
      </footer>
    </>
  )
}

export default App
