<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
//use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
//use Illuminate\Support\Facades\Validator;

use App\Http\Requests\Note\StoreRequest;
use App\Http\Requests\Note\UpdateRequest;

use App\Http\Resources\NoteResource;
use Illuminate\Database\Eloquent\Builder;
use App\Models\Note;

class NoteController extends Controller
{
    
    public function count()
    {
        $count = Auth::user()->notes()->count();
        
        return response()->json([
            'success' => true,
            'data' => $count,
            'message' => __('The notes were counted successfully.'),
            'errors' => null,
        ]);
    }

    public function index()
    {
        $orderColumn = request('order_column', 'updated_at');
        if (!in_array($orderColumn, ['id', 'title', 'category_name', 'created_at', 'updated_at'])) {
            $orderColumn = 'updated_at';
        }
        
        $orderDirection = request('order_direction', 'desc');
        if (!in_array($orderDirection, ['asc', 'desc'])) {
            $orderDirection = 'desc';
        }
        
        $notes = Auth::user()->notes();

        $notes = $notes->join('categories', 'notes.category_id', '=', 'categories.id')
            ->select('notes.*', 'categories.name as category_name')
            ->when(request('search_category'), function (Builder $query) {
                $query->where('category_id', request('search_category'));
            })
            ->when(request('search_id'), function (Builder $query) {
                $query->where('notes.id', request('search_id'));
            })
            ->when(request('search_title'), function (Builder $query) {
                $query->where('title', 'like', '%' . request('search_title') . '%');
            })
            ->when(request('search_content'), function (Builder $query) {
                $query->where('content', 'like', '%' . request('search_content') . '%');
            })
            ->when(request('search_global'), function (Builder $query) {
                $query->whereAny([
                    'notes.id',
                    'title',
                    'content',
                    ], 'LIKE', '%' . request('search_global') . '%');
            })
            ->orderBy($orderColumn, $orderDirection)
            ->paginate(5);

        return NoteResource::collection($notes);
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

        $note = Note::create($data);
        
        return new NoteResource($note);
    }
    
    /*
    public function store_2(Request $request)
    {
        $user = Auth::user();

        $messages = [
            'title.required' => 'The title is required.',
            'content.required' => 'The content is required.',
            'category_id.required' => 'The category is required.',
        ];

        $validator = Validator::make($request->all(), [
            'title' => 'required|max:100',
            'content' => 'required|min:3|max:500',
            ], $messages);

        if ($validator->fails()) {
            return response()->json([
                    'success' => false,
                    'data' => [],
                    'message' => __('Validation errors.'),
                    'errors' => $validator->errors(),
            ], 422);
        }

        $data = $validator->validated();

        $data['user_id'] = $user->id;

        $note = Note::create($data);

        return response()->json([
            'success' => true,
            'data' => $note,
            'message' => __('The note was added successfully.'),
            'errors' => null,
        ]);
    }
     * 
     */

    /**
     * Display the specified resource.
     */
    public function show(Note $note)
    {
        if ($note->user_id !== Auth::user()->id) {
            return response()->json([
                    'success' => false,
                    'data' => [],
                    'message' => __('This action is unauthorized.'),
                    'errors' => [__('Unauthorized.')],
            ], 403);
        }

        return new NoteResource($note);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    public function update(UpdateRequest $request, Note $note)
    {
        $note->update($request->validated());

        return new NoteResource($note);
    }
    
    /*
    public function update_2(Request $request, string $id)
    {
        $note = Note::find($id);

        if (empty($note)) {
            return response()->json([
                    'success' => false,
                    'data' => [],
                    'message' => __('Invalid item.'),
                    'errors' => [__('Invalid item.')],
            ], 400);
        }

        if ($note->user_id !== Auth::user()->id) {
            return response()->json([
                    'success' => false,
                    'data' => [],
                    'message' => __('This action is unauthorized.'),
                    'errors' => [__('Unauthorized.')],
            ], 403);
        }

        $messages = [
            'title.required' => 'The title is required.',
            'content.required' => 'The content is required.',
            'category_id.required' => 'The category is required.',
        ];

        $validator = Validator::make($request->all(), [
            'title' => 'required|max:100',
            'content' => 'required|min:3|max:500',
            'category_id' => 'required|integer',
            ], $messages);

        if ($validator->fails()) {
            return response()->json([
                    'success' => false,
                    'data' => [],
                    'message' => __('Validation errors.'),
                    'errors' => $validator->errors()
            ]);
        }

        // Retrieve the validated input...
        $data = $validator->validated();

        $note->title = $data['title'];
        $note->content = $data['content'];
        $note->category_id = $data['category_id'];
        $note->save();

        return response()->json([
            'success' => true,
            'data' => $note,
            'message' => __('The note was updated successfully.'),
            'errors' => null,
        ]);
    }
     * 
     */

    public function destroy(Note $note)
    {
        if ($note->user_id !== Auth::user()->id) {
            return response()->json([
                    'success' => false,
                    'data' => [],
                    'message' => __('This action is unauthorized.'),
                    'errors' => [__('Unauthorized.')],
            ], 403);
        }

        $note->delete();

        return response()->json([
            'success' => true,
            'data' => [],
            'message' => __('The note was deleted successfully.'),
            'errors' => null,
        ]);

        //return response()->noContent();
    }
}

