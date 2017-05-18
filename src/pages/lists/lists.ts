import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { TodosPage } from '../todos/todos';
import { ListsService } from '../../shared/lists-service';
@IonicPage()
@Component({
  selector: 'page-lists',
  templateUrl: 'lists.html',
})
export class ListsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public listsService:ListsService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Lists');
  }

  goToList() {
    this.navCtrl.push(TodosPage);
  }

  addNewList(name:string) {
    this.listsService.addList(name);
  }

  showAddList() {
    let addListAlert = this.alertCtrl.create({
      title: 'New List',
      message: 'Give a name to the new list',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {}
        },
        {
          text: 'Add',
          handler: data => {this.addNewList(data.name);}
        }
      ]
    });

    addListAlert.present();
  }
}
