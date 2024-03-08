import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Bugs } from 'src/app/shared/models/Bugs';
import { Comments } from 'src/app/shared/models/Comments';
import { CommentsService } from 'src/app/shared/services/comments.service';

@Component({
  selector: 'app-bug-comment',
  templateUrl: './bug-comment.component.html',
  styleUrls: ['./bug-comment.component.scss'],
})
export class BugCommentComponent implements OnInit {
  commentId: number;
  commentsList: Comments[]=[];
  createCommentForm: FormGroup;
  comment: Comments;
  newComment: Comments;
  editData: Comments;
  bugId: number;
  showForm: boolean=false;
  inputData: Comments;

  constructor(
    private commentsService: CommentsService,
    private form: FormBuilder,
    private router: Router,
    private ar: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createCommentForm = this.form.group({
      commentId: this.form.control(0),
      bugId: this.form.control(0),
      TesterName: this.form.control(''),
      DeveloperName: this.form.control(''),
      Comment: this.form.control(''),
    });

    this.ar.params.subscribe({
      next: (params) => {
        this.bugId = params['bugId'];
      },
    });
    this.getAllComments();
  }
  showCreateCommentForm(): void {
    this.showForm = true;
  }
  getAllComments(): void {
    let bugId = parseInt(sessionStorage.getItem('bugId'));
    console.log(bugId);
    this.ar.paramMap.subscribe((map) => {
      this.commentId = +map.get('commentId');
    });
    this.commentsService.getComments().subscribe({
      next:(data)=>{
        this.commentsList=data;
      },
      error:(err)=>{
        alert("error in fetching");
      }
    })
  }
  onSubmit(): void {
    if (this.createCommentForm.valid) {
      const commentData = this.createCommentForm.value;
      console.log(commentData);

      this.commentsService.createComment(commentData).subscribe(
        (response) => {
          console.log(response);
          this.commentsList.push(response); 
          this.showForm = false; 
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
