import './style.scss';
import 'babel-polyfill';

console.log('fooo');

const worker = new Worker('worker.js', { module: true });

const generateToken = () => {
  const tokenFragment = radix =>
    Math.random()
      .toString(radix)
      .substr(2);
  return `${tokenFragment(12)}-${tokenFragment(36)}-${tokenFragment(22)}`;
};

const promiseMessage = async params =>
  new Promise((resolve, reject) => {
    const token = generateToken();
    worker.postMessage({ token, ...params });
    worker.addEventListener('message', ({ data }) => {
        if(data.token === token) resolve(data);
    });
    worker.addEventListener('error', error => reject({ ...error }));
  });

document.querySelector('#btn').addEventListener('click', e => {
  promiseMessage({ data: generateToken(), timeout:Math.round(Math.random()*1000) })
    .then(({data}) => console.log(data,'resolved'))
    .catch(e => console.log(e));
});
