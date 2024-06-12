const validZipCodes = [
    '56308', // Alexandria, MN
    '56360', // Melrose, MN / Osakis, MN
    '56389', // West Union, MN
    '56378', // Sauk Centre, MN
    '56356', // Melrose, MN
    '56331', // Freeport, MN
    '56352', // Lake Henry, MN
    '56307', // Albany, MN
    '56310', // Avon, MN
    '56397', // Saint Cloud, MN
    '56398', // Saint Cloud, MN
    '56302', // Saint Cloud, MN
    '56399', // Saint Cloud, MN
    '56372', // Sartell, MN
    '56393', // Saint Cloud, MN
    '56395', // Saint Cloud, MN
    '56396', // Saint Cloud, MN
    '56388', // Saint Joseph, MN
    '56387', // Saint Cloud, MN
    '56303', // Saint Cloud, MN
    '56301', // Saint Cloud, MN
    '56304', // Saint Cloud, MN
    '56377', // Sartell, MN
    '56379', // Sauk Rapids, MN
    '56369', // Richmond, MN
    '56321', // Collegeville, MN
    '56374', // Saint Joseph, MN
    '55308', // Becker, MN
    '55362', // Monticello, MN
    '55320', // Clearwater, MN
    '55319', // Clear Lake, MN
    '55358', // Maple Lake, MN
    '55309', // Big Lake, MN
    '55374', // Rogers, MN
    '55376', // Saint Michael, MN
    '55341', // Hanover, MN
    '55301', // Albertville, MN
    '55369', // Maple Grove, MN
    '55303', // Anoka, MN
    '55592', // Maple Plain, MN
    '55316', // Champlin, MN
    '55330', // Elk River, MN
    '55569', // Rogers, MN
    '55311', // Maple Grove, MN
    '55446', // Plymouth, MN
    '55442', // Plymouth, MN
    '55340', // Hamel, MN
    '55327', // Dayton, MN
    '55447', // Plymouth, MN
    '55441', // Plymouth, MN
    '55433', // Coon Rapids, MN
    '55448', // Coon Rapids, MN
    '55427', // New Hope, MN
    '55599', // Maple Plain, MN
    '55357', // Loretto, MN
    '55422', // Golden Valley, MN
    '55356', // Long Lake, MN
    '56339', // Hoffman, MN
    '56537', // Fergus Falls, MN
    '56324', // Dalton, MN
    '56309', // Ashby, MN
    '56326', // Evansville, MN
    '56315', // Brandon, MN
    '55313', // Buffalo, MN
    '56369', //Richmond, MN
    '56267' //Morris, MN
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