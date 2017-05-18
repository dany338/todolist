import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
// Pages
import { MyApp } from './app.component';
import { TodosPage } from '../pages/todos/todos';
import { ListsPage } from '../pages/lists/lists';
import { AddTaskModalPage } from '../pages/add-task-modal/add-task-modal';
// Providers
import { TodoService } from '../shared/todo-service';
import { ListsService } from '../shared/lists-service';
// Pipes
import { PrioritizedTodosPipe } from '../pipes/prioritized-todos-pipe';
import { DoneTodosPipe } from '../pipes/done-todos-pipe';
@NgModule({
  declarations: [
    MyApp,
    TodosPage,
    ListsPage,
    AddTaskModalPage,
    PrioritizedTodosPipe,
    DoneTodosPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TodosPage,
    ListsPage,
    AddTaskModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    TodoService,
    ListsService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
