import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comments } from '../models/Comments';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private apiUrl = 'https://localhost:7128/api'; 

  constructor(private http: HttpClient) { }

  getComments(): Observable<Comments[]> {
    return this.http.get<Comments[]>(`https://localhost:7128/api/Comment`);
  }

  getCommentsByID(bugId: number): Observable<Comments> {
    console.log(bugId);
    
    return this.http.get<Comments>(`https://localhost:7128/api/Comment/${bugId}`);
  }

  createComment(commentsData: Comments): Observable<Comments> {
    console.log(commentsData);

    return this.http.post<Comments>(
      'https://localhost:7128/api/Comment',
      commentsData,
      { headers: { 'Content-Type': 'application/json' } }
    );
  }
}
