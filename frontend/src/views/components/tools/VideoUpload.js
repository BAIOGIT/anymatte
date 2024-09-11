import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useAxios from '../../../utils/useAxios';
import { CloudArrowUpIcon, CloudArrowDownIcon, CheckCircleIcon, XCircleIcon, ForwardIcon, ArrowPathIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

import Button from '../ui/button';

import CheckUploadPermission from './CheckUploadPermission';

import { StripePopupTrigger } from '../../../utils/StripePopup';

import jwtDecode from "jwt-decode"

const token = localStorage.getItem("authTokens")
        
if (token) {
  try {
    const decode = jwtDecode(token);
    // // DEBUG --> console.log("Decoded token:", decode); // Inspect the decoded token
    var user_id = decode.id;
    var username = decode.username;
    var email = decode.email;
  } catch (error) {
    console.error("Failed to decode token:", error);
  }
}

const VideoUpload = () => {
  const axios = useAxios();

  const [video, setVideo] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0); // New state for upload progress
  const [videoId, setVideoId] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState('');
  const [fileName, setFileName] = useState('');
  const [videoURL, setVideoURL] = useState('');

  const paymentUuid = useSelector((state) => state.upload.uploadUuid);
  const canUpload = useSelector((state) => state.upload.canUpload);

  const [selectedOption, setSelectedOption] = useState(null); // New state for option selection
  const [selectedFrame, setSelectedFrame] = useState(0); // New state for frame selection
  const [frameCount, setFrameCount] = useState(0); // New state to store the number of frames
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);  // Track the current frame index
  const [points, setPoints] = useState([]);  // To store the 3 selected points

  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const [videoElement, setVideoElement]  = useState(null);

  const canvasThumbnailsRef = useRef(null);
  const canvasFrameSelectionRef = useRef(null);
  const canvasPointsRef = useRef(null);
  

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setVideo(file);
      setFileName(file.name);
      const videoUrl = URL.createObjectURL(file);
      setVideoURL(videoUrl);
    } else {
      setVideo(null);
      setFileName('');
      setVideoURL('');
    }
  };

  const handleRemoveFile = () => {
    setVideo(null);
    setFileName('');
    setVideoURL('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const checkStatus = async (videoId) => {
    const interval = setInterval(async () => {
      try {
        const response = await axios.get(`/status/${videoId}/`);
        const { status, processed_file_url } = response.data;

        if (status === 'done') {
          setDownloadUrl(`https://${process.env.REACT_APP_DJANGO_IP_REMOTE}:9777${processed_file_url}`);
          clearInterval(interval);
        } else if (status === 'failed') {
          clearInterval(interval);
        }

        setUploadStatus(status);

      } catch (error) {
        console.error(error);
        clearInterval(interval);
      }
    }, 1000);
  };

  const resetForm = () => {
    setVideo(null);
    setUploadStatus('');
    setUploadProgress(0);  // Reset upload progress
    setVideoId(null);
    setDownloadUrl('');
    setFileName('');
    setVideoURL('');
    setIsPopupOpen(false);
    setSelectedOption(null);
    setSelectedFrame(0);
    setFrameCount(0);
    setCurrentFrameIndex(0);
    setPoints([]);
    setHumanSettingsSingle(true)
    setFaceSettingsSingle(true)
    setFaceSettingsNeck(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const generateThumbnails = () => {
    // DEBUG --> console.log(uploadStatus);
    
    const videoElement = videoRef.current;
    const canvasElement = canvasThumbnailsRef.current;
    
    try {
      const ctx = canvasElement.getContext('2d');
  
      if (!videoElement || !ctx) return;
  
      const { duration, videoWidth, videoHeight } = videoElement;
      const numberOfThumbnails = 8;
      const thumbnailWidth = canvasElement.width / numberOfThumbnails;
      const thumbnailHeight = canvasElement.height;
  
      videoElement.currentTime = 0; // Start at the beginning
  
      const drawFrame = (i) => {
        if (i >= numberOfThumbnails) return; // Stop when all thumbnails are drawn
  
        videoElement.currentTime = (i / numberOfThumbnails) * duration;
  
        videoElement.onseeked = () => {
          ctx.drawImage(
            videoElement,
            i * thumbnailWidth, 0,
            thumbnailWidth, thumbnailHeight
          );
          drawFrame(i + 1); // Draw the next frame
        };
      };
  
      drawFrame(0); // Start drawing frames

    } catch {
      // DEBUG --> console.error('generateThumbnails skip.');
      return;      
    }
  };

  useEffect(() => {
    if (videoURL && videoRef.current) {
      const videoElement = videoRef.current;
      const handleLoadedMetadata = () => {
        setVideoElement(videoRef.current);

      if (uploadStatus === '') {
        generateThumbnails();        
      }
    };

      videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);

      return () => {
        videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }
  }, [videoURL]);

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Function to open the popup
  const openPopup = () => {
    setIsPopupOpen(true);
  };

  // Function to close the popup
  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!video) {
      setUploadStatus('empty');
      return;
    }
  
    // Open the payment popup first
    if ( !token ) {
      openPopup();
    } else {
      setUploadStatus('selection');
      
      // handleUpload(); // Call the success handler or any other logic
    }
  };
  
  // Handle option selection
  const handleOptionSelection = async (option) => {
    videoRef.current = videoElement;
    setSelectedOption(option);
    setUploadStatus(option); // Proceed to frame selection UI
  };

  const drawFrameOnCanvas = (frameTime, canvasRef) => {
    const canvasElement = canvasRef.current;
    const ctx = canvasElement?.getContext('2d');  // Optional chaining to ensure ctx is not null
  
    videoRef.current = videoElement;
    if (canvasElement && videoRef.current) {
      const video = videoRef.current;
      const videoAspectRatio = video.videoWidth / video.videoHeight;
      const canvasAspectRatio = 16 / 9;
  
      // Determine canvas size (e.g., 1280x720)
      const canvasWidth = 640;  // Width for 16:9 aspect ratio
      const canvasHeight = 360;  // Height for 16:9 aspect ratio
  
      // Set canvas dimensions
      canvasElement.width = canvasWidth;
      canvasElement.height = canvasHeight;
  
      // Adjust video size and position to fit within the canvas
      let drawWidth, drawHeight, offsetX, offsetY;
  
      if (video.videoWidth / video.videoHeight > canvasAspectRatio) {
        // Video is wider relative to the canvas
        drawWidth = canvasWidth;
        drawHeight = drawWidth / videoAspectRatio;
        offsetX = 0;
        offsetY = (canvasHeight - drawHeight) / 2;
      } else {
        // Video is taller relative to the canvas
        drawHeight = canvasHeight;
        drawWidth = drawHeight * videoAspectRatio;
        offsetX = (canvasWidth - drawWidth) / 2;
        offsetY = 0;
      }
      console.log(drawWidth);
      console.log(drawHeight);
      
      
      video.currentTime = frameTime;
      video.onseeked = () => {
        // ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);  // Clear canvas before drawing
        ctx.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
      };
    } else {
      console.error("Canvas or context is null");
    }
  };

  const handleNextFrame = () => {
    videoRef.current = videoElement;
    if (videoRef.current && canvasFrameSelectionRef.current) {
      
      const totalFrames = Math.floor(videoRef.current.duration * videoRef.current.frameRate);  // Approximate total frames
      const nextFrameTime = (currentFrameIndex + 1) / videoRef.current.frameRate;
      setCurrentFrameIndex(currentFrameIndex + 1);
      
      // Ensure video is reloaded and frame is drawn
      videoRef.current.load();  // Reload the video to make sure it's ready
      drawFrameOnCanvas(4, canvasFrameSelectionRef);
    }
  };
  
  const handlePreviousFrame = () => {
    videoRef.current = videoElement;
    
    if (videoRef.current && canvasFrameSelectionRef.current) {
      const prevFrameTime = (currentFrameIndex - 1) / videoRef.current.frameRate;
      setCurrentFrameIndex(currentFrameIndex - 1);
      
      videoRef.current.load();  // Reload the video to ensure it's ready
      drawFrameOnCanvas(8, canvasFrameSelectionRef);
    }
  };  

  const handleConfirmFrameSelection = async () => {
    setUploadStatus('pick-tab1');  // Proceed to point selection
    drawFrameOnCanvas(0, canvasPointsRef);  // Draw the first frame when entering pick-tab1
  };

  useEffect(() => {
    if (uploadStatus === 'pick' && videoRef.current) {
      drawFrameOnCanvas(0, canvasFrameSelectionRef);  // Draw the first frame when entering pick
    }
    if (uploadStatus === 'pick-tab1' && videoRef.current) {
      drawFrameOnCanvas(0, canvasPointsRef);  // Draw the first frame when entering pick-tab1
    }
  }, [uploadStatus]);
  
  const handleCanvasClick = (event) => {
    const canvasElement = canvasPointsRef.current;
    const rect = canvasElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
  
    if (points.length < 3) {
      setPoints([...points, { x, y }]);
    }
  };
  
  const handleClosePoints = (event) => {
    setUploadStatus('pick');
    setPoints([]);
  };
  
  // New function to handle upload after payment success
  const handleUpload = async (args) => {
    // // DEBUG --> console.log(paymentUuid);
    const formData = new FormData();
    formData.append('file', video);
    formData.append('method', selectedOption);
    formData.append('args', args);
    
    // formData.append('points', JSON.stringify(points));  // Attach selected points
    
    if ( paymentUuid == null ) {
      formData.append('paymentUuid', 'null');
    } else {
      formData.append('paymentUuid', paymentUuid);
    }
  
    try {
      setUploadStatus('uploading');  // Set status to uploading
  
      const response = await axios.post(`/upload-file/`, formData, {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(progress);  // Update upload progress
        }
      });
  
      setUploadStatus('processing');
      setVideoId(response.data.file_id);
      checkStatus(response.data.file_id);
    } catch (error) {
      setUploadStatus('failed');
      console.error(error);
    }
  };

  const handleSubmitText = async (event) => {
    event.preventDefault();

    const text = event.target.objects.value;    
    const args = {
      'text': text,
    };

    handleUpload(JSON.stringify(args));
  };

  const handleSubmitPoints = async (event) => {
    event.preventDefault();

    const args = {
      'frame': currentFrameIndex,
      'points': points,
    };

    handleUpload(JSON.stringify(args));
  };

  const [humanSettingsSingle, setHumanSettingsSingle] = useState(true);

  const handleSubmitHuman = async (event) => {
    event.preventDefault();
  
    const args = {
      'single': humanSettingsSingle,
    };

    handleUpload(JSON.stringify(args));
  };

  const [faceSettingsSingle, setFaceSettingsSingle] = useState(true);
  const [faceSettingsNeck, setFaceSettingsNeck] = useState(false);

  const handleSubmitFace = async (event) => {
    event.preventDefault();
  
    const args = {
      'single': faceSettingsSingle,
      'neck': faceSettingsNeck,
    };

    handleUpload(JSON.stringify(args));
  };

  return (
    <div className="flex flex-col items-center justify-center p-24">
      <div className="shadow-lg rounded-lg max-w-xl border-black dark:border-white border-x-[1px] border-y-[8px] min-w-[400px] md:min-w-[600px] lg:min-w-[800px] relative">
        <div className="flex flex-col items-center m-8">
          {uploadStatus === '' && (
            <div className="flex flex-col items-center ">
              <CheckUploadPermission />

              <div className="flex flex-col items-center mt-4">
                <h1 className="text-2xl font-semibold mt-6 text-center">Upload your video</h1>
                <span className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2 animate-pulse">Proceed to remove black frames.</span>

                <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
                  <label htmlFor="file-upload" className="flex flex-col items-center cursor-pointer my-2 mt-3">
                    <div className="flex flex-col items-center">
                      <CloudArrowUpIcon className="w-20 h-20 text-gray-400 transition-transform duration-500 transform hover:scale-110" />

                      {canUpload ? (
                        <>
                          <input
                              id="file-upload"
                              type="file"
                              accept="video/*"
                              onChange={handleChange}
                              className="hidden"
                              ref={fileInputRef}
                          />
                          <span className="text-sm font-medium text-gray-800 dark:text-gray-300">
                              {fileName ? 'Choose another file' : 'Choose a file'}
                          </span>                      
                        </>
                      ) : (
                          <span className="text-sm font-medium text-gray-800 dark:text-gray-300">
                              Upgrade your plan to upload more files
                          </span>
                      )}

                    </div>                  
                  </label>

                  {fileName && (
                      <>
                          <div className="my-6 flex flex-col items-center">
                              <span className="font-medium text-md text-gray-800 dark:text-gray-300">Selected file:</span>
                              <span className="font-bold text-lg text-gray-800 dark:text-gray-300">{fileName}</span>
                            <div className="mt-2 relative w-80">
                            {/* Hidden video element used for extracting frames */}
                              <video
                                  ref={videoRef}
                                  src={videoURL}
                                  className="hidden"
                                  controls={false}
                              ></video>

                              {/* Canvas for Thumbnails */}
                              <canvas
                                  ref={canvasThumbnailsRef}
                                  className="w-full h-20 cursor-pointer border border-black dark:border-white rounded-md"
                                  // onMouseMove={handleMouseMove}
                              />

                              {/* Vertical bar for timeline indication */}
                              {/* <div
                                  id="timeline-indicator"
                                  className="absolute top-0 bottom-0 w-[2px] bg-palette-gradientPrimary opacity-75 pointer-events-none"
                                  style={{ left: 0 }}
                              ></div> */}

                              <button
                                  type="button"
                                  onClick={handleRemoveFile}
                                  className="absolute right-0 top-0 m-0.5 bg-gradient-to-br hover:bg-gradient-to-br from-palette-gradientPrimary to-palette-gradientSecondary hover:from-palette-gradientPrimary hover:to-palette-gradientPrimary text-sm font-bold py-1 px-3 rounded transition flex items-center text-white"
                              >
                                  Remove
                              </button>
                            </div>
                          </div>
                      </>
                  )}
                  {/* {video && (
                    <video ref={videoRef} controls className="w-full" >
                      <source src={videoURL} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )} */}
                  {video && (
                  <Button 
                      type="submit" 
                      className="mt-4 bg-gray-200 text-black font-medium py-2 px-6 rounded hover:bg-white"
                      disabled={video === null}
                  >
                    Proceed
                  </Button>
                  )}

                </form>

                {!token && isPopupOpen && (
                  <StripePopupTrigger reason='generation' mode='payment' price_id='price_1Pv64fJ0wDsD9vPNMbmj3Kn9' quantity='1' onPaymentSuccess={handleUpload} onClose={closePopup} />
                )}

              </div>
            </div>
          )}
          {/* Step 1: Option Selection */}
          {uploadStatus === 'selection' && (
            <div className="flex flex-col items-center my-8">
              <button
                onClick={() => setUploadStatus('')}
                className="absolute top-0 right-0 px-3 py-2 mr-2 mt-2 font-medium text-sm bg-lightTheme-primary dark:bg-darkTheme-primary text-black dark:text-white hover:text-white dark:hover:text-black rounded-md hover:bg-darkTheme-primary dark:hover:bg-lightTheme-primary ring-2 ring-black dark:ring-white transition-colors"
                aria-label="Return"
              >
                <span className="fas fa-arrow-left"></span>
                {/* Go back */}
              </button>
              <h1 className="text-2xl font-semibold text-center">What you need to mask?</h1>
              <span className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2 animate-pulse">Select from the following methods.</span>
              <div className="my-8 grid grid-cols-2 gap-8">
                <div className="flex flex-col items-center text-center w-36 ">
                  <Button onClick={() => handleOptionSelection('text')} className="w-36 h-36">
                    <h2 className="text-xl font-semibold">Caption</h2>
                  </Button>
                  <span className="text-md font-light text-black dark:text-white mt-3">Type the words of the items you want to mask</span>
                </div>
                <div className="flex flex-col items-center text-center w-36 ">
                  <Button onClick={() => handleOptionSelection('pick')} className="w-36 h-36">
                    <h2 className="text-xl font-semibold">Pick</h2>
                  </Button>
                  <span className="text-md font-light text-black dark:text-white mt-3">Interactively pick the items you want to masks</span>
                </div>
                <div className="flex flex-col items-center text-center w-36 ">
                  <Button onClick={() => handleOptionSelection('human')} className="w-36 h-36">
                    <h2 className="text-xl font-semibold">Human</h2>
                  </Button>
                  <span className="text-md font-light text-black dark:text-white mt-3">Interactively pick the items you want to masks</span>
                </div>
                <div className="flex flex-col items-center text-center w-36 ">
                  <Button onClick={() => handleOptionSelection('face')} className="w-36 h-36">
                    <h2 className="text-xl font-semibold">Face</h2>
                  </Button>
                  <span className="text-md font-light text-black dark:text-white mt-3">Interactively pick the items you want to masks</span>
                </div>
              </div>
            </div>
          )}
          {/* Step 2: Text prompt */}
          {uploadStatus === 'text' && (
            <div className="flex flex-col items-center my-8">
              <button
                onClick={() => setUploadStatus('selection')}
                className="absolute top-0 right-0 px-3 py-2 mr-2 mt-2 font-medium text-sm bg-lightTheme-primary dark:bg-darkTheme-primary text-black dark:text-white hover:text-white dark:hover:text-black rounded-md hover:bg-darkTheme-primary dark:hover:bg-lightTheme-primary ring-2 ring-black dark:ring-white transition-colors"
                aria-label="Return"
              >
                <span className="fas fa-arrow-left"></span>
              </button>
              {fileName && (
                  <>
                      <div className="flex flex-col items-center">
                          <span className="font-medium text-md text-gray-800 dark:text-gray-300">Selected file:</span>
                          <span className="font-bold text-lg text-gray-800 dark:text-gray-300">{fileName}</span>
                      </div>
                  </>
              )}
              <h2 className="my-6 text-2xl font-semibold mb-2">Describe your items</h2>
              <span className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2 animate-pulse">Type the name of the items you want to mask and proceed to render.</span>
              <form onSubmit={handleSubmitText}>
                  <div className="mt-4">
                      <label
                          className="text-sm font-thin dark:text-gray-200 p-1 mb-2"
                          htmlFor="form3objects"
                      >
                          Separate each word with comma
                      </label>
                      <input
                          type="text"
                          id="form3objects"
                          className="block text-center text-md w-full px-12 py-3 rounded-lg bg-gray-200 focus:outline-none focus:bg-white dark:text-black"
                          name="objects"
                          placeholder="What you want to mask?"
                      />
                  </div>
                  <Button type='submit' className="my-6">
                    Confirm text and Render
                  </Button>
                </form>
              {/* </div> */}
            </div>
          )}
          {/* Step 2: Frame Selection */}
          {uploadStatus === 'pick' && (
            <div className="flex flex-col items-center my-8">
              <button
                onClick={() => setUploadStatus('selection')}
                className="absolute top-0 right-0 px-3 py-2 mr-2 mt-2 font-medium text-sm bg-lightTheme-primary dark:bg-darkTheme-primary text-black dark:text-white hover:text-white dark:hover:text-black rounded-md hover:bg-darkTheme-primary dark:hover:bg-lightTheme-primary ring-2 ring-black dark:ring-white transition-colors"
                aria-label="Return"
              >
                <span className="fas fa-arrow-left"></span>
              </button>
              {fileName && (
                  <>
                      <div className="flex flex-col items-center">
                          <span className="font-medium text-md text-gray-800 dark:text-gray-300">Selected file:</span>
                          <span className="font-bold text-lg text-gray-800 dark:text-gray-300">{fileName}</span>
                      </div>
                  </>
              )}
              <h1 className="text-2xl font-semibold text-center mt-6">Select a Frame</h1>
              <span className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2 animate-pulse">Navigate to your frame and proceed to interactive selection.</span>
              
              <div className="mt-4">
                <canvas ref={canvasFrameSelectionRef} width="800" height="450" className=" border-[1px] border-lightTheme-separator dark:border-darkTheme-separator"></canvas>
                
                <div className="grid grid-cols-2 gap-2 mx-0 mt-1 text-center align-middle items-center">
                  <button onClick={handlePreviousFrame} className="p-2 rounded border-[1px] border-lightTheme-separator dark:border-darkTheme-separator ">
                    <span className="fas fa-arrow-left text-s mr-4 align-middle"></span>
                    Previous frame
                  </button>                
                  <button onClick={handleNextFrame} className="p-2 rounded border-[1px] border-lightTheme-separator dark:border-darkTheme-separator">
                    Next frame
                    <span className="fas fa-arrow-right ml-4 align-middle"></span>
                  </button>                
                </div>
              </div>

              <Button onClick={handleConfirmFrameSelection} className="my-6">
                Use current frame and Proceed
              </Button>
            </div>
          )}
          {/* Step 3: Track points */}
          {uploadStatus === 'pick-tab1' && (
            <div className="flex flex-col items-center my-8">
              <button
                onClick={() => handleClosePoints()}
                className="absolute top-0 right-0 px-3 py-2 mr-2 mt-2 font-medium text-sm bg-lightTheme-primary dark:bg-darkTheme-primary text-black dark:text-white hover:text-white dark:hover:text-black rounded-md hover:bg-darkTheme-primary dark:hover:bg-lightTheme-primary ring-2 ring-black dark:ring-white transition-colors"
                aria-label="Return"
              >
                <span className="fas fa-arrow-left"></span>
              </button>
              {fileName && (
                  <>
                      <div className="flex flex-col items-center">
                          <span className="font-medium text-md text-gray-800 dark:text-gray-300">Selected file:</span>
                          <span className="font-bold text-lg text-gray-800 dark:text-gray-300">{fileName}</span>
                      </div>
                  </>
              )}
              <h1 className="text-2xl font-semibold text-center mt-6">Select 3 Points on the Frame</h1>
              <span className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2 animate-pulse">Select points in the frame and proceed to render.</span>
              <div className="mt-4 flex flex-col items-center align-middle text-center">
                <canvas
                  ref={canvasPointsRef}
                  width="800"
                  height="450"
                  className=" border-[1px] border-lightTheme-separator dark:border-darkTheme-separator cursor-crosshair"
                  onClick={handleCanvasClick}  // Handle canvas click to select points
                />
                <p className="mt-4 font-light text-sm">
                  Selected Points:
                  <br />
                  {points.map((p, index) => `(${p.x}, ${p.y})`).join(', ')}
                </p>
              </div>
              {points.length === 3 && (
                <Button onClick={handleSubmitPoints} className="my-6">
                  Confirm points and Render
                </Button>
              )}
            </div>
          )}
          {/* Step 2: Human */}
          {uploadStatus === 'human' && (
            <div className="flex flex-col items-center my-8">
              <button
                onClick={() => setUploadStatus('selection')}
                className="absolute top-0 right-0 px-3 py-2 mr-2 mt-2 font-medium text-sm bg-lightTheme-primary dark:bg-darkTheme-primary text-black dark:text-white hover:text-white dark:hover:text-black rounded-md hover:bg-darkTheme-primary dark:hover:bg-lightTheme-primary ring-2 ring-black dark:ring-white transition-colors"
                aria-label="Return"
              >
                <span className="fas fa-arrow-left"></span>
              </button>
              {fileName && (
                  <>
                      <div className="flex flex-col items-center">
                          <span className="font-medium text-md text-gray-800 dark:text-gray-300">Selected file:</span>
                          <span className="font-bold text-lg text-gray-800 dark:text-gray-300">{fileName}</span>
                      </div>
                  </>
              )}
              <h1 className="text-2xl font-semibold text-center mt-6">Human detection</h1>
              <span className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2 animate-pulse">Select custom settings and proceed to render.</span>
              <form
                onSubmit={handleSubmitHuman}
                className="pt-6 rounded-lg shadow-md max-w-lg mx-auto transition-colors duration-300"
              >
              <div className="flex items-center justify-between mb-4">
                <label className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  Single:
                </label>
                <button
                  type="button"
                  onClick={() => setHumanSettingsSingle((prev) => !prev)}
                  className={`relative w-[68px] h-9 rounded-full transition-colors duration-300 ease-in-out border-2 ${
                    humanSettingsSingle
                    ? ''
                    : 'opacity-80'
                } flex items-center`}
                >
                  <div
                      className={`w-6 h-6 m-2 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
                        humanSettingsSingle
                        ? 'translate-x-full bg-white'
                        : 'translate-x-0 bg-white'
                    }`}
                  ></div>
                </button>
                </div>
                <div className="">
                  <Button
                    type="submit"
                    className="my-6"
                    
                  >
                    Confirm settings and Render
                  </Button>
                </div>
              </form>
            </div>
          )}
          {/* Step 2: Face */}
          {uploadStatus === 'face' && (
            <div className="flex flex-col items-center my-8">
              <button
                onClick={() => setUploadStatus('selection')}
                className="absolute top-0 right-0 px-3 py-2 mr-2 mt-2 font-medium text-sm bg-lightTheme-primary dark:bg-darkTheme-primary text-black dark:text-white hover:text-white dark:hover:text-black rounded-md hover:bg-darkTheme-primary dark:hover:bg-lightTheme-primary ring-2 ring-black dark:ring-white transition-colors"
                aria-label="Return"
              >
                <span className="fas fa-arrow-left"></span>
              </button>
              {fileName && (
                  <>
                      <div className="flex flex-col items-center">
                          <span className="font-medium text-md text-gray-800 dark:text-gray-300">Selected file:</span>
                          <span className="font-bold text-lg text-gray-800 dark:text-gray-300">{fileName}</span>
                      </div>
                  </>
              )}
              <h1 className="text-2xl font-semibold text-center mt-6">Face detection</h1>
              <span className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2 animate-pulse">Select custom settings and proceed to render.</span>
              <form
                onSubmit={handleSubmitFace}
                className="pt-6 rounded-lg shadow-md max-w-lg mx-auto transition-colors duration-300"
              >
              <div className="flex items-center justify-between mb-4">
                <label className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  Single:
                </label>
                <button
                  type="button"
                  onClick={() => setFaceSettingsSingle((prev) => !prev)}
                  className={`relative w-[68px] h-9 rounded-full transition-colors duration-300 ease-in-out border-2 ${
                    faceSettingsSingle
                    ? ''
                    : 'opacity-80'
                } flex items-center`}
                >
                  <div
                      className={`w-6 h-6 m-2 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
                        faceSettingsSingle
                        ? 'translate-x-full bg-white'
                        : 'translate-x-0 bg-white'
                    }`}
                  ></div>
                </button>
              </div>
                <div className="flex items-center justify-between mb-4  dark:bg-darkTheme-primary bg-lightTheme-primary">
                  <label className="text-lg font-medium text-gray-700 dark:text-gray-300">
                    Include neck:
                  </label>
                  <button
                    type="button"
                    onClick={() => setFaceSettingsNeck((prev) => !prev)}
                    className={`relative w-[68px] h-9 rounded-full transition-colors duration-300 ease-in-out border-2 ${
                      faceSettingsNeck
                        ? ''
                        : 'opacity-80'
                    } flex items-center`}
                  >
                    <div
                      className={`w-6 h-6 m-2 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
                        faceSettingsNeck
                          ? 'translate-x-full bg-white'
                          : 'translate-x-0 bg-white'
                      }`}
                    ></div>
                  </button>
                </div>
                <div className="">
                  <Button
                    type="submit"
                    className="my-6"
                    
                  >
                    Confirm settings and Render
                  </Button>
                </div>
              </form>
            </div>
          )}
          {/* Step 4: Upload */}
          {uploadStatus === 'uploading' && (
            <div className="flex flex-col items-center my-8">
              <h1 className="text-2xl font-semibold mb-4 text-center">Uploading...</h1>
              <span className="text-lg font-medium text-black dark:text-white mb-4 animate-pulse">We are uploading the footage...</span>
              <CloudArrowUpIcon className="w-20 h-20 text-gray-400" />
              <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
                <div
                  className="bg-gradient-to-br from-palette-gradientPrimary to-palette-gradientSecondary h-4 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <span className="text-lg font-medium text-black dark:text-white mt-2">{uploadProgress}%</span>
            </div>
          )}
          {/* Step 5: Process */}
          {uploadStatus === 'processing' && (
              <div className="flex flex-col items-center my-8">
                  <h1 className="text-2xl font-semibold mb-4 text-center">Processing...</h1>
                  <span className="text-lg font-medium text-gray-800 dark:text-gray-300 mb-4 animate-pulse">We are processing the footage...</span>
                  <ArrowPathIcon className="w-20 h-20 text-gray-400 animate-spin" />
              </div>
          )}
          {/* Step 6: Result */}
          {uploadStatus === 'done' && (
              <div className="flex flex-col items-center my-8">
                  <h1 className="text-3xl font-semibold mb-1 text-center">Task done.</h1>
                  <span className="text-lg font-medium text-gray-800 dark:text-gray-300 mb-2 animate-pulse">Your download is ready.</span>
                  {/* <CloudArrowDownIcon className="w-12 h-12 text-white" /> */}
                  {downloadUrl && (
                      <div className="flex flex-col items-center">

                        <Button 
                            className="mt-4 text-lightTheme-text font-medium py-2 px-6 rounded hover:bg-darkTheme-primary dark:hover:bg-lightTheme-primary hover:text-darkTheme-text dark:hover:text-lightTheme-text "
                        >
                            <a href={downloadUrl} download target="_blank" className="">
                                Download
                            </a>
                        </Button>

                        {/* <Button 
                            className="mt-4 bg-gray-200 text-black font-medium py-2 px-6 rounded hover:bg-white "
                            onClick={openPopup} // Trigger the popup on button click
                        >
                          Download
                        </Button> */}

                        {/* {isPopupOpen && <StripePopupRedirect downloadUrl={downloadUrl} onClose={closePopup} userId/>} */}
                        
                        <div className="flex flex-col items-center mt-6">
                            <span className="text-sm font-medium text-gray-800 dark:text-gray-300 mb-2">Need more footages?</span>
                            <Button 
                                onClick={resetForm}
                                className="py-2 px-6"
                            >
                                <div className="flex flex-col">
                                    <ForwardIcon className="w-5 h-5 mr-2" />
                                    Upload New Video
                                </div>
                            </Button>
                        </div>
                    </div>
                  )}
              </div>
          )}
          {uploadStatus === 'failed' && (
              <div className="flex flex-col items-center my-8">
                  <h1 className="text-2xl font-semibold mb-4 text-center">Processing error.</h1>
                  <XCircleIcon className="w-20 h-20 text-palette-gradientPrimary mb-2 animate-pulse" />
                  <span className="text-lg font-medium text-palette-gradientPrimary mb-8">Upload Failed. Please try again.</span>
                  <Button 
                      onClick={resetForm}
                      className="py-2 px-4"
                  >
                    Retry
                  </Button>
              </div>
          )}
        </div>
      </div>
      </div>
  );
};

export default VideoUpload;
