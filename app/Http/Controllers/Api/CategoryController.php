<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Builder;
use App\Http\Resources\CategoryResource;
use App\Models\Category;

use App\Http\Requests\Category\StoreRequest;
use App\Http\Requests\Category\UpdateRequest;

class CategoryController extends Controller
{
    
    public function list()
    {
        $categories = Auth::user()->categories()
            ->orderBy('name', 'asc')
            ->get();

        return CategoryResource::collection($categories);
    }
    
    public function count()
    {
        $count = Auth::user()->categories()->count();
        
        return response()->json([
            'success' => true,
            'data' => $count,
            'message' => __('The categories were counted successfully.'),
            'errors' => null,
        ]);
    }

    public function index()
    {
        $orderColumn = request('order_column', 'updated_at');
        if (!in_array($orderColumn, ['id', 'name', 'created_at', 'updated_at'])) {
            $orderColumn = 'name';
        }
        
        $orderDirection = request('order_direction', 'desc');
        if (!in_array($orderDirection, ['asc', 'desc'])) {
            $orderDirection = 'desc';
        }

        $categories = Auth::user()->categories()
            ->when(request('search_global'), function (Builder $query)
            {
                $query->whereAny([
                    'id',
                    'name',
                    ], 'LIKE', '%' . request('search_global') . '%');
            })
            ->orderBy($orderColumn, $orderDirection)
            ->paginate(5);

        return CategoryResource::collection($categories);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $user = Auth::user();

        // Retrieve the validated input...
        $data = $request->validated();

        $data['user_id'] = $user->id;

        $category = Category::create($data);
        
        return new CategoryResource($category);
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        if ($category->user_id !== Auth::user()->id) {
            return response()->json([
                    'success' => false,
                    'data' => [],
                    'message' => __('This action is unauthorized.'),
                    'errors' => [__('Unauthorized.')],
            ], 403);
        }

        return new CategoryResource($category);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    public function update(UpdateRequest $request, Category $category)
    {
        $category->update($request->validated());

        return new CategoryResource($category);
    }

    public function destroy(Category $category)
    {
        if ($category->user_id !== Auth::user()->id) {
            return response()->json([
                    'success' => false,
                    'data' => [],
                    'message' => __('This action is unauthorized.'),
                    'errors' => [__('Unauthorized.')],
            ], 403);
        }
        
        if ($category->notes()->count() > 0) {
            return response()->json([
                    'success' => false,
                    'data' => [],
                    'message' => __('The category was not deleted. The category has notes.'),
                    'errors' => [__('The category was not deleted.'), __('The category has notes.')],
            ], 406);
        }

        $category->delete();

        return response()->json([
            'success' => true,
            'data' => [],
            'message' => __('The category was deleted successfully.'),
            'errors' => null,
        ]);

        //return response()->noContent();
    }
    
}
