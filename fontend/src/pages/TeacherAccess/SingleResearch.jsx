import { useDispatch, useSelector } from "react-redux"
import {Link} from "react-router-dom"
import Loading from "../../components/Loading"
import { useEffect } from "react"
import { toast } from "react-toastify"
import { deleteResearch } from "../../redux/actions/teacherAction"

const SingleResearch = ({val}) => {
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
    <div>
    <p className="text-lg font-medium ">{val.title}</p>
        <p className="text-xs font-poppins my-2">{val.desc}</p>
        <Link target="_blank" to={val.link} className="text-xs bg-red-500 px-5 py-1">Show Research</Link>
        <p className="mt-3 font-poppins font-light"><span className="  text-red-300 font-bold">Category :</span> {val.category}</p>
    </div>
      <button onClick={()=>dispatch(deleteResearch(val._id))}>{loading ?<Loading/>:"Delete"}</button>
  
      </div>

  )
}

export default SingleResearch