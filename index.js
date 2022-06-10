class Room {
  constructor({ name, bookings, rate, discount }) {
    this.name = name; // string
    this.bookings = bookings; // array of booking objects
    this.rate = rate; // int price in cents
    this.discount = discount; // int percentage
  }

  isOccupied(date) {
    const bookings = this.bookings;
    if (this.bookings.length) {
      // if the date matches a date's reservation
      for (let i = 0; i < bookings.length; i++) {
        if (date >= bookings[i].checkIn && date <= bookings[i].checkOut)
          return bookings[i].name; // return the guest's name
      }
      return false; // otherwise, return false
    }
    return false;
  }

  occupancyPercentage(startDate, endDate) {
    /*
fechas de filtrado
10/06/2020 
01/10/2020 
--------------
bookings
Check in :12/06/2020 
Check out: 14/06/2020
---------
startDate >= bookings[i].checkIn 
10/06/2020 >= 12/06/2020 && 01/10/2020 <= 14/06/2020

endDate <= bookings[i].checkOut



-------
otra habitacion
bookings
Check in :06/06/2020 
Check out: 14/06/2020

////////////////////////////////
fechas de filtrado
10/06/2020 
20/06/2020 
occupancypercentage ( 10 días)
? ¿Cuántos días de el rango esta ocupada?
10/06/2020 is ocuupied => nombre || false
11/06/2020 is ocuupied => nombre || false
12/06/2020 is ocuupied => nombre || false
13/06/2020 is ocuupied => nombre || false
14/06/2020 is ocuupied => nombre || false
15/06/2020 is ocuupied => nombre || false
11/06/2020 is ocuupied => nombre || false
let countDaysOcuppied= 0;
if(room.isOccupied){
  countDaysOcuupied++;
}
return ( countDaysOccupied/10días )*100
*/
    const bookings = this.bookings;

    let reservedBookings = []; // array for the reserved bookings

    for (let i = 0; i < bookings.length; i++) {
      if (startDate >= bookings[i].checkIn && endDate <= bookings[i].checkOut) {
        reservedBookings.push(bookings[i]);
      }
    }

    return Math.round((reservedBookings.length / bookings.length) * 100); // and return the rounded percentage
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
    // let fee = Room.rate; // Room's rate

    // let finalFee; // fist declaration for the final fee's

    // const roomDiscountToDecimal = Room.discount / 100; // turn the % of Room's discount into decimal
    // const guestDiscountToDecimal = this.discount / 100; // turn the % of Booking's discourn into decimal

    // const totalDiscount = roomDiscountToDecimal + guestDiscountToDecimal;

    // finalFee = (fee - totalDiscount) * 100; // the final fee's value is that subtraction

    // return finalFee; // return the final fee

    const rate = this.room.rate;
    const discountRoom = rate * (this.room.discount / 100);
    const discountBooking = rate * (this.discount / 100);
    const totalDiscount = discountRoom + discountBooking;
    const price = totalDiscount > rate ? 0 : (rate - totalDiscount) / 100;
    return price;
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
