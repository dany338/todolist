import { Pipe, PipeTransform } from '@angular/core';
// Models
import { TodoModel } from '../shared/todo-model';

@Pipe({
  name: 'prioritizedTodosPipe'
  //pure: false
})
export class PrioritizedTodosPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(todos:TodoModel[]) {
    console.log('prioritized todos pipe');
    return todos.filter( todo => !todo.isDone).sort((a, b) => (b.isImportant && !a.isImportant) ? 1 : -1);
  }
}
