import { Component } from '@angular/core';
import { ViewController, IonicPage, NavController, NavParams } from 'ionic-angular';

// Models
import { TodoModel } from '../../shared/todo-model';

@IonicPage()
@Component({
  selector: 'page-add-task-modal',
  templateUrl: 'add-task-modal.html',
})
export class AddTaskModalPage {

  public model = new TodoModel('');
  public title:string = 'Add New Task';
  public buttonText:string = 'ADD';

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
    if(this.navParams.get('todo')) {
      this.model = TodoModel.clone(this.navParams.get('todo'));
      this.title = 'Edit Task';
      this.buttonText = 'Save changes';
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTaskModal');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  submit() {
    this.viewCtrl.dismiss(this.model);
  }

}
