import axios from "axios";
import {useState, useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Admin (){
    const [projectData, SetProjectData] = useState([]);
    const [displayProject, SetDisplayProject] = useState();
    const [addProjectName, SetAddProjectName] = useState('');
    const [addProjectImage, SetAddProjectImage] = useState(null);
    const [addProjectLink, SetAddProjectLink] = useState('');
    const [addProjectStack, SetAddProjectStack] = useState('');
    const [editDisplayProject, SetEditDisplayProject] = useState();
    const [editId, SeteditId] = useState();
    const location = useLocation()
  const navigate = useNavigate();
    
    const addProject = ()=>{
        SetDisplayProject(true)
    }
    const closeAddProject = ()=>{
        SetDisplayProject(false)
    }
    const editProject = (e_id)=>{
        SeteditId(e_id);
        SetEditDisplayProject(true);
        
        if(projectData.length > 0){
            // console.log("prj data")
            if(e_id){
                projectData.find((x)=>{
                    if(e_id == x._id){
                        SetAddProjectName(x.name)
                        SetAddProjectImage(x.image)
                        SetAddProjectLink(x.link)
                        SetAddProjectStack(x.stack)
                    }
                })
            }
        }
    }
    const editCloseProject = ()=>{
        SetEditDisplayProject(false)
    }
    const submitAddProject = (e)=>{
        
        const formData = new FormData();
        formData.append("name", addProjectName);
        formData.append("link", addProjectLink);
        formData.append("stack", addProjectStack);
        formData.append("image", addProjectImage);
        
        axios.post(`${process.env.REACT_APP_API_URL}/work-projects-get`,formData)
            .then((response)=>{
            console.log( response)
            SetProjectData((prev)=>
            [...prev, response.data]
            )
        })
        .catch(err=>console.log(err))
        
    }

    const editProjectSubmit = ()=>{
        const formData = new FormData();
        formData.append("name",addProjectName);
        formData.append("link",addProjectLink);
        formData.append("stack",addProjectStack);
        if (addProjectImage instanceof File) {
            formData.append("image", addProjectImage);
        }    
        
        axios.patch(`${process.env.REACT_APP_API_URL}/work-projects-get/${editId}`, formData)
        .then(()=>{
            SetProjectData((prev)=>
            prev.map((item)=>
              item._id === editId ? {...item, name: addProjectName, link: addProjectLink,
             stack: addProjectStack, image: addProjectImage}  : item
            ))
            
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const deleteProject = (delId)=>{
       axios.delete(`${process.env.REACT_APP_API_URL}/work-projects-get/${delId}`)
        .then(()=>{
            SetProjectData((prev)=>
                prev.filter((x)=>
                    x._id !== delId 
                )
            )
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const adminLogOut = (e)=>{
        e.preventDefault();
        localStorage.clear();
        navigate("/login", {replace : true})
    }

    const getDataUsingToken = ()=>{
        axios.get(`${process.env.REACT_APP_API_URL}/work-projects-get`
            ,{
            headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}
            }
        )
        .then((response)=>{
            SetProjectData(response.data);
            console.log(localStorage.getItem('token'))
        })
        .catch(()=>{
            console.log("cannot fetch data")
        })
    }
    useEffect(()=>{
        const token = localStorage.getItem('token');
        
            if(token){
                if(location.state?.from === "login"){
                    getDataUsingToken();
                }
            }
            else{
                navigate('/login',{replace:true})
            }
        
    },[])
    return(
        <div>
            {
                projectData.length > 0 && ( 
                    <div className="tableBg">
                        <button onClick={adminLogOut}>Log Out</button>
                        <div className="container">
                            <table>
                                <tbody className="admin_tBody">
                                    <tr>
                                        <th>Name</th>
                                        <th>Image</th>
                                        <th>Project Link</th>
                                        <th>Tech Stack</th>
                                        <th>
                                            <button onClick={addProject}>Add Project</button>
                                        </th>
                                    </tr>
                                {projectData.map((item)=>(
                                    <tr key={item._id}>
                                        <td>{item.name}</td>
                                        <td><img src={`${process.env.REACT_APP_API_URL}/uploads/${item.image}`} alt="" /></td>
                                        <td>{item.link}</td>
                                        <td>{item.stack}</td>
                                        <td>
                                            <button onClick={()=>editProject(item._id)}>Edit</button>
                                        </td>
                                        <td><button onClick={()=>deleteProject(item._id)}>Delete</button></td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>  
                        {/* ================================= Add Property =============== */}
                        {displayProject && (
                        <div className="add_proj_bg">
                            <button onClick={closeAddProject}>Close</button>
                            <p>Add Project</p>
                            <form >
                                <input type="text" placeholder="Project Name" 
                                onChange={(e)=>SetAddProjectName(e.target.value)}/>

                                <input type="file" placeholder="Project Image"
                                onChange={(e)=>SetAddProjectImage(e.target.files[0])}/>

                                <input type="text" placeholder="Project Link"
                                onChange={(e)=>SetAddProjectLink(e.target.value)}/>

                                <input type="text" placeholder="Tech Stack"
                                onChange={(e)=>SetAddProjectStack(e.target.value)}/>

                                <input type="submit" onClick={submitAddProject} value="Submit"/>
                            </form>
                        </div>)}
                        {/* ==================================== edit project =============== */}
                        {editDisplayProject && (
                        <div className="add_proj_bg">
                            <button onClick={editCloseProject}>Close</button>
                            <p>Edit Project</p>
                            <form onSubmit={editProjectSubmit}>
                                <input type="text" placeholder="Project Name" value={addProjectName}
                                onChange={(e)=>SetAddProjectName(e.target.value)}/>

                                <input type="file" placeholder="Project Image" 
                                onChange={(e)=>SetAddProjectImage(e.target.files[0])}/>

                                <input type="text" placeholder="Project Link" value={addProjectLink}
                                onChange={(e)=>SetAddProjectLink(e.target.value)}/>

                                <input type="text" placeholder="Tech Stack" value={addProjectStack}
                                onChange={(e)=>SetAddProjectStack(e.target.value)}/>

                                <input type="submit"  value="Submit"/>
                            </form>
                        </div>)}
                    </div>
                )
            }
        </div>
    )
}