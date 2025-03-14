import { useMemo } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

import BoardEditModule from "../edit/BoardEditModule";

const ReactEditor = () => {

    const formats:string[] = [
        "header", "size", "font",
        "bold", "italic", "underline", "strike", "blockquote",
        "list", "bullet", "indent", "link", "image",
        "color", "background", "align",
        "script", "code-block", "clean"
    ];

    const modules:{} = useMemo(() => ({
        toolbar: {
            container: "#toolBar"
        },
    }), []);

    return (
        <div>
            <div id="toolBar">
                <BoardEditModule />
            </div>
            <ReactQuill theme="snow" modules={modules} formats={formats} 
            		style={{height: "300px", width: "850px"}}/>
        </div>
    )
}

export default ReactEditor;