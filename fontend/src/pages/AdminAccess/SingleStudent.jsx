import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearError, deleteStudent, getAdminStudent } from "../../redux/actions/adminAction"
import { useParams } from "react-router-dom"
import img from "../../assets/images/studing.jpg"
import Loader from "../../components/Loading"
import {toast} from "react-toastify"


const SingleStudent = () => {
    const dispatch = useDispatch()
    const {student, loading, error} = useSelector(state=>state.student)
    const {id} = useParams()
    
    const handleDelete=()=>{
      dispatch(deleteStudent(id))
    }
    useEffect(()=>{
      if(error){
        toast(error)
      }
      dispatch(clearError())
        dispatch(getAdminStudent(id))
    },[id])
  return (
    <div className="px-12 pt-12 flex justify-center">
      <div className="w-4/12 bg-slate-400 p-6 rounded-xl mt-5">
        <div className="my-2">
          <label className="font-poppins font-bold text-sm">Name</label>
          <p className="border-2 border-slate-300 px-5 py-2 font-poppins font-medium text-sm  rounded-xl mt-2">
            {student && student.name  ? student.name : "No Name Found!"}
          </p>
        </div>
        <div className="my-2">
          <label className="font-poppins font-bold text-sm">Email</label>
          <p className="border-2 border-slate-300 px-5 py-2 font-poppins font-medium text-sm  rounded-xl mt-2">
            {student && student.email  ? student.email : "No Email Found!"}
          </p>
        </div>
        <div className="my-2">
          <label className="font-poppins font-bold text-sm">ID</label>
          <p className="border-2 border-slate-300 px-5 py-2 font-poppins font-medium text-sm  rounded-xl mt-2">
            {student && student.id  ? student.id : "No ID Found!"}
          </p>
        </div>
        <div className="my-4">
        <label className="font-poppins font-bold text-sm">Avatar</label>
         
          {student && student.avatar ? <img src={student.avatar.url} className="w-full h-44 rounded-lg"/>:<img src={img} className="w-full h-46 rounded-lg"/>}
        </div>
        <button onClick={handleDelete} className="w-full bg-red-500 text-white px-5 py-2 font-poppins font-medium text-sm  rounded-xl mt-2">{loading? <Loader/>:"Delete Student"}</button>
      </div>
    </div>
  )
}

export default SingleStudent