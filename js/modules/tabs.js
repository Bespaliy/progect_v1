function tabs(tabsSelector , tabsConstentSelector , tabsParentSelector , activeClass) {
    const tab = document.querySelector(tabsSelector),
          tabArr = document.querySelectorAll(tabsParentSelector),
          tabContent = document.querySelectorAll(tabsConstentSelector);


    const imageFortab = index => {
        tabContent.forEach((i , ind) => {
            if(ind == index){
                i.hidden = false;
            }else{
                i.hidden = true;
            }
        });
    };

    const showContent = tab => {
        tabArr.forEach((i , index) => {
            if(i == tab){
                i.classList.add(activeClass);
                imageFortab(index);
            }else{
                i.classList.remove(activeClass);
            }
        });
    };

    tab.addEventListener('click' , e => {
        if(e.target && e.target.matches(tabsParentSelector)){
            showContent(e.target);
        }
    });

    showContent(tabArr[0]);
    imageFortab(0);
}

export default tabs;
