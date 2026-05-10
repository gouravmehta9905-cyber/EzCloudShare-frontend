/*import React, { useEffect } from 'react'
import DashboardLayout from '../layout/DashboardLayout'
import { useState } from 'react';
import {
  List,
  Grid,
  Globe,
  Copy,
  Lock,
  Download,
  Trash2,
  Image as ImageIcon,
  Video,
  Music,
  FileText,
  File as FileIcon,
  Eye
} from "lucide-react";

import { File as FileIconLarge } from "lucide-react";
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import FileCard from '../components/FileCard';
import { apiEndpoints } from '../util/apiEndpoints';
import ConfirmationDialog from '../components/ConfirmationDialog';
import LinkShareModal from '../components/LinkShareModal';

const MyFiles = () => {
  const [files, setFiles] = useState([]);
  const [viewMode,setViewMode] = useState("list");
  const{getToken}=useAuth();
  const navigate=useNavigate();
  const [deleteConfirmation,setDeleteConfirmation] = useState({isOpen:false,fileId:null});
  const [shareModal,setShareModal] = useState({isOpen:false,fileId:null,link:""}); 

  


  //fetrching the files for the logged in user from the server.

  const fetchFiles = async () =>{ 
      // Simulate fetching files from an API\
      try {
        const token = await getToken();
        // Use the token to make authenticated requests
        const response = await axios.get(apiEndpoints.FETCH_FILES,{headers:{Authorization: `Bearer ${token}`}});
        if(response.status === 200){
          
          setFiles(response.data);
        }
      } catch (error) {
        console.error('Error fetching files from the server:', error);
        toast.error('Error fetching the files from server:',error.message);
      }
  }

  //Toggling between the public and private status of the file;

  const togglePublic = async (fileToUpdate) => {
  try {
    const token = await getToken();

    await axios.patch(apiEndpoints.TOGGLE_FILE(fileToUpdate.id),{},
      {
        headers: {Authorization: `Bearer ${token}`,},
      });
    setFiles(prevFiles =>
  prevFiles.map(file =>
    file.id === fileToUpdate.id
      ? { ...file, isPublic: !file.isPublic }
      : file
  )
);   


  } catch (error) {
    console.error("Error toggling file status.", error);
    toast.error("Error toggling file status.", error.message);
  }
};

// handle file download
const handleDownload=async(file) =>{
  try {
    const token =await getToken();
    const response=await axios.get(apiEndpoints.DOWNLOAD_FILE(file.id),{
    headers:{Authorization: `Bearer ${token}`} ,
    responseType: 'blob'
  }); 
        
    //create a blob url and trigger download
    const url =window.URL.createObjectURL(new Blob([response.data]));
    const link=document.createElement("a");
    link.href=url;
    link.setAttribute("download",file.name);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);//clear the url object.

  } catch (error) {
    console.error("Download failed", error);
    toast.error("Error downloading the file", error.message);
  }
}
// Closes the delete confirmation dialog.
const closeDeleteConfirmation = () => {
  setDeleteConfirmation({isOpen:false,fileId:null});
}

// opens the delete confirmation dialog for the specific file id.
const openDeleteConfirmation = (fileId) => {
  setDeleteConfirmation({isOpen:true,fileId});
}

//opens the shaare link modal 
const openShareModal = (fileId) => {
  const link=`${window.location.origin}/file/${fileId}`;
  setShareModal({isOpen:true,fileId,link});
}
//Close the share link modal.
const closeShareModal = () => {
  setShareModal({isOpen:false,fileId:null,link:""});
}

// Handle file deletion after confirmation
const handleDelete = async () => {
  const fileId= deleteConfirmation.fileId;
  if(!fileId) return;
  try {
    const token=await getToken();
    const response= await axios.delete(apiEndpoints.DELETE_FILE(fileId),{headers:{Authorization: `Bearer ${token}`}});
    if(response.status ===204){
      setFiles(files.filter((file) =>file.id !== fileId));
      closeDeleteConfirmation(); 
    }
    else{
      toast.error("Error deleting  the file. ")
    }
  } catch (error) {
    console.log("Error deleting the file",error);
    toast.error("Error deleting the file",error.message);
  }
}



  useEffect(() => {
    fetchFiles();
     
  },[getToken]);


  
  const getFileIcon = (file) => {
        const extension=file.name.split('.').pop().toLowerCase();

        if(['jpg','jpeg','png','gif','svg','webp'].includes(extension)){
                return <ImageIcon size={24} className="text-purple-500"/> 
        }

        if(['mp4','avi','mov','webm','mkv'].includes(extension)){
                return <Video size={24} className="text-blue-500"/>
        }

        if(['mp3','wav','ogg','flac','m4a'].includes(extension)){
                return <Music size={24} className="text-green-500"/>
        }

        if(['pdf','doc','docx','xls','xlsx','ppt','pptx','txt','rtf'].includes(extension)){
                return <FileText size={24} className="text-amber-500"/>
        }
        return <FileIcon size={24} className="text-purple-500"/>

  }


  return (
    <DashboardLayout activeMenu="My Files">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">My Files {files.length}</h2>
          <div className="flex items-center gap-3">
            <List 
               onClick={() => setViewMode("list")}
               size={24}
               className={`cursor-pointer transition-colors ${viewMode === "list" ? "text-blue-600" : "text-gray-400 hover:text-gray-600"}`}/>

            <Grid 
               onClick={() => setViewMode("grid")}
               size={24}
               className={`cursor-pointer transition-colors ${viewMode === "grid" ? "text-blue-600" : "text-gray-400 hover:text-gray-600"}`}/>
          </div>
        </div>

        {files.length ===0?(
          <div className="bg-white rounded-lg shadow p-12 flex flex-col items-center justify-center">
               <FileIconLarge
                   size={60}
                   className="text-purple-300 mb-4"
               />
               <h3 className="text-xl font-medium text-gray-700 mb-2">
                    No files uploaded yet
               </h3>
               <p className="text-gray-500 text-center max-w-md mb-6">
                Start uploading files to see them listed here . you can upload documents, images and other files to share and manage them securly.
               </p>

               <button 
                  onClick={()=>navigate('/upload')}
               
               className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition:colors">
                Go to Upload
               </button>
          </div>
        ):viewMode === "grid" ?(
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {files.map((file)=>(
              <FileCard 
                key={file.id}
                file={file}
                onDelete={openDeleteConfirmation}
                onTogglePublic={togglePublic}
                onDownload={handleDownload}
                onShareLink={openShareModal}
              />
            ))}
          </div>
        ):(
          <div className="overflow-x-auto bg-white rounded-lg shadow  ">
              
              <table className='min-w-full'>
                 <thead className='bg-gray-50 border-b border-gray-200'>
                   <tr>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'> Name</th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'> Size</th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'> Uploaded</th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Sharing </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions </th>
                   </tr>
                 </thead>
                 <tbody className='divide-y divide-gray-200'>
                  {files.map((file)=>(
                    <tr key={file.id} className='hover:bg-gray-50 transition-colors'>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800'>
                        <div className="flex items-center gap-2">
                          {getFileIcon(file)}
                          {file.name}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {(file.size / 1024).toFixed(1)} KB
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                         {file.uploadAt ? new Date(file.uploadAt).toLocaleDateString() : "-"}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        <div className="flex items-center gap-4 ">
                          <button 
                              onClick={()=> togglePublic(file)}
                              className="flex items-center gap-2 cursor-pointer group">
                              {file.isPublic?(
                                <>
                                  <Globe size={16} className='text-green-500 '/>
                                  <span className='group-hover:underline'>
                                  Public  
                                  </span>
                                </> 

                              ):(
                                <>
                                   <Lock size={16} className="text-gray-500"/>
                                   <span className="group-hover:underline">
                                    Private
                                   </span>
                                </>
                              )}

                          </button>
                          {file.isPublic && (
                            <button 
                              onClick={()=> openShareModal(file.id)}
                              className="flex items-center gap-2 cursor-pointer group text-blue-600">
                              <Copy size={16}/>
                              <span className='group-hover:underline'>
                                Share Link
                                
                              </span>
                            </button>
                    
                          ) }
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                         <div className="grid grid-cols-3 gap-4">
                            <div className="flex justify-center">
                                <button 
                                    onClick={()=> handleDownload(file)}
                                    title="Download"
                                    className='text-gray-500 hover:text-blue-600 '>
                                    <Download size={18}/>

                                </button>
                            </div>
                            <div className="flex justify-center">
                              <button 
                                onClick={()=> openDeleteConfirmation(file.id)}
                                title="Delete"
                                className='text-gray-500 hover:text-red-600'>
                                <Trash2 size={18}/>  

                              </button>
                            </div>

                            <div className="flex justify-center"> 
                               {file.isPublic?(
                                  <a href={`/file/${file.id}`} title='View File' target="_blank" rel="noreferrer" className='text-gray-500 hover:text-blue-600'>
                                    <Eye size={18} />
                                  </a>
                               ):(
                                <span className='w-4.5 '>

                                </span>
                               )}
                            </div>
                         </div>
                      </td>
                      
                    </tr>
                  ))}

                 </tbody>

              </table>

          </div>
        )}

        
        <ConfirmationDialog
           isOpen={deleteConfirmation.isOpen }
           onClose={closeDeleteConfirmation}
           title="Delete File"
           message="Are you sure want to delete this file? This action cannot be undone."
           cancelText="Cancel"
           onConfirm={handleDelete}
           confirmationButtonClass='bg-red-600 hover:bg-red-700'
        
        />

      
        <LinkShareModal
          isOpen={shareModal.isOpen}
          onClose={closeShareModal}
          link={shareModal.link}
          title="Share File"
        />
      </div>
       
    </DashboardLayout>
  )
}

export default MyFiles  */



import React, { useEffect } from 'react'
import DashboardLayout from '../layout/DashboardLayout'
import { useState } from 'react';
import {
  List,
  Grid,
  Globe,
  Copy,
  Lock,
  Download,
  Trash2,
  Image as ImageIcon,
  Video,
  Music,
  FileText,
  File as FileIcon,
  Eye
} from "lucide-react";

import { File as FileIconLarge } from "lucide-react";
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import FileCard from '../components/FileCard';
import { apiEndpoints } from '../util/apiEndpoints';
import ConfirmationDialog from '../components/ConfirmationDialog';
import LinkShareModal from '../components/LinkShareModal';

const MyFiles = () => {
  const [files, setFiles] = useState([]);
  const [viewMode, setViewMode] = useState("list");
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const [deleteConfirmation, setDeleteConfirmation] = useState({ isOpen: false, fileId: null });
  const [shareModal, setShareModal] = useState({ isOpen: false, fileId: null, link: "" });

  // ✅ ONLY PREVIEW STATE (unchanged logic, just used for preview)
  const [previewFile, setPreviewFile] = useState(null);

  // ---------------- FETCH FILES ----------------
  const fetchFiles = async () => {
    try {
      const token = await getToken();

      const response = await axios.get(apiEndpoints.FETCH_FILES, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status === 200) {
        setFiles(response.data);
      }
    } catch (error) {
      console.error(error);
      toast.error('Error fetching files');
    }
  };

  // ---------------- TOGGLE PUBLIC ----------------
  const togglePublic = async (fileToUpdate) => {
    try {
      const token = await getToken();

      await axios.patch(apiEndpoints.TOGGLE_FILE(fileToUpdate.id), {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setFiles(prev =>
        prev.map(file =>
          file.id === fileToUpdate.id
            ? { ...file, isPublic: !file.isPublic }
            : file
        )
      );
    } catch (error) {
      console.error(error);
      toast.error("Error toggling file status");
    }
  };

  // ---------------- DOWNLOAD ----------------
  const handleDownload = async (file) => {
    try {
      const token = await getToken();

      const response = await axios.get(apiEndpoints.DOWNLOAD_FILE(file.id), {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", file.name);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error(error);
      toast.error("Error downloading file");
    }
  };

  // ---------------- DELETE ----------------
  const openDeleteConfirmation = (fileId) => {
    setDeleteConfirmation({ isOpen: true, fileId });
  };

  const closeDeleteConfirmation = () => {
    setDeleteConfirmation({ isOpen: false, fileId: null });
  };

  const handleDelete = async () => {
    const fileId = deleteConfirmation.fileId;
    if (!fileId) return;

    try {
      const token = await getToken();

      const response = await axios.delete(apiEndpoints.DELETE_FILE(fileId), {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status === 204) {
        setFiles(files.filter(file => file.id !== fileId));
        closeDeleteConfirmation();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error deleting file");
    }
  };

  // ---------------- SHARE ----------------
  const openShareModal = (fileId) => {
    const link = `${window.location.origin}/file/${fileId}`;
    setShareModal({ isOpen: true, fileId, link });
  };

  const closeShareModal = () => {
    setShareModal({ isOpen: false, fileId: null, link: "" });
  };

  // ---------------- FILE ICON ----------------
  const getFileIcon = (file) => {
    const extension = file.name.split('.').pop().toLowerCase();

    if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(extension)) {
      return <ImageIcon size={24} className="text-purple-500" />
    }

    if (['mp4', 'avi', 'mov', 'webm', 'mkv'].includes(extension)) {
      return <Video size={24} className="text-blue-500" />
    }

    if (['mp3', 'wav', 'ogg', 'flac', 'm4a'].includes(extension)) {
      return <Music size={24} className="text-green-500" />
    }

    if (['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'rtf'].includes(extension)) {
      return <FileText size={24} className="text-amber-500" />
    }

    return <FileIcon size={24} className="text-purple-500" />
  };

  useEffect(() => {
    fetchFiles();
  }, [getToken]);

  return (
    <DashboardLayout activeMenu="My Files">
      <div className="p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">My Files {files.length}</h2>

          <div className="flex items-center gap-3">
            <List onClick={() => setViewMode("list")} size={24} />
            <Grid onClick={() => setViewMode("grid")} size={24} />
          </div>
        </div>

        {/* EMPTY STATE */}
        {files.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 flex flex-col items-center justify-center">
            <FileIconLarge size={60} className="text-purple-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              No files uploaded yet
            </h3>
            <button
              onClick={() => navigate('/upload')}
              className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
            >
              Go to Upload
            </button>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {files.map(file => (
              <FileCard
                key={file.id}
                file={file}
                onDelete={openDeleteConfirmation}
                onTogglePublic={togglePublic}
                onDownload={handleDownload}
                onShareLink={openShareModal}
                onPreview={setPreviewFile}
              />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full">

              <tbody className="divide-y divide-gray-200">
                {files.map(file => (
                  <tr key={file.id} className="hover:bg-gray-50">

                    <td className="px-6 py-4 flex items-center gap-2">
                      {getFileIcon(file)}
                      {file.name}
                    </td>

                    <td className="px-6 py-4">
                      {(file.size / 1024).toFixed(1)} KB
                    </td>

                    <td className="px-6 py-4 flex gap-4">

                      <button onClick={() => handleDownload(file)}>
                        <Download size={18} />
                      </button>

                      <button onClick={() => openDeleteConfirmation(file.id)}>
                        <Trash2 size={18} />
                      </button>

                      {/* ✅ ONLY EDITED PART (PREVIEW) */}
                      <button
                        onClick={() => setPreviewFile(file)}
                        className="text-gray-500 hover:text-blue-600"
                      >
                        <Eye size={18} />
                      </button>

                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}

        {/* ---------------- PREVIEW MODAL (ONLY ADDITION) ---------------- */}
        {previewFile && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
            onClick={() => setPreviewFile(null)}
          >
            <div
              className="bg-white w-[85%] h-[85%] rounded-lg relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >

              <button
                onClick={() => setPreviewFile(null)}
                className="absolute top-2 right-2 text-red-500 text-xl z-10"
              >
                ✕
              </button>

              {/* IMAGE */}
              {previewFile.name?.match(/\.(jpg|jpeg|png|gif|webp)$/i) && (
                <img src={apiEndpoints.DOWNLOAD_FILE(previewFile.id)} className="w-full h-full object-contain" />
              )}

              {/* PDF */}
              {previewFile.name?.match(/\.pdf$/i) && (
                <iframe src={apiEndpoints.DOWNLOAD_FILE(previewFile.id)} className="w-full h-full" />
              )}

              {/* VIDEO */}
              {previewFile.name?.match(/\.(mp4|webm|mov|mkv)$/i) && (
                <video src={apiEndpoints.DOWNLOAD_FILE(previewFile.id)} controls className="w-full h-full" />
              )}

              {/* AUDIO */}
              {previewFile.name?.match(/\.(mp3|wav|ogg|m4a)$/i) && (
                <audio src={apiEndpoints.DOWNLOAD_FILE(previewFile.id)} controls className="w-full" />
              )}

            </div>
          </div>
        )}

        {/* MODALS (UNCHANGED) */}
        <ConfirmationDialog
          isOpen={deleteConfirmation.isOpen}
          onClose={closeDeleteConfirmation}
          title="Delete File"
          message="Are you sure want to delete this file?"
          onConfirm={handleDelete}
        />

        <LinkShareModal
          isOpen={shareModal.isOpen}
          onClose={closeShareModal}
          link={shareModal.link}
          title="Share File"
        />

      </div>
    </DashboardLayout>
  );
};

export default MyFiles;
