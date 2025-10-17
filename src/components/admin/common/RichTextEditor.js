import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link'],
    ['clean']
  ]
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'list', 'bullet',
  'link'
];

const RichTextEditor = ({ value = '', onChange, placeholder = '' }) => {
  return (
    <div className="rte">
      <ReactQuill
        theme="snow"
        value={value || ''}
        onChange={(content) => onChange && onChange(content)}
        placeholder={placeholder}
        modules={modules}
        formats={formats}
      />

      <style jsx>{`
        .rte :global(.ql-container) {
          font-size: 14px;
        }
        .rte :global(.ql-editor) {
          min-height: 120px;
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;


