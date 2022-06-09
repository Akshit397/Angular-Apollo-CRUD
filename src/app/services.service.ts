import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';

const POSTS = gql`
query (
    $options: PageQueryOptions
  ) {
    posts(options: $options) {
      data {
        id
        title
      }
      meta {
        totalCount
      }
    }
  }
`;
const POST = gql`
  query User($id: ID!) {
    post(id: $id) {
      id
      title
      body
    }
  }
`;
const ADD_POST = gql`
mutation (
    $input: CreatePostInput!
  ) {
    createPost(input: $input) {
      id
      title
      body
    }
  }
`;
const UPDATE_POST = gql`
mutation (
    $id: ID!,
    $input: UpdatePostInput!
  ) {
    updatePost(id: $id, input: $input) {
      id
      body
    }
  }
`;
const DELETE_POST = gql`
mutation (
    $id: ID!
  ) {
    deletePost(id: $id)
  }
`;

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  constructor(private apollo: Apollo) {}

  getPosts(): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: POSTS,
    }).valueChanges;
  }

  getPost(id: number): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: POST,
      variables: {
        id: id,
      },
    }).valueChanges;
  }

  addPost(title: string, body: string): Observable<any> {
    return this.apollo.mutate({
      mutation: ADD_POST,
      variables: {
        input: {
          title: title,
          body: body
        }
      },
    });
  }

  updatePost(id: number, title: string, body: string): Observable<any> {
    return this.apollo.mutate({
      mutation: ADD_POST,
      variables: {
        id: id,
        input: {
          body: body
        }
      }
    });
  }

    deletePost(id: number): Observable<any> {
        return this.apollo.mutate({
            mutation: DELETE_POST,
            variables: {
                id: id
            }
        });
    }
}