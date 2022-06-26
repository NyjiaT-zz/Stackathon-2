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

//add that stream to the video object and play the video
const addVideoStream = (video, stream) => {
  video.srcObject = stream;
  video.addEventListener('loadedmetadata', () => {
    video.play();
  })
  //put video into the video-grid element
  videoGrid.appendChild(video);
}
