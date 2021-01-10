function slider({container , slide , nextArrow , prevArrow , totalCounter , currentCounter , wrapper , field}) {
    let offset = 0;
    let slideIndex = 1;

    const slides = document.querySelectorAll(slide),
         slider = document.querySelector(container),
         prev = document.querySelector(prevArrow),
         next = document.querySelector(nextArrow),
         total = document.querySelector(totalCounter),
         current = document.querySelector(currentCounter),
         slidesWrapper = document.querySelector(wrapper),
         width = window.getComputedStyle(slidesWrapper).width,
         slidesField = document.querySelector(field);


    const numOfSliders = () => {
        if (slides.length < 10) {
            total.textContent = `0${slides.length}`;
            current.textContent =  `0${slideIndex}`;
        } else {
            total.textContent = slides.length;
            current.textContent =  slideIndex;
        }
    };

    numOfSliders();
   
    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';
    
    let dotContainer = document.createElement('ol');
    dotContainer.classList.add('carousel-indicators');
    let arrOfDot = [];

    for(let i = 0; i < slides.length; i++){
        let dot = document.createElement('li');
        dot.classList.add('dot');
        dot.setAttribute('data-slide-to', i+1);
        dotContainer.append(dot);
        if(i == 0){
            dot.style.opacity = 1;
        }
        arrOfDot.push(dot);
    }

    slidesWrapper.append(dotContainer);

    const numOfSlidersCurrentAndDot = (index) => {
        if (slides.length < 10) {
            current.textContent =  `0${index}`;
        } else {
            current.textContent =  index;
        }

        arrOfDot.forEach(dot => dot.style.opacity = ".5");
        arrOfDot[index-1].style.opacity = 1;
    };

    const makeNumFromStr = (str) => {
        let number = +str.replace(/\D/g , '');
        return number;
    };
    
    next.addEventListener('click', () => {
        if (offset == (makeNumFromStr(width) * (slides.length - 1))) {
            offset = 0;
        } else {
            offset += makeNumFromStr(width); 
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        numOfSlidersCurrentAndDot(slideIndex);
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = makeNumFromStr(width) * (slides.length - 1);
        } else {
            offset -= makeNumFromStr(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        numOfSlidersCurrentAndDot(slideIndex);
    });
    

    //Dot
 
    arrOfDot.forEach((item , index) => {
        item.addEventListener('click' , (e) => {
            console.log(e.target.getAttribute('data-slide-to'));
            offset = (makeNumFromStr(width) * index);
            slidesField.style.transform = `translateX(-${offset}px)`;
            slideIndex = index;
            numOfSlidersCurrentAndDot(++slideIndex);
        });
    });
}

export default slider;