import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function MarkdownRenderer({ content }) {
  return (
    <div className="prose dark:prose-invert max-w-full break-words p-2 bg-white/20 dark:bg-gray-800/30 backdrop-blur-md rounded-xl border border-white/20 dark:border-gray-700/50">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  )
}
