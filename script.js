document.addEventListener('DOMContentLoaded', function() {
    // Get all images
    const images = document.querySelectorAll('.album-art');
    const totalImages = images.length;
    let currentIndex = 0;

    const songs = document.querySelectorAll('.song');
    
    // Get control buttons
    const forwardButton = document.getElementById('forward-button');
    const reverseButton = document.getElementById('reverse-button');
    const playPauseButton = document.getElementById('play-pause-button');

    const playIcon = playPauseButton.querySelector('.play-icon');
    const pauseIcon = playPauseButton.querySelector('.pause-icon');
    
    let isPlaying = false;
    let slideInterval;
    
    // Function to show image at specified index
    function showImage(index) {
        // Hide all images
        images.forEach(img => {
            img.classList.add('hidden');
        });
        
        // Show only the current image
        images[index].classList.remove('hidden');
        currentIndex = index;
    }
    
    // Next image function
    function nextImage() {
        let newIndex = (currentIndex + 1) % totalImages;
        showImage(newIndex);
    }
    
    // Previous image function
    function prevImage() {
        let newIndex = (currentIndex - 1 + totalImages) % totalImages;
        showImage(newIndex);
    }

    function handleDirectionClick(isForward) {
        // Pause current song if playing
        if (isPlaying) {
            songs[currentIndex].pause();
        }
        else{
            songs[currentIndex].currentTime = 0;
        }
        
        // Move to next image
        if (isForward){
            nextImage();
        }
        else{
            prevImage();
        }
        
        // Play the new song if we were playing before
        if (isPlaying) {
            songs[currentIndex].currentTime = 0;
            songs[currentIndex].play();
        }
    }

    function handlePlayPause(){
        // Toggle play/pause icons
        playIcon.classList.toggle('hidden');
        pauseIcon.classList.toggle('hidden');
        
        isPlaying = !isPlaying;
        
        if (isPlaying) {
            // Start automatic slideshow
            //slideInterval = setInterval(nextImage, 2000); // Change image every 2 seconds
            songs[currentIndex].play();
        } else {
            // Stop automatic slideshow
            //clearInterval(slideInterval);
            songs[currentIndex].pause()
        }
    }

    function handleSongEnd(){
        nextImage();
        handlePlayPause();
    }
    
    // Forward button click
    forwardButton.addEventListener('click', function(){
        handleDirectionClick(true);
    });
    
    // Reverse button click
    reverseButton.addEventListener('click', function(){
        handleDirectionClick(false);
    });
    
    // Play/Pause button
    playPauseButton.addEventListener('click', handlePlayPause);

     // Handle song endings - automatically go to next track
     songs.forEach(song => {
        song.addEventListener('ended', function() {
            isPlaying=false
            playIcon.classList.toggle('hidden');
            pauseIcon.classList.toggle('hidden');
            handleSongEnd(); // Go to next image and song
        });
    });
    
    // Initialize with first image visible
    showImage(0);
});

//fix: press play then pause then go forward or backwards and 
// then back to the song you had paused, it resumes where you left off...
//volume toggle
//song progression bar
//menu page