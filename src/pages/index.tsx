import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Moon,
  Sun,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Mail,
  Code,
  Palette,
  Zap,
  Globe,
  Award,
  Briefcase,
  GraduationCap,
  Send,
  Coffee,
  Clock,
  Users,
  Star,
  Target,
  TabletSmartphone,
  Home,
  User,
  BriefcaseIcon,
  MessageCircle,
  Download,
  Menu,
  X,
  GitCommit
} from "lucide-react"

import { Icon } from '@iconify/react';

interface Ripple {
  id: number
  x: number
  y: number
}

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [ripples, setRipples] = useState<Ripple[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")

  // Typing animation states
  const [displayedText, setDisplayedText] = useState("")
  const [currentPhase, setCurrentPhase] = useState(0)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  const [typingComplete, setTypingComplete] = useState(false)

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const textSequence = [
    "Hi, I'm Nomit Kasera 👋",
    "A Frontend Developer",
    "Engineering elegant and responsive front-end solutions.",
  ];

  // Auto-hide messages after 4 seconds
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess(false);
        setError(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [success, error]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setSuccess(false);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mqalaeaq", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (response.ok) {
        setSuccess(true);
        form.reset();
      } else {
        setError(true);
      }
    } catch (err) {
      console.error("Form submit error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Navigation items
  const navItems = [
    { id: "hero", label: "Home", icon: <Home className="w-4 h-4" /> },
    { id: "about", label: "About", icon: <User className="w-4 h-4" /> },
    { id: "skills", label: "Skills", icon: <Code className="w-4 h-4" /> },
    { id: "experience", label: "Experience", icon: <BriefcaseIcon className="w-4 h-4" /> },
    { id: "contact", label: "Contact", icon: <MessageCircle className="w-4 h-4" /> },
  ]

  // Scroll spy effect
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "skills", "experience", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section === "hero" ? "hero" : section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    const targetId = sectionId === "hero" ? "hero" : sectionId
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setTimeout(() => {
      setIsMenuOpen(false)
    }, 500);
  }

  // Download resume function
  const downloadResume = () => {
    // You can replace this with your actual resume URL
    const resumeUrl = "/NomitKasera_3YOE_Frontend.pdf" // Add your resume to public folder
    const link = document.createElement("a")
    link.href = resumeUrl
    link.download = "Nomit_Kasera_Resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }


  // Ripple effect handler
  const createRipple = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const newRipple: Ripple = {
      id: Date.now() + Math.random(),
      x,
      y,
    }

    setRipples((prev) => [...prev, newRipple])

    // Remove ripple after animation completes
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id))
    }, 1000)
  }

  // Particle network for hero background
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    updateCanvasSize()

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
    }> = []

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
      })
    }

    function animate() {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((particle, i) => {
        particle.x += particle.vx
        particle.y += particle.vy

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(255, 255, 255, 0.6)"
        ctx.fill()

        // Draw connections
        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.3 * (1 - distance / 100)})`
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      updateCanvasSize()
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    let animationFrameId: number

    const handleMouseMove = (e: MouseEvent) => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }

      animationFrameId = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY })
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])

  // Typing animation
  useEffect(() => {
    if (currentTextIndex < textSequence.length) {
      const currentText = textSequence[currentTextIndex]

      if (currentPhase === 0) {
        if (currentCharIndex < currentText.length) {
          const timer = setTimeout(() => {
            setDisplayedText(currentText.slice(0, currentCharIndex + 1))
            setCurrentCharIndex((prev) => prev + 1)
          }, 100)
          return () => clearTimeout(timer)
        } else {
          if (currentTextIndex < textSequence.length - 1) {
            const timer = setTimeout(() => {
              setCurrentPhase(1)
            }, 1500)
            return () => clearTimeout(timer)
          } else {
            setTypingComplete(true)
          }
        }
      } else if (currentPhase === 1) {
        setCurrentPhase(2)
      } else if (currentPhase === 2) {
        if (displayedText.length > 0) {
          const timer = setTimeout(() => {
            setDisplayedText((prev) => prev.slice(0, -1))
          }, 50)
          return () => clearTimeout(timer)
        } else {
          setCurrentTextIndex((prev) => prev + 1)
          setCurrentCharIndex(0)
          setCurrentPhase(0)
        }
      }
    }
  }, [currentPhase, currentTextIndex, currentCharIndex, displayedText])

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  // Skills data
  const skills = [
    {
      name: "Angular",
      level: 90,
      icon: <Icon icon="logos:angular-icon" width="40" height="40" />,
      color: "from-red-500 to-pink-500",
    },
    {
      name: "TypeScript",
      level: 85,
      icon: <Icon icon="logos:typescript-icon" width="40" height="40" />,
      color: "from-blue-600 to-blue-800",
    },
    {
      name: "React",
      level: 80,
      icon: <Icon icon="logos:react" width="40" height="40" />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Next.js",
      level: 75,
      icon: <Icon icon="logos:nextjs-icon" width="40" height="40" />,
      color: "from-gray-800 to-gray-600",
    },
    {
      name: "RxJS",
      level: 85,
      icon: <Icon icon="logos:reactivex" width="40" height="40" />,
      color: "from-purple-500 to-pink-500",
    },
    // {
    //   name: "NgRx",
    //   level: 80,
    //   icon: <Icon icon="simple-icons:ngrx" width="40" height="40" />,
    //   color: "from-green-500 to-teal-500",
    // },
    {
      name: "JavaScript",
      level: 90,
      icon: <Icon icon="logos:javascript" width="40" height="40" />,
      color: "from-yellow-500 to-orange-500",
    },
    {
      name: "CSS/SCSS",
      level: 85,
      icon: <Icon icon="vscode-icons:file-type-scss2" width="40" height="40" />,
      color: "from-pink-500 to-rose-500",
    },
    {
      name: "HTML5",
      level: 95,
      icon: <Icon icon="logos:html-5" width="40" height="40" />,
      color: "from-orange-500 to-red-500",
    },
    {
      name: "Bootstrap CSS",
      level: 90,
      icon: <Icon icon="logos:bootstrap" width="40" height="40" />,
      color: "from-purple-700 to-indigo-500",
    },
    {
      name: "Tailwind CSS",
      level: 80,
      icon: <Icon icon="logos:tailwindcss-icon" width="40" height="40" />,
      color: "from-cyan-500 to-blue-500",
    },
    { name: "Material UI", level: 80, icon: <Icon icon="logos:material-ui" width="40" height="40" />, color: "from-blue-600 to-indigo-600" },
    { name: "Ionic", level: 85, icon: <Icon icon="logos:ionic" width="40" height="40" />, color: "from-blue-600 to-indigo-600" },
    { name: "Chakra UI", level: 80, icon: <Icon icon="simple-icons:chakraui" width="40" height="40" color="#38b2ac" />, color: "from-teal-400 to-cyan-500" },
    { name: "Git", level: 85, icon: <Icon icon="logos:git-icon" width="40" height="40" />, color: "from-orange-600 to-red-600" },

    {
      name: "AWS",
      level: 70,
      icon: <Icon icon="logos:aws" width="40" height="40" />,
      color: "from-yellow-500 to-orange-500",
    },
    // {
    //   name: "Web3",
    //   level: 65,
    //   icon: <Icon icon="logos:web3js" width="40" height="40" />,
    //   color: "from-indigo-500 to-purple-500",
    // },
  ];

  // Work experience data
  const workExperience = [
    {
      company: "Tata Consultancy Services (TCS)",
      position: "Systems Engineer",
      duration: "2022 - Present",
      location: "India",
      description:
        "Spearheaded the upgrade of legacy enterprise applications in the manufacturing domain by modernizing the frontend using Angular. Built scalable and performant web interfaces leveraging RxJS for reactive data handling, enhancing maintainability and overall user experience.",
      achievements: [
        "Recognized with the On-the-Spot Award for delivering quick and effective results",
        "Led upgrade of a legacy enterprise app using Angular, improving UI and performance.",
        "Received Star Team Award for exceptional performance",
        "Implemented real-time data visualization features",
        "Mentored junior developers in Angular best practices",
      ],
      logo: "🏢",
      color: "from-blue-600 to-blue-800",
    },
    // {
    //   company: "ArcadeZone (Founder)",
    //   position: "Frontend Developer & Founder",
    //   duration: "2023 - Present",
    //   location: "Remote",
    //   description:
    //     "Founded and developed Web3 gaming platform with multiple blockchain-integrated games using Next.js, Firebase, and p5.js for creative coding.",
    //   achievements: [
    //     "Built complete gaming platform from scratch",
    //     "Integrated Web3 wallet connectivity",
    //     "Developed multiple browser-based games",
    //     "Implemented blockchain game mechanics",
    //   ],
    //   logo: "🎮",
    //   color: "from-purple-600 to-pink-600",
    // },
  ]

  // Fun facts and stats
  const stats = [
    { label: "Lines of Code", value: 180000, icon: <Code className="w-8 h-8" />, suffix: "+" },
    { label: "Projects Completed & Delivered", value: 12, icon: <Target className="w-8 h-8" />, suffix: "+" },
    { label: "Cups of Coffee", value: 950, icon: <Coffee className="w-8 h-8" />, suffix: "+" },
    { label: "Hours Coding", value: 4000, icon: <Clock className="w-8 h-8" />, suffix: "+" },
    { label: "GitHub Commits", value: 1300, icon: <GitCommit className="w-8 h-8" />, suffix: "+" },
    { label: "Clients & Teams Served", value: 7, icon: <Users className="w-8 h-8" />, suffix: "+" },
  ]

  const timeline = [
    {
      year: "2024",
      title: "On The Spot Award at TCS",
      description: "Started Web3 gaming startup with innovative blockchain games",
      icon: <Award className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
    },
    {
      year: "2024",
      title: "AWS Cloud Practitioner",
      description: "AWS Certified Cloud Practitioner – foundational cloud and AWS knowledge",
      icon: <Globe className="w-6 h-6" />,
      color: "from-green-500 to-teal-500",
    },
    {
      year: "2023",
      title: "Star Team Award at TCS",
      description: "Recognized for exceptional performance in Angular development",
      icon: <Award className="w-6 h-6" />,
      color: "from-yellow-400 to-orange-500",
    },
    {
      year: "2022",
      title: "Systems Engineer at TCS",
      description: "Specialized in Angular development for enterprise applications",
      icon: <Briefcase className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      year: "2022",
      title: "BTech Computer Science",
      description: "Graduated with strong foundation in software development",
      icon: <GraduationCap className="w-6 h-6" />,
      color: "from-indigo-500 to-purple-500",
    },
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="w-16 h-16 border-4 border-white border-t-transparent rounded-full"
        />
      </div>
    )
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? "dark bg-gray-900" : "bg-white"}`}>
      {/* Custom Cursor */}
      <div
        className="fixed w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-100 ease-out"
        style={{
          transform: `translate(${mousePosition.x - 12}px, ${mousePosition.y - 12}px)`,
        }}
      />

      {/* Navigation */}
      {/* Enhanced Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 w-full z-40 backdrop-blur-md bg-white/90 dark:bg-gray-900/90 border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center space-x-3"
              onClick={() => scrollToSection("hero")}
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">NK</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="font-bold text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Nomit Kasera
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Frontend Developer</p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${activeSection === item.id
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </motion.button>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3">
              {/* Resume Download Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Button
                  onClick={downloadResume}
                  variant="outline"
                  size="sm"
                  className="hidden sm:flex items-center space-x-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition-all duration-300 bg-transparent"
                >
                  <Download className="w-4 h-4" />
                  <span>Resume</span>
                </Button>
              </motion.div>

              {/* Theme Toggle */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setDarkMode(!darkMode)}
                  className="rounded-full w-12 h-12 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
                >
                  <motion.div animate={{ rotate: darkMode ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    {darkMode ? <Sun className="w-5 h-5" color="white" /> : <Moon className="w-5 h-5" />}
                  </motion.div>
                </Button>
              </motion.div>

              {/* Mobile Menu Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
                className="md:hidden"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="rounded-full w-12 h-12 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
                >
                  <motion.div animate={{ rotate: isMenuOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                  </motion.div>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-gray-200/50 dark:border-gray-700/50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md"
            >
              <div className="px-4 py-6 space-y-3">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-all duration-300 ${activeSection === item.id
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                  >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </motion.button>
                ))}

                {/* Mobile Resume Button */}
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.1 }}
                  onClick={downloadResume}
                  className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition-all duration-300"
                >
                  <Download className="w-4 h-4" />
                  <span className="font-medium">Download Resume</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>


      {/* Enhanced Hero Section with Ripple Effects */}
      <section id="hero"
        ref={heroRef}
        className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 dark:from-purple-900 dark:via-pink-900 dark:to-blue-900 cursor-pointer"
        onClick={createRipple}
      >
        {/* Ripple Effects */}
        <AnimatePresence>
          {ripples.map((ripple) => (
            <motion.div
              key={ripple.id}
              className="absolute pointer-events-none"
              style={{
                left: ripple.x,
                top: ripple.y,
              }}
              initial={{
                width: 0,
                height: 0,
                opacity: 0.8,
              }}
              animate={{
                width: 400,
                height: 400,
                opacity: 0,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 1,
                ease: "easeOut",
              }}
            >
              <div className="w-full h-full rounded-full border-2 border-white/30 transform -translate-x-1/2 -translate-y-1/2" />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Secondary Ripple Layer for Double Effect */}
        <AnimatePresence>
          {ripples.map((ripple) => (
            <motion.div
              key={`secondary-${ripple.id}`}
              className="absolute pointer-events-none"
              style={{
                left: ripple.x,
                top: ripple.y,
              }}
              initial={{
                width: 0,
                height: 0,
                opacity: 0.6,
              }}
              animate={{
                width: 600,
                height: 600,
                opacity: 0,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 1.2,
                ease: "easeOut",
                delay: 0.1,
              }}
            >
              <div className="w-full h-full rounded-full border border-white/20 transform -translate-x-1/2 -translate-y-1/2" />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Particle Network Canvas */}
        {/* <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-30" /> */}

        {/* Animated Background Shapes */}
        {/* <div className="absolute inset-0 z-10">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-64 h-64 bg-white/10 rounded-full blur-xl"
                animate={{
                  x: [0, 100, 0],
                  y: [0, -100, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 10 + i * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div> */}

        {/* Geometric Shapes */}
        <div className="absolute inset-0 z-10">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-32 h-32 border border-white/20 rounded-lg backdrop-blur-sm"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
            />
          ))}
        </div>

        {/* Floating Code Snippets */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {[
            "const developer = 'Nomit';",
            "function buildAmazingApps() {",
            "return creativity + code;",
            "Angular.component({",
            "useState(awesome);",
            "=> Web3.future",
          ].map((code, index) => (
            <motion.div
              key={code}
              className="absolute text-white/40 font-mono text-sm bg-black/20 px-3 py-1 rounded backdrop-blur-sm border border-white/10"
              animate={{
                y: [0, -30, 0],
                x: [0, Math.sin(index) * 20, 0],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 6 + index,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: index * 0.8,
              }}
              style={{
                left: `${5 + index * 15}%`,
                top: `${10 + (index % 4) * 20}%`,
              }}
            >
              {code}
            </motion.div>
          ))}
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 z-10">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/40 rounded-full"
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>


        {/* Main Content */}
        <div className="relative z-20 text-center text-white px-4 max-w-4xl pointer-events-none">

          {/* Enhanced Professional Photo Section */}
          <AnimatePresence>
            {typingComplete && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, type: "spring", stiffness: 100 }}
                className="mb-1 mt-10 flex justify-center"
              >
                <motion.div
                  whileHover={{ scale: 1.08, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative group"
                >
                  {/* Main Photo Container */}
                  <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-white/40 shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:shadow-[0_0_60px_rgba(255,255,255,0.6)] hover:border-white/60 transition-all duration-500">
                    {/* Professional Photo */}
                    <img
                      src="/nomit-kasera.png"
                      alt="Nomit Kasera - Frontend Developer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"

                    />

                    {/* Overlay Effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Multiple Animated Border Rings */}
                  <motion.div
                    className="absolute -top-1 -left-1 -right-1 -bottom-1 rounded-full bg-gradient-to-r from-purple-400 via-pink-400 via-blue-400 to-purple-400 -z-10 opacity-70"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 8,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  />

                  <motion.div
                    className="absolute -top-2 -left-2 -right-2 -bottom-2 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 via-pink-400 to-blue-400 -z-20 opacity-50"
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 12,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  />

                  {/* Floating Particles around Photo */}
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-white/60 rounded-full"
                        style={{
                          left: `${20 + Math.cos((i * Math.PI * 2) / 8) * 140}px`,
                          top: `${20 + Math.sin((i * Math.PI * 2) / 8) * 140}px`,
                        }}
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.6, 1, 0.6],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>

                  {/* Professional Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5, type: "spring" }}
                    className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-4 py-2"
                  >
                    <span className="text-white text-sm font-semibold">Frontend Developer</span>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mb-8">
            <div className="text-4xl md:text-7xl font-bold leading-tight min-h-[200px] md:min-h-[300px] flex items-center justify-center">
              <div className="relative">
                {displayedText}
                <span
                  className={`inline-block w-1 h-12 md:h-20 bg-white ml-2 ${showCursor ? "opacity-100" : "opacity-0"
                    } transition-opacity`}
                />
              </div>
            </div>
          </div>

          <AnimatePresence>
            {typingComplete && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <p className="text-xl md:text-2xl mb-8 text-white/90">
                  Crafting digital experiences with modern technologies
                </p>
                <p className="text-sm md:text-base text-white/70 mb-8">
                  ✨ Click anywhere to create ripple effects ✨
                </p>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="flex mb-10 flex-col sm:flex-row gap-4 justify-center pointer-events-auto"
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="lg"
                      className="bg-white text-purple-600 hover:bg-white/90 font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all"
                      onClick={(e) => {
                        e.stopPropagation()
                        document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" })
                      }}
                    >
                      Explore My Skills
                    </Button>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-white text-white hover:bg-white hover:text-purple-600 font-semibold px-8 py-3 rounded-full bg-transparent backdrop-blur-sm transition-all"
                      onClick={(e) => {
                        e.stopPropagation()
                        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                      }}
                    >
                      Let's Connect
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* <AnimatePresence>
            {typingComplete && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 pointer-events-auto"
              >
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation()
                    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  <ChevronDown className="w-8 h-8 text-white/70 hover:text-white transition-colors" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence> */}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              About Me
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                I'm Nomit Kasera, a Frontend Developer passionate about creating intuitive, responsive, and performant
                web applications. I currently work as a Systems Engineer at TCS, specializing in Angular development
                for enterprise manufacturing domain applications.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                I enjoy turning complex UI problems into elegant, user-friendly interfaces. I've also explored
                Next.js, p5.js, and Web3 games through personal projects.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { icon: <Code className="w-8 h-8" />, title: "Clean Code", color: "from-blue-500 to-cyan-500" },
                { icon: <Palette className="w-8 h-8" />, title: "UI/UX Design", color: "from-pink-500 to-rose-500" },
                { icon: <Zap className="w-8 h-8" />, title: "Performance", color: "from-yellow-500 to-orange-500" },
                {
                  icon: <TabletSmartphone className="w-8 h-8" />,
                  title: "Responsive Design",
                  color: "from-purple-500 to-indigo-500",
                },
              ].map((skill, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className={`p-6 rounded-2xl bg-gradient-to-br ${skill.color} text-white text-center`}
                >
                  <div className="mb-3">{skill.icon}</div>
                  <h3 className="font-semibold">{skill.title}</h3>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills & Expertise Section */}
      <section id="skills" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Skills & Expertise
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Technologies I work with to bring ideas to life
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="p-6 hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                  <CardContent className="p-0">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`p-3 rounded-full bg-gradient-to-r  text-white text-2xl`}>
                        {skill.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{skill.name}</h3>
                        <p className="text-sm text-gray-500">{skill.level}% Proficiency</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Proficiency</span>
                        <span>{skill.level}%</span>
                      </div>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className={`h-2 bg-gradient-to-r ${skill.color} rounded-full`}
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Work Experience Section */}
      <section id="experience" className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Work Experience
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">My professional journey and achievements</p>
          </motion.div>

          <div className="space-y-8">
            {workExperience.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <div
                          className={`w-16 h-16 rounded-full bg-gradient-to-r ${job.color} flex items-center justify-center text-3xl text-white`}
                        >
                          {job.logo}
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{job.position}</h3>
                            <p className="text-lg font-semibold text-purple-600 dark:text-purple-400">
                              {job.company}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{job.duration}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-500">{job.location}</p>
                          </div>
                        </div>

                        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{job.description}</p>

                        <div className="space-y-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white">Key Achievements:</h4>
                          <ul className="space-y-1">
                            {job.achievements.map((achievement, i) => (
                              <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                                <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fun Facts & Stats Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Fun Facts & Stats
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Numbers that tell my coding story</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                  <CardContent className="p-0">
                    <div className="text-purple-600 dark:text-purple-400 mb-4 flex justify-center">{stat.icon}</div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 2, delay: index * 0.2 }}
                      viewport={{ once: true }}
                      className="text-4xl font-bold text-gray-900 dark:text-white mb-2"
                    >
                      <CountUp end={stat.value} suffix={stat.suffix} />
                    </motion.div>
                    <p className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              My Journey
            </h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>

            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`relative flex items-center mb-12 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8"}`}>
                  <Card className="p-6 hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`p-2 rounded-full bg-gradient-to-r ${item.color} text-white`}>
                          {item.icon}
                        </div>
                        <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                          {item.year}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-4 border-purple-500 rounded-full z-10"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Let's Work Together</h2>
            <p className="text-xl text-white/90">Ready to bring your ideas to life? Let's connect!</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 bg-white/10 backdrop-blur-md border-white/20">
                <CardContent className="p-0">
                  <h3 className="text-2xl font-bold text-white mb-6">Get In Touch</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-white">
                      <Mail className="w-6 h-6" />
                      <a href="mailto:nomit.kaser@gmail.com">nomit.kaser@gmail.com</a>
                    </div>

                    <div className="flex gap-4 pt-6">
                      {[
                        { icon: <Github className="w-6 h-6" />, href: "https://github.com/nomit-kasera" },
                        { icon: <Linkedin className="w-6 h-6" />, href: "https://www.linkedin.com/in/nomitkasera/" },
                        { icon: <Twitter className="w-6 h-6" />, href: "https://x.com/KaseraNomit" },
                        { icon: <Instagram className="w-6 h-6" />, href: "https://www.instagram.com/nomit_kasera/" },
                      ].map((social, index) => (
                        <motion.a
                          key={index}
                          href={social.href}
                          target="_blank"
                          whileHover={{ scale: 1.2, rotate: 10 }}
                          className="p-3 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors"
                        >
                          {social.icon}
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 bg-white/10 backdrop-blur-md border-white/20">
                <CardContent className="p-0">
                  <form
                    onSubmit={handleSubmit}
                    method="POST"
                    className="space-y-6"
                  >
                    <div>
                      <Input
                        name="name"
                        placeholder="Your Name"
                        required
                        className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                      />
                    </div>
                    <div>
                      <Input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        required
                        className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                      />
                    </div>
                    <div>
                      <Textarea
                        name="message"
                        placeholder="Your Message"
                        rows={4}
                        required
                        className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-white text-purple-600 hover:bg-white/90 font-semibold py-3 rounded-full"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {loading ? "Sending..." : "Send Message"}
                    </Button>
                  </form>

                  {/* Success and Error Popups */}
                  {success && (
                    <p className="text-green-400 mt-4 text-center">✅ Message sent successfully!</p>
                  )}
                  {error && (
                    <p className="text-red-400 mt-4 text-center">❌ Failed to send message. Please try again.</p>
                  )}

                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-900 text-white text-center">
        <p className="text-gray-400">© {new Date().getFullYear()} Nomit Kasera. Built with Next.js & Tailwind CSS</p>
      </footer>
    </div>
  )
}

// CountUp component for animated numbers
function CountUp({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = end / steps
    const stepDuration = duration / steps

    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [end])

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}
