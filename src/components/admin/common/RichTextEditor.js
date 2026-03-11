import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

// Function to extract YouTube video ID from URL
const getYouTubeVideoId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image', 'video'],
      ['clean']
    ],
    handlers: {
      image: function() {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        
        input.onchange = async () => {
          const file = input.files[0];
          if (!file) return;

          const formData = new FormData();
          formData.append('file', file);

          try {
            const response = await fetch('/api/upload/image?folder=blog', {
              method: 'POST',
              body: formData
            });

            const result = await response.json();

            if (result.path) {
              const quill = this.quill;
              const range = quill.getSelection();
              quill.insertEmbed(range.index, 'image', result.path);
            } else {
              alert('Failed to upload image');
            }
          } catch (error) {
            console.error('Error uploading image:', error);
            alert('Error uploading image. Please try again.');
          }
        };

        input.click();
      },
      video: function() {
        const url = prompt('Enter YouTube or Vimeo URL:');
        if (!url) return;

        // Try to extract YouTube video ID
        const youtubeMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=))([a-zA-Z0-9_-]{11})/);
        
        if (youtubeMatch && youtubeMatch[1]) {
          // YouTube video
          const videoId = youtubeMatch[1];
          const embedUrl = `https://www.youtube.com/embed/${videoId}`;
          const quill = this.quill;
          const range = quill.getSelection();
          quill.insertEmbed(range.index, 'video', embedUrl);
        } else if (url.includes('vimeo.com')) {
          // Vimeo video
          const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
          if (vimeoMatch && vimeoMatch[1]) {
            const videoId = vimeoMatch[1];
            const embedUrl = `https://player.vimeo.com/video/${videoId}`;
            const quill = this.quill;
            const range = quill.getSelection();
            quill.insertEmbed(range.index, 'video', embedUrl);
          } else {
            alert('Invalid Vimeo URL. Please use the video page URL.');
          }
        } else {
          alert('Please enter a valid YouTube or Vimeo URL.');
        }
      }
    }
  }
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'list', 'bullet',
  'link',
  'image',
  'video'
];

const RichTextEditor = ({ value = '', onChange, placeholder = '' }) => {
  return (
    <div className="rte">
      <div className="rte__help" style={{ marginBottom: '10px', fontSize: '12px', color: '#666' }}>
        <strong>Video Help:</strong> Click the video button and paste a YouTube or Vimeo URL
      </div>
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
          min-height: 200px;
        }
        .rte :global(.ql-editor img) {
          max-width: 100%;
          height: auto;
          margin: 10px 0;
        }
        .rte :global(.ql-editor iframe) {
          max-width: 100%;
          margin: 10px 0;
        }
        .rte__help {
          padding: 8px 12px;
          background-color: #f0f7ff;
          border-left: 3px solid #4569e7;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;


