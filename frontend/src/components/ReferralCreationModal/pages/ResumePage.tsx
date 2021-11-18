import { Box } from '@mui/material';
import React, { useState } from 'react'
import Dropzone from 'react-dropzone'

export default function ResumePage() {
  const [file, setFile] = useState<any>();

  const handleDrop = acceptedFiles =>{
    setFile(acceptedFiles[0])
  }
  return (
    <div className="App">
      <div style={{paddingTop: "20px"}}>
        <div><strong>PDF only</strong></div>
        <Dropzone onDrop={handleDrop} accept= "application/pdf" maxSize={30000000} multiple={false}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
                <Box
                  sx={{
                    width: '100%',
                    height: 300,
                    border: 1
                  }}
                >
                  Drag'n'drop your resume, or click to select files
                </Box>
            </div>
          )}
        </Dropzone>
      </div>
      <div>
        <strong>File: </strong> {file? file.name: ""}
      </div>
    </div>
  );
}


