const socket = io('/');
const videoGrid = document.getElementById('video-grid');

//create element for users video in dom
const userOne = document.createElement('video');
userOne.muted = true;

//create a peer connection
var peer = new Peer(undefined, {
  path: '/peerjs',
  host: '/',
  port: '3030',

});


//access users media device and set as localStream
let userOneStream
navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
}).then(stream => {
  userOneStream = stream;
  addVideoStream(userOne, stream);

  peer.on('call', call => {
    //answer the call from peer
    call.answer(stream)
    //create elementfor peers video and addd stream
    const video = document.createElement('video')
    call.on('stream', peerVideoStream => {
      addVideoStream(video, peerVideoStream)
    })
    console.log("peer added to stream!")
  })

  socket.on('user-connected', (userId) => {
    connectToNewUser(userId, stream);
  })
} )

//emit that a user has joined a specific room
peer.on('open', id => {
  socket.emit('join-room', ROOM_ID, id);
});



const connectToNewUser = (userId, stream) => {
  //call peer and send them user ones stream
  const call = peer.call(userId, stream)
  //create video element for peers stream
  const video = document.createElement('video')
  //add peers stream to video element
  call.on('stream', peerVideoStream => {
    addVideoStream(video, peerVideoStream)
  })
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

const mute = () => {
  //get the current stream that you want to mute and the audio track
  const enabled = userOneStream.getAudioTracks()[0].enabled;
  //if the track is enabled then disable it (mute) and vice versa (unmute)
  if (enabled) {
    userOneStream.getAudioTracks()[0].enabled = false;
    setUnmuteButton();
  } else {
    setMuteButton();
    userOneStream.getAudioTracks()[0].enabled = true;
  }
}

const setMuteButton = () => {
  //target the mute button
  const html = `
    <i class="fas fa-microphone"></i>
    <span>Mute</span>
  `
  document.querySelector('.main-mute-button').innerHTML = html;
}

const setUnmuteButton = () => {
  const html = `
    <i class="unmute fas fa-microphone-slash"></i>
    <span>Unmute</span>
  `
  document.querySelector('.main-mute-button').innerHTML = html;
}
