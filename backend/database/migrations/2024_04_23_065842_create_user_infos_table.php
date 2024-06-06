<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_infos', function (Blueprint $table) {
            $table->id('user_infos_id');
            $table->unsignedBigInteger('user_id');
            $table->text('image');
            $table->string('contact_number');
            $table->date('birthday');
            $table->bigInteger('followers');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
        });

    
        Schema::create('posts', function (Blueprint $table) {
            $table->id('id');
            $table->unsignedBigInteger('user_id');
            $table->longText('description');
            $table->text('image');
            $table->bigInteger('total_likes');
            $table->bigInteger('total_comment');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
        });

        Schema::create('liked_posts', function (Blueprint $table) {
            $table->id('id');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('posts_id');           
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('posts_id')->references('id')->on('posts');
        });

        Schema::create('comments', function (Blueprint $table) {
            $table->id('id');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('posts_id');
            $table->longText('comment');           
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('posts_id')->references('id')->on('posts');
        });     
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_infos');
    }
};
