import ListItems from "./app";

interface List {
    list:ListItems[],
    load():void,
    save():void,
    clearList():void,
    addItem(itemObj: ListItems):void,
    removeItem(id:string):void
}
export default class FullList implements List{

    static instance : FullList = new FullList()

    private constructor(private _List:ListItems[]=[]){
        
    }
    get list(): ListItems[] { 
        return this._List;
    }


    load():void{
        const storedList: string | null = localStorage.getItem("myList")
        if (typeof storedList !== "string") return

        const parsedList: {    
            _id: string,
            _item: string,
            _checked: boolean}[] = JSON.parse(storedList);

        parsedList.forEach(itemObj => {
            const newListItem = new ListItems(itemObj._id,itemObj._item,itemObj._checked)
            FullList.instance.addItem(newListItem)
        })
    }

    save():void{
        localStorage.setItem("myList",JSON.stringify(this._List))
    }

    clearList():void{
        this._List = []
        this.save()
    }

    addItem(itemObj:ListItems):void{
        this._List.push(itemObj)
        this.save()
    }

    removeItem(id:string):void{
        this._List = this._List.filter(item => item.id !== id)
        this.save()
    }
















}