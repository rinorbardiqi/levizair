import { faker } from "@faker-js/faker";
import { type Events, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const airlines = [
    {
      id: 1,
      value: "american_airlines",
      name: "American Airlines",
    },
    {
      id: 2,
      value: "delta_airlines",
      name: "Delta Airlines",
    },
    {
      id: 3,
      value: "united_airlines",
      name: "United Airlines",
    },
    {
      id: 4,
      value: "emirates",
      name: "Emirates",
    },
    {
      id: 5,
      value: "lufthansa",
      name: "Lufthansa",
    },
  ];
  const location = [
    {
      id: 1,
      name: "Los Angeles International Airport",
      iataCode: "LAX",
      latitude: 33.9425,
      longitude: -118.4081,
      country: "United States",
      City: "Los Angeles",
    },
    {
      id: 2,
      name: "John F. Kennedy International Airport",
      iataCode: "JFK",
      latitude: 40.6413,
      longitude: -73.7781,
      country: "United States",
      City: "New York",
    },
    {
      id: 3,
      name: "Heathrow Airport",
      iataCode: "LHR",
      latitude: 51.47,
      longitude: -0.4563,
      country: "United Kingdom",
      City: "London",
    },
    {
      id: 4,
      name: "Tokyo Haneda Airport",
      iataCode: "HND",
      latitude: 35.5494,
      longitude: 139.7798,
      country: "Japan",
      City: "Tokyo",
    },
    {
      id: 5,
      name: "Sydney Airport",
      iataCode: "SYD",
      latitude: -33.9399,
      longitude: 151.1753,
      country: "Australia",
      City: "Sydney",
    },
    {
      id: 6,
      name: "Paris Charles de Gaulle Airport",
      iataCode: "CDG",
      latitude: 49.0097,
      longitude: 2.5479,
      country: "France",
      City: "Paris",
    },
    {
      id: 7,
      name: "Dubai International Airport",
      iataCode: "DXB",
      latitude: 25.2532,
      longitude: 55.3657,
      country: "United Arab Emirates",
      City: "Dubai",
    },
    {
      id: 8,
      name: "Hong Kong International Airport",
      iataCode: "HKG",
      latitude: 22.308,
      longitude: 113.9185,
      country: "Hong Kong",
      City: "Hong Kong",
    },
    {
      id: 9,
      name: "Auckland Airport",
      iataCode: "AKL",
      latitude: -37.0096,
      longitude: 174.7833,
      country: "New Zealand",
      City: "Auckland",
    },
    {
      id: 10,
      name: "Toronto Pearson International Airport",
      iataCode: "YYZ",
      latitude: 43.6777,
      longitude: -79.6248,
      country: "Canada",
      City: "Toronto",
    },
    {
      id: 11,
      name: "Cancun International Airport",
      iataCode: "CUN",
      latitude: 21.0367,
      longitude: -86.876,
      country: "Mexico",
      City: "Cancun",
    },
    {
      id: 12,
      name: "Frankfurt Airport",
      iataCode: "FRA",
      latitude: 50.0333,
      longitude: 8.5706,
      country: "Germany",
      City: "Frankfurt",
    },
    {
      id: 13,
      name: "Singapore Changi Airport",
      iataCode: "SIN",
      latitude: 1.3644,
      longitude: 103.9915,
      country: "Singapore",
      City: "Singapore",
    },
    {
      id: 14,
      name: "Los Angeles International Airport",
      iataCode: "LAX",
      latitude: 33.9425,
      longitude: -118.4081,
      country: "United States",
      City: "Los Angeles",
    },
    {
      id: 15,
      name: "Barcelona-El Prat Airport",
      iataCode: "BCN",
      latitude: 41.2977,
      longitude: 2.0833,
      country: "Spain",
      City: "Barcelona",
    },
    {
      id: 16,
      name: "Mumbai Chhatrapati Shivaji International Airport",
      iataCode: "BOM",
      latitude: 19.0896,
      longitude: 72.8656,
      country: "India",
      City: "Mumbai",
    },
    {
      id: 17,
      name: "São Paulo-Guarulhos International Airport",
      iataCode: "GRU",
      latitude: -23.4317,
      longitude: -46.4697,
      country: "Brazil",
      City: "São Paulo",
    },
    {
      id: 18,
      name: "Dublin Airport",
      iataCode: "DUB",
      latitude: 53.4213,
      longitude: -6.2701,
      country: "Ireland",
      City: "Dublin",
    },
    {
      id: 19,
      name: "Beijing Capital International Airport",
      iataCode: "PEK",
      latitude: 40.0799,
      longitude: 116.6031,
      country: "China",
      City: "Beijing",
    },
    {
      id: 20,
      name: "Copenhagen Airport",
      iataCode: "CPH",
      latitude: 55.618,
      longitude: 12.6508,
      country: "Denmark",
      City: "Copenhagen",
    },
  ];
  const flights = [
    {
      destinationId: 1,
      flightDate: "2023-11-01T12:00:00Z",
      airlineId: 1,
      startDestinationId: 11,
    },
    {
      destinationId: 2,
      flightDate: "2023-11-02T14:30:00Z",
      airlineId: 2,
      startDestinationId: 12,
    },
    {
      destinationId: 3,
      flightDate: "2023-11-03T10:15:00Z",
      airlineId: 3,
      startDestinationId: 13,
    },
    {
      destinationId: 4,
      flightDate: "2023-11-04T16:45:00Z",
      airlineId: 4,
      startDestinationId: 14,
    },
    {
      destinationId: 5,
      flightDate: "2023-11-05T08:30:00Z",
      airlineId: 5,
      startDestinationId: 15,
    },
    {
      destinationId: 6,
      flightDate: "2023-11-06T09:45:00Z",
      airlineId: 1,
      startDestinationId: 16,
    },
    {
      destinationId: 7,
      flightDate: "2023-11-07T11:00:00Z",
      airlineId: 2,
      startDestinationId: 17,
    },
    {
      destinationId: 8,
      flightDate: "2023-11-08T15:20:00Z",
      airlineId: 3,
      startDestinationId: 18,
    },
    {
      destinationId: 9,
      flightDate: "2023-11-09T13:10:00Z",
      airlineId: 4,
      startDestinationId: 19,
    },
    {
      destinationId: 10,
      flightDate: "2023-11-10T07:30:00Z",
      airlineId: 5,
      startDestinationId: 20,
    },
    {
      destinationId: 11,
      flightDate: "2023-11-11T08:45:00Z",
      airlineId: 1,
      startDestinationId: 18,
    },
    {
      destinationId: 12,
      flightDate: "2023-11-12T12:55:00Z",
      airlineId: 2,
      startDestinationId: 10,
    },
    {
      destinationId: 13,
      flightDate: "2023-11-13T16:10:00Z",
      airlineId: 3,
      startDestinationId: 9,
    },
    {
      destinationId: 14,
      flightDate: "2023-11-14T14:25:00Z",
      airlineId: 4,
      startDestinationId: 4,
    },
    {
      destinationId: 15,
      flightDate: "2023-11-15T10:35:00Z",
      airlineId: 3,
      startDestinationId: 2,
    },
    {
      destinationId: 16,
      flightDate: "2023-11-16T11:40:00Z",
      airlineId: 1,
      startDestinationId: 1,
    },
    {
      destinationId: 17,
      flightDate: "2023-11-17T15:50:00Z",
      airlineId: 2,
      startDestinationId: 10,
    },
    {
      destinationId: 18,
      flightDate: "2023-11-18T17:15:00Z",
      airlineId: 3,
      startDestinationId: 20,
    },
    {
      destinationId: 19,
      flightDate: "2023-11-19T12:20:00Z",
      airlineId: 4,
      startDestinationId: 12,
    },
    {
      destinationId: 20,
      flightDate: "2023-11-20T09:30:00Z",
      airlineId: 3,
      startDestinationId: 13,
    },
  ];
  const bookings = [
    {
      id: 1,
      userUserId: "2d3d",
    },
    {
      id: 2,
      userUserId: "2d3d",
    },
    {
      id: 3,
      userUserId: "2d3d",
    },
    {
      id: 4,
      userUserId: "2d3d",
    },
    {
      id: 5,
      userUserId: "2d3d",
    },
    {
      id: 6,
      userUserId: "2d3d",
    },
    {
      id: 7,
      userUserId: "2d3d",
    },
    {
      id: 8,
      userUserId: "2d3d",
    },
    {
      id: 9,
      userUserId: "2d3d",
    },
    {
      id: 10,
      userUserId: "2d3d",
    },
  ];
  const tickets = [
    {
      id: 1,
      ticketStatus: "ACTIVE",
      issuedDate: "2023-09-01T15:00:00Z",
      bookingId: 1,
      arlineId: 1,
    },
    {
      id: 2,
      ticketStatus: "ACTIVE",
      issuedDate: "2023-07-02T14:30:00Z",
      bookingId: 2,
      arlineId: 2,
    },
    {
      id: 3,
      ticketStatus: "ACTIVE",
      issuedDate: "2023-05-03T10:15:00Z",
      bookingId: 3,
      arlineId: 3,
    },
    {
      id: 4,
      ticketStatus: "ACTIVE",
      issuedDate: "2023-11-04T16:45:00Z",
      bookingId: 4,
      arlineId: 4,
    },
    {
      id: 5,
      ticketStatus: "ACTIVE",
      issuedDate: "2023-11-05T08:30:00Z",
      bookingId: 5,
      arlineId: 5,
    },
    {
      id: 6,
      ticketStatus: "ACTIVE",
      issuedDate: "2023-11-06T09:45:00Z",
      bookingId: 6,
      arlineId: 1,
    },
    {
      id: 7,
      ticketStatus: "ACTIVE",
      issuedDate: "2023-11-07T11:00:00Z",
      bookingId: 7,
      arlineId: 2,
    },
    {
      id: 8,
      ticketStatus: "ACTIVE",
      issuedDate: "2023-11-08T15:20:00Z",
      bookingId: 8,
      arlineId: 3,
    },
    {
      id: 9,
      ticketStatus: "ACTIVE",
      issuedDate: "2023-11-09T13:10:00Z",
      bookingId: 9,
      arlineId: 4,
    },
    {
      id: 10,
      ticketStatus: "ACTIVE",
      issuedDate: "2023-11-10T07:30:00Z",
      bookingId: 10,
      arlineId: 5,
    },
  ];
  const bookingSegments = [
    {
      id: 1,
      destinationId: 1,
      flightId: 1,
      flightDate: "2023-11-01T12:00:00Z",
      departureDate: "2023-11-01T10:00:00Z",
      arrivalDate: "2023-11-01T14:00:00Z",
      bookingClass: "ECONOMY",
      price: 300.0,
      taxPercentage: 10.0,
      ticketId: 1,
    },
    {
      id: 2,
      destinationId: 2,
      flightId: 2,
      flightDate: "2023-11-02T14:30:00Z",
      departureDate: "2023-11-02T12:30:00Z",
      arrivalDate: "2023-11-02T16:30:00Z",
      bookingClass: "BUSINESS",
      price: 600.0,
      taxPercentage: 12.5,
      ticketId: 2,
    },
    {
      id: 3,
      destinationId: 3,
      flightId: 3,
      flightDate: "2023-11-03T10:15:00Z",
      departureDate: "2023-11-03T08:15:00Z",
      arrivalDate: "2023-11-03T12:15:00Z",
      bookingClass: "ECONOMY",
      price: 250.0,
      taxPercentage: 9.0,
      ticketId: 3,
    },
    {
      id: 4,
      destinationId: 4,
      flightId: 4,
      flightDate: "2023-11-04T16:45:00Z",
      departureDate: "2023-11-04T14:45:00Z",
      arrivalDate: "2023-11-04T18:45:00Z",
      bookingClass: "ECONOMY",
      price: 280.0,
      taxPercentage: 8.0,
      ticketId: 4,
    },
    {
      id: 5,
      destinationId: 5,
      flightId: 5,
      flightDate: "2023-11-05T08:30:00Z",
      departureDate: "2023-11-05T06:30:00Z",
      arrivalDate: "2023-11-05T10:30:00Z",
      bookingClass: "ECONOMY",
      price: 200.0,
      taxPercentage: 7.5,
      ticketId: 5,
    },
    {
      id: 6,
      destinationId: 6,
      flightId: 6,
      flightDate: "2023-11-06T09:45:00Z",
      departureDate: "2023-11-06T07:45:00Z",
      arrivalDate: "2023-11-06T11:45:00Z",
      bookingClass: "BUSINESS",
      price: 550.0,
      taxPercentage: 10.0,
      ticketId: 6,
    },
    {
      id: 7,
      destinationId: 7,
      flightId: 7,
      flightDate: "2023-11-07T11:00:00Z",
      departureDate: "2023-11-07T09:00:00Z",
      arrivalDate: "2023-11-07T13:00:00Z",
      bookingClass: "ECONOMY",
      price: 320.0,
      taxPercentage: 11.0,
      ticketId: 7,
    },
    {
      id: 8,
      destinationId: 8,
      flightId: 8,
      flightDate: "2023-11-08T15:20:00Z",
      departureDate: "2023-11-08T13:20:00Z",
      arrivalDate: "2023-11-08T17:20:00Z",
      bookingClass: "ECONOMY",
      price: 290.0,
      taxPercentage: 8.5,
      ticketId: 8,
    },
    {
      id: 9,
      destinationId: 9,
      flightId: 9,
      flightDate: "2023-11-09T13:10:00Z",
      departureDate: "2023-11-09T11:10:00Z",
      arrivalDate: "2023-11-09T15:10:00Z",
      bookingClass: "ECONOMY",
      price: 270.0,
      taxPercentage: 8.0,
      ticketId: 9,
    },
    {
      id: 10,
      destinationId: 10,
      flightId: 10,
      flightDate: "2023-11-10T07:30:00Z",
      departureDate: "2023-11-10T05:30:00Z",
      arrivalDate: "2023-11-10T09:30:00Z",
      bookingClass: "ECONOMY",
      price: 230.0,
      taxPercentage: 7.0,
      ticketId: 10,
    },
  ];

  const loyaltyPoints = [
    {
      userId: "2d3d",
      airlineId: 1,
      value: 90,
      level: 0,
    },
    {
      userId: "2d3d",
      airlineId: 3,
      value: 30,
      level: 1,
    },
    {
      userId: "2d3d",
      airlineId: 5,
      value: 20,
      level: 2,
    },
  ];

  const events: Events[] = [
    {
      id: 1,
      date: faker.date.future(),
      description:
        "Join us for a fun-filled festival featuring a wide variety of delicious food and drinks. Don't miss BeerFest 2023!",
      name: "BeerFest",
      locationId: 16,
      tags: "food,festival",
    },
    {
      id: 2,
      date: faker.date.future(),
      description:
        "Experience a weekend of live music, arts, and entertainment at the Riverside Music Festival. Fun for the whole family!",
      name: "Riverside Music Festival",
      locationId: 14,
      tags: "music,festival,family",
    },
    {
      id: 3,
      date: faker.date.future(),
      description:
        "Explore the latest trends in technology and innovation at the Tech Expo. Discover groundbreaking products and ideas.",
      name: "Tech Expo",
      locationId: 13,
      tags: "technology,science,education",
    },
    {
      id: 4,
      date: faker.date.future(),
      description:
        "Calling all book lovers! Join us for a literary journey at the City Book Fair. Discover your next great read.",
      name: "City Book Fair",
      locationId: 20,
      tags: "books,literature,education",
    },
    {
      id: 5,
      date: faker.date.future(),
      description:
        "Gear up for an adrenaline-pumping adventure! The Extreme Sports Fest is here. Thrills and excitement await.",
      name: "Extreme Sports Fest",
      locationId: 14,
      tags: "sports,adventure,festival",
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  Array.from({ length: 10 }).map(async (_, id) => {
    const data = {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      dateOfBirth: faker.date.birthdate(),
      frequentFlyerNumber: "ABCDEF1234",
      phone: "555-1234",
      tags: "anime,movies",
    };
    const defaultUser = {
      id: "2d3d",
      name: "Jon Faker",
      email: "jonfaker@email.com",
      password: "$2b$10$kKwkJApsAxeR7oOHogFMQ.lsUVryPoixS5xp.aEt.NVmER.oTr4AO",
      dateOfBirth: new Date(),
      frequentFlyerNumber: "ABCDEF1234",
      phone: "045 132 032",
      tags: "anime,sports,movies",
    };
    await prisma.user.create({
      data: id
        ? {
            ...data,
            salutation: faker.helpers.arrayElement([
              "MR",
              "MS",
              "MRS",
              "CHD",
              "INF",
            ]),
            gender: faker.helpers.arrayElement(["M", "F"]),
            passengerType: faker.helpers.arrayElement([
              "ADULT",
              "CHILD",
              "INFANT",
            ]),
          }
        : {
            ...defaultUser,
            salutation: "MR",
            gender: "M",
            passengerType: "ADULT",
          },
    });
  });
  for await (const item of airlines) {
    await prisma.airline.create({
      data: {
        id: item.id,
        name: item.name,
        value: item.value,
      },
    });
  }
  for await (const item of location) {
    await prisma.location.create({
      data: item,
    });
  }
  for await (const item of flights) {
    await prisma.flights.create({
      data: item,
    });
  }
  for await (const item of bookings) {
    await prisma.booking.create({
      data: item,
    });
  }
  for await (const item of tickets) {
    await prisma.ticket.create({
      data: {
        ...item,
        ticketStatus: "ACTIVE",
      },
    });
  }
  for await (const item of bookingSegments) {
    await prisma.bookedSegment.create({
      data: {
        ...item,
        bookingClass: faker.helpers.arrayElement([
          "BUSINESS",
          "ECONOMY",
          "PREMIUM_ECONOMY",
          "FIRST",
        ]),
      },
    });
  }

  for await (const item of loyaltyPoints) {
    await prisma.loyaltyPoints.create({
      data: {
        ...item,
      },
    });
  }
  for await (const item of events) {
    await prisma.events.create({
      data: {
        ...item,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await prisma.$disconnect();
  });
