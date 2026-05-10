import React from 'react'
import DashboardLayout from '../layout/DashboardLayout.jsx'
import UploadBox from '../components/UploadBox.jsx';
import { useAuth } from '@clerk/clerk-react';
import { UserCreditsContext } from '../context/UserCreditsContext.jsx';
import { AlertCircle } from 'lucide-react';
import axios from 'axios';
import { apiEndpoints } from '../util/apiEndpoints.js';
import toast from 'react-hot-toast';

const Upload = () => {
  const [files, setFiles] = React.useState([]);
  const [uploading, setUploading] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [messageType, setMessageType] = React.useState(""); //succes or error
  const {getToken}=useAuth() || {};
  const {credits,refreshCredits}=React.useContext(UserCreditsContext);
  const MAX_FILES=5;

  const handleFileChange=(e)=>{
    const selectedFiles=Array.from(e.target.files);

    if(files.length + selectedFiles.length > MAX_FILES){
      setMessage(`You can only upload a maximum of ${MAX_FILES} files at a time.`);
      setMessageType("error");
      return;
    }
    // add the new files to the existing files
    setFiles((prevFiles)=>[...prevFiles,...selectedFiles]); 
    setMessage("");
    setMessageType(""); 

  }



  const handleRemoveFile=(index)=>{ 
    setFiles((prevFiles)=>prevFiles.filter((_,i)=>i!==index));
    setMessage("");
    setMessageType(""); 

  }

  const handleUpload=async()=>{
    if(files.length===0 ){
      setMessage("Please select at least one file to upload.");
      setMessageType("error");
      return;
    }
    if(files.length>MAX_FILES){
      setMessage(`You can only upload a maximum of ${MAX_FILES} files at a time.`);
      setMessageType("error");
      return;
    }
    setUploading(true);
    setMessage("Uploading files...");
    setMessageType("info");

    const formData=new FormData();
    files.forEach((file)=>formData.append("files",file));

    try {
      const token=await getToken();
      const response=await axios.post(apiEndpoints.UPLOAD_FILES,formData,{
        headers:{
          "Content-Type":"multipart/form-data",
          "Authorization": `Bearer ${token}`}});

          refreshCredits();
          /*if(response.data && response.data.remainingCredits!==undefined){
            // setCredits(response.data.remainingCredits);
            
          } */
          setMessage("Files uploaded successfully!");
          setMessageType("success");
          setFiles([]);
    } catch (error) {
      console.error("Error uploading files: ", error);
      
      setMessage(error.response?.data?.message || "Error uploading files. Please try again.");
      setMessageType("error");
    }finally{
      setUploading(false);
    }

  }   


  const isUploadDisabled =
  uploading ||
  files.length === 0 ||
  credits <= 0 ||
  files.length > MAX_FILES ||
  files.length > credits;



  return (
    <DashboardLayout activeMenu="Upload">
      <div className="p-6">
        {message &&(
          <div className={`mb-6 p-4 rounded-lg flex items-center gap-3  ${messageType==="error"?"bg-red-50 text-red-700":messageType==="success"?"bg-green-50 text-green-700":"bg-blue-50 text-blue-700"}`}>
            {messageType==="error" && <AlertCircle size={16}/>  }
            {message}
          </div>
        )}

        <UploadBox
          files={files}
          onFileChange={handleFileChange}
          onRemoveFile={handleRemoveFile}
          onUpload={handleUpload}
          uploading={uploading}
          remainingCredits={credits}
          isUploadDisabled={isUploadDisabled}
        />
      </div>
    </DashboardLayout>
  )
}

export default Upload;
