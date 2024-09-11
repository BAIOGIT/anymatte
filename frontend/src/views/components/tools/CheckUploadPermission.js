import React, { useState, useEffect } from 'react';

import jwtDecode from "jwt-decode"
import useAxios from '../../../utils/useAxios';

import { useDispatch, useSelector } from 'react-redux';
import { setUploadPermission, storeUploadCount, storeUploadMaxCount, storeUploadMode } from '../../../redux/actions';

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

const CheckUploadPermission = () => {
    const axios = useAxios();

    const dispatch = useDispatch();

    const [uploadMode, setUploadMode] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);
    const [canUpload, setCanUpload] = useState(false);
    const [uploadCount, setUploadCount] = useState(0);
    const [uploadMaxCount, setUploadMaxCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if the user can upload a video
        const fetchUploadPermission = async () => {
            try {
                const response = await axios.get(`/can-upload/`);
                setUploadMode(response.data.mode);
                setIsRegistered(response.data.is_registered);
                setCanUpload(response.data.can_upload);
                setUploadCount(response.data.upload_count);
                setUploadMaxCount(response.data.max_upload_count);
                
                dispatch(setUploadPermission(response.data.can_upload));
                
                dispatch(storeUploadMode(response.data.mode));
                dispatch(storeUploadCount(response.data.upload_count));
                dispatch(storeUploadMaxCount(response.data.max_upload_count));
                

            } catch (error) {
                console.error('Error checking upload permission:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUploadPermission();
    }, []);

    if (loading) {
        return <div>
                    <div className='text-md font-bold'>Welcome to Any Matte</div>
                    {/* <div className='text-sm font-medium'>Consider upgrading your subscription to unlock ulimited removals.</div> */}
                </div>
        ;
    }

    return (
        <div>
            {token ? (
                canUpload ? (
                    <div>                
                        {username.includes('@') && username.includes('.') ? (
                        // If it's an email, display it as is
                        <span className='font-bold'>Welcome, {username}!</span>
                        ) : (
                        // Otherwise, capitalize the first letter of the username
                        <span className='font-bold'>Welcome, {username.charAt(0).toUpperCase() + username.slice(1)}!</span>
                        )}

                        {uploadMode === 'trial' && (
                          <div className='text-sm font-thin'>
                            You have {uploadMaxCount - uploadCount}/{uploadMaxCount} trials left.
                          </div>
                        )}
                        {uploadMode === 'credits' && (
                          <div className='text-sm font-thin'>
                            You have {uploadMaxCount} credits left.
                          </div>
                        )}
                        {uploadMode === 'subscription' && (
                          <div className='text-sm font-thin'>
                            You have unlimited uploads with your subscription.
                          </div>
                        )}
                        {uploadMode === 'empty' && (
                          <div className='text-sm font-thin'>
                            You cannot upload right now. Please check your account status.
                          </div>
                        )}

                    </div>
                ) : (
                    <div>             
                        {username.includes('@') && username.includes('.') ? (
                        // If it's an email, display it as is
                            <span className='font-bold'>Welcome, {username}!</span>
                        ) : (
                        // Otherwise, capitalize the first letter of the username
                            <span className='font-bold'>Welcome, {username.charAt(0).toUpperCase() + username.slice(1)}!</span>
                        )}
                        <div className='text-sm font-thin'>
                            You have {uploadMaxCount} credits left.
                        </div>
                        <div className='text-md font-bold'>{isRegistered && `Sorry, ${username.charAt(0).toUpperCase() + username.slice(1)}.`}<br/>You cannot upload more videos.</div>
                        <div className='text-sm font-medium'>Consider upgrading your subscription to unlock ulimited removals.</div>
                    </div>
                )
            ) : (                
                <div>
                    <div className='text-md font-bold'>Welcome to Any Matte</div>
                    <div className='text-sm font-medium'>Consider upgrading your subscription to unlock ulimited removals.</div>
                </div>
            )}
        </div>
    );
};

export default CheckUploadPermission;
