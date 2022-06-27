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
