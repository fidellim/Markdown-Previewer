import { useEffect, useState, useRef } from 'react'
import sanitizeHtml from 'sanitize-html'
import { marked } from 'marked'

const Markdown = () => {
    const [text, setText] = useState('')
    const markedTexts = useRef()

    // img by default is not added in sanitizeHtml
    const allowedTags = {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
    }

    useEffect(() => {
        // console.log(sanitizeHtml(marked.parse(text)))
        markedTexts.current.innerHTML = sanitizeHtml(
            marked.parse(text),
            allowedTags
        )
    }, [text])

    const handleTextArea = (event) => {
        setText(event.target.value)
    }

    return (
        <main className="flex gap-1 w-screen h-screen">
            <div className="flex-1 bg-black">
                <h1 className="bg-grayishBlack text-white px-3 py-2">
                    Markdown
                </h1>
                <textarea
                    id="style-1"
                    className=" block w-full h-[calc(100%_-_40px)] px-3 py-2 bg-black text-white"
                    name=""
                    onChange={handleTextArea}
                    placeholder="Write your markdown here."
                />
            </div>
            <div className="flex-1 bg-black">
                <h1 className="bg-grayishBlack text-white px-3 py-2">
                    Preview
                </h1>
                <div
                    id="style-1"
                    className="px-3 py-2 w-full h-[calc(100%_-_40px)] overflow-auto text-white markdown-body"
                    ref={markedTexts}
                />
            </div>
        </main>
    )
}

export default Markdown
