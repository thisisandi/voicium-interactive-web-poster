document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM загружен");

    let canvas = document.getElementById('drawhere');
    let ctx = canvas.getContext('2d');
    let brushColorInput = document.getElementById('brush-color');
    let brush = document.querySelector('.brush');
    let clearBtn = document.querySelector('.clear');
    let lineWidthInput = document.getElementById('line-width');
    let easerr = document.querySelector('.easerr');
    
    ctx.imageSmoothingEnabled = false;
    
    let isDrawing = false;
    let currentColor = brushColorInput.value;
    let lastX = 0;
    let lastY = 0;
    let lineWidth = 2;
    
    lineWidthInput.addEventListener('input', () => {
        let currentValue = parseInt(lineWidthInput.value);
        let diff = currentValue - prevValue;
        
        if (diff > 0) {
            updateLineWidth(lineWidth + 1); 
        } else if (diff < 0) {
            updateLineWidth(lineWidth - 1);
        }
        
        prevValue = currentValue;
    });
    
    function updateLineWidth(width) {
        lineWidth = width;
    }
    
    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        let rect = canvas.getBoundingClientRect();
        let offsetX = e.clientX - rect.left;
        let offsetY = e.clientY - rect.top;
        lastX = offsetX * (canvas.width / rect.width);
        lastY = offsetY * (canvas.height / rect.height);
    });
    
    canvas.addEventListener('mousemove', (e) => {
        if (!isDrawing) return;
    
        let rect = canvas.getBoundingClientRect();
        let offsetX = e.clientX - rect.left;
        let offsetY = e.clientY - rect.top;
        let x = offsetX * (canvas.width / rect.width);
        let y = offsetY * (canvas.height / rect.height);
    
        draw(x, y);
    });
    
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mouseout', () => isDrawing = false);
    
    brushColorInput.addEventListener('change', () => {
        currentColor = brushColorInput.value;
    });
    
    brush.addEventListener('click', () => {
        brush.classList.add('active');
        easerr.classList.remove('active');
        currentColor = brushColorInput.value;
    });
    
    easerr.addEventListener('click', () => {
        easerr.classList.add('active');
        brush.classList.remove('active');
        currentColor = '#000000';
    });
    
    clearBtn.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
    
    function draw(x, y) {
        ctx.strokeStyle = currentColor;
        ctx.lineCap = 'round'; 
        ctx.lineJoin = 'round'; 
        ctx.lineWidth = lineWidth; 
    
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();
    
        lastX = x;
        lastY = y;
    }
    
    let isDragging = false;
    let prevValue = lineWidthInput.value;
    
    lineWidthInput.addEventListener('mousedown', startDragging);
    window.addEventListener('mousemove', drag);
    window.addEventListener('mouseup', stopDragging);
    
    function startDragging(e) {
        isDragging = true;
        drag(e); 
    }
    
    function drag(e) {
        if (isDragging) {
            let rect = lineWidthInput.getBoundingClientRect();
            let offsetY = e.clientY - rect.top;
            let value = Math.round((offsetY / rect.height) * (lineWidthInput.max - lineWidthInput.min)) + parseInt(lineWidthInput.min);
            lineWidthInput.value = value;
            updateLineWidth(value);
        }
    }
    
    function stopDragging() {
        isDragging = false;
    }

    let nextbutton = document.getElementById('nextbutton');
      if (nextbutton) {
          nextbutton.addEventListener('click', function() {
            location.reload();
          });
      }

    let balls = document.querySelectorAll('.ball');
    balls.forEach(ball => { 
      ball.onmousedown = function(event) { 
        let shiftX = event.clientX - ball.getBoundingClientRect().left; 
        let shiftY = event.clientY - ball.getBoundingClientRect().top; 
     
        ball.style.position = 'absolute'; 
        ball.style.zIndex = 1000; 
        document.body.append(ball); 
     
        moveAt(event.pageX, event.pageY); 
     
        function moveAt(pageX, pageY) { 
            console.log("Передвижение кружочка");
            ball.style.left = pageX - shiftX + 'px'; 
            ball.style.top = pageY - shiftY + 'px'; 
        } 
     
        function onMouseMove(event) { 
          moveAt(event.pageX, event.pageY); 
        }

        document.addEventListener('mousemove', onMouseMove); 
     
        document.onmouseup = function() { 
          document.removeEventListener('mousemove', onMouseMove); 
        }; 
     
        ball.ondragstart = function() { 
          return false; 
        }; 
      }; 
    });

    let video1 = document.getElementById('video1');
    let video2 = document.getElementById('video2');
    let video3 = document.getElementById('video3');
    let video4 = document.getElementById('video4');
    let video5 = document.getElementById('video5');
    let video6 = document.getElementById('video6');
    let video7 = document.getElementById('video7');
    let video8 = document.getElementById('video8');
    let video9 = document.getElementById('video9');
    let video10 = document.getElementById('video10');
    let video11 = document.getElementById('video11');
    let video12 = document.getElementById('video12');
    let video13 = document.getElementById('video13');
    let video14 = document.getElementById('video14');
    let video15 = document.getElementById('video15');
    let notification = document.getElementById('notification');
    let info = document.querySelector('.info');
    let infoText = document.querySelector('.infoText');

    document.querySelector('.info').addEventListener('click', function() {
        let infoText = document.querySelector('.infoText');
        if (infoText.style.display === "none") {
            infoText.style.display = "block";
            infoText.style.opacity = "1";
        } else {
            infoText.style.display = "none";
            infoText.style.opacity = "0";
        }
    });

    function handleVideoClick(video) {
        console.log("Клик на видео");
        if (video === video12) {
            if (video.paused) {
                video.play();
                video.addEventListener('ended', function() {
                    showNotification();
                });
            } else {
                video.pause();
            }
        } else {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        }
    }

    function createConfetti(color) {
        let confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.backgroundColor = color;
        confetti.style.animationDelay = Math.random() * 20 + 's'; 
        document.body.appendChild(confetti);
    }

    function generateConfetti() {
        console.log("Генерация конфетти");
        let colors = ['#8AC926', '#1982C4', '#FFCA3A', '#6A4C93', '#FF006E', '#FB5607'];
        for (let i = 0; i < 900; i++) {
            createConfetti(colors[i % colors.length]);
        }
    }

    function showNotification() {
        console.log("Показ уведомления");
        notification.style.display = 'block';
        generateConfetti();
    }

    function hideNotification() {
        console.log("Скрытие уведомления");
        notification.style.display = 'none';
        removeAllConfetti();
    }

    function removeAllConfetti() {
        let confettiElements = document.querySelectorAll('.confetti');
        confettiElements.forEach(function(confetti) {
            confetti.remove();
        });
    }

    video1.addEventListener('click', function() {
        handleVideoClick(video1);
    });

    video2.addEventListener('click', function() {
        handleVideoClick(video2);
    });

    video3.addEventListener('click', function() {
        handleVideoClick(video3);
    });

    video4.addEventListener('click', function() {
        handleVideoClick(video4);
    });

    function playSound(soundFile, delay) {
        if (delay) {
            setTimeout(function() {
                let audio = new Audio(soundFile);
                audio.play();
            }, 1000);
        } else {
            let audio = new Audio(soundFile);
            audio.play();
        }
    }

    video5.addEventListener('click', function() {
        handleVideoClick(video5);
        playSound('./assets/cheers.mp3', true); 
    });

    video6.addEventListener('click', function() {
        handleVideoClick(video6);
    });

    video7.addEventListener('click', function() {
        handleVideoClick(video7);
    });

    video8.addEventListener('click', function() {
        handleVideoClick(video8);
    });

    video9.addEventListener('click', function() {
        handleVideoClick(video9);
        playSound('./assets/jump.mp3', false); 
    });

    video10.addEventListener('click', function() {
        handleVideoClick(video10);
    });

    video11.addEventListener('click', function() {
        handleVideoClick(video11);
        playSound('./assets/click.mp3', false);
    });

    video12.addEventListener('click', function() {
        handleVideoClick(video12);
    });
    video13.addEventListener('click', function() {
        handleVideoClick(video13);
    });

    video14.addEventListener('click', function() {
        handleVideoClick(video14);
    });

    video15.addEventListener('click', function() {
        handleVideoClick(video15);
    });
    let closeButton = document.getElementById('close-button');
    closeButton.addEventListener('click', function() {
        hideNotification();
    });

    let pageFirst = document.querySelector('.pageFirst');
    let pageDraw = document.querySelector('.pageDraw');
    video4.addEventListener('ended', function() {
        pageFirst.style.display = 'none';
        pageDraw.style.display = 'flex';
    });
    
    let pageWrite = document.querySelector('.pageWrite');
    video7.addEventListener('ended', function() {
        pageFirst.style.display = 'none';
        pageWrite.style.display = 'flex';
    });

    pageDraw.addEventListener('mousedown', function(event) {
        if (event.button === 0) { 
            isDrawing = true; 
            event.preventDefault(); 
        }
    });

    pageDraw.addEventListener('mousemove', function(event) {
        if (isDrawing) {
        event.preventDefault(); 
        }
    });

    document.addEventListener('mouseup', function() {
        isDrawing = false; 
    });

    closeButton.addEventListener('click', function() {
        hideNotification();
    });

    video8.addEventListener('ended', function() {
        pageFirst.style.display = 'none';
        pageRecord.style.display = 'flex';
    });

    let microoo = document.querySelector('.microoo');
    let counterElement = document.getElementById('counter');
    let isRecording = false;
    let timer = null;
    let mediaRecorder = null;
    let chunks = [];
    let waveImages = document.querySelectorAll('.wave1, .wave2, .wave3, .wave1r, .wave2r, .wave3r');
    let nextButton = document.getElementById('nextbutton2');
    let pageRecord = document.querySelector('.pageRecord');
    let pageListen = document.querySelector('.pageListen');
    let audioPlayer = document.getElementById('audioPlayer');
    let progressBar = document.getElementById('progressBar');
    let playa = document.querySelector('.playa');
    let isPlaying = false;
    
    waveImages.forEach(image => {
      image.style.opacity = '0';
    });
    
    microoo.addEventListener('click', async function() {
      microoo.style.borderColor = isRecording ? 'white' : '#FF006E';
    
      if (!isRecording) {
        try {
          let stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    
          mediaRecorder = new MediaRecorder(stream);
          mediaRecorder.ondataavailable = function(e) {
            chunks.push(e.data);
          };
    
          mediaRecorder.start();
          let counter = 0;
          let startTime = new Date().getTime();
          timer = setInterval(function() {
            let currentTime = new Date().getTime();
            counter = Math.floor((currentTime - startTime) / 1000);
            let hours = Math.floor(counter / 3600);
            let minutes = Math.floor((counter % 3600) / 60);
            let seconds = counter % 60;
            counterElement.textContent = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
          }, 1000);
    
          waveImages.forEach(image => {
            image.style.opacity = '1';
          });
    
          isRecording = true;
        } catch (err) {
          console.error('Ошибка при получении доступа к микрофону:', err);
        }
      } else {
        if (mediaRecorder && mediaRecorder.state !== 'inactive') {
          mediaRecorder.stop();
          mediaRecorder.onstop = function() {
            let blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
            let audioURL = URL.createObjectURL(blob);
            audioPlayer.src = audioURL;
            chunks = [];
    
            if (isPlaying) {
              audioPlayer.play();
              isPlaying = false;
            }
          };
        }
    
        clearInterval(timer);
        timer = null;
        isRecording = false;
        chunks = [];
    
        microoo.style.borderColor = 'white';
    
        waveImages.forEach(image => {
          image.style.opacity = '0';
        });
    
        nextButton.style.display = 'block';
      }
    });
    
    nextButton.addEventListener('click', function() {
      pageRecord.style.display = 'none';
      pageListen.style.display = 'flex';
    });
    
    let nextButton3 = document.querySelector('.nextButton3');
    playa.addEventListener('click', function() {
        if (chunks.length === 0 && audioPlayer.src !== '') {
          if (audioPlayer.paused) {
            audioPlayer.play();
          } else {
            audioPlayer.pause();
          }
          audioPlayer.addEventListener('timeupdate', function() {
            let percentage = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            progressBar.style.width = percentage + '%';
            progressBar.classList.add('smooth-transition');
          });
          nextButton3.style.display = 'block';
        } else {
          isPlaying = !isPlaying;
          if (isPlaying) {
            audioPlayer.play();
          } else {
            audioPlayer.pause();
          }
        }
      });
    
      nextButton3.addEventListener('click', function() {
        location.reload();
      });


      let saveText = document.getElementById('saveText');

      document.getElementById('writehere').addEventListener('input', function() {
          if (this.value.trim() !== '') {
              saveText.style.display = 'block';
          } else {
              saveText.style.display = 'none';
          }
      });
  
      saveText.addEventListener('click', function() {
          document.getElementById('notification2').style.display = 'block';
      });
      
      document.getElementById('notification2').addEventListener('click', function() {
          location.reload();
      });
});