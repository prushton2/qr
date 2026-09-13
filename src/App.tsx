import { useEffect, useState } from 'react'
import encodeQR from 'qr'
import './App.css'

function App() {
  const [content, setContent] = useState<string>("")
  const [qr, setQr] = useState<string>("")

  useEffect(() => {
    if (!content) {
      const svg = encodeQR("example", 'svg')
      setQr(`data:image/svg+xml,${encodeURIComponent(svg)}`)
    }

    try {
      const svg = encodeQR(content, 'svg')
      setQr(`data:image/svg+xml,${encodeURIComponent(svg)}`)
    } catch {}


  }, [content])

  return (
    <>
      <h1>QR Code Generator</h1>

      <div className="row">
        <h2>Content</h2>
        <textarea
          className='contentInput'
          placeholder='Enter text or url here'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      {qr && (
        <div className="row">
          <img className='qrCode' src={qr} alt={`QR code for ${content}`} />
        </div>
      )}
      <div className="row">
        <button className="download" onClick={() => downloadSvg(qr, `${content}.svg`)}>Download</button>
      </div>

    </>
  )
}

export default App


function downloadSvg(dataUrl: string, filename: string) {
  if (filename == ".svg") {filename = "example.svg"}
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = filename;
  a.click();
}