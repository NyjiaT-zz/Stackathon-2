const socket = io('/')
const videoGrid = document.getElementById('video-grid');

//create element for users video in dom
const userOne = document.createElement('video');
userOne.muted = true;

//access users media device and set as localStream
let userOneStream
navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
}).then(stream => {
  userOneStream = stream;
  addVideoStream(userOne, stream);
} )

//emit that a user has joined a specific room
socket.emit('join-room', ROOM_ID);

socket.on('user-connected', () => {
  connectToNewUser();
})

const connectToNewUser = () => {
  console.log("new-user");
}

//add that stream to the video object and play the video
const addVideoStream = (video, stream) => {
  video.srcObject = stream;
  video.addEventListener('loadedmetadata', () => {
    video.play();
  })
  //put video into the video-grid element
  videoGrid.appendChild(video);
}
