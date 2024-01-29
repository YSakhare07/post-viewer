<?php

namespace App\Http\Controllers\Authlar\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http; // Import Http facade
use Laravel\Socialite\Facades\Socialite;

class LoginController extends Controller
{
    public function handleFacebookCallback()
    {
        $user = Socialite::driver('facebook')->user();
        $accessToken = $user->token;

        // Now, you can make additional API calls to get the Page ID and Page Access Token
        $pageInfo = $this->getPageInfo($accessToken);

        // Retrieve Page ID and Page Access Token from the API response
        $pageId = $pageInfo['id'];
        $pageAccessToken = $pageInfo['access_token'];

        // Perform further logic with $pageId and $pageAccessToken

        return redirect()->away('http://localhost:3000/fbpost');
    }

    protected function getPageInfo($accessToken)
    {
        $response = Http::get("https://graph.facebook.com/v19.0/me/accounts", [
            'access_token' => $accessToken,
        ])->json();

        // Assuming the user has at least one page, you can get the first page in the list
        $page = $response['data'][0];

        return [
            'id' => $page['id'],
            'access_token' => $page['access_token'],
        ];
    }
}
