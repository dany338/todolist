import { Pipe, PipeTransform } from '@angular/core';
// Models
import { TodoModel } from '../shared/todo-model';

@Pipe({
  name: 'doneTodosPipe'
  //pure: false
})
export class DoneTodosPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(todos:TodoModel[]) {
    console.log('done todos pipe');
    return todos.filter(todo => todo.isDone);
  }
}
