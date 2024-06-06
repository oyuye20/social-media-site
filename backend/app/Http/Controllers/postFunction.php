<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostRequest;
use App\Models\liked_posts;
use App\Models\posts;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class postFunction extends Controller
{

    /* GET ALL POST OR BY ID (OPTIONAL) */
    public function getPost($id = null){
        
        /* FOR QUERY PARAMETER */
        $query = '';
        
        /* BASE QUERY */
        $postLists = DB::table('posts AS p')
        ->join('users AS u','u.id','=','p.user_id') /* JOIN USER TABLE */
        ->leftJoin('comments AS c','c.posts_id','=','p.id') /* JOIN COMMENTS TABLE */
        ->leftJoin('liked_posts AS lp','lp.posts_id', 'p.id')
        ->select('u.name','p.id AS PostID','p.image','p.description','p.total_likes',
        'p.total_comment', 'p.created_at','lp.posts_id AS LikePostID','lp.user_id AS LikePostUserID'
        ,'u.id AS UserID')->orderByDesc('p.created_at');

        /* FOR SEARCH FUNCTION QUERY */
        if($query){
            return $postLists = $postLists
            ->where('p.description', 'LIKE', '%'.$query.'%')
            ->get();
        }

        /* FOR ID QUERY (OPTIONAL) */
        if($id){
            return $postLists->where('p.id','=', $id)->get();
        }else{
            return $postLists->get();
        }   
    }


    public function createPost(PostRequest $request){       
        try {
            DB::beginTransaction();
            $filenameIMG = NULL;

            if($request->hasFile('image')){
                $file = $request->file('image');
                $extension = $file->getClientOriginalExtension();
                $filenameIMG = time().'.'.$extension;
                $file->move('image',$filenameIMG);
            }

            posts::create([
                'user_id' => /* Auth::id() */ 1,
                'total_likes' => 0,
                'total_comment' => 0,
                'description' => $request->description,
                'image' => $filenameIMG
            ]);

            DB::commit();
            return response(200);

        } catch (\Throwable $th) {
            DB::rollBack();
            return response($th);            
        }
    }

    public function updatePost(PostRequest $request, $id){
        $checkPostIfExists = posts::findOrFail($id);

        try {
            DB::beginTransaction();
            
            $checkPostIfExists->where('id','=',$id)->update([
                'description' => $request->description
            ]);

            return response(200);
            
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }

    public function deletePost($id){
        $checkPostIfExists = posts::findOrFail($id);
        $checkPostIfExists->where('id', '=', $id)->delete();
        
        return response(200);
    }


    public function likePostFunction(Request $request){ 

        $checkIfLiked = liked_posts::where('posts_id','=',$request->id)->first();

        if($checkIfLiked === null){
            liked_posts::create([
                'user_id' => Auth::id(),
                'posts_id' => $request->id
            ]);
            posts::where('id',$request->id)->increment('total_likes', 1);
        }else{
            $checkIfLiked->delete();
            posts::where('id',$request->id)->decrement('total_likes', 1);
        }

    
        return response('success');
    }
}
