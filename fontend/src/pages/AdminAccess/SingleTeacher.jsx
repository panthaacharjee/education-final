import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAdminTeacher } from "../../redux/actions/adminAction"
import { useParams } from "react-router-dom"


const SingleTeacher = () => {
    const dispatch = useDispatch()
    const {id} = useParams()
    const {teacher} = useSelector(state=>state.teacher)

    console.log(teacher)
    useEffect(()=>{
        dispatch(getAdminTeacher(id))
    },[])
  return (
    <div>SingleTeacher</div>
  )
}

export default SingleTeacher