const form = document.getElementById('quote-form');
const success = document.querySelector('.successPB');
const failed = document.querySelector('.failedPB');
const formStep = document.querySelectorAll('.form-step');
const progBar = document.querySelector('.progressbar');
const nextProgBar= document.querySelector('.nextprogressbar');
const loadingPb= document.querySelector('.loadingprogressbar');
const backToHome= document.querySelector('.back-to-home');

const result = document.getElementById('result');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);

    submitAnimate(); 
    formSteps.forEach(formStep => {
        if (formStep.classList.contains("form-step-active")) {
            formStep.classList.remove("form-step-active");
        }
    });

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                /*Removing pb classes*/
                progBar.classList.add('inactive-progressbar');
                nextProgBar.classList.remove("nextprogressbar-active");
                loadingPb.classList.remove("loadingpbactive");

                success.classList.add("resultPB");
                backToHome.classList.add("back-to-home-active");

            } else {
                console.log(response);

                /*Removing pb classes*/
                progBar.classList.add('inactive-progressbar');
                nextProgBar.classList.remove("nextprogressbar-active");
                loadingPb.classList.remove("loadingpbactive");

                failed.classList.add("resultPB");

                failed.innerHTML = json.message;

                backToHome.classList.add("back-to-home-active");
            }
        })
        .catch(error => {
            console.log(error);

            /*Removing pb classes*/
            progBar.classList.add('inactive-progressbar');
            nextProgBar.classList.remove("nextprogressbar-active");
            loadingPb.classList.remove("loadingpbactive");

            failed.classList.add("resultPB");
            backToHome.classList.add("back-to-home-active");
        })
        .then(function() {
            form.reset();
        });
});
    function submitAnimate() {
        const progBar = document.querySelector('.progressbar');
        const prog = document.querySelector('.progress');
        const progStep= document.querySelectorAll('.progress-step');
        const nextProgBar= document.querySelector('.nextprogressbar');
        const loadingPb= document.querySelector('.loadingprogressbar');

        progBar.style.animation = 'pbToLoader .75s';
        prog.style.animation = 'progressToLoader .75s';
        progStep.forEach((step) => {
            step.classList.add("progstep-animate");
        });
        progBar.addEventListener('animationend',() => {
            progBar.classList.add("inactive-progressbar");
            nextProgBar.classList.add("nextprogressbar-active");
                nextProgBar.addEventListener('animationend',() => {
                    nextProgBar.classList.remove("nextprogressbar-active");
                    loadingPb.classList.add("loadingpbactive");
                })
        });



    }