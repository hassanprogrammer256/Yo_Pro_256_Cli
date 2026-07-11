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
  try{
 const response = await api.get("auth/me/");
    if (response.status === 200){
  return response.data;
  }}
  catch(e){
      console.log({"User Profile Error": e})
      throw e
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