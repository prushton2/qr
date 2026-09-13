import { useEffect, useRef, useState } from 'react'
import encodeQR from 'qr'
import './App.css'

function App() {
  const [content, setContent] = useState<string>("")
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let qr: boolean[][] = [];
    if (!content) {
      qr = encodeQR("example.com", 'raw')
    } else {
      try {
        qr = encodeQR(content, 'raw')
      } catch {}
    }

    const canvas = canvasRef.current;
    if (canvas == null) return;
    
    let context = canvas.getContext("2d");

    if (context == null) return;

    context.fillStyle = "white";
    context.fillRect(0, 0, 300, 300);

    context.fillStyle = "black";
    
    let side_length = qr.length;

    let pixels_per_square = 300/side_length;

    for(let x = 0; x < qr.length; x++) {
      for(let y = 0; y < qr.length; y++) {
        if(qr[x][y]) {
          context.fillRect(
            x * pixels_per_square,
            y * pixels_per_square,
            pixels_per_square,
            pixels_per_square
          )
        }
      }
    }

  }, [content])

  function download() {
    let filename = `${content}.png`
    if(content == "") filename = "example.png"

    let url = canvasRef.current?.toDataURL("image/png");
    let link = document.createElement('a');
    link.download = filename;
    link.href = url ||  "";
    link.click();
  }

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

      <div className='row'>
        <canvas width="300" height="300" ref={canvasRef} />
      </div>

      <div className="row">
        <button className="download" onClick={download}>Download</button>
      </div>

    </>
  )
}

export default App