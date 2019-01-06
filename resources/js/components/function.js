import axios from 'axios';
export const getList = url => {
	return axios
	.get(url,{
		headers:{'Content-Type':'application/json'}
	})
	.then(res=>{
		return res.data
	})
} 

export const addItem = (title , content)=> {
	return axios
	.post('/api/create',{
		title:title,
		content:content
	},{
		headers:{'Content-Type':'application/json'}
	})
	.then(res=>{
	/*console.log(res);*/
	})
} 
export const updateItem = (id ,title , content)=> {
	return axios
	.post(`/api/update/${id}`,{
		title:title,
		content:content
	},{
		headers:{'Content-Type':'application/json'}
	})
	.then(res=>{
		console.log(res);
	})
} 

export const deleteItem =  id => {
	 axios
	.post(`/api/delete/${id}`,{
	
		headers:{'Content-Type':'application/json'}
	})
	.then(res=>{
		console.log(res);
	})
	.catch(err=>{
		console.log(err);
	})
} 