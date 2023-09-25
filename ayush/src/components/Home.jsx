import React, { useState } from 'react'
import img from '../assets/login.png'
import { useNavigate } from 'react-router-dom';
import './Home.css'
function Home() {
    const [abs, setabs] = useState("");
	const [desc, setdesc] = useState("");
	const handleOnSubmit = async (e) => {
		e.preventDefault();
		let result = await fetch(
		'http://localhost:2000/register', {
			method: "post",
			body: JSON.stringify({ abs, desc }),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		result = await result.json();
		if (result) {
			alert("Data saved succesfully");
			setdesc("");
			setabs("");
		}
		
	}
	return (
		<center>
			<div className='acontent'>
				<h1>Ministry Of Ayush</h1>
				<div className='content'>
					<form action="">
					<div class="mb-3">
  <label for="formFile" class="form-label">Abstract</label><br/>
  <input class="form-control" type="file" id="formFile" value={abs} onChange={(e) => setabs(e.target.value)}></input>
</div>
						<div class="mb-2">
  <label for="exampleFormControlTextarea1" class="form-label">Description</label><br/>
  <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" value={desc} onChange={(e) => setdesc(e.target.value)}></textarea>
</div>
						<div className='button'>
						<button type="button" class="bt" onClick={handleOnSubmit}>Post</button>
						</div>
					</form>
				</div>
			</div>

		</center>
	);
}

export default Home