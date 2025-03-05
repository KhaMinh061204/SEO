// Mock data for UI development

// Mock seats data
export const mockSeatsData = {
  // ...existing code...
};

// Mock date for testing
export const mockDateData = {
  day: "Thứ 5",
  date: "20/06/2024"
};

// Provide mock context data for testing
export const mockContextData = {
  selectedSeats: ["A1", "A2"],
  seatPrice: 75000,
  selectedTheater: "Ceecin Cinema City",
  selectedTime: "20:30",
  selectedDate: mockDateData,
  movieTitle: "Avengers: Infinity War",
  movieUrl: "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg",
  convertDateFormat: (date) => {
    if (typeof date === 'string') return date;
    return date || "";
  }
};

// Additional mock data as needed
// ...existing code...
