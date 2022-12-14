import { Editor } from '@bytemd/react'
import { useEffect, useRef } from 'react'
import zhHans from 'bytemd/lib/locales/zh_Hans.json'
import gfm from '@bytemd/plugin-gfm'
// import gemoji from '@bytemd/plugin-gemoji'
import highlight from '@bytemd/plugin-highlight-ssr'
// import mediumZoom from '@bytemd/plugin-medium-zoom'
import 'bytemd/dist/index.min.css'
import 'highlight.js/styles/vs.css'

const Btmd = (props: any) => {
  const { content, onMdEditorChange } = props
  const plugins = [gfm(), highlight()]
  const editorRef = useRef('')

  useEffect(() => {
    if (!content) return

    editorRef.current = content
  }, [content])

  return (
    <Editor
      mode="split"
      locale={zhHans}
      value={editorRef.current || ''}
      plugins={plugins}
      onChange={(v: string) => {
        editorRef.current = v
        onMdEditorChange(v)
      }}
    // uploadImages={async (files) => {
    //   console.log('files', files)
    //   return [
    //     {
    //       title: files.map((i) => i.name),
    //       url: 'http',
    //     },
    //   ]
    // }}
    />

  )
}

export default Btmd
