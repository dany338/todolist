import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
// Models app mas robusta mas resistente a errores
import { TodoModel } from '../../shared/todo-model';
// Pages Modals
import { AddTaskModalPage } from '../add-task-modal/add-task-modal';
// Providers
import { TodoService } from '../../shared/todo-service';

@IonicPage()
@Component({
  selector: 'page-todos',
  templateUrl: 'todos.html',
})
export class TodosPage {

  //public todos: TodoModel[];
  private toogleTodoTimeout = null;


  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public todoService: TodoService, private platform: Platform) {
  }

  ionViewDidLoad() {}

  setTodoStyles(item:TodoModel){

    let styles = {
      'text-decoration': item.isDone ? 'line-through' : 'none',
      'font-weight': item.isImportant ? '600' : 'normal'
    };

    return styles;
  }

  toogleTodo(todo:TodoModel) {
    if(this.toogleTodoTimeout)
      return;

    this.toogleTodoTimeout = setTimeout(()=>{
      this.todoService.toogleTodo(todo);
      this.toogleTodoTimeout = null;
    }, this.platform.is('ios') ? 0 : 300);
  }

  removeTodo(todo:TodoModel) {
    this.todoService.removeTodo(todo);
  }

  showAddTodo() {
    let modal = this.modalCtrl.create(AddTaskModalPage);
    modal.present();

    modal.onDidDismiss(data => {
      if(data) {
        this.todoService.addTodo(data);
      }
    });
  }

  showEditTodo(todo:TodoModel) {
    let modal = this.modalCtrl.create(AddTaskModalPage, {todo});
    modal.present();

    modal.onDidDismiss(data => {
      if(data) {
        this.todoService.updateTodo(todo, data);
      }
    });
  }
}
