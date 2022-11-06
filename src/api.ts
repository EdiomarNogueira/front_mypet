import axios from "axios";
const BASE = 'http://127.0.0.1:8000/api/';

let access_token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE2NjY2NzUzMzAsIm5iZiI6MTY2NjY3NTMzMCwianRpIjoiV1VLMlFKOGxIRjdNd09tQSIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.rwTylsZjyzqkiWo9L4MwTW-fUXbPaJ0EP8cPl8WXNYc';
export const api = {
    getAllPosts: async () => {
        let response = await axios.get(`${BASE}user/1/feed`, {
            method: 'GET',
            headers: {Authorization: 'Bearer '+ access_token}
            
        });
       return response.data;
    },
}

//login https://www.youtube.com/watch?v=iD94avNeoXM