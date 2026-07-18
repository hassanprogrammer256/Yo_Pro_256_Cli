import api from "../services/axios";

export const loginUser = async(data)=>{
  
const response = await api.post("auth/login/",data);
if (response.status === 200){
  return response.data;
}
};


export const registerstudent = async(data) => {
  try{
    const response = await api.post("auth/register/",data,{headers:{"Content-Type":"multipart/form-data"}});
    if (response.status === 201){
  return response.data;
}

  }
  catch(e){
  console.log({"Register Error": e})
  throw e
  }
}

export const user_profile = async() => {
  try {
    const response = await api.get("auth/me/");
    if (response.status >= 200 && response.status < 300) {
      if (response.data && response.data.data) {
        return response.data.data;
      }
      return response.data;
    } else {
      throw new Error(`API returned status ${response.status}`);
    }
  } catch(e) {
    console.error("User Profile Error:", e);
    throw e;
  }
}

export const AllCourses = async() => {
  try{
     const response = await api.get("courses");
   if (response.status === 200){
  return response.data;
  }} catch (e){
     console.log({"Courses Data Error from API Call": e})
     throw e
  }
}

// export const EnrollStudent = async(formdata,) => {
//   // if (!validateStep()) return;

//   // setIsSubmitting(true);

//   try {
//     const selectedCoursesDetails = formData.selectedCourses.map(id => {
//       const course = getCourseDetails(id);

//       return {
//         name: course.title,
//         price:course.price
//       };
//     });
// }


// export const NotifyEnrollment = async (enrollment_id) => {


//     const coursesTableRows = selectedCoursesDetails
//       .map(
//         (course, index) => `
//         <tr>
//             <td style="padding:12px;border:1px solid #333;color:#ffffff;text-align:center;">
//                 ${index + 1}
//             </td>

//             <td style="padding:12px;border:1px solid #333;color:#ffffff;">
//                 ${course.title}
//             </td>

//             <td style="padding:12px;border:1px solid #333;color:#ffffff;text-align:right;">
//                 UGX ${course.price.toLocaleString()}
//             </td>
//         </tr>
//     `
//       )
//       .join("");

//     const emailBody = `
// <!DOCTYPE html>
// <html>

// <head>

// <meta charset="UTF-8">

// <meta name="viewport" content="width=device-width,initial-scale=1.0">

// </head>

// <body style="margin:0;padding:20px;background:#0f0f0f;font-family:Arial,Helvetica,sans-serif;">

// <table width="100%" cellpadding="0" cellspacing="0">

// <tr>

// <td align="center">

// <table width="700" cellpadding="0" cellspacing="0"
// style="max-width:700px;width:100%;background:#181818;border-radius:12px;overflow:hidden;">

// <tr>

// <td style="background:#ff3030;padding:25px;text-align:center;">

// <h1 style="margin:0;color:#ffffff;">
// New Course Enrollment
// </h1>

// </td>

// </tr>

// <tr>

// <td style="padding:30px;">

// <p style="color:#cccccc;margin:0 0 10px;">
// <strong style="color:#ffffff;">Enrollment ID:</strong>
// ${enrollmentId}
// </p>

// <p style="color:#cccccc;">
// <strong style="color:#ffffff;">Date:</strong>
// ${new Date().toLocaleString()}
// </p>

// <hr style="border:0;border-top:1px solid #333;margin:25px 0;">

// <h2 style="color:#ff3030;margin-bottom:15px;">
// Student Information
// </h2>

// <table width="100%" cellpadding="8" cellspacing="0">

// <tr>
// <td style="color:#ffffff;"><strong>First Name</strong></td>
// <td style="color:#dddddd;">${formData.firstName}</td>
// </tr>

// <tr>
// <td style="color:#ffffff;"><strong>Last Name</strong></td>
// <td style="color:#dddddd;">${formData.lastName}</td>
// </tr>

// <tr>
// <td style="color:#ffffff;"><strong>Email</strong></td>
// <td style="color:#dddddd;">${formData.email}</td>
// </tr>

// <tr>
// <td style="color:#ffffff;"><strong>Phone</strong></td>
// <td style="color:#dddddd;">${formData.phone}</td>
// </tr>

// <tr>
// <td style="color:#ffffff;"><strong>Address</strong></td>
// <td style="color:#dddddd;">${formData.address}</td>
// </tr>

// </table>

// <h2 style="color:#ff3030;margin-top:35px;">
// Selected Courses
// </h2>

// <table
// width="100%"
// cellpadding="0"
// cellspacing="0"
// style="border-collapse:collapse;">

// <thead>

// <tr style="background:#ff3030;">

// <th style="padding:12px;border:1px solid #333;color:#ffffff;">
// #
// </th>

// <th style="padding:12px;border:1px solid #333;color:#ffffff;">
// Course
// </th>

// <th style="padding:12px;border:1px solid #333;color:#ffffff;">
// Price
// </th>

// </tr>

// </thead>

// <tbody>

// ${coursesTableRows}

// <tr style="background:#242424;">

// <td colspan="2"
// style="padding:15px;border:1px solid #333;color:#ffffff;font-weight:bold;">
// Total Fee
// </td>

// <td
// style="padding:15px;border:1px solid #333;color:#ff3030;font-size:18px;font-weight:bold;text-align:right;">
// UGX ${formData.totalAmount.toLocaleString()}
// </td>

// </tr>

// </tbody>

// </table>

// </td>

// </tr>

// <tr>

// <td
// style="background:#111111;padding:20px;text-align:center;color:#888888;font-size:13px;">

// This enrollment notification was generated automatically.

// </td>

// </tr>

// </table>

// </td>

// </tr>

// </table>

// </body>

// </html>
// `;

//     const templateParams = {
//       email: EMAILJS_TO_EMAIL, 
//       first_name: formData.firstName,
//       last_name: formData.lastName,
//       from_email: formData.email,
//       phone: formData.phone,
//       address: formData.address,
//       enrollment_id: enrollmentId,
//       total_amount: `UGX ${formData.totalAmount.toLocaleString()}`,
//       message: emailBody
//     };

//   await emailjs.send(
//       EMAILJS_SERVICE_ID,
//       EMAILJS_TEMPLATE_ID,
//       templateParams
//     );


//     setIsSuccess(true);
//     setStep(3);

//   } catch (error) {
//     console.error(error);

//     alert(
//       error.text ||
//       "Failed to submit enrollment. Please try again."
//     );
//   } finally {
//     setIsSubmitting(false);
//   }
// };



// Payment initiation
export const initiatePayment = async (paymentData) => {
  try {
    const response = await api.post('payments/initiate/', paymentData);
    console.log({response})
    if (response.data.order_tracking_id) {
      // Redirect to Pesapal payment page
      const pesapalRedirect = `https://pay.pesapal.com/v3/PesapalRedirect?order_tracking_id=${response.data.order_tracking_id}&merchant_reference=${paymentData.merchant_reference}`;
      window.location.href = pesapalRedirect;
    }
  } catch (error) {
    console.error('Payment initiation failed:', error);
  }
};

// Verify payment on callback
export const verifyPayment = async (orderTrackingId, merchantReference) => {
  try {
    const response = await api.get('payments/verify/', {
      params: {
        order_tracking_id: orderTrackingId,
        merchant_reference: merchantReference
      }
    });
    
    if (response.data.status === 'COMPLETED') {
      // Payment successful - show success message
      console.log('Payment completed:', response.data.enrollment);
    }
  } catch (error) {
    console.error('Payment verification failed:', error);
  }
};