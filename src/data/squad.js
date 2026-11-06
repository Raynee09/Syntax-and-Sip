// Example session for the "join session" simulation
export const exampleSessions = [
  {
    sessionName: 'Study Group Alpha',
    members: [
      {
        id: 'm1',
        name: 'Priya',
        drinkConfig: { baseId: 'latte', milkId: 'oat', sweetnessId: 'medium', syrupIds: ['vanilla'], extraIds: [] },
        seatId: 'S01',
      },
      {
        id: 'm2',
        name: 'Arjun',
        drinkConfig: { baseId: 'cold-brew', milkId: 'none', sweetnessId: 'none', syrupIds: [], extraIds: ['extra-shot'] },
        seatId: 'S02',
      },
      {
        id: 'm3',
        name: 'Kavya',
        drinkConfig: { baseId: 'matcha', milkId: 'oat', sweetnessId: 'light', syrupIds: [], extraIds: [] },
        seatId: null,
      },
    ],
    splitMode: 'order',
    customAmounts: {},
  },
]
