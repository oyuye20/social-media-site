<?php
namespace App\Http\Controllers;

use App\Models\comments;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class commentFunction extends Controller
{


    public function addComment(Request $request){
        $request->validate([
            'comment' => 'required'
        ]);

        try {
            DB::beginTransaction();

            comments::create([
                'user_id' => Auth::id(),
                'posts_id' => $request->post_id,
                'comment' => $request->comment,
            ]);

            DB::commit();
            return response('success');
        } catch (\Throwable $th) {
            DB::rollBack();
            return response("error",$th);
        }
    }

    public function getCommentsByID(){
        return DB::table('comments AS c')
        ->leftJoin('users as u','u.id', '=', 'c.user_id')
        ->leftJoin('posts as p','c.posts_id','=','p.id')
        ->select('c.comment','u.name','c.created_at')
        ->get();


        /* ->join('users AS u','u.id','=','p.user_id')
        ->leftJoin('comments AS c','c.posts_id','=','p.id')
        ->leftJoin('liked_posts AS lp','lp.posts_id', 'p.id')

        ->select('u.name','p.id AS PostID','p.image','p.description','p.total_likes',
        'p.total_comment', 'p.created_at','lp.posts_id AS LikePostID','lp.user_id AS LikePostUserID'
        , 'u.id AS UserID')
        ->get(); */
    }

}
