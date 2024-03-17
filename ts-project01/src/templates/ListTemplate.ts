import FullList from "../fulllist";

interface DOMList {
    ul:HTMLUListElement,
    clear(): void,
    render(FullList:FullList):void
}
export default class ListTemplate implements DOMList{
    static instance : ListTemplate = new ListTemplate()
    
    ul: HTMLUListElement;

    private constructor(){
        this.ul = document.getElementById("listItems") as HTMLUListElement
    }

    clear():void{
        this.ul.innerHTML = "";
    }

    render(FullList: FullList): void {
        this.clear()

        FullList.list.forEach(item => {
            const li = document.createElement("li") as HTMLElement
            li.className = "item"

            const check = document.createElement("input") as HTMLInputElement
            check.type ="checkbox"
            check.tabIndex = 0
            check.checked = item.checked
            li.append(check)

            check.addEventListener("change",()=>{
                item.checked = !item.checked
                FullList.save()
            })

            const lable = document.createElement("lable") as HTMLLabelElement
            lable.htmlFor = item.id
            lable.textContent = item.item
            li.append(lable)

            const button = document.createElement("button") as HTMLButtonElement
            button.className = 'button'
            button.textContent = "x"
            li.append(button)
        
            button.addEventListener('click',()=>{
                FullList.removeItem(item.id)
                this.render(FullList)
            })

            this.ul.append(li)
        })
    }
}