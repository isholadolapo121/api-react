import { render, screen, waitFor } from '@testing-library/react';
import App from './App'; // The main component of your app
import '@testing-library/jest-dom'; // for the "toBeInTheDocument" matcher

// Mocking the fetch API to avoid hitting the real API during tests
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ results: [{ name: 'Rick Sanchez', species: 'Human', status: 'Alive', image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg' }] }),
  })
);

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Make sure the mock is cleared before each test
  });

  test('renders loading text initially', () => {
    render(<App />);
    // Check that the "Loading..." text appears when the app is fetching data
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test('renders error message when fetch fails', async () => {
    // Mock the fetch API to simulate an error
    global.fetch.mockImplementationOnce(() => Promise.reject('API is down'));

    render(<App />);
    
    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText(/Error: API is down/i)).toBeInTheDocument();
    });
  });

  test('renders character list when data is fetched successfully', async () => {
    render(<App />);
    
    // Wait for the character to appear in the document
    await waitFor(() => {
      expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument();
    });

    // Check that other details like species and status also appear
    expect(screen.getByText(/Human/i)).toBeInTheDocument();
    expect(screen.getByText(/Alive/i)).toBeInTheDocument();
  });
});
