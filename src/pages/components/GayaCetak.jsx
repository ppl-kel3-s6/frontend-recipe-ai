// Style Gaya Export PDF
function GayaCetak() {
  return (
    <style>{`
      @media print {
        @page {
          size: A4;
          margin: 15mm;
        }
        /* Sembunyikan elemen non-cetak */
        .no-print {
          display: none !important;
        }
        body {
          background: white !important;
          color: black !important;
        }
        body * {
          visibility: hidden;
        }
        .print-area, .print-area * {
          visibility: visible;
        }
        .print-area {
          position: fixed !important;
          left: 0 !important;
          top: 0 !important;
          width: 100% !important;
          max-width: 100% !important;
          height: auto !important;
          margin: 0 !important;
          padding: 0 !important;
          box-shadow: none !important;
        }
      }
    `}</style>
  )
}

export default GayaCetak
