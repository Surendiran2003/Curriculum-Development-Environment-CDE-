import React, { useState, useEffect } from "react";

const RichTextEditor = ({ value, onChange, field }) => {
  const [text, setText] = useState(value || "");
  
  useEffect(() => {
    setText(value || "");
  }, [value]);

  const handleChange = (e) => {
    setText(e.target.value);
    onChange(e.target.value);
  };

  const insertFormatting = (tag) => {
    // Get the textarea element
    const textarea = document.getElementById(`editor-${field}`);
    if (!textarea) return;
    
    // Get start and end positions of selected text
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = text.substring(start, end);
    
    let prefix = '';
    let suffix = '';
    
    // Determine appropriate tags
    switch(tag) {
      case 'bold':
        prefix = '<b>';
        suffix = '</b>';
        break;
      case 'italic':
        prefix = '<i>';
        suffix = '</i>';
        break;
      case 'underline':
        prefix = '<u>';
        suffix = '</u>';
        break;
      case 'left':
        prefix = '<div style="text-align:left;">';
        suffix = '</div>';
        break;
      case 'center':
        prefix = '<div style="text-align:center;">';
        suffix = '</div>';
        break;
      case 'right':
        prefix = '<div style="text-align:right;">';
        suffix = '</div>';
        break;
      default:
        break;
    }
    
    // Calculate new cursor position
    const newPosition = start + prefix.length + selectedText.length;
    
    // Create new text with formatting
    const newText = 
      text.substring(0, start) + 
      prefix + selectedText + suffix + 
      text.substring(end);
    
    // Update state
    setText(newText);
    onChange(newText);
    
    // Return focus to textarea and set cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newPosition, newPosition);
    }, 0);
  };

  return (
    <div className="border rounded">
      <div className="bg-gray-100 p-2 border-b flex gap-2 flex-wrap">
        <button
          type="button"
          onClick={() => insertFormatting('bold')}
          className="px-3 py-1 bg-white border rounded hover:bg-gray-200"
        >
          <strong>Bold</strong>
        </button>
        <button
          type="button"
          onClick={() => insertFormatting('italic')}
          className="px-3 py-1 bg-white border rounded hover:bg-gray-200"
        >
          <em>Italic</em>
        </button>
        <button
          type="button"
          onClick={() => insertFormatting('underline')}
          className="px-3 py-1 bg-white border rounded hover:bg-gray-200"
        >
          <u>Underline</u>
        </button>
        <div className="border-l h-6 mx-2"></div>
        <button
          type="button"
          onClick={() => insertFormatting('left')}
          className="px-3 py-1 bg-white border rounded hover:bg-gray-200"
        >
          Left
        </button>
        <button
          type="button"
          onClick={() => insertFormatting('center')}
          className="px-3 py-1 bg-white border rounded hover:bg-gray-200"
        >
          Center
        </button>
        <button
          type="button"
          onClick={() => insertFormatting('right')}
          className="px-3 py-1 bg-white border rounded hover:bg-gray-200"
        >
          Right
        </button>
      </div>
      
      <textarea
        id={`editor-${field}`}
        value={text}
        onChange={handleChange}
        className="w-full p-3 min-h-[200px]"
        placeholder="Enter content here. Select text and use formatting buttons above."
      />
      
      <div className="p-3 border-t">
        <h4 className="font-medium mb-2">Preview:</h4>
        <div 
          className="border p-3 min-h-[100px] bg-gray-50 rounded"
          dangerouslySetInnerHTML={{ __html: text }}
        ></div>
      </div>
    </div>
  );
};

export default RichTextEditor;