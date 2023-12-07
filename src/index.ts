import { v4 as uuidv4 } from "uuid";
// let uuid= uuidv4();

function pageLoader(){
    console.log('page load');
    // const loginButton=document.getElementById('login-button')!;
    // loginButton.addEventListener( 'click', ()=>{
    //     let userName=document.getElementById('username') as HTMLInputElement|null;
    //     let userAge=document.getElementById('age') as HTMLInputElement|null;
    //     if (userName!=null&&userAge!=null){
    //         let currentUser:User=new User(userName, userAge)
    //     }
    //     });
    const newShop:Shop=new Shop;
    newShop.showItems()
    newShop.updateCart()
    
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

        public itemElement():HTMLDivElement{
            let itemEl=document.createElement('div');
            itemEl.innerHTML=`<p>Name: ${this.name}</p><br><p>Price: $${this.price}</p><br><button id=' `
            return itemEl
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
        return;
    }

    constructor(
        private _name:string,
        private _age:number,
        private _cart:Item[]=[],
        private _id: string = uuidv4()
    ){}

    
    public cartHTMLElement(){
        for (let i of this.cart){
        let cartElem=document.createElement('div');
        cartElem.innerHTML=`<p>Name: ${i.name}</p><br><p>Price: $${i.price}</p><br><button id='remove-one-${i.id}'>Remove One</button><br><button id='remove-all-${i.id}'>Remove All</button>`;
        const rmAllBtn=document.getElementById(`remove-all-${i.id}`)!;
        rmAllBtn.addEventListener('click', () => this.removeFromCart(i));
        const rmOneBtn=document.getElementById(`remove-one-${i.id}`)!;
        rmOneBtn.addEventListener('click', () => this.removeQuantityFromCart(i, 1))
        return cartElem
    }
    return
    }


    public addToCart(item:Item):void{
        this.cart.push(item)
    }


    public removeFromCart(remItem:Item):void{
        this.cart=this.cart.filter( item => item.id !==remItem.id)
    }
    
    public removeQuantityFromCart(itemToRemove:Item, quantity:number){
        for (let i=0; i<quantity; i++){
            let index = this.cart.findIndex(item => item.id === itemToRemove.id);
            this.cart.splice(index, 1);
        }
    }

    public getCartTotal():number{
        let total=0;
        for (let item of this.cart){
            total+=item.price
        }
        return total
    }

    public printCart():void{
        console.log('Your Cart:')
        for (let item of this.cart){
            console.log(`${item.name}: $${item.price}`)
        }
        console.log(`Total: $${this.getCartTotal()}`)
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


class Shop{
    constructor(
        private _items: Item[] = []
        ){
            let itemA: Item=new Item('Charger', 5, 'Keep your devices charged');
            this.items.push(itemA);

            let itemB:Item=new Item('Videogame', 70, 'The latest hot video game!');
            this.items.push(itemB);

            let itemC:Item=new Item('Keyboard', 30, 'A basic keyboard');
            this.items.push(itemC);

            let itemD:Item=new Item('MacBook', 799, 'For all your looking-down-on-the-poors needs');
            this.items.push(itemD);

            let itemE:Item=new Item('Drone', 1000, 'Spying is not just for the Government anymore');
            this.items.push(itemE);

            let itemF:Item=new Item('Giant TV', 640, 'So bright your kids will go blind.');
            this.items.push(itemF)
        }


        public get items(): Item[] {
            return this._items;
        }

        public set items(value: Item[]) {
            this._items = value;
        }

        public showItems(){
            let cartArea=document.getElementById('cart-area')
            for (let i of this.items){
                let iEl=i.itemElement();
                cartArea?.append(iEl);
            }
        }

        public updateCart(){
            if (Shop.myUser){
                Shop.myUser.cartHTMLElement()
            }
        }

        static myUser:User|undefined;

        static loginUser(){
            const loginButton=document.getElementById('login-button')!;
            loginButton.addEventListener( 'click', ()=>{
                let userName=document.getElementById('username') as HTMLInputElement|null;
                let userAge=document.getElementById('age') as HTMLInputElement|null;
                if (userName!=null&&userAge!=null){
                    this.myUser=new User(userName.value, userAge.valueAsNumber)
                }
                });
        }


    }

pageLoader()