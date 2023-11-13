import { v4 as uuidv4 } from "uuid";
// let uuid= uuidv4();

function pageLoader(){
    console.log('page load');
    const loginButton=document.getElementById('login-button');
    loginButton.addEventListener('click', (e)=>logInUser());
}






function createItem(name:string, price:number, description:string){
    let newItem:Item={
        id:uuidv4(),
        name:name,
        price:price,
        description:description,
    }
    return newItem
}

function addToCart(user:User, item:Item){
    user.cart.push(item)
    user.cart.sort()
}



function cartTotal(user:User):number{
    let total=0;
    for (let i of user.cart){
        total+=i.price
    }
    return total
}

function printCart(user:User){
    for (let item of user.cart){
        console.log(`${item.name}: $${item.price}`)
    }
    console.log(`Total: ${cartTotal(user)}`)
}

class Item{

    constructor(
        private _name:string,
        private _price:number,
        private _description:string,
        private _id: string = uuidv4()
    ){}

        public get id(): string {
            return this._id;
        }
        public set id(value: string) {
            this._id = value;
        }

        public get name():string{
            return this._name;
        }

        public set name(value:string){
            this._name=value;
        }

        public get price():number{
            return this._price;
        }

        public set price(value:number){
            this._price=value;
        }

        public get description():string{
            return this._description;
        }

        public set description(value:string){
            this._description=value;
        }
    
}

class User{

    static  logInUser():User|undefined{
        let username=(<HTMLInputElement>document.getElementById('username')).value;
        let age=parseInt((<HTMLInputElement>document.getElementById('age')).value);
        if (username && age){
            let u1=new User(username, age);
            return u1
        }
    }

    constructor(
        private _name:string,
        private _age:number,
        private _cart:Item[]=[],
        private _id: string = uuidv4()
    ){}

    
    public cartHTMLElement(u1:User){
        let itemList=document.getElementById('cart-area');
        if (!itemList){
            itemList.innerHTML='<h3>Cart is empty</h3>'
        }
        itemList.innerHTML='';
        for (i of this.cart){
            let itemInfo=document.createElement('div');
            itemInfo.className='item-info';
            itemInfo.innerHTML=`<h1>${i.name}</h1><br><p>$${i.price}</p><br><button id="remove-all">Remove All<button><br><button id="remove-one">-1</button>`
            itemList.append(itemInfo);
        }
    }

    public addRemoveEvenListeners(){
        
    }


    public removeFromCart(item:Item){
        for(let i of this.cart){
            if (i==item){
                this.cart.splice(this.cart.indexOf(i), 1)
            }
        }
        this.cart.sort()
    }
    
    public removeQuantityFromCart(itemToRemove:Item, quantity:number){
        for (let i=0; i<quantity; i++){
            let index = this.cart.findIndex(item => item.id === itemToRemove.id);
            this.cart.splice(index, 1);
        }
    }


    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }

    public get name():string{
        return this._name;
    }

    public set name(value:string){
        this._name=value;
    }

    public get age():number{
        return this._age;
    }

    public set age(value:number){
        this._age=value;
    }

    public get cart():Item[]{
        return this._cart;
    }

    public set cart(value:Item[]){
        this._cart=value;
    }
}
function driver(){

}