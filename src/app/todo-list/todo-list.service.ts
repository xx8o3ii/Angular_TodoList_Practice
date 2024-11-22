import { Injectable } from '@angular/core';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  constructor() { }

  //存放代辦事項
  private list : Todo[] = [];


  add(title:string): void{
    //避免傳入的是無效值或空白字串
    if(title || title.trim()){
      this.list.push(new Todo(title));
    }
    
  }
  getList(): Todo[]{
      return this.list;
    }
  
  //移除代辦事項
  remove(index:number):void{
    this.list.splice(index,1)
  }
  //取得已完成或未完成的事項
  getWithCompleted(completed:boolean): Todo[]{
    return this.list.filter(todo => todo.done === completed);
  }
  //移除代辦事項
  removeCompleted(): void{
    this.list = this.getWithCompleted(false);
  }
}
