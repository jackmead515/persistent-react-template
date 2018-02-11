export const setRoomName = (roomName) => {
  return {
    type: 'SET_ROOM_NAME',
    data: roomName
  }
}

export const setDisplayName = (displayName) => {
  return {
    type: 'SET_DISPLAY_NAME',
    data: displayName
  }
}
