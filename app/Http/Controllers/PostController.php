<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;

class PostController extends Controller
{
    public function index(Request $request){
       
    	return  Post::orderBy('updated_at', 'desc')->paginate(2);
    }
    public function update(Request $request , $id){
    	$post = Post::findOrFail($id);
    	$post->update($request->all());
    	return $post ;
    }
    public function create(Request $request){
    	return Post::create($request->all());
    }
    public function delete($id){
    	$post = Post::findOrFail($id);
    	$post->delete();
    	return 204;
    }
}