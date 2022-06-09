const { Room, Booking } = require("./index");

const roomTemplateExample = {
  name: "suite",
  bookings: [],
  rate: 500,
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
      },
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

describe("Booking: getFee()", () => {
  test("If there is not any discount: ", () => {
    const booking = new Booking({ ...bookingTemplateExample });
    expect(booking.getFee().toBe(500));
  });

  test("If there is discount (rooms: 15%) return the percentage: ", () => {
    const booking = new Booking({
      ...bookingTemplateExample,
      room: { ...roomTemplateExample, discount: 15 },
    });
    expect(booking.getFee().toBe(425)); /* 500 * 0.15 = 75 | 500 - 75 = 425 */
  });

  test("If there is discount (rooms: 50%) return the percentage: ", () => {
    const booking = new Booking({
      ...bookingTemplateExample,
      room: { ...roomTemplateExample, discount: 50 },
    });
    expect(booking.getFee().toBe(250)); /* 500 * 0.50 = 250 | 500 - 250 = 250 */
  });

  test("If there is discount (booking: 25%) return the percentage: ", () => {
    const booking = new Booking({
      ...bookingTemplateExample,
      discount: 15,
    });
    expect(booking.getFee().toBe(375)); /* 500 * 0.25 = 125 | 500 - 125 = 375 */
  });

  test("If there is discount (booking: 70%) return the percentage: ", () => {
    const booking = new Booking({
      ...bookingTemplateExample,
      discount: 50,
    });
    expect(booking.getFee().toBe(250)); /* 500 * 0.70 = 350 | 500 - 350 = 150 */
  });
});

describe("Room and Booking: totalOccupancyPercentage()", () => {
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
  ];

  test(" If there are reservations, it returns the percentage of the rooms occupied", () => {
    /* 
        Bookings for Suite: 4
        Bookings for Double Suite: 4 
        Total reservations: 8
        Limit of Bookings: 100

        ( 8 / 100) * 100 = 8

        Total percentage expected: 8%
       */
    const rooms = [
      new Room({ ...roomTemplateExample, bookings: bookings }),
      new Room({
        ...roomTemplateExample,
        name: "double suite",
        bookings: bookings,
      }),
    ];

    expect(
      totalOccupancyPercentage({
        rooms: [...rooms],
        startDate: "1 Jan 2019 14:00 UTC",
        endDate: "23 Jul 2019 14:00 UTC",
      })
    ).toBe(8);
  });

  test(" If it is fully booked, it returns 100%", () => {
    /* 
        Bookings for Suite: 8
        Bookings for Double Suite: 8 
        Total: 16
        Limit of bookings: 16

        Total percentage expected: 100%
       */

    const bookings2 = [
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
        check_out: "6 Aug 2019 14:00 UTC",
      },
      {
        ...bookingTemplateExample,
        check_in: "7 Sep 2019 14:00 UTC",
        check_out: "10 Sep 2019 14:00 UTC",
      },
      {
        ...bookingTemplateExample,
        check_in: "6 Oct 2019 14:00 UTC",
        check_out: "10 Oct 2019 14:00 UTC",
      },
      {
        ...bookingTemplateExample,
        check_in: "13 Nov 2019 14:00 UTC",
        check_out: "23 Nov 2019 14:00 UTC",
      },
    ];

    const rooms = [
      new Room({ ...roomTemplateExample, bookings: bookings }),
      new Room({
        ...roomTemplateExample,
        name: "double suite",
        bookings: bookings2,
      }),
    ];

    expect(
      totalOccupancyPercentage({
        rooms: [...rooms],
        startDate: "1 Jan 2019 14:00 UTC",
        endDate: "23 Nov 2019 14:00 UTC",
      })
    ).toBe(100);
  });
});

describe("Room and Booking: availableRooms()", () => {
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
  ];

  test("Return the availables rooms ", () => {
    /* 
        Bookings for Suite: 4
        Bookings for Double Suite: 4
        Total reservations: 8
        Limit of Bookings: 100

        Total percentage expected: 8% => 0.08 percentage in decimal
    */
    const rooms = [
      new Room({ ...roomTemplateExample, bookings: bookings }),
      new Room({
        ...roomTemplateExample,
        name: "double suite",
        bookings: bookings,
      }),
    ];

    //(100 - 0.08) / 100 = 0.992 => rounded: 1% => 0.1 percentage of occupied rooms
    const totalAvailablesRooms = 99; //(100 - 0.1) * 100 => 99% available rooms

    expect(
      availableRooms({
        rooms: [...rooms],
        startDate: "1 Jan 2019 14:00 UTC",
        endDate: "23 Jul 2019 14:00 UTC",
      })
    ).toBe(totalAvailablesRooms);
  });

  test("If there aren't availables rooms, return false ", () => {
    /* 
        Bookings for Suite: 4 
        Bookings for Double Suite: 4
        Total reservations: 8

        Limit of Bookings: 100

    */
    const rooms = [
      new Room({ ...roomTemplateExample, bookings: bookings }),
      new Room({
        ...roomTemplateExample,
        name: "double suite",
        bookings: bookings,
      }),
    ];

    expect(
      availableRooms({
        rooms: [...rooms],
        startDate: "1 Jan 2019 14:00 UTC",
        endDate: "23 Jul 2019 14:00 UTC",
      })
    ).toBeFalsy();
  });
});
