import { useEffect, useState, useRef } from 'react'
import sanitizeHtml from 'sanitize-html'
import { marked } from 'marked'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'

const Markdown = () => {
    const [text, setText] = useState('')
    const [isPreviewerOpen, setIsPreviewerOpen] = useState(false)
    const markedTexts = useRef()

    // convert carriage returns as <br>
    marked.setOptions({
        breaks: true,
    })

    useEffect(() => {
        // console.log(sanitizeHtml(marked.parse(text)))
        // img by default is not added in sanitizeHtml
        const allowedTags = {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat([
                'img',
                'del',
            ]),
        }

        markedTexts.current.innerHTML = sanitizeHtml(
            marked.parse(text),
            allowedTags
        )
    }, [text])

    const handleTextArea = (event) => {
        setText(event.target.value)
    }

    const openPreviewer = () => {
        setIsPreviewerOpen(true)
    }

    const closePreviewer = () => {
        setIsPreviewerOpen(false)
    }

    return (
        <main className="flex flex-col md:flex-row md:gap-1 w-screen h-screen">
            <div
                className={`flex-1 bg-black min-h-full md:block ${
                    isPreviewerOpen && 'hidden'
                }`}
            >
                <div className="flex items-center justify-between bg-grayishBlack text-white px-3 py-2">
                    <h1>Markdown</h1>
                    <AiOutlineEye
                        onClick={openPreviewer}
                        className="md:hidden"
                    />
                </div>
                <textarea
                    id="editor"
                    className="customScrollbar block w-full h-[calc(100%_-_40px)] px-3 py-2 bg-black text-white"
                    name=""
                    onChange={handleTextArea}
                    placeholder="Write your markdown here."
                />
            </div>
            <div
                className={`flex-1 bg-black min-h-full ${
                    isPreviewerOpen ? 'block' : 'hidden'
                } md:block`}
            >
                <div className="flex items-center justify-between bg-grayishBlack text-white px-3 py-2">
                    <h1>Preview</h1>
                    <AiOutlineEyeInvisible
                        onClick={closePreviewer}
                        className="md:hidden"
                    />
                </div>
                <div
                    id="preview"
                    className="customScrollbar px-3 py-2 w-full h-[calc(100%_-_40px)] overflow-auto text-white markdown-body"
                    ref={markedTexts}
                />
            </div>
        </main>
    )
}

export default Markdown
