document.addEventListener("DOMContentLoaded", function() {
  var tab1 = document.getElementById('tab1');
  var tab2 = document.getElementById('tab2');
  var tab3 = document.getElementById('tab3');
  var block1 = document.getElementById('block1');
  var block2 = document.getElementById('block2');
  var block3 = document.getElementById('block3');
  var beforeBlock = block1;
  var beforeElem = tab1;

  //if elements more than 5 I can just add them in array using for loop -_- (next time maybe)
  var pricing1 = document.getElementById('pricing1');
  var pricing2 = document.getElementById('pricing2');
  var pricing3 = document.getElementById('pricing3');
  var pricingLeft = document.getElementById('pricingLeft');
  var pricingRight = document.getElementById('pricingRight');
  var pricingActive = 1;
  const pricingElements = [pricing1, pricing2, pricing3];

  pricingLeft.addEventListener('click', function(){
      if(pricingActive !== 0){
        fade(pricingElements[pricingActive], pricingElements[pricingActive - 1]);
        pricingActive--;
      }
        pricingRight.classList.remove('OFFright');
      if(pricingActive === 0){
        pricingLeft.classList.add('OFFleft');
      }
  });

  pricingRight.addEventListener('click', function(){
      if(pricingActive !== 2){
        fade(pricingElements[pricingActive], pricingElements[pricingActive + 1]);
        pricingActive++;
      }
      pricingLeft.classList.remove('OFFleft');
        if(pricingActive === 2){
          pricingRight.classList.add('OFFright');
        }
  });
  tab1.addEventListener('click', function(){
    if(tab1.id !== beforeElem.id ){
      slide(tab1, block1);
  }
  });

  tab2.addEventListener('click', function(){
    if(tab2.id !== beforeElem.id ){
    slide(tab2, block2);
  }
  });

  tab3.addEventListener('click', function(){
    if(tab3.id !== beforeElem.id ){
    slide(tab3, block3);
  }
  });

   function slide(element, block){
      fade(beforeBlock, block);
      element.classList.add('active');
      beforeElem.classList.remove('active');
      beforeElem = element;
      beforeBlock = block;
  };

  function fade(element, current) {
      let op = 1;  // initial opacity
      var timer = setInterval(function () {
          if (op <= 0.1){
              clearInterval(timer);
              element.style.display = 'none';
              return unfade(current);
          }
          let styles = getComputedStyle(element);
          console.log(styles.opacity  + 'fade');
          element.style.opacity = op;
          element.style.filter = 'alpha(opacity=' + op * 100 + ")";
          op -= op * 0.1;
      }, 10);
  };

  function unfade(element) {
    console.log('unfade');
      let op = 0.1;  // initial opacity
      element.style.display = 'flex';
      element.style.opacity = op;
      var timer = setInterval(function () {
          if (op >= 1){
              clearInterval(timer);
          }
          let styles = getComputedStyle(element);
          console.log(styles.opacity + 'unfade');
          element.style.opacity = op;
          element.style.filter = 'alpha(opacity=' + op * 100 + ")";
          op += op * 0.1;
      }, 15);
  };

//analog of jquery scrollTo function
function scrollTo(element, to, duration) {
    if (duration <= 0) return;
    var difference = to - element.scrollTop;
    var perTick = difference / duration * 10;

    setTimeout(function() {
        element.scrollTop = element.scrollTop + perTick;
        if (element.scrollTop === to) return;
        scrollTo(element, to, duration - 10);
    }, 10);
};

  var menu = document.getElementById('menu');
  var burger = document.getElementById('nav-icon');
  var topBtn = document.getElementById('topBtn');

  burger.addEventListener('click', function(){
    burger.classList.toggle('open');
    menu.classList.toggle('hidden-menu');
  });

  menu.addEventListener('click', function(e){
    let item = e.target;
    let itemId = item.id[item.id.length - 1];
    let section = document.getElementById('section' + itemId);
    menu.classList.add('hidden-menu');
    burger.classList.remove('open');
    let timeScroll = 200 * itemId;
    scrollTo(document.documentElement, section.offsetTop, timeScroll);
  });

  topBtn.addEventListener('click', function(){
    scrollTo(document.documentElement, document.body.offsetTop, 800);
  });

  var firstSection = document.getElementById('section1').offsetTop;
  window.onscroll = function(){
    if(pageYOffset > 350){
      menu.classList.add('hidden-menu');
      burger.classList.remove('open');
    }
    if(pageYOffset > firstSection){
      topBtn.classList.remove('hidden');
    }else{
      topBtn.classList.add('hidden');
    }
  };

});
