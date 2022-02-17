const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');

    //BGM
    const sounds = document.querySelectorAll('.sound-picker button');
    //表示時間
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time-select button');
    //Get the Length of the outline
    const outlineLength = outline.getTotalLength();
    //間隔
    let fakeDuration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

     //Pick diffrent sounds
     sounds.forEach(sound =>{
         sound.addEventListener('click',function(){
             song.src = this.getAttribute("data-sound");
             video.src = this.getAttribute("data-video");
             checkPlaying(song);
         });
     });

    //BGMを流す
    play.addEventListener("click", () => {
        checkPlaying(song);
    });


    //音を選択
    timeSelect.forEach(option =>{
        option.addEventListener("click",function(){
            fakeDuration = this.getAttribute("data-time");
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
                fakeDuration % 60
            )}`;
        });
    });

 //音楽を再生する機能と一時停止する機能を追加
    const checkPlaying = song =>{
        if(song.paused){
            song.play();
            video.play();
            play.src = './svg/pause.svg';
        }else{
            song.pause();
            video.pause();
            play.src = './svg/play.svg';
        }
    };

    //We can animaited the circle
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60); 

        //残り時間（円）表示のアニメーション
        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;
        //残り時間（数字）表示のアニメーション
        timeDisplay.textContent = `${minutes}:${seconds}`;

        if(currentTime >= fakeDuration) {
            song.pause();
            song.currentTime = 0;
            play.src = "./svg/play.svg";
            video.pause();
        }
    };
};



app();