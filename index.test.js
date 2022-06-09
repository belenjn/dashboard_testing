const { Room, Booking } = require("./index");

const templateRoomExample = {
  name: "suite",
  bookings: [],
  rate: 230,
  discount: 0,
};

const bookingTemplateExample = {
  name: "Belén Jaraba",
  email: "test@jest.com",
  check_in: "20 May 2022 14:00 UTC",
  check_out: "25 May 2022 14:00 UTC",
  discount: 0,
  room: { ...templateRoomExample },
};

describe("Room: isOccuped()", () => {
  test("If the room is not occupied and the bookings are empty", () => {
    const room = new Room({ ...templateRoomExample });
    expect(room.isOccupied("5 Oct 2021 14:00 UTC")).toBeFalsy();
  });

  test("If the room is not ocuppied, return false", () => {
    const booking = new Booking({ ...bookingTemplateExample });
    const room = new Room({ ...templateRoomExample, bookings: booking });
    room.bookings = [booking];
    expect(room.isOccupied("1 Jan 2019 14:00 UTC")).toBeFalsy();
  });

  test("If the room is occupied, return the name of the guest", () => {
    const booking = new Booking({ ...bookingTemplateExample });
    const room = new Room({ ...templateRoomExample, bookings: booking });
    room.bookings = [booking];
    expect(room.isOccupied("25 May 2022 14:00 UTC")).toBe("Belén Jaraba");
  });
});




