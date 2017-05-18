import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';

import { TodoModel } from './todo-model';

@Injectable()
export class TodoService {

  private todos: TodoModel[];

  constructor(private http: Http, private platform: Platform) {
    this.getTodos();
  }

  getTodos() {
    this.todos = [
      new TodoModel('This First Task 1'),
      new TodoModel('This First Task 2', false, true),
      new TodoModel('This First Task 3'),
      new TodoModel('This First Task 4', true),
      new TodoModel('This First Task 5'),
      new TodoModel('This First Task 6'),
      new TodoModel('This First Task 7'),
      new TodoModel('This First Task 8'),
      new TodoModel('This First Task 9'),
      new TodoModel('This First Task 10'),
      new TodoModel('This First Task 11'),
    ];
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
