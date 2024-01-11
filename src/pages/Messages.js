import React, { useState, useEffect } from 'react';
import NavBar from '../components/Navbar/NavBar';
import Footer from '../components/Footer';
import {useDocTitle} from '../components/CustomHook';
import axios from 'axios';
// import emailjs from 'emailjs-com';
import Notiflix from 'notiflix';
import Cookies from 'universal-cookie';
      
const Messages = (props) => {
    const cookies = new Cookies();
    const id_token = cookies.get('id_token');
    const email = cookies.get('email');

    const [jsonData, setJsonData] = useState([]);

    useEffect(() => {
        axios({
            method: "get",
            // url: UPLOAD_AUDIO_TO_S3_API + BUCKET_NAME + email + "-" + timestamp + "." + fileExtension,
            // url: "https://wpfyc71o76.execute-api.us-west-2.amazonaws.com/dev/messages?email=xwang247usfcaedu",
            url: "https://wpfyc71o76.execute-api.us-west-2.amazonaws.com/dev/messages?email=" + email,
            headers: {
                'Authorization': id_token
            }
        })
        .then(
            response => response.data)
        .then(data => {
            setJsonData(data); 
        })
        .catch(error => console.error('Error fetching data:', error));
    }, []);

    const deleteItem = async (message_id) => {
        
        try {
            // Send delete request to API using the ID
            await axios.delete(`https://wpfyc71o76.execute-api.us-west-2.amazonaws.com/dev/messages`, {
                headers: {
                    'Authorization': id_token
                },
                data: { 
                    "email": email,
                    "message_id": message_id
                }
            });

            // Update the state to reflect the deletion
            setJsonData(prevData => prevData.filter(item => item.id !== message_id));

            // Show success notification
            Notiflix.Notify.success('Item deleted successfully');
        } catch (error) {
            console.error('Error deleting item:', error);
            // Show error notification
            Notiflix.Notify.failure('Error deleting item');
        }
    };

    return (
        <>
            <div>
                <NavBar />
            </div>

            <div className="flex justify-center items-center mt-8 w-full bg-white py-12 lg:py-24">
                <div className="container mx-auto my-8 px-4 lg:px-20" data-aos="zoom-in">
                            <table className='w-full border'>
                                <thead>
                                <tr>
                                    <th className='w-12 text-left bg-gray-300 text-[#013289] p-2 font-bold'>ID</th>
                                    <th className='w-32 text-left bg-gray-300 text-[#013289] p-2 font-bold'>Date & Time</th>
                                    <th className='bg-gray-300 text-[#013289] p-2 font-bold'>Message</th>
                                    <th className='w-20 text-left bg-gray-300 text-[#013289] p-2 font-bold'>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {jsonData.map(item => (
                                    <tr key={item.id}>
                                        <td className='border p-2'>{item.id}</td>
                                        <td className='border p-2'>{item.datetime}</td>
                                        <td className='border p-2'>{item.message}</td>
                                        {/* delete button */}
                                        <td className='border p-2'>
                                            <button onClick={() => deleteItem(item.id)} className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded'>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                </div>
            </div>
            <Footer />
        </>
       
    );



    // useDocTitle('SpeakTranscribe | Upload your audio file')

    // const [firstName, setFirstName] = useState('')
    // const [lastName, setLastName] = useState('')
    // const [email, setEmail] = useState('')
    // const [phone, setPhone] = useState('')
    // const [message, setMessage] = useState('')
    // const [demoProducts, setDemoProducts ] = useState([])
    // const [errors, setErrors] = useState([])


    // const handleChange = (e) => {
    //     const value = e.target.value
    //     const checked = e.target.checked
    //     errors.products = []
    //     if(checked) {
    //         setDemoProducts([
    //             ...demoProducts, value
    //         ])
    //     } else {
    //         setDemoProducts(demoProducts.filter( (e) => (e !== value )))
    //     }
       
    // }
    // const clearErrors = () => {
    //     setErrors([])
    // }

    // const clearInput = () => {
    //     setFirstName('')
    //     setLastName('')
    //     setEmail('')
    //     setPhone('')
    //     setMessage('')
    // }
    
    // function sendEmail(e) {
    //     e.preventDefault();
    //     document.getElementById('submitBtn').disabled = true;
    //     document.getElementById('submitBtn').innerHTML = 'Loading...';
    //     let fData = new FormData();
    //     fData.append('first_name', firstName)
    //     fData.append('last_name', lastName)
    //     fData.append('email', email)
    //     fData.append('phone_number', phone)
    //     fData.append('message', message)
    //     fData.append('products', demoProducts)


    //     axios({
    //         method: "post",
    //         url: process.env.REACT_APP_DEMO_REQUEST_API,
    //         data: fData,
    //         headers: {
    //             'Content-Type':  'multipart/form-data'
    //         }
    //     })
    //     .then(function (response) {
    //         document.getElementById('submitBtn').disabled = false;
    //         document.getElementById('submitBtn').innerHTML = 'send message';
    //         clearInput()
    //         //handle success
    //         Notiflix.Report.success(
    //             'Success',
    //             response.data.message,
    //             'Okay',
    //         );
    //     })
    //     .catch(function (error) {
    //         document.getElementById('submitBtn').disabled = false;
    //         document.getElementById('submitBtn').innerHTML = 'send message';
    //         //handle error
    //         const { response } = error;
    //         if(response.status === 500) {
    //             Notiflix.Report.failure(
    //                 'An error occurred',
    //                 response.data.message,
    //                 'Okay',
    //             );
    //         }
    //         if(response.data.errors !== null) {
    //             setErrors(response.data.errors)
    //         }
            
    //     });
    // }
    // return (
    //     <>
    //         <div>
    //             <NavBar />
    //         </div>
    //         <div className="flex justify-center items-center mt-8 w-full bg-white py-12 lg:py-24">
    //             <div className="container mx-auto my-8 px-4 lg:px-20" data-aos="zoom-in">
    //                 <form onSubmit={sendEmail} id="demoProductForm">
    //                     <div className="w-full bg-white p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
    //                         <div className="flex">
    //                             <h1 className="font-bold text-center lg:text-left text-blue-900 uppercase text-4xl">Demo our products</h1>
    //                         </div>
    //                         <div className="flex items-center my-4">
    //                             <input 
    //                                 id="checkbox-1" 
    //                                 aria-describedby="checkbox-1" 
    //                                 type="checkbox" 
    //                                 className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded" 
    //                                 value="business_management_system" onChange={handleChange}
    //                              />
    //                             <label htmlFor="checkbox-1" className="ml-3 text-lg font-medium text-gray-900">Business Management System</label>
    //                         </div>
    //                         <div className="flex items-center my-4">
    //                             <input 
    //                                 id="checkbox-1" 
    //                                 aria-describedby="checkbox-1" 
    //                                 type="checkbox" 
    //                                 className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded"
    //                                 value="school_management_portal" onChange={handleChange}
    //                                 />
    //                             <label htmlFor="checkbox-1" className="ml-3 text-lg font-medium text-gray-900">School Management Portal</label>
    //                         </div>
    //                         <div className="flex items-center my-4">
    //                             <input 
    //                                 id="checkbox-1" 
    //                                 aria-describedby="checkbox-1" 
    //                                 type="checkbox" 
    //                                 className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded" 
    //                                 value="payroll_management_system" onChange={handleChange}
    //                             />
    //                             <label htmlFor="checkbox-1" className="ml-3 text-lg font-medium text-gray-900">Payroll Management System</label>
    //                         </div>
    //                         <div className="flex items-center my-4">
    //                             <input 
    //                                 id="checkbox-1" 
    //                                 aria-describedby="checkbox-1" 
    //                                 type="checkbox" 
    //                                 className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded"
    //                                 value="event_management_system" onChange={handleChange}
    //                             />
    //                             <label htmlFor="checkbox-1" className="ml-3 text-lg font-medium text-gray-900">Event Management System</label>
    //                         </div>
    //                         {errors && 
    //                             <p className="text-red-500 text-sm">{errors.products}</p>
    //                         }

    //                     <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
    //                             <div>
    //                                 <input 
    //                                     name="first_name" 
    //                                     className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
    //                                     type="text" 
    //                                     placeholder="First Name*" 
    //                                     value={firstName}
    //                                     onChange={(e)=> setFirstName(e.target.value)}
    //                                     onKeyUp={clearErrors}
    //                                 />
    //                                 {errors && 
    //                                     <p className="text-red-500 text-sm">{errors.first_name}</p>
    //                                 }
    //                             </div>
                                
    //                             <div>
    //                                 <input 
    //                                     name="last_name" 
    //                                     className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
    //                                     type="text" 
    //                                     placeholder="Last Name*"
    //                                     value={lastName}
    //                                     onChange={(e)=> setLastName(e.target.value)}
    //                                     onKeyUp={clearErrors}
    //                                 />
    //                                 {errors && 
    //                                     <p className="text-red-500 text-sm">{errors.last_name}</p>
    //                                 }
    //                             </div>

    //                             <div>
    //                                 <input 
    //                                     name="email"
    //                                     className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
    //                                     type="email" 
    //                                     placeholder="Email*"
    //                                     value={email}
    //                                     onChange={(e)=> setEmail(e.target.value)}
    //                                     onKeyUp={clearErrors}   
    //                                 />
    //                                 {errors && 
    //                                     <p className="text-red-500 text-sm">{errors.email}</p>
    //                                 }
    //                             </div>

    //                             <div>
    //                                 <input
    //                                     name="phone_number" 
    //                                     className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
    //                                     type="number" 
    //                                     placeholder="Phone*"
    //                                     value={phone}
    //                                     onChange={(e)=> setPhone(e.target.value)}
    //                                     onKeyUp={clearErrors}
    //                                 />
    //                                 {errors && 
    //                                     <p className="text-red-500 text-sm">{errors.phone_number}</p>
    //                                 }
    //                             </div>
    //                     </div>
    //                     <div className="my-4">
    //                         <textarea 
    //                             name="message" 
    //                             placeholder="Message*" 
    //                             className="w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
    //                             value={message}
    //                             onChange={(e)=> setMessage(e.target.value)}
    //                             onKeyUp={clearErrors}
    //                         ></textarea>
    //                         {errors && 
    //                             <p className="text-red-500 text-sm">{errors.message}</p>
    //                         }
    //                     </div>
    //                     <div className="my-2 w-1/2 lg:w-2/4">
    //                         <button type="submit" id="submitBtn" className="uppercase text-sm font-bold tracking-wide bg-gray-500 hover:bg-blue-900 text-gray-100 p-3 rounded-lg w-full 
    //                                 focus:outline-none focus:shadow-outline">
    //                             Send Message
    //                         </button>
    //                     </div>
    //                 </div>
    //                 </form>
    //                 <div className="w-full  lg:-mt-96 lg:w-2/6 px-8 py-6 ml-auto bg-blue-900 rounded-2xl">
    //                     <div className="flex flex-col text-white">     
    //                         <div className="flex my-4 w-2/3 lg:w-3/4">
    //                             <div className="flex flex-col">
    //                                 <i className="fas fa-map-marker-alt pt-2 pr-2" />
    //                             </div>
    //                             <div className="flex flex-col">
    //                                 <h2 className="text-2xl">Office Address</h2>
    //                                 <p className="text-gray-400">Ilo Awela, Ota, Ogun State</p>
    //                             </div>
    //                         </div>
                            
    //                         <div className="flex my-4 w-2/3 lg:w-1/2">
    //                             <div className="flex flex-col">
    //                             <i className="fas fa-phone-alt pt-2 pr-2" />
    //                             </div>

    //                             <div className="flex flex-col">
    //                                 <h2 className="text-2xl">Call Us</h2>
    //                                 <p className="text-gray-400">Tel: 08055384406</p>
                                
    //                                 <div className='mt-5'>
    //                                     <h2 className="text-2xl">Send an E-mail</h2>
    //                                     <p className="text-gray-400">info@mld.ng</p>
    //                                 </div>
                            
    //                             </div>
    //                         </div>
                            
    //                         <div className="flex my-4 w-2/3 lg:w-1/2">
    //                             <a href="https://www.facebook.com/ENLIGHTENEERING/" target="_blank" rel="noreferrer" className="rounded-full flex justify-center bg-white h-8 text-blue-900  w-8 inline-block mx-1 text-center pt-1">
    //                             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='fill-current font-black hover:animate-pulse'><path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path></svg>
    //                             </a>
    //                             <a href="https://www.linkedin.com/company/enlighteneering-inc-" target="_blank" rel="noreferrer" className="rounded-full flex justify-center bg-white h-8 text-blue-900  w-8 inline-block mx-1 text-center pt-1">
    //                             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='fill-current font-black hover:animate-pulse'><circle cx="4.983" cy="5.009" r="2.188"></circle><path d="M9.237 8.855v12.139h3.769v-6.003c0-1.584.298-3.118 2.262-3.118 1.937 0 1.961 1.811 1.961 3.218v5.904H21v-6.657c0-3.27-.704-5.783-4.526-5.783-1.835 0-3.065 1.007-3.568 1.96h-.051v-1.66H9.237zm-6.142 0H6.87v12.139H3.095z"></path></svg>
    //                             </a>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //         <Footer />
    //     </>


    // )
}

export default Messages;