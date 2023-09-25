import React, { useState ,useEffect} from 'react'
import axios from 'axios';
import './Knowledge.css';
function Knowledge() {
    const [data, setData] = useState([]);
    useEffect(() => {
      axios.get('http://localhost:4000/api/items')
      .then( (response)=>{
        console.log(response.data);
        setData(response.data)
      })
      .catch(function (error) {
        alert(error.response.data)
        console.log(error);
      });
    }, []);
    const handleDownload = (abs,fileName) => {
      const blob = new Blob([data]);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName; 
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
    };
    if(!data){
      setData("No Abstracts")
    }
    const [isap , setisap]=useState(true);
    const [rat , setrat]=useState("");
    const [dom , setdom]=useState("");
    const [file , setfile]=useState("");
    
    const handleOnSubmit = async (e) => {
          e.preventDefault();
      setisap(true)
          let result = await fetch(
          'http://localhost:2001/register', {
              method: "post",
        body: JSON.stringify({ isap, rat, dom, file}),
              headers: {
                  'Content-Type': 'application/json'
              }
          })  
          result = await result.json();
      if(result){
        alert("Message Sent To Investor");
        setrat("");
        setdom("");
        setfile("")
      }
          
      }
    
    return (
      <>
      <h1>Ministry Of Ayush</h1>
      <div className='cont'>
        <h2>Abstracts:</h2>
        <ul type='none'>
          {data.map((item) => (
            <li key={item._id}>
              {/* <h2>{item.abstract}</h2> */}
              <h3 className='para'>{item.desc}</h3>
              <button onClick={()=>handleDownload(item.abs.data,item.desc)} className='b2'>Download File</button><br/><br/>
              <input type="text"value={rat} onChange={(e) => setrat(e.target.value)} placeholder='Your rating out of 10' id='1'></input><br/><br/>
              <input type="text"value={dom} onChange={(e) => setdom(e.target.value)} placeholder='Domain of the Paper' id='0'></input><br/><br/>
              <input class="form-control" type="file" id="formFile" value={file} onChange={(e) => setfile(e.target.value)}></input><br/><br/>
              <button className='b2' onClick={handleOnSubmit}>Approve</button>
              <h6>------------------------------------------------------------------------------------</h6>
            </li>
          ))}
        </ul>
      </div>
      </>
    );
}

export default Knowledge