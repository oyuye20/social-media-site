<?php
namespace App\Http\Controllers;

use App\Models\comments;
use App\Models\posts;
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

            posts::where('id','=',$request->post_id)->increment('total_comment', 1);

            DB::commit();
            return response(200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response("error",$th);
        }
    }

    public function indexComments($id = null) {
        /* BASE COMMMENT QUERY */
        return DB::table('comments AS c')                                          
        ->join('users as u','u.id', '=', 'c.user_id')
        ->leftJoin('posts as p','c.posts_id','=','p.id')
        ->select('c.comment as comment','u.name as commenter'
        ,'c.created_at as comment_date_posted',
        'c.id as comment_id')
        
        ->where('c.posts_id','=', $id)
        ->get();
    }


    public function getCommentsByPostID(){
        return DB::table('comments AS c')
        ->leftJoin('users as u','u.id', '=', 'c.user_id')
        ->leftJoin('posts as p','c.posts_id','=','p.id')
        ->select('c.comment','u.name','c.created_at')
        ->get();
    }

}
