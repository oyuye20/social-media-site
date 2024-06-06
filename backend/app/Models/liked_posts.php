<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class liked_posts extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id','posts_id'
    ];
}
