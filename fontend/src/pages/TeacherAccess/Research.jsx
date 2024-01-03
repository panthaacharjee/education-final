import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearError,  createResearch } from "../../redux/actions/teacherAction"
import Loading from "../../components/Loading"
import { toast } from "react-toastify"
import SingleResearch from "./SingleResearch"


const Research = () => {
  const dispatch = useDispatch()
  const {loading, success, error} = useSelector(state=>state.teacherPersonal)
  const {user} = useSelector(state=>state.user)
  console.log(user)

  const [showPopup, setShowPopup] = useState(false)
  const [title, setTitle] = useState()
  const [desc, setDesc] = useState()
  const [file, setFile] = useState()
  const [link, setLink]  = useState()
  const [cate, setCate] =useState()
  const handleChange =(e)=>{
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.readyState === 2) {
        setFile(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  }
  const handleSubmit =()=>{
    const data = {
      title:title,
      desc:desc,
      file: file,
      link:link,
      category:cate
    }
    dispatch(createResearch(data))
   
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
  return (
    <>
      <div className="px-12 py-20 flex justify-center" >
         <div className="w-6/12">
          <div className="flex justify-between bg-slate-300 px-5 py-1">
                <p className="text-lg font-semibold">Research</p>
                <button onClick={()=>setShowPopup(true)}>Create Research</button>
            </div>
            <div>
              {user && user.research && user.research.map((val, ind)=>{
                return <SingleResearch val={val} key={ind}/>
              })}
              {user && user.research.length<1 && <p className="mt-4 font-poppins text-lg font-semibold">No Research Created!</p>}
            </div>
         </div>
      </div>
    {showPopup && <div className="w-full absolute h-screen  top-0 left-0 flex justify-center items-center">
      <div className="bg-slate-400 w-4/12 rounded-lg px-5 py-3 mt-12">
        <div className="flex justify-between items-center mb-5">
          <p className="font-bold text-md ">Create Research</p>
          <button onClick={()=>setShowPopup(false)} className="">Cancel</button>
        </div>
        <div>
          <p className="font-semibold text-sm my-1">TITLE</p>
          <input onChange={(e)=>setTitle(e.target.value)} className="w-full px-2 py-1" type="text" placeholder="Enter your title"/>
          <p className="font-semibold text-sm my-1">DESCRIPTION</p>
          <textarea onChange={(e)=>setDesc(e.target.value)} className="w-full " rows={5}/>
          <p className="font-semibold text-sm my-1">FILE</p>
          <input onChange={handleChange} className="w-full px-2 py-1 bg-slate-100" type="file" />
          <p className="font-semibold text-sm my-1">URL</p>
          <input  onChange={(e)=>setLink(e.target.value)} className="w-full px-2 py-1" type="text" placeholder="Enter your title"/>
          <p className="font-semibold text-sm my-1">CATEGORY</p>
          <input onChange={(e)=>setCate(e.target.value)} className="w-full px-2 py-1" type="text" placeholder="Enter your category"/>
          <button onClick={handleSubmit} className="w-full py-1  bg-black text-white mt-5">{loading ? <Loading/>:"Submit"}</button>
        </div>
      </div>
</div>}
    </>
  )
}

export default Research