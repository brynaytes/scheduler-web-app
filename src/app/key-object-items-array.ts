import {KeyObject} from './key-object';

export class KeyObjectItemsArray {
    items : Array<KeyObject>;
    public constructor(){
        this.items = [];
    }
    public getItems() :  Array<KeyObject>{
        return this.items;
    }
}
