import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// Models app mas robusta mas resistente a errores
import { TodoModel } from '../../shared/todo-model';

@IonicPage()
@Component({
  selector: 'page-todos',
  templateUrl: 'todos.html',
})
export class TodosPage {

  public todos: TodoModel[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.todos = [
      new TodoModel('This First Task 1'),
      new TodoModel('This First Task 2', false, true),
      new TodoModel('This First Task 3'),
      new TodoModel('This First Task 4', true),
      new TodoModel('This First Task 5'),
      new TodoModel('This First Task 6'),
    ];
  }

  setTodoStyles(item:TodoModel){

    let styles = {
      'text-decoration': item.isDone ? 'line-through' : 'none',
      'font-weight': item.isImportant ? '600' : 'normal'
    };

    return styles;
  }

  toogleTodo(todo:TodoModel) {
    todo.isDone = ! todo.isDone; // Negación de boleanos
  }

}
