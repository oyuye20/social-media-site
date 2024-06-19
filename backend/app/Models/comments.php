<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class comments extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id','posts_id','comment'
    ];

    public function postComment(): BelongsTo
    {
        return $this->belongsTo(posts::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }


}
