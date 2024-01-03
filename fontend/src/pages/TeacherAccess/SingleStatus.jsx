import { useDispatch, useSelector } from "react-redux"
// import {Link} from "react-router-dom"
import Loading from "../../components/Loading"
import { useEffect } from "react"
import { toast } from "react-toastify"
import {  deleteStatus } from "../../redux/actions/teacherAction"

const SingleStatus = ({val}) => {
  const dispatch = useDispatch()
    const {loading, success, error} = useSelector(state=>state.teacherPersonal)

    useEffect(()=>{
      if(success){
        toast(success)
      }
      if(error){
        toast(error)
      }
    },[])
  return (
    <div className="mt-2 flex justify-between items-start bg-slate-500 px-5 py-3 text-white font-poppins">
    <div className="w-10/12">
    <p className="text-sm font-medium ">{val.comment}</p>
       
    </div>
      <button onClick={()=>dispatch(deleteStatus(val._id))}>{loading ?<Loading/>:"Delete"}</button>
  
      </div>
  )
}

export default SingleStatus