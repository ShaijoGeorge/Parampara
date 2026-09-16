import imageCompression from 'browser-image-compression'

export async function compressPhoto(file: File): Promise<string> {
  const blob = await imageCompression(file, {
    maxSizeMB: 0.25,
    maxWidthOrHeight: 480,
    useWebWorker: true,
  })
  return readAsDataUrl(blob)
}

function readAsDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(blob)
  })
}
