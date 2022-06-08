class Room {
  constructor({ name, bookings, rate, discount }) {
    this.name = name; // string
    this.bookings = bookings; // array of booking objects
    this.rate = rate; // int price in cents
    this.discount = discount; // int percentage
  }

  isOccupied(date) {
    if (this.bookings.length) {
      // if it's occupied return the guest
      for (let i = 0; i < this.bookings.length; i++) {
        if (
          date >= this.bookings[i].check_in &&
          date <= this.bookings[i].check_out
        ) {
          return this.bookings[i].name; // the guest's name
        }
      }
    } else {
      // if it's not occupied return false
      return false;
    }
  }
}

class Booking {
  constructor({ name, email, check_in, check_out, discount, room }) {
    this.name = name; // string
    this.email = email; // string
    this.check_in = check_in; // date
    this.check_out = check_out; // date
    this.discount = discount; // int percentage
    this.room = room; // a room object
  }
}
