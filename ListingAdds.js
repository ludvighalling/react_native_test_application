import { observable, action, makeObservable } from "mobx"
import 'react-native-get-random-values'
import { v4 as uuidv4 } from "uuid"
import { IMG_DEFAULT, IMG_GUITAR, IMG_JACKSON_RR3 } from './resourse/images';

class ListingAdds {
    listOfAdds = [];

    constructor() {
        makeObservable(this, {
            listOfAdds: observable,
            addToList: action
        })
    }

    addToList(addName, addPrice, addImg) {
        this.listOfAdds.push({"name": addName, "price": addPrice, "imgPath": addImg, "key": uuidv4()});
    }
}

export const addList = new ListingAdds();

//adding default test adds
addList.addToList("jackson JS20", "3000", IMG_GUITAR);
addList.addToList("Jackson RR3", "7000", IMG_JACKSON_RR3);