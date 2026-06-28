import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { socials } from '../data/portfolio'

// ⚠️ UPDATE THESE with your EmailJS Service ID and Template ID
const EMAILJS_SERVICE_ID = 'service_2tl2nuc'
const EMAILJS_TEMPLATE_ID = 'template_tspko5n'
const EMAILJS_PUBLIC_KEY = 'vVPTU4RG9EpLRgBCh'

export default function Contact() {
  const formRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.message) return

    setStatus('sending')

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      )
      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setStatus('idle'), 4000)
    } catch (error) {
      console.error('EmailJS error:', error)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  return (
    <div>
      <div className="text-center !mb-16">
        <div className="font-[JetBrains_Mono] text-[12px] font-bold leading-none tracking-[0.1em] text-[#b3c5ff] !mb-2 uppercase">
          Get in touch
        </div>
        <h2 className="font-[Sora] text-[32px] font-semibold leading-[1.3] text-[#e5e2e1]">
          Let's Build Something
        </h2>
      </div>

      <motion.div
        className="max-w-2xl !mx-auto glass-panel !p-8 rounded-[0.5rem]"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="contact-name"
                className="block font-[JetBrains_Mono] text-xs text-[#c2c6d8] !mb-2 font-bold tracking-[0.1em]"
              >
                Name
              </label>
              <input
                type="text"
                id="contact-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                className="w-full bg-[#2a2a2a] border border-white/10 rounded-[0.25rem] !px-4 !py-3 text-[#e5e2e1] focus:outline-none focus:border-[#b3c5ff]/50 focus:ring-1 focus:ring-[#b3c5ff]/50 transition-colors duration-200 placeholder:text-[#c2c6d8]/40 font-[Inter] text-base"
              />
            </div>
            <div>
              <label
                htmlFor="contact-email"
                className="block font-[JetBrains_Mono] text-xs text-[#c2c6d8] !mb-2 font-bold tracking-[0.1em]"
              >
                Email
              </label>
              <input
                type="email"
                id="contact-email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
                className="w-full bg-[#2a2a2a] border border-white/10 rounded-[0.25rem] !px-4 !py-3 text-[#e5e2e1] focus:outline-none focus:border-[#b3c5ff]/50 focus:ring-1 focus:ring-[#b3c5ff]/50 transition-colors duration-200 placeholder:text-[#c2c6d8]/40 font-[Inter] text-base"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="contact-message"
              className="block font-[JetBrains_Mono] text-xs text-[#c2c6d8] !mb-2 font-bold tracking-[0.1em]"
            >
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="What message do you have for me?"
              rows={5}
              required
              className="w-full bg-[#2a2a2a] border border-white/10 rounded-[0.25rem] !px-4 !py-3 text-[#e5e2e1] focus:outline-none focus:border-[#b3c5ff]/50 focus:ring-1 focus:ring-[#b3c5ff]/50 transition-colors duration-200 resize-none placeholder:text-[#c2c6d8]/40 font-[Inter] text-base"
            />
          </div>
          <button
            type="submit"
            disabled={status === 'sending'}
            className={`w-full font-[JetBrains_Mono] text-[12px] font-bold leading-none tracking-[0.1em] !py-4 rounded-[0.25rem] flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 ${status === 'success'
                ? 'bg-green-500 text-white'
                : status === 'error'
                  ? 'bg-red-500 text-white'
                  : 'bg-[#b3c5ff] text-[#002b75] hover:bg-[#dae1ff]'
              } ${status === 'sending' ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {status === 'sending' && (
              <>
                <span className="inline-block w-4 h-4 border-2 border-[#002b75]/30 border-t-[#002b75] rounded-full animate-spin"></span>
                Sending...
              </>
            )}
            {status === 'success' && (
              <>
                <i className="ri-check-line text-[14px]"></i>
                Message Sent!
              </>
            )}
            {status === 'error' && (
              <>
                <i className="ri-error-warning-line text-[14px]"></i>
                Failed — Try Again
              </>
            )}
            {status === 'idle' && (
              <>
                Send Message
                <Send size={14} />
              </>
            )}
          </button>
        </form>

        {/* Social icons */}
        <div className="!mt-8 !pt-8 border-t border-white/10 flex justify-center gap-6">
          <a
            target="_blank"
            href={socials.github}
            className="text-[#c2c6d8] hover:text-[#b3c5ff] transition-colors duration-200"
            aria-label="GitHub"
          >
            <i className="ri-github-fill text-[24px]"></i>
          </a>
          <a
            target="_blank"
            href={`mailto:${socials.email}`}
            className="text-[#c2c6d8] hover:text-[#b3c5ff] transition-colors duration-200"
            aria-label="Email"
          >
            <i className="ri-mail-fill text-[24px]"></i>
          </a>
          <a
            target="_blank"
            href={socials.instagram}
            className="text-[#c2c6d8] hover:text-[#b3c5ff] transition-colors duration-200"
            aria-label="Instagram"
          >
            <i className="ri-instagram-fill text-[24px]"></i>
          </a>
        </div>
      </motion.div>
    </div>
  )
}
