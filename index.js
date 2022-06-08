class Room {
  constructor({ name, bookings, rate, discount }) {
    this.name = name; // string
    this.bookings = bookings; // array of booking objects
    this.rate = rate; // int price in cents
    this.discount = discount; // int percentage
  }

  isOccupied(date) {
    this.bookings.forEach((booking) => {
      // if the date matches a date's reservation
      date >= booking.check_in && date <= booking.check_out
        ? booking.name // return the guest's name
        : false; // otherwise, return false
    });
  }

  occupancyPercentage(startDate, endDate) {
    let reservedBookings = []; // array for the reserved bookings
    let totalNumberOfBookings = this.bookings.length; // total number of the bookings

    this.bookings.forEach((booking) => {
      startDate >= booking.check_in && endDate <= booking.check_out; // if the range of dates provided matches with the dates
      reservedBookings.push(booking); // add the reservations at bookingsReserved

      return Math.round(
        (reservedBookings.length / totalNumberOfBookings) * 100
      ); // and return the rounded percentage
    });
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
  // returns the total occupancy percentage across all rooms in the array

  const totalRooms = rooms.length; // total number of rooms

  const totalPercentagePerRoom = occupancyPercentage(startDate, endDate); // % per room
  const totalPercentagePerRoomInDecimal = Math.round(
    totalPercentagePerRoom / 100
  ); // convert the % in decimal (per room)

  return (totalRooms * totalPercentagePerRoomInDecimal) / 100; // multiplies total rooms per the percentage in decimal and is divided to have the % total
};

const availableRooms = (rooms, startDate, endDate) => {
  // returns all rooms in the array that are not occupied for the entire duration
  // total  % de habitaciones NO ocupadas
};
