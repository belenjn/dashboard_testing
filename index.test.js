const { Room, Booking } = require("./index");

const roomTemplateExample = {
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
  room: { ...roomTemplateExample },
};

describe("Room: isOccuped()", () => {
  test("If the room is not occupied and the bookings are empty", () => {
    const room = new Room({ ...roomTemplateExample });
    expect(room.isOccupied("5 Oct 2021 14:00 UTC")).toBeFalsy();
  });

  test("If the room is not ocuppied, return false", () => {
    const booking = new Booking({ ...bookingTemplateExample });
    const room = new Room({ ...roomTemplateExample, bookings: booking });
    room.bookings = [booking];
    expect(room.isOccupied("1 Jan 2019 14:00 UTC")).toBeFalsy();
  });

  test("If the room is occupied, return the name of the guest", () => {
    const booking = new Booking({ ...bookingTemplateExample });
    const room = new Room({ ...roomTemplateExample, bookings: booking });
    room.bookings = [booking];
    expect(room.isOccupied("25 May 2022 14:00 UTC")).toBe("Belén Jaraba");
  });
});

describe("Room: occupancyPercentage()", () => {
  test("If the room is occupied, return the percentage (in that case 25%)", () => {
    const bookings = [
      {
        ...bookingTemplateExample,
        check_in: "1 Jan 2019 14:00 UTC",
        check_out: "6 Jan 2019 14:00 UTC",
      },
      {
        ...bookingTemplateExample,
        check_in: "4 Apr 2019 14:00 UTC",
        check_out: "10 Apr 2019 14:00 UTC",
      },
      {
        ...bookingTemplateExample,
        check_in: "6 Jun 2019 14:00 UTC",
        check_out: "10 Jun 2019 14:00 UTC",
      },
    ];
    const room = new Room({ ...roomTemplateExample, bookings: bookings });
    expect(
      room.occupancyPercentage({
        startDate: "1 Jan 2019 14:00 UTC",
        endDate: "10 Jun 2019 14:00 UTC",
      })
    ).toBe(25);
  });

  test("If the room is occupied, return the percentage (in that case 75%)", () => {
    const bookings = [
      {
        ...bookingTemplateExample,
        check_in: "1 Jan 2019 14:00 UTC",
        check_out: "6 Jan 2019 14:00 UTC",
      },
      {
        ...bookingTemplateExample,
        check_in: "4 Apr 2019 14:00 UTC",
        check_out: "10 Apr 2019 14:00 UTC",
      },
      {
        ...bookingTemplateExample,
        check_in: "6 Jun 2019 14:00 UTC",
        check_out: "10 Jun 2019 14:00 UTC",
      },
      {
        ...bookingTemplateExample,
        check_in: "13 Jul 2019 14:00 UTC",
        check_out: "23 Jul 2019 14:00 UTC",
      },
      {
        ...bookingTemplateExample,
        check_in: "1 Aug 2019 14:00 UTC",
        check_out: "10 Aug 2019 14:00 UTC",
      }
    ];
    const room = new Room({ ...roomTemplateExample, bookings: bookings });
    expect(
      room.occupancyPercentage({
        startDate: "4 Sep 2019 14:00 UTC",
        endDate: "24 Sep 2019 14:00 UTC",
      })
    ).toBe(75);
  });

  
});
