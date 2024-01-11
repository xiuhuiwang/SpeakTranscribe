import React, { useState } from 'react';
import NavBar from '../components/Navbar/NavBar';
import Footer from '../components/Footer';
import {useDocTitle} from '../components/CustomHook';
import axios from 'axios';
import Notiflix from 'notiflix';
import Cookies from 'universal-cookie';


const UploadAudio = () => {
    // useDocTitle('MLD | Molad e Konsult - Send us a message')
    useDocTitle('SpeakTranscribe | Upload your audio file')
    const [errors, setErrors] = useState([])
    const [audio_file, setFile] = useState(null)

    const clearErrors = () => {
        setErrors([])
    }

    const clearInput = () => {
        setFile(null)
    }

    const sendFile = (e) => {
        const cookies = new Cookies();
        const id_token = cookies.get('id_token');
        const email = cookies.get('email');
        const timestamp = new Date().getTime();

        const UPLOAD_AUDIO_TO_S3_API="https://wpfyc71o76.execute-api.us-west-2.amazonaws.com/dev/";
        const BUCKET_NAME="cs690-transcribe/";

        if(!id_token) {
            // pop up a window show message
            const confirmation = window.confirm("You should log in. Press OK to go to the login page.");

            // Redirect to login page
            if (confirmation) {
                window.location.href = "https://xwang.auth.us-west-2.amazoncognito.com/login?client_id=24r2m807jokm1ugg04234bgv09&response_type=token&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fxwang.engineer";
            }
        }

        e.preventDefault();
        document.getElementById('submitBtn').disabled = true;
        document.getElementById('submitBtn').innerHTML = 'Loading...';

        const filename = audio_file.name;
        const fileExtension = filename.split('.').pop().toLowerCase();
        
        let content_type = 'audio/';
        // .AMR, .FLAC, .M4A, .MP3, .MP4, .OGG, .WAV
        if (fileExtension in ['ogg', 'mp4']) {
            content_type = 'video/';
        }
        content_type += fileExtension;

        axios({
            method: "put",
            url: UPLOAD_AUDIO_TO_S3_API + BUCKET_NAME + email + "-" + timestamp + "." + fileExtension,
            // url: "https://wpfyc71o76.execute-api.us-west-2.amazonaws.com/dev/cs690-transcribe/file1.m4a",
            data: audio_file,
            headers: {
                'Content-Type':  content_type,
                'Authorization': id_token
            }
        })
        .then(function (response) {
            document.getElementById('submitBtn').disabled = false;
            document.getElementById('submitBtn').innerHTML = 'send message';
            clearInput()
            //handle success
            Notiflix.Report.success(
                'Success',
                response.data.message,
                'Okay',
            );
        })
        .catch(function (error) {
            document.getElementById('submitBtn').disabled = false;
            document.getElementById('submitBtn').innerHTML = 'send message';
            //handle error
            const { response } = error;
            if(response.status === 500) {
                Notiflix.Report.failure(
                    'An error occurred',
                    response.data.message,
                    'Okay',
                );
            }
            if(response.data.errors !== null) {
                setErrors(response.data.errors)
            }
            
        });
    }
    return (
        <>
            <div>
                <NavBar />
            </div>
            <div className="flex justify-center items-center mt-8 w-full bg-white py-12 lg:py-24 bg-gray-200">
                <div className="container mx-auto my-8 px-4 lg:px-20" data-aos="zoom-in">

                <form onSubmit={sendFile}>

                    <div className="w-full bg-white p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
                        <div className="flex">
                            <h1 className="font-bold text-center lg:text-left text-blue-900 uppercase text-4xl">UPLOAD YOUR AUDIO</h1>
                        </div>
                        <div className="my-4">
                                <input
                                    name="audio_file" 
                                    className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                    type="file" 
                                    placeholder="Audio File*"
                                    accept=".AMR, .FLAC, .M4A, .MP3, .MP4, .OGG, .WAV"
                                    onChange={(e)=> setFile(e.target.files[0])}
                                    onKeyUp={clearErrors}
                                />
                                {errors && 
                                    <p className="text-red-500 text-sm">{errors.audio_file}</p>
                                }
                        </div>

                        <div className="my-2 w-1/2 lg:w-2/4">
                            <button type="submit" id="submitBtn" className="uppercase text-sm font-bold tracking-wide bg-gray-500 hover:bg-blue-900 text-gray-100 p-3 rounded-lg w-full 
                                    focus:outline-none focus:shadow-outline">
                                Send File
                            </button>
                        </div>
                </div>
                </form>
                        
                </div>
            </div>
            <Footer />
        </>


    )
}

export default UploadAudio;