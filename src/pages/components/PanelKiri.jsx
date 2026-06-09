// Desain style panel kiri
function PanelKiri() {
  return (
    <div className="hidden md:flex md:w-[57%] md:flex-none bg-[#E07A5F] flex-col items-center justify-center p-12 relative overflow-hidden">
      {/* Lingkaran hiasan */}
      <div className="absolute rounded-full bg-white opacity-10 w-[500px] h-[500px] -top-20 -left-20"></div>
      <div className="absolute rounded-full bg-white opacity-10 w-80 h-80 -bottom-10 -right-10"></div>

      {/* Kartu logo */}
      <div className="bg-white rounded-3xl p-6 shadow-xl z-10 w-full h-full flex items-center justify-center">
        <img src="/logo.png" alt="Logo Koki" className="max-w-full max-h-full object-contain -translate-y-6" />
      </div>
    </div>
  )
}

export default PanelKiri
