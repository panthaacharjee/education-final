import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearSuccess, updateProfile } from "../../redux/actions/teacherAction";
import Loader from "../../components/Loading"
import {toast} from "react-toastify"

const UpdateProfile = () => {
  const dispatch = useDispatch()
    const {user} = useSelector(state=>state.user)
    const {loading, success} = useSelector(state=>state.teacherAccess)

    const [name, setName] = useState(user && user.name)
    const [email, setEmail] = useState(user && user.email)
    const [phone, setPhone] = useState(user && user.phone)
    const [office, setOffice] = useState(user && user.office)
    const [experience, setExperience] = useState(user && user.experience)
    const [publication, setPublication] = useState(user && user.publication)

    const handleSubmit =()=>{
      let data = {
        name:name,
        email:email,
        office:office,
        experience:experience,
        publication:publication,
        phone:phone
      }
      dispatch(updateProfile(data))
    }

    useEffect(()=>{
      if(success){
        toast(success)
      }
      clearSuccess()
    },[])
    return (
      <div className="px-12 pt-20 flex justify-center">
       <div className="w-6/12 bg-emerald-100  py-4 px-5">
          <p className="text-2xl text-emerald-700 font-poppins text-center font-bold mb-5">Update Profile</p>
          <div>
             <p>Name</p>
             <input className="w-full py-1 px-2 mb-4"src="text" placeholder="Enter your name" value={name} onChange={(e)=>setName(e.target.value)}/>
             <p>Email</p>
             <input className="w-full py-1 px-2 mb-4"src="email" placeholder="Reenter your email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
             <p>Teacher ID</p>
             <p className="w-full py-1 px-2 bg-white">{user.id}</p>
             <p className="mt-4">Phone</p>
             <input className="w-full py-1 px-2 mb-4"src="email" placeholder="Enter your phone no" value={phone} onChange={(e)=>setPhone(e.target.value)}/>
             <p>Publication</p>
             <input className="w-full py-1 px-2 mb-4"src="email" placeholder="Reenter your publication" value={publication} onChange={(e)=>setPublication(e.target.value)}/>
             <p>Office</p>
             <input className="w-full py-1 px-2 mb-4"src="email" placeholder="Reenter your office" value={office} onChange={(e)=>setOffice(e.target.value)}/>
             <p>Experience</p>
             <input className="w-full py-1 px-2 mb-4"src="email" placeholder="Reenter your email" value={experience} onChange={(e)=>setExperience(e.target.value)}/>
          </div>
          <button onClick={handleSubmit} className=" bg-emerald-700 px-5 py-1 mt-5 rounded-lg text-white">{loading?<Loader/>:"Submit"}</button>
  
      </div> 
      </div>
    );
  }
  
  export default UpdateProfile;
  