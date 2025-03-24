const validZipCodes = [
    '55305', // Hopkins, MN
    '55311', // Maple Grove, MN
    '55316', // Champlin, MN
    '55323', // Crystal Bay, MN
    '55327', // Dayton, MN
    '55340', // Hamel, MN
    '55343', // Eden Prairie, MN / Hopkins, MN
    '55356', // Long Lake, MN
    '55359', // Minnetrista, MN
    '55361', // Minnetonka, MN
    '55345', // Minnetonka, MN
    '55364', // Minnetrista, MN
    '55369', // Maple Grove, MN
    '55374', // Rogers, MN
    '55384', // Spring Park, MN
    '55391', // Wayzata, MN
    '55433', // Coon Rapids, MN
    '55441', // Plymouth, MN
    '55442', // Plymouth, MN
    '55446', // Plymouth, MN
    '55447', // Plymouth, MN
    '55569', // Plymouth, MN
    '55573', // Young America, MN
    '55593', // Maple Plain, MN
    '55599', // Loretto, MN
    '55357' // Loretto, MN
];
const backBtns = document.querySelectorAll(".btn-back");
const nextBtns = document.querySelectorAll(".btn-next");
const progress = document.getElementById("progress");
const formSteps = document.querySelectorAll(".form-step");
const progressSteps = document.querySelectorAll(".progress-step");
const submitButton = document.querySelector('.form-btn[type="submit"]');

let formStepsNum = 0;

nextBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
        event.preventDefault();
        if (validateFormStep(formSteps[formStepsNum])) {   
            if (formStepsNum === 0) {
                if (validateZip(formSteps[formStepsNum])) {
                    formStepsNum++;
                    updateFormSteps();
                    updateProgressbar();
                }
            } 
            else if (formStepsNum === 1) {
                if (validateCheckbox(formSteps[formStepsNum])) {
                    formStepsNum++;
                    updateFormSteps();
                    updateProgressbar();
                }
            }
            else {
        formStepsNum++;
        updateFormSteps();
        updateProgressbar();
            }
        
        }
    });
});

backBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
        event.preventDefault();
        formStepsNum--;
        updateFormSteps();
        updateProgressbar();
    });
});

submitButton.addEventListener('click', (event) => {
    if (!validateFormStep(formSteps[formStepsNum])) {
        // preventing form submission if it fails to validate
        event.preventDefault();
    }
});

function updateFormSteps(){

        formSteps.forEach(formStep => {
            if (formStep.classList.contains("form-step-active")) {
                formStep.classList.remove("form-step-active");
            }
        });
        formSteps[formStepsNum].classList.add("form-step-active");
}


function updateProgressbar() {
    progressSteps.forEach((progressStep, idx) => {
        if(idx < formStepsNum + 1) {
            progressStep.classList.add('progress-step-active');
        } else {
            progressStep.classList.remove('progress-step-active');
        }
    });


    const progressActive = document.querySelectorAll('.progress-step-active');

    progress.style.width = ((progressActive.length - 1)/(progressSteps.length -1)) * 100 + "%";
}

function validateFormStep(formStep) {
    const inputs = formStep.querySelectorAll("input[required]");
    let isValid = true;
    inputs.forEach((input) => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add("error");
            input.style.animation = 'shake 0.4s'; //shake animation
            input.addEventListener('animationend', () => {
                input.style.animation = '';
            });
        } else {
            input.classList.remove("error");
        }
    });
    return isValid;
}

function validateZip(formStep) {
    const zipinput = document.querySelector('.zip-input');
    const zipError = formStep.querySelector('.zip-error');
    const zipLengthError = formStep.querySelector('.zip-error-len')
    let inArea = true;

    if (zipinput.value.length < 5) {
        inArea = false
        zipError.classList.remove("zip-error-active");
        zipinput.classList.add("error");
        zipLengthError.classList.add("zip-error-active");
        zipLengthError.style.animation = 'shake 0.4s'; //shake animation
            zipLengthError.addEventListener('animationend', () => {
            zipLengthError.style.animation = '';
            });
            return inArea;
    } else {
        zipLengthError.classList.remove("zip-error-active")
    }

    if (!validZipCodes.includes(zipinput.value)) {
            inArea = false
            zipError.classList.add("zip-error-active");
            zipError.style.animation = 'shake 0.4s'; //shake animation
            zipError.addEventListener('animationend', () => {
            zipError.style.animation = '';
            });
    } else {
        zipError.classList.remove("zip-error-active");
    }
    return inArea;
}

function validateCheckbox(formStep) {
    const checkboxInputs = formStep.querySelectorAll('input[type="checkbox"]');
    const formError = formStep.querySelector('.form-error');
    let oneChecked = false;

    checkboxInputs.forEach((checkbox) => {
        if (checkbox.checked) {
            oneChecked = true;
        }
    });

    if (oneChecked === false) {
        formError.classList.add("form-error-active");
        formError.style.animation = 'shake 0.4s'; //shake animation
            formError.addEventListener('animationend', () => {
                formError.style.animation = '';
            })
    } else {
        formError.classList.remove("form-error-active");
    }

    return oneChecked;
}

//Event Listener for input when start typing//

const inputs = document.querySelectorAll("input[required]");
inputs.forEach((input) => {
    input.addEventListener("input", () => {
        input.classList.remove("error");
    });
});

//For enter button to work
formSteps.forEach((formStep, index) => {
    formStep.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.target.tagName.toLowerCase() !== 'textarea') {
            e.preventDefault();
            const nextButton = formStep.querySelector('.btn-next');
            const submitButton = formStep.querySelector('button[type="submit"]');
            if (nextButton) {
                nextButton.click();
            }
            else if (submitButton) {
                submitButton.click();
            }
        }
    });
});