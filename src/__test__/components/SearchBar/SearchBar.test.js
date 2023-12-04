import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SearchBar from '../../../components/SearchBar/SearchBar';

// Test Case 1: Rendering of SearchBar
test('renders SearchBar component', () => {
  render(<SearchBar />);
  const inputElement = screen.getByPlaceholderText(/Enter song, album, or artist/i);
  expect(inputElement).toBeInTheDocument();
});

// Test Case 2: Handling user input
test('handles user input correctly', () => {
  render(<SearchBar />);
  const inputElement = screen.getByPlaceholderText(/Enter song, album, or artist/i);
  
  fireEvent.change(inputElement, { target: { value: 'test' } });
  expect(inputElement.value).toBe('test');
});