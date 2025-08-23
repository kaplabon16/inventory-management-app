import React from 'react'
import { marked } from 'marked'

export default function MarkdownRenderer({ text='' }){
  return <div className="prose dark:prose-invert" dangerouslySetInnerHTML={{__html: marked.parse(text || '')}} />
}
