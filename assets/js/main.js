const fileInput = document.querySelector('.file-input');
chooseImgBtn = document.querySelector('.choose-img');
// filter buttons
filterOptions = document.querySelectorAll('.filter button');
filterName = document.querySelector('.filter .filter-info .name');
filterValue = document.querySelector('.filter .filter-info .value');
filterSlider = document.querySelector('.filter input');
rotateBtn = document.querySelectorAll('.rotate button');
resetBtn = document.querySelector('.controls .reset-filter');
saveBtn = document.querySelector('.controls .save-img');

const imgBox = document.querySelector('.preview-img img');

let brightness = 100, saturation = 100, invertion = 100, grayscale = 100;
let rotate = 0;
let flipH = 1, flipV = 1;


const loadImage = () => {
    let file = fileInput.files[0];
    imgBox.src = URL.createObjectURL(file);
    imgBox.addEventListener('load',() => {
        resetBtn.click(); // clicking reset button to reset all filters
        document.querySelector('.container').classList.remove('disable');
    })
}

const applyFilter = () => {
    imgBox.style.transform = `rotate(${rotate}deg) scale(${flipH}, ${flipV})`;
    imgBox.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${invertion}%) grayscale(${grayscale}%)`;
}

const updateFilter = () => {
    // console.log(filterSlider.value);
    filterValue.innerText = `${filterSlider.value}%`;
    const selectedFilter = document.querySelector('.filter .active'); //getting selected btn
    if(selectedFilter.id ==- 'brightness'){
        brightness = filterSlider.value;
        // imgBox.style.filter = `brightness(${brightness}%)`;
    } else if(selectedFilter.id == 'saturation'){
        sturation = filterSlider.value;
        // imgBox.style.filter = `contrast(${sturation}%)`;
    } else if(selectedFilter.id == 'invertion'){
        invertion = filterSlider.value;
        // imgBox.style.filter = `invert(${invertion}%)`;
    } else if(selectedFilter.id == 'grayscale') {
        grayscale = filterSlider.value;
    }

    applyFilter();
}

filterOptions.forEach(option => {
    option.addEventListener('click',() => {
        document.querySelector('.filter .active').classList.remove('active');
        option.classList.add('active');
        filterName.innerText = option.innerText;

        if(option.id === 'brightness'){
            filterSlider.max = "200";
            filterSlider.value = `${brightness}%`;
            filterValue.innerText = `${brightness}%`;
        }
        else if(option.id === 'saturation'){
            filterSlider.max = "200";
            filterSlider.value = `${saturation}%`;
            filterValue.innerText = `${saturation}%`;
        }
        else if(option.id === 'invertion'){
            filterSlider.max = "100";
            filterSlider.value = `${invertion}%`;
            filterValue.innerText = `${invertion}%`;
        }
        else if(option.id === 'grayscale'){
            filterSlider.max = "100";
            filterSlider.value = `${grayscale}%`;
            filterValue.innerText = `${grayscale}%`;
        }
    })
});

rotateBtn.forEach(btn => {
    btn.addEventListener('click',() => {
        if(btn.id === 'left'){
            rotate -= 90; // rotate left if the btn is clicked by 90deg
        }
        else if(btn.id === 'right'){
            rotate += 90; // rotate left if the btn is clicked by 90deg
        } else if(btn.id === 'flip-horiz'){
            flipH = flipH === 1 ? -1 : 1;
        } else if(btn.id === 'flip-vert'){
            flipV = flipV === 1 ? -1 : 1;
        }
        applyFilter();
    })
});

const resetFilter = () => {
    // resetting all settings to default
    brightness = 100; saturation = 100; invertion = 100; grayscale = 100;
    rotate = 0;
    flipH = 1; flipV = 1;
    filterOptions[0].click(); // resetting filter to brightness

    applyFilter();
}

const saveImage = () => {
    console.log('save');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = imgBox.width;
    canvas.height = imgBox.height;

    //apply filter on canvas
    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${invertion}%) grayscale(${grayscale}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2); //translating to center of canvas
    if(rotate !== 0){
        ctx.rotate(rotate * Math.PI / 180);
    } 
    ctx.scale(flipH, flipV);
    ctx.drawImage(imgBox, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    // document.body.appendChild(canvas);
    //download image
    const link = document.createElement('a'); //creating link to download image
    link.download = 'image.png';
    link.href = canvas.toDataURL(); //pass a tag href to canvas data url
    link.click();
}

fileInput.addEventListener('change', loadImage);
filterSlider.addEventListener('input',updateFilter);
saveBtn.addEventListener('click', saveImage);
resetBtn.addEventListener('click', resetFilter );
chooseImgBtn.addEventListener('click', () => {
    fileInput.click();
});