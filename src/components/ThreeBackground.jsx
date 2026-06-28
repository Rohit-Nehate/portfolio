export default function ThreeBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Grid lines */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(179, 197, 255, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(179, 197, 255, 0.06) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Left fade */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, #131313 0%, transparent 30%, transparent 70%, #131313 100%)',
        }}
      />

      {/* Top and bottom fade */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, #131313 0%, transparent 20%, transparent 80%, #131313 100%)',
        }}
      />

      {/* Center glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(179, 197, 255, 0.06) 0%, rgba(0, 102, 255, 0.03) 40%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      {/* Subtle accent glow - top right */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          right: '15%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(121, 40, 202, 0.07) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      {/* Subtle accent glow - bottom left */}
      <div
        style={{
          position: 'absolute',
          bottom: '25%',
          left: '10%',
          width: '250px',
          height: '250px',
          background: 'radial-gradient(circle, rgba(0, 102, 255, 0.05) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
