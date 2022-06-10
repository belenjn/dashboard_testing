class Room {
  constructor({ name, bookings, rate, discount }) {
    this.name = name; // string
    this.bookings = bookings; // array of booking objects
    this.rate = rate; // int price in cents
    this.discount = discount; // int percentage
  }

  isOccupied(date) {
    const bookings = this.bookings;
    if(this.bookings.length){
       // if the date matches a date's reservation
        for(let i = 0; i < bookings.length; i++){
            if(date >= bookings[i].checkIn && date <= bookings[i].checkOut) return bookings[i].name; // return the guest's name
        }
        return false; // otherwise, return false
    }
    return false;
  }

  occupancyPercentage(startDate, endDate) {
    let reservedBookings = []; // array for the reserved bookings
    let totalNumberOfBookings = this.bookings.length; // total number of the bookings

    this.bookings.forEach((booking) => {
      startDate >= booking.checkIn && endDate <= booking.checkOut; // if the range of dates provided matches with the dates
      reservedBookings.push(booking); // add the reservations at bookingsReserved

    });

    return Math.round(
      (reservedBookings.length / totalNumberOfBookings) * 100
    ); // and return the rounded percentage
  }
}

class Booking {
  constructor({ name, email, checkIn, checkOut, discount, room }) {
    this.name = name; // string
    this.email = email; // string
    this.checkIn = checkIn; // date
    this.checkOut = checkOut; // date
    this.discount = discount; // int percentage
    this.room = room; // a room object
  }

  getFee() {
    let fee = Room.rate; // Room's rate

    let finalFee; // fist declaration for the final fee's

    const roomDiscountToDecimal = Math.round(Room.discount / 100); // turn the % of Room's discount into decimal
    const guestDiscountToDecimal = Math.round(this.discount / 100); // turn the % of Booking's discourn into decimal

    finalFee = fee - roomDiscountToDecimal - guestDiscountToDecimal; // the final fee's value is that subtraction

    return finalFee; // return the final fee
  }
}

const totalOccupancyPercentage = (rooms, startDate, endDate) => {
  const totalRooms = rooms.length; // total number of rooms

  const totalPercentagePerRoom = occupancyPercentage(startDate, endDate); // % per room
  const totalPercentagePerRoomInDecimal = Math.round(
    totalPercentagePerRoom / 100
  ); // convert the % in decimal (per room)

  const totalPercentageOfRooms =
    Math.round(totalRooms * totalPercentagePerRoomInDecimal) / 100; // multiplies total rooms per the percentage in decimal and is divided to have the % total
  return totalPercentageOfRooms;
};

const availableRooms = (rooms, startDate, endDate) => {
  const totalPercentage = 100; // the highest value of the % is 100

  const occupancyRooms = totalOccupancyPercentage(rooms, startDate, endDate); // total % of occupied rooms
  const occupancyRoomsInDecimal = Math.round(occupancyRooms / 100); // total % of occupied rooms to decimal

  const totalPercentageOfAvailableRooms =
    Math.round(totalPercentage - occupancyRoomsInDecimal) * 100; // calculate the % of the available rooms

  return totalPercentageOfAvailableRooms;
};

module.exports = { Room, Booking, totalOccupancyPercentage, availableRooms };
