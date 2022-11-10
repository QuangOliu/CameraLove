const videoPreview = document.querySelector('#video-preview');
const screenshot = document.querySelector('#screenshot');
const buttonScreenshot = document.querySelector('#body');
const COVER = document.querySelector('#cover');
const HEART = document.querySelector('.CONTAINERHEART');
const CAMERA = document.querySelector('.CONTAINERCAMERA');

disabledButtons(true);

navigator.mediaDevices.getUserMedia({ video: true }).then(async (videoStream) => {
    videoPreview.srcObject = videoStream;
    disabledButtons(false);
    buttonScreenshot.addEventListener('click', async () => takeScreenshot(videoStream));
    COVER.addEventListener('click', async () => removeClass());
});

async function getImageBlob(videoStream) {
    const track = videoStream.getVideoTracks()[0];
    const imageBlob = await new ImageCapture(track).takePhoto();
    return imageBlob;
}

async function takeScreenshot(videoStream) {
    screenshot.src = URL.createObjectURL(await getImageBlob(videoStream));
    HEART.classList.add('active');
    CAMERA.classList.add('hiden');
    COVER.classList.add('onHeart');
}

function removeClass() {
    HEART.classList.remove('active');
    CAMERA.classList.remove('hiden');
    COVER.classList.remove('onHeart');
}

// async function startDownload(videoStream) {
//     const imageURL = URL.createObjectURL(await getImageBlob(videoStream));
//     const link = document.createElement('a');
//     link.href = imageURL;
//     link.download = `screenshot-${new Date().toLocaleTimeString()}.jpg`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
// }

function disabledButtons(state) {
    // buttonDownload.disabled = state;
    buttonScreenshot.disabled = state;
}
