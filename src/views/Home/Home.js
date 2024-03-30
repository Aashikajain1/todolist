import React,{useState,useEffect} from 'react'
import './Home.css'
import plus from "./plus.png"
import TasksCard from '../../components/TasksCard/TasksCard';
function Home() {
    const [tasks, setTasks] = useState([]);
    const [newTask,setNewtask]= useState('')
    const[error, setError]=useState('')
    const [category,setCategory] = useState('');

    const validateNewTask =()=>{
        if(newTask===''){ 
            setError('Please Enter Task');
            return false;
        }
        else if(newTask.length<5){
            setError('Please Enter Valid Task with atleast 5 characters');
            return false;
        }
        else{
            setError('');
            return true;
        }
    }
    const saveTasksToLS=(tasksToSave)=>{
        localStorage.setItem('tasks',JSON.stringify(tasksToSave));
    }
    const addTask =()=>{
        const validationResult= validateNewTask();
        if(!validationResult) return;
        const newTasks = [...tasks,
            {
                title: newTask,
                category : category,
            }]
        saveTasksToLS(newTasks);
        setTasks(newTasks)//if we want to add new task above use setTasks([newtasks,...tasks])
        setNewtask('')

    }
    const deleteTasks =(index)=>{
        const newTasks =tasks;
        newTasks.splice(index,1);
        setTasks([...newTasks]);
        saveTasksToLS(newTasks);


    }
    useEffect(()=>{
        const tasks =localStorage.getItem('tasks');
        if(tasks){
            setTasks(JSON.parse(tasks));
        }
    },[])
    return (
        <div>
            <h1 className="text-center ">ToDoApp</h1>

            <div className='shadow bg-body-tertiary rounded overflow-y-scroll ' style={{height:500,width:600,marginLeft:450, marginTop: 40 }}>
                {
                    tasks.map((task, i) => {
                        const {title,category}=task;
                        return (
                            <TasksCard title={title} category ={category } key={i} delFunction={deleteTasks}
                            index={i} />
                        )
                    }
                    ) 
                    
                }

            </div>
            <p className="text-danger text-center mt-4">{error}</p>
            <div className="container d-flex text-center " style={{ marginLeft: 450, marginTop: 40 }}>
                <input type='text' placeholder='Add a new task' className="w-25 p-2 h-25 d-inline-block border border-primary rounded-pill ms-4 me-2" 
                value={newTask}
                onChange={(e)=>{
                    setNewtask(e.target.value)
                }}/>
                <select className='w-5 p-2 h-25 d-inline-block border border-primary rounded-pill ms-2 me-2' value={category} onChange={(e)=>{setCategory(e.target.value)}}>
                    <option> Select category</option>
                    <option value="📚 College">📚 College</option>
                    <option value="🛒Shopping">🛒Shopping</option>
                    <option value="🎯Goals">🎯Goals</option>
                    <option value="🗓️ Work">🗓️ Work</option>
                    <option value="🎨 Hobby">🎨 Hobby</option>
                </select>
                <img src={plus} alt='loading'
                 style={{ height: 40, width: 30, marginLeft: 25 }} 
                 onClick={addTask}/>
            </div>
        </div>
    )
}

export default Home