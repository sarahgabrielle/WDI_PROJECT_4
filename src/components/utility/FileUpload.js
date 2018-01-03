import React from 'react';

const FileUpload = ({ onChange }) => {
  const fileReader = new FileReader();
  fileReader.onload = () => onChange({ target: { name: 'base64', value: fileReader.result}});

  const handleImage = (e) => {
    e.preventDefault();
    const file = (e.target.files || e.dataTransfer.files)[0];
    fileReader.readAsDataURL(file);
  };

  return(
    <input
      id="test"
      type="file"
      accept="application/pdf"
      onChange={handleImage}
    />
  );
  // }
};

export default FileUpload;
