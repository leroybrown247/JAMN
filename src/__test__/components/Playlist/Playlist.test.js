import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Playlist from '../../../components/Playlist/Playlist';

// Test Case 1: Rendering of Playlist with default values
test('renders Playlist component with default values', () => {
    render(<Playlist playlistName="My Playlist" playlistTracks={[]} />);
    const playlistNameElement = screen.getByText(/My Playlist/i);
  
    expect(playlistNameElement).toBeInTheDocument();
  });
  
  // Test Case 2: Editing playlist name
  test('edits playlist name correctly', () => {
    const onNameChangeMock = jest.fn();
    render(
      <Playlist playlistName="My Playlist" playlistTracks={[]} onNameChange={onNameChangeMock} />
    );
  
    const playlistNameElement = screen.getByText(/My Playlist/i);
    fireEvent.click(playlistNameElement);
  
    const inputElement = screen.getByTestId('playlist-input'); // Ensure this data-testid exists in your component
    fireEvent.change(inputElement, { target: { value: 'New Playlist Name' } });
    fireEvent.blur(inputElement);
  
    expect(onNameChangeMock).toHaveBeenCalledWith('New Playlist Name');
  });
