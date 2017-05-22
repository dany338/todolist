import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import { Observable } from 'rxjs/Rx';
import { ListModel } from './list-model';
import { AppSettings } from './app-settings';
@Injectable()
export class ListsService {

  public lists:ListModel[] = [];

  constructor(public http: Http, public storage: Storage) {
    this.getLists();
  }

  private getLists() {
    this.getFromLocal()
    .then(()=> { this.getFromServer() },
          ()=> { this.getFromServer() });
  }

  public addList(name:string) {
    let observable = this.postNewLisToServer(name);

    observable.subscribe(
      (list: ListModel)=>{// arow function
        this.lists = [...this.lists, list];
        this.saveLocally();
      },
      error => console.log("Error tryping to post a new list to the server")
    );
    return observable;
  }

  private getFromLocal() {
    return this.storage.ready().then(() => {
      return this.storage.get('lists').then((data)=> {
        let storageLists:ListModel[] = [];
        if(data) {
          for(let list of data){
            storageLists.push(new ListModel(list.name, list.id));
          }
        }
        this.lists = storageLists;
      });
    });
  }

  private getFromServer() {
    this.http.get(`${AppSettings.API_ENDPOINT}/lists`) //temporal string
    .map(response => { return response.json() })
    .map((lists:Object[]) => {
      return lists.map(item => ListModel.fromJson(item));
    })
    .subscribe(
      (result:ListModel[]) => {
        this.lists = result;
        this.saveLocally();
      },
      error => {
        console.log("Error loading lists from server", error);
      }
    );
  }

  private postNewLisToServer(name): Observable<ListModel>{
    // como el nombre de la propiedad y el valor es cero en ECS6 se puede juntar diractamente
    let observable = this.http.post(`${AppSettings.API_ENDPOINT}/lists`, {name})
                     .share()
                     .map(response=>  response.json() )
                     .map(list=> ListModel.fromJson(list));//row function

    observable.subscribe(()=>{}, ()=>{});
    return observable;
  }

  public saveLocally() {
    this.storage.set('lists',JSON.stringify(this.lists));
  }

}
