import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ListModel } from './list-model';
@Injectable()
export class ListsService {

  public lists:ListModel[] = [];

  constructor(public http: Http) {
    this.getLists();
  }

  private getLists() {
    this.lists = [
      new ListModel("My List #1", 1),
      new ListModel("My List #2", 2),
      new ListModel("My List #3", 3),
      new ListModel("My List #4", 4),
      new ListModel("My List #5", 5),
      new ListModel("My List #6", 6),
      new ListModel("My List #7", 7)
    ];
  }

  public addList(name:string) {
    let list = new ListModel(name, this.lists.length);
    this.lists = [...this.lists, list];
  }

}
