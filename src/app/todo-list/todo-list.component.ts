import { Component,OnInit} from '@angular/core';
import { TodoListService } from './todo-list.service';
import { Todo } from './todo.model';
import { TodoStatusType } from './todo-status-type';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit{
  
  constructor(private todoListService : TodoListService){
    // this.todoListService = todoListService;
  }
  ngOnInit() {
  }
  //新增代辦事項
  //
  addTodo(event:KeyboardEvent): void {
    
    //將類型轉換為HTMLInputElement
    const todo = event.target as HTMLInputElement;
    
    if(!todo){
      return;
    }
    if(event.key === 'Enter'){
      const todoThing = todo.value.trim();
      this.todoListService.add(todoThing);
      todo.value = '';
    }
  }
  //取得代辦事項
  getList():Todo[]{
    let list: Todo[] = [];
    switch(this.status){
      case TodoStatusType.Active:
        list = this.getRemainingList();
        break;

      case TodoStatusType.Completed:
        list = this.getCompletedList();
        break;
    }
    return list;
  }
  //移除代辦事項
  remove(index:number):void{
    this.todoListService.remove(index);
  }
  //編輯代辦事項
  edit(todo:Todo):void{
    todo.editable = true;
  }
  //更新代辦事項
  update(todo:Todo, newTitle: string):void{
    if(!todo.editing){
      return;
    }

    const title = newTitle.trim();
    //有輸入名稱則修改
    if(title){
      todo.setTitle(title);
      todo.editable = false;
     //沒有輸入名稱則刪除 
    }else{
      const index = this.getList().indexOf(todo);
      if(index !== -1){
        this.remove(index);
      }
    }
  }
  //取消編輯
  cancelEditing(todo:Todo):void{
    todo.editable = false;
  }
  //取得未完成的代辦事項清單
  getRemainingList(): Todo[]{
    return this.todoListService.getWithCompleted(false);
  }
  //代辦事項狀態
  todoStatusType = TodoStatusType;
  private status = TodoStatusType.All;
  //取得已完成的代辦事項
  getCompletedList(): Todo [] {
    return this.todoListService.getWithCompleted(true);
  } 
  //設定狀態
  setStatus(status:number): void{
    this.status = status;
  }
  //檢查目前狀態
  checkStatus(status: number):boolean{
    return this.status === status;
  }
  //移除所有已完成之代辦事項
  removeCompleted(): void{
    this.todoListService.removeCompleted();
  }
  //取得所有代辦事項(不受狀態影響)
  getAllList(): Todo[]{
    return this.todoListService.getList();
  }
  //所有的代辦事項是否都已完成
  allCompleted(): boolean{
    return this.getAllList().length === this.getCompletedList().length;
  }
  //設定所有的代辦事項已完成/未完成
  setAllTo(completed: boolean): void{
    this.getAllList().forEach((todo) =>{
      todo.setCompleted(completed);
    });
  }
}
