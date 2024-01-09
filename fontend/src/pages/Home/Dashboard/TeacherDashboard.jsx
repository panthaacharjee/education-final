import {Link} from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearError,   createStatus } from "../../../redux/actions/teacherAction"
import Loading from "../../../components/Loading"
import { toast } from "react-toastify"
import SingleStatus from "../../TeacherAccess/SingleStatus"
import { FaRegEdit,FaArrowsAlt  } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { MdOutlineUpdate } from "react-icons/md";
import ProfileImage from "../../../assets/Avatar/Profile.png";
import SingleResearch from "../../TeacherAccess/SingleResearch"
import Research from "../../TeacherAccess/Research"

const TeacherDashboard = () => {
  const dispatch = useDispatch()
  const {loading, success, error} = useSelector(state=>state.teacherPersonal)
  const {user} = useSelector(state=>state.user)
  console.log(user)

  const [showPopup, setShowPopup] = useState(false)
  const [comment, setComment] = useState()
  const [showPopupR, setShowPopupR] = useState(false)


  const handleSubmit =()=>{
    const data = {
      comment : comment
    }
    dispatch(createStatus(data))
   
  }
  
  useEffect(()=>{
    if(success){
      toast(success)
      // clearSuccess()
    }
    if(error){
      toast(error)
      clearError()
    }
  },[])

  return <>
  <div  className="px-12 pt-20 flex justify-between">
    <div className="w-6/12" >
        <div className="flex">
          <Link className="px-3 flex  items-center hover:text-blue-500" to="/update/avatar/teacher"><span className="text-3xl"><RxAvatar/></span><span className="text-lg text-blue-950 font-poppins ml-1">Update Avatar</span></Link>
          <Link className="px-3 flex  items-center hover:text-blue-500" to="/update/profile/teacher"><span className="text-2xl"><FaRegEdit/></span><span className="text-lg text-blue-950 font-poppins ml-1">Update Profile</span></Link>

          <Link to="/teacher/routine" className="px-12 py-3 flex  items-center bg-green-500 text-white font-poppins font-bold rounded-full hover:rounded-md ml-10"><span className="text-2xl"><MdOutlineUpdate/></span><span className="ml-2">Routine</span></Link>
        </div>
        <div className="border-2 border-black rounded mt-10 flex py-1 px-3">
          {user && user.avatar ? <img className="h-12 w-12 rounded-full" src={user.avatar.url}/>: <img className="h-12 w-12 rounded-full" src={ProfileImage}/>}
          <button className="border-2 w-full ml-2 text-left px-3 rounded-full" onClick={()=>setShowPopup(true)}>What's On your brain?</button>
        </div>
        <div>
              {user && user.status && user.status.map((val, ind)=>{
                return <SingleStatus val={val} key={ind}/>
              })}
              {user && user.status.length<1 && <p className="mt-4 font-poppins text-lg font-semibold">No Status Created!</p>}
        </div>
    </div>
    <div className="w-6/12 flex justify-end">
      <div className="w-11/12">
        <p className="text-2xl font-poppins font-semibold">Publication</p>
        <div>
          <button className="flex items-center"  onClick={()=>setShowPopupR(true)}>Add your another publication <span className="text-lg ml-2 rotate-180"><FaArrowsAlt /></span></button>
        </div>
        <div className="mt-5"> 
          {user && user.research && user.research.map((val, ind)=>{
            return <SingleResearch val={val} key={ind}/>
          })}
          {user && user.research.length<1 && <p className="mt-4 font-poppins text-lg font-semibold">No Publication Created!</p>}
        </div>
      </div>
    </div>
  </div>
  {showPopup && <div className="w-full absolute h-screen  top-0 left-0 flex justify-center items-center">
<div className="bg-slate-400 w-4/12 rounded-lg px-5 py-3 mt-12">
  <div className="flex justify-between items-center mb-5">
    <p className="font-bold text-md ">Create Status</p>
    <button onClick={()=>setShowPopup(false)} className="">Cancel</button>
  </div>
  <div>
    <p className="font-semibold text-sm my-1">Comment</p>
    <textarea onChange={(e)=>setComment(e.target.value)} className="w-full px-2 py-1" rows={6}/>

    <button onClick={handleSubmit} className="w-full py-1  bg-black text-white mt-5">{loading ? <Loading/>:"Submit"}</button>
  </div>
</div>
</div>}
{showPopupR && <Research setShowPopupR={setShowPopupR}/>}
  </>
};

export default TeacherDashboard;
