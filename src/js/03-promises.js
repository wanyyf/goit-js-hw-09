import Notiflix from 'notiflix';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const formEl = document.querySelector('.form');
const delayInputEl = document.querySelector("input[name='delay']");
const stepInputEl = document.querySelector("input[name='step']");
const amountInputEl = document.querySelector("input[name='amount']");

const onFormSubmit = evt => {
  evt.preventDefault();
  let delay = Number(delayInputEl.value);
  let step = Number(stepInputEl.value);
  let amount = Number(amountInputEl.value);

  for (let i = 1; i <= amount; i += 1) {
    console.log(delay);
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delay += step;
  }
};

formEl.addEventListener('submit', onFormSubmit);
