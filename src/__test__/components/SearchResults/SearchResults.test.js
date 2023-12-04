import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchResults from '../../../components/SearchResults/SearchResults';

// Test Case 1: Rendering of SearchResults with empty results
test('renders SearchResults component with empty results', () => {
  render(<SearchResults searchResults={[]} />);
  const headingElement = screen.getByText(/Search Results/i);
  expect(headingElement).toBeInTheDocument();
});

// Test Case 2: Rendering of SearchResults with search results
test('renders SearchResults component with search results', () => {
  const searchResults = [
    { id: '1', name: 'Test Track 1', artist: 'Test Artist 1', album: 'Test Album 1' },
    { id: '2', name: 'Test Track 2', artist: 'Test Artist 2', album: 'Test Album 2' },
  ];

  render(<SearchResults searchResults={searchResults} />);
  const headingElement = screen.getByText(/Search Results/i);
  const trackElement1 = screen.getByText(/Test Track 1/i);
  const trackElement2 = screen.getByText(/Test Track 2/i);

  expect(headingElement).toBeInTheDocument();
  expect(trackElement1).toBeInTheDocument();
  expect(trackElement2).toBeInTheDocument();
});
