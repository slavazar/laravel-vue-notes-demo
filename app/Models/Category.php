<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Note;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
    ];
    
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    
    public function notes()
    {
        return $this->hasMany(Note::class, 'category_id');
    }
}