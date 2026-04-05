import { useRef, useState, useEffect } from 'react'
import { submitPhoto } from '../../data/api'
import { pageCopy } from '../../config/appConfig'

export default function PhotoCheck() {
  const fileRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [caption, setCaption] = useState('')
  const [saved, setSaved] = useState(false)

  // Revoke blob URL on unmount or when preview changes to avoid memory leaks
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
    }
  }, [preview])

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !file.type.startsWith('image/')) return
    const url = URL.createObjectURL(file)
    // createObjectURL always returns a blob: URL referencing local memory — safe for img src
    if (!url.startsWith('blob:')) {
      URL.revokeObjectURL(url)
      return
    }
    setPreview(url)
  }

  async function handleSubmit() {
    const file = fileRef.current?.files?.[0]
    if (!file) return
    await submitPhoto(file, caption || undefined)
    setSaved(true)
    setPreview(null)
    setCaption('')
    if (fileRef.current) fileRef.current.value = ''
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="px-4 pt-6 pb-4 space-y-5">
      <div>
        <h1 className="text-2xl font-semibold text-stone-800">{pageCopy.photo.title}</h1>
        <p className="text-sm text-stone-400 mt-1">{pageCopy.photo.subtitle}</p>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileChange}
      />

      {preview ? (
        <div className="rounded-2xl overflow-hidden border border-stone-200 aspect-video bg-stone-100">
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
        </div>
      ) : (
        <button
          onClick={() => fileRef.current?.click()}
          className="w-full aspect-video rounded-2xl border-2 border-dashed border-stone-300 bg-white flex flex-col items-center justify-center gap-3 text-stone-400 active:bg-stone-50"
        >
          <span className="text-5xl">📷</span>
          <span className="text-sm">{pageCopy.photo.pickPrompt}</span>
        </button>
      )}

      {preview && (
        <button
          onClick={() => fileRef.current?.click()}
          className="text-sm text-stone-400 underline"
        >
          {pageCopy.photo.changePhotoLabel}
        </button>
      )}

      <input
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder={pageCopy.photo.captionPlaceholder}
        className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-stone-800 placeholder-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
      />

      <div className="bg-stone-50 rounded-2xl border border-stone-100 px-4 py-3 text-xs text-stone-400">
        {pageCopy.photo.deferredNotice}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!preview}
        className="w-full py-4 rounded-2xl bg-green-700 text-white font-semibold text-base active:bg-green-800 disabled:opacity-40 transition-opacity"
      >
        {saved ? pageCopy.photo.savedLabel : pageCopy.photo.saveLabel}
      </button>
    </div>
  )
}
