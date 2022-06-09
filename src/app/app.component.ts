import { Component, OnInit } from '@angular/core';
import { ServicesService } from './services.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  posts: any = [];
  post: any = {};

  constructor(private service: ServicesService) {}

  ngOnInit(): void {
    this.getPosts();
    this.getPost(3);
    // this.addPost('Akshit', 'from Ludhiana');
    // this.updatePost(3, 'Akshit', 'from Ludhiana');
    this.deletePost(101)
  }

  getPosts() {
    this.service.getPosts().subscribe((data: any) => {
      this.posts = data.data.posts.data
      console.log("All Posts", this.posts);
    });
  }

  getPost(id: number) {
    this.service.getPost(id).subscribe((data: any) => {
      this.post = data.data.post
      console.log("Particular Post", this.post);
    });
  }

  addPost(title: string, body: string) {
    this.service.addPost(title, body).subscribe((data: any) => {
      console.log("After addition", data);
      this.getPosts()
    });
  }

  updatePost(id: number, title: string, body: string) {
    this.service.updatePost(id, title, body).subscribe((data: any) => {
      console.log("After updation", data);
      this.getPosts()
    });
  }

  deletePost(id: number){
    this.service.deletePost(id).subscribe((data: any) => {
      console.log("After deletion", data);
      this.getPosts()
    })
  }


}
