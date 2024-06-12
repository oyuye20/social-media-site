<?php

namespace App\Http\Controllers;

use App\Events\notification;
use App\Http\Requests\PostRequest;
use App\Models\liked_posts;
use App\Models\posts;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class postFunction extends Controller
{

    /* GET ALL POST OR BY ID (OPTIONAL) */
    public function getPost($id = null){

        /* FOR QUERY PARAMETER */
        $query = '';

        /* BASE POST QUERY */
        $postLists = DB::table('posts as p')

        /* JOINING BETWEEN USER INFO AND POST AUTHOR */
        ->leftJoin('users AS u','u.id','=','p.user_id')


        /* JOINING BETWEEN LISTS OF COMMENTS WITH POST ID */
        ->leftJoin('comments AS c','p.id','=','c.posts_id')

        /* JOINING COMMENT AND USER TO GET WHO'S USER POST COMMENT */
        ->leftJoin('users AS comment_user','comment_user.id','=','c.user_id')

        /* JOIN LIKED USERS TABLE */
        ->leftJoin('liked_posts as likePost','likePost.posts_id','=','p.id')
        ->leftJoin('users as userLikedPost','userLikedPost.id','=','likePost.user_id')


        ->select('u.name as post_author','p.id as post_id','p.image as image',
        'p.description as post_description','p.total_likes','p.total_comment',
        'p.created_at as date_posted','p.user_id as post_author_id','c.comment as comment_post','c.id as comment_id',
        'comment_user.name as commenter','c.created_at as comment_date_posted',
        'c.user_id as user_id_comment','p.total_likes as total_likes',
        'p.total_comment as total_comments' ,'likePost.id as like_id',
        'likePost.posts_id as posts_id_like', 'userLikedPost.name as user_liked'
        ,'likePost.user_id as user_liked_id')
        ->orderByDesc('p.created_at')

        ->when($id, function ($query, int $id) {
            $query->where('p.id', '=', $id);
        })->get();


        /* ARRAY FOR POSTS */
        $posts = [];

        foreach ($postLists as $row) {

            /* SET EMPTY COMMENT ARRAY IF NO COMMENT EXISTS IN DATABASE */
            if(!isset($posts[$row->post_id])){
                $posts[$row->post_id] = [
                    'post_id'=> $row->post_id,
                    'post_author_id' => $row->post_author_id,
                    'post_author' => $row->post_author,
                    'post_description'=> $row->post_description,
                    'total_likes' => $row->total_likes,
                    'total_comments' => $row->total_comments,
                    'image' => $row->image,
                    'date_posted' => $row->date_posted,
                    'comments' => [],
                    'users_liked' => [],
                ];
            }

            /* FOR FETCHING MULTIPLE COMMENT IN ONE POSTS */
            if($row->comment_id){
                $posts[$row->post_id]['comments'][]=[
                    'comment_id' => $row->comment_id,
                    'user_id_comment' => $row->user_id_comment,
                    'commenter' => $row->commenter,
                    'comment' => $row->comment_post,
                    'comment_date_posted' => $row->comment_date_posted
                ];
            }

            if($row->like_id){
                $posts[$row->post_id]['users_liked'][]=[
                    'like_id' => $row->like_id,
                    'user_liked' => $row->user_liked,
                    'user_liked_id' => $row->user_liked_id
                ];
            }
        };

        $postList = array_values($posts);
        return response($postList);

        /* FOR SEARCH FUNCTION QUERY */
        /* if($query){
            return $postLists = $postLists
            ->where('p.description', 'LIKE', '%'.$query.'%')
            ->get();
        } */

        /* FOR ID QUERY (OPTIONAL) */
        if($id){
            return $postLists->where('p.id','=', $id);
        }else{
        }
    }

    public function getPostByID($id){

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
                'user_id' => Auth::id(),
                'description' => $request->post_description,
                'image' => $filenameIMG
            ]);

            $user = Auth::user()->name;

            $hello = $user . " created a new post";
            event(new notification($hello));

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
            posts::where('id','=',$request->id)->increment('total_likes', 1);
        }else{
            $checkIfLiked->delete();
            posts::where('id','=',$request->id)->decrement('total_likes', 1);
        }


        return response('success');
    }

}
