import { useState } from "react";
import ReactQuill from "react-quill";
import Quill from "quill";
import "react-quill/dist/quill.snow.css";

export default function TextEditor({ markdownText, onMarkdownChange }) {
  const handleChange = (value) => {
    onMarkdownChange(value);
  };
  

  const modules = {
    toolbar: [  
      [{ 'color': ["red","green"] }],
      [{ "font": [] }],
      ['bold', 'italic', 'underline', 'strike'], 
      [{ 'list': 'ordered' }, { 'list': 'bullet' }], 
      ['link'],
      ['clean'], 
    ],
  };
  

  return <div className="w-[400px]">
  <ReactQuill className="w-full h-[260px]" theme="snow"  modules={modules} value={markdownText} onChange={handleChange} />
  </div>
}
