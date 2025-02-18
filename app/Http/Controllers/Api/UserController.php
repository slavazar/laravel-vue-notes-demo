<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function __invoke(Request $request)
    {
        $user = $request->user();
        
        if ($user) {
            return response()->json([
                'success' => true,
                'data' => $user,
                'message' => __('Authenticated user.'),
                'errors' => null,
            ]);
        }
        
        return response()->json([
            'success' => true,
            'data' => null,
            'message' => __('Empty user.'),
            'errors' => null,
        ]);
        //return $request->user();
    }
}

