const { Room, Booking } = require("./index");

const templateRoomExample = {
  name: "suite",
  bookings: [],
  rate: 230,
  discount: 5,
};

const bookingTemplateExample = {
  name: "Belén Jaraba",
  email: "test@jest.com",
  check_in: new Date("20 May 2022 14:00 UTC"),
  check_out: new Date("25 May 2022 14:00 UTC"),
  discount: 15,
  room: "suite",
};

/* isOccuped() */

describe("Room and Booking", () => {
  test("debe devolver el nombre de la habitación", () => {
    const firstRoomExample = new Room({ ...templateRoomExample });
    expect(firstRoomExample.name).toBe("suite");
  });

  test("debe devolver false si la habitación no está ocupada en esa fecha. Sino el nombre del huesped", () => {
    const booking = new Booking({ ...bookingTemplateExample });
    const room = new Room({ ...templateRoomExample, bookings: booking });
    room.bookings = [booking];
    expect(room.isOccupied(new Date("20 May 2022 14:00 UTC"), new Date("25 May 2022 14:00 UTC"))).toBe("Belén Jaraba");
  });


});

