import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { getList , addItem ,deleteItem , updateItem } from './function' ; 

export default class Posts extends Component {
     constructor(){
        super();
       this.state={
            title:'',
            content:'',
            id:'',
            key:'',
            editDisabled:false,
            items:[],
            url:'api/posts/'
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }
     componentWillMount(){
        this.getAll()
    }
   
    getAll () {
        getList(this.state.url).then(data=>{
            this.setState({
                items:data.data,
                url:data.next_page_url
            },()=>{
                console.log(this.state.items)
            })
        })
    }
    onSubmit (e)  {
        e.preventDefault()
       
        if (this.state.title =='') {
            alert("title cant be null u must enter title")

        }else{
            $("#go").attr("disabled", "disabled"); 
            axios
            .post('/api/create',{
            title:this.state.title,
            content:this.state.content
            },{
            headers:{'Content-Type':'application/json'}
            })
            .then(res=>{
            $("#go").removeAttr("disabled") 
            $('#exampleModal').modal('hide');
          
           var newpost = res.data
           var postObject =  Object.assign({}, newpost)
           var oldposts =this.state.items ;
           var newposts=[ postObject ]
           var newposts = newposts .concat(oldposts);
            this.setState({
            title:'',
            content:'',
            items:newposts
            })
            })


         
        }
        
    }
    onUpdate ( e) {
        e.preventDefault()
        axios
    .post('/api/update/'+this.state.id,{
        title:this.state.title,
        content:this.state.content
    },{
        headers:{'Content-Type':'application/json'}
    })
    .then(res=>{
        var newpost = res.data
        var postObject =  Object.assign({}, newpost)
        const olditems= this.state.items
        var key = this.state.key
        olditems[key] = postObject

         this.setState({
            items:olditems
        })
            $('#exampleModal').modal('hide');
    })
      
       
    }
    onEdit (post,key){
     
        this.setState({
            title:post.title,
            content:post.content,
            key:key,
            editDisabled:true,
            id:post._id
        })
         $('#exampleModal').modal('show');
       
       
    }
    onDelete (post ,e) {
        e.preventDefault()
        deleteItem(post._id)
        const newState = this.state.items
        newState.splice(newState.index,1)
        this.setState({
            items:newState
        })
        
    }
    onChange ( e ) {
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    loadMore(e){
        e.preventDefault()
      
         getList(this.state.url).then(data=>{
            this.setState({
                items:this.state.items.length > 0 ? this.state.items.concat(data.data):data.data ,
                url:data.next_page_url
            },()=>{
                console.log(this.state.items)
            })
        })
    }
    render() {

       

        return (
            <div className="container">
            <h2>Posts</h2>
          <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className = "modal-dialog" role="document">
            <div className = "modal-content">
            <div className = "modal-header">
            <h5 className = "modal-title">Add Post</h5>
            <button type="button" className = "close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
            </div>
            <div className = "modal-body">
            <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                            <label htmlFor="title">Title </label>
                           
                                <input type="text" className="form-control" id="title" name="title" value={this.state.title || ''}
                                onChange={this.onChange.bind(this)} />
                           
                            <label htmlFor="title">Content </label>
                          
                                <input type="text" className="form-control" id="content" name="content" 
                                value={this.state.content || ''}
                                onChange={this.onChange.bind(this)} />

                    </div>
                    {
                        !this.state.editDisabled ?
                        (
                        <button  id ="go" onClick={this.onSubmit.bind(this)} type="submit" className="btn btn-success btn-block"> Submit
                        </button>
                        )
                        :
                        (
                        <button id ="go"  onClick={this.onUpdate.bind(this)} type="submit" className="btn btn-primary btn-block"> Update
                        </button>
                        )
                    }
                </form>
            </div>
            
            </div>
            </div>
            </div>
     <button className="btn btn-primary"  data-toggle="modal" data-target="#exampleModal"> Add Post </button>
                <div className="row">
                <div className="col-md-12">
     
                    {  this.state.items.length !== 0  ? 
                     this.state.items.map((item,index)=>(

                        <div  key={index}>
                        <Title title={item.title} />
                         <br />
                        <Contnet content={item.content} />
                        <br />
                        <UserActions  i={index} bind={this} post={item}/>
                        </div> ))
                     : <h2> add Some Posts</h2>
                
                    }
                    <button className="btn btn-primary btn-block" onClick={this.loadMore.bind(this)}> load more </button>
                </div>
                </div>
            </div>

        );
    }
}

class Title extends Component {
     render(){
        return (
             <div>{this.props.title}</div>
            
            )
    } 

    }

    class Contnet extends Component {
     render(){
        return (
             <div>{this.props.content}</div>
            )
    } 

    }
     class UserActions extends Component {
     render(){
        return (
            <div className="mr-bt-10">
            <button href="" className="btn btn-info mr-1"
                                  onClick={this.props.bind.onEdit.bind(this.props.bind,this.props.post,this.props.i)}>
                                    Edit </button>
                                    <button href="" className="btn btn-danger"
                                    onClick={this.props.bind.onDelete.bind(this.props.bind,this.props.post)}>
                                    Delete  </button>

            </div>
            )
    } 

    }

if (document.getElementById('posts')) {
    ReactDOM.render(<Posts/>, document.getElementById('posts'));
}
