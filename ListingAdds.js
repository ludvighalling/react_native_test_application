import { observable, action, makeObservable } from "mobx"
import 'react-native-get-random-values'
import { v4 as uuidv4 } from "uuid"

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