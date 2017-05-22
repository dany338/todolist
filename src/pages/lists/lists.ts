import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ViewController } from 'ionic-angular';
import { TodosPage } from '../todos/todos';
import { ListsService } from '../../shared/lists-service';
import { ListModel } from '../../shared/list-model';

@IonicPage()
@Component({
  selector: 'page-lists',
  templateUrl: 'lists.html',
})
export class ListsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public listsService:ListsService, private loadingCtrl: LoadingController, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Lists');
  }

  goToList(list:ListModel) {
    this.navCtrl.push(TodosPage, {list});
  }

  addNewList(name:string) {
    let loader = this.loadingCtrl.create({
      dismissOnPageChange: true
    });
    loader.present();
    this.listsService.addList(name)
    .subscribe(list => {
        this.goToList(list);
    },
    error => { loader.dismiss();});
  }

  showAddList() {
    let addListAlert = this.alertCtrl.create({
      enableBackdropDismiss: true,
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
          handler: data => {
            //let navTransition = addListAlert.dismiss();
            //navTransition.then(()=>{});
            this.addNewList(data.name);
          }
        }
      ]
    });

    addListAlert.present();
  }
}
