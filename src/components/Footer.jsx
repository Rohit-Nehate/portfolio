

export default function Footer() {
  return (
    <footer className="w-full py-16! bg-[#131313] border-t border-white/5 mt-32!">
      <div className="max-w-7xl mx-auto! px-8! flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Brand */}
        <div className="font-[Sora] text-[32px] font-semibold leading-[1.3] text-[#e5e2e1]">
          I Build
        </div>

        {/* Copyright */}
        <div className="text-sm text-[#c2c6d8]">
          © 2026 Rohit Nehte.
        </div>
      </div>
    </footer>
  )
}
