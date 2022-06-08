class Room {
    constructor({name, bookings, rate, discount}){
        this.name = name; // string
        this.bookings = bookings; // array of booking objects
        this.rate = rate; // int price in cents
        this.discount = discount; // int percentage
    }
    
    
}


class Booking {
    constructor({name, email, check_in, check_out, discount, room}){
        this.name = name; // string
        this.email = email; // string
        this.check_in = check_in; // date
        this.check_out = check_out; // date 
        this.discount = discount; // int percentage
        this.room = room // a room object
    }
    
    
}