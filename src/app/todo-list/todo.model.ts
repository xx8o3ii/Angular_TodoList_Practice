export class Todo {
    //事項名稱
    private title = '';

    //是否完成
    private completed = false;

    //事項的名稱(避免傳入值為false)
    constructor(title:string){
        this.title = title || '';
    }
    //是否完成
    get done(): boolean{
        return this.completed;
    }
    //事項名稱
    getTitle(): string{
        return this.title;
    }
    //因為可以打勾之後再取消，所以用部林值來切換狀態
    toggleCompletion():void{
        this.completed = !this.completed;
    }
    //編輯模式
    private editMode = false;
    //取得事項是否為編輯模式
    get editing():boolean{
        return this.editMode;
    }
    //設定是否可被編輯
    set editable(bl:boolean){
        this.editMode = bl;
    }
    //更新代辦事項名稱
    setTitle(title:string):void{
        this.title = title;
    }
    //設定是否完成
    setCompleted(completed: boolean): void{
        this.completed = completed;
    }
}
