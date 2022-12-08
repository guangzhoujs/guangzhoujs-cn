import { Editor } from '@bytemd/react'
import { useEffect, useState } from 'react'
import zhHans from 'bytemd/lib/locales/zh_Hans.json'
import gfm from '@bytemd/plugin-gfm'
// import gemoji from '@bytemd/plugin-gemoji'
import highlight from '@bytemd/plugin-highlight-ssr'
// import mediumZoom from '@bytemd/plugin-medium-zoom'
import 'bytemd/dist/index.min.css'
import 'highlight.js/styles/vs.css'

const RC = (props: any) => {
  const { content, onMdEditorChange } = props
  const [value, setValue] = useState('')
  const plugins = [gfm(), highlight()]

  useEffect(() => {
    if (!content) return

    setValue(content)
  }, [content])

  return (
    <Editor
      mode="split"
      locale={zhHans}
      value={value}
      plugins={plugins}
      onChange={(v: string) => {
        setValue(v)
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

export default RC
