import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

import { TodoModel } from './todo-model';

@Injectable()
export class TodoService {

  private todos: TodoModel[] = [];

  constructor(private http: Http, private platform: Platform, public storage: Storage) {
  }

  public loadFromList(id:number) {
    this.getFromLocal(id);
  }

  public getFromLocal(id:number) {
    return this.storage.ready().then(() => {
      return this.storage.get(`list/${id}`).then((data)=> { // Acento al inicio y al principio abierto literal string
        if(!data) {
          this.todos = [];
          return;
        }
        let storageTodos:TodoModel[] = [];
        for(let todo of data){
          storageTodos.push(new TodoModel(todo.description, todo.isImportant, todo.isDone));
        }
        this.todos = storageTodos;
      });
    });
  }

  public saveLocally(id:number) {
    this.storage.ready().then(()=>{
      this.storage.set(`list/${id}`,this.todos);
    });
  }

  // Convertir mis metodos en inmutables
  toogleTodo(todo:TodoModel) {
    let isDone = !todo.isDone;
    const todoIndex = this.todos.indexOf(todo);
    let updatedTodo = new TodoModel(todo.description, todo.isImportant, isDone);

    this.todos = [
      ...this.todos.slice(0, todoIndex),
      updatedTodo,
      ...this.todos.slice(todoIndex+1)
    ];
  }

  addTodo(todo:TodoModel) {
    //this.todos.push(todo);
    this.todos = [
      ...this.todos,
      todo
    ];
  }

  removeTodo(todo:TodoModel) {
    const index = this.todos.indexOf(todo);
    this.todos = [
      ...this.todos.slice(0, index), // una parte del array ... propiedad de ESC6 expandirme este array en cada uno de sus elementos poniendolo uno a uno
      ...this.todos.slice(index+1)
    ];
  }

  updateTodo(originalTodo:TodoModel, modifiedTodo:TodoModel) {
    const index = this.todos.indexOf(originalTodo);
    this.todos = [
      ...this.todos.slice(0, index), // una parte del array ... propiedad de ESC6 expandirme este array en cada uno de sus elementos poniendolo uno a uno
      modifiedTodo,
      ...this.todos.slice(index+1)
    ];
  }

}
