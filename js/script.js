"use strict";

document.addEventListener('DOMContentLoaded', () => {

   let start = document.querySelector('.start'),
      startBtn = start.querySelector('.start__btn');

   function bgAudio(play) {
      let bgAudio = document.querySelector('#bgAudio');
      if (play == 'stop') {
         bgAudio.pause();
         bgAudio.currentTime = 0;
      } else if (play == 'play') {
         bgAudio.play();
      }
   }

   function hide(item) {
      item.classList.add('hide');
   }

   function visible(item) {
      item.classList.remove('hide');
   }

   start.addEventListener('click', () => {
      if (start.classList.contains('start__run')) {

         hide(start);
         hide(startBtn);

         bgAudio('play');

         let lidsEye = {
            height: 100,
            click: 5,
            interval: 1,
            money: 5,
            lids: document.querySelectorAll('.eye-lids-lid'),
            mounth: document.querySelector('.face__mouth'),
            moneySelector: document.querySelector('.money'),
         }

         let jack = {
            totalMoney: 0
         }

         function gameOver(height) {
            if (height < 0) {
               startBtn.textContent = `о нет, он проснулся...`
               start.classList.remove('start__run');
               bgAudio('stop');
               visible(start);
               visible(startBtn);
               clearInterval(intervalTime);
               start.classList.add('start__run');
            }
         }

         lidsEye.mounth.addEventListener('click', (e) => {
            if (lidsEye.height <= 100) {
               lidsEye.height += lidsEye.click;
            }
            jack.totalMoney += lidsEye.money;
         });
         let intervalTime = setInterval(() => {
            console.log(lidsEye.height);
            if (lidsEye.height > 0) {
               lidsEye.height -= 0.09;
            } else {
               gameOver(lidsEye.height);
            }
            lidsEye.lids.forEach(item => {
               item.style.height = lidsEye.height + '%';
            });
            lidsEye.moneySelector.innerHTML = jack.totalMoney.toFixed(2);

         }, lidsEye.interval);


         // бонусы

         //замедление 

         let slow = {
            selector: document.querySelector('.bonuce__slow-speed'),
            speed: 0.086,
            price: 100,
            time: 5,
            work: false
         }

         slow.selector.innerHTML = `slow ${slow.price.toFixed(2)}`;


         let speedBonuce = function speedBonuceFunction(slow, speed) {
            if (jack.totalMoney >= slow.price && slow.work == false) {
               slow.work = true;
               jack.totalMoney -= slow.price;
               slow.price += (slow.price / 100) * 2;
               slow.selector.innerHTML = `slow ${slow.price.toFixed(2)}`;

               let slowInterval = setInterval(() => {
                  lidsEye.height += speed;
               }, lidsEye.interval * 2);

               setTimeout(() => {
                  slow.work = false;
                  clearInterval(slowInterval);
               }, slow.time * 1000);

            }
         }

         slow.selector.addEventListener('click', () => {
            let speedBonuceStart = speedBonuce(slow, slow.speed)
            return speedBonuceStart;
         });

         // пополнение до полной 

         let full = {
            fullSelector: document.querySelector('.bonuce__full'),
            full: 1,
            fullPrice: 200,
            fullWork: false,
            fullTime: 2
         }

         full.fullSelector.innerHTML = `full ${full.fullPrice.toFixed(2)}`;


         let fullBonuce = function fullBonuceFunction() {
            if (jack.totalMoney >= full.fullPrice && full.fullWork == false) {
               full.fullWork = true;
               jack.totalMoney -= full.fullPrice;
               full.fullPrice += (full.fullPrice / 100) * 2;

               full.fullSelector.innerHTML = `full ${full.fullPrice.toFixed(2)}`;


               if (lidsEye.height < 100 && full.fullWork == true) {
                  let fullInterval = setInterval(() => {
                     lidsEye.height += full.full;
                     if (lidsEye.height >= 100) {
                        full.fullWork = false;
                        clearInterval(fullInterval);
                     };
                  }, lidsEye.interval * 1.5);
               };
            }
         }

         full.fullSelector.addEventListener('click', fullBonuce);

      }
   });
});

