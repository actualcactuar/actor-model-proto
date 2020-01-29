import './style.scss';
import 'babel-polyfill';
import './routing-module';
import './worker-module';

document.querySelectorAll('.toggle-btn').forEach(button => {
  button.addEventListener('click', () => {
    button.classList.toggle('active');
    const target = button.getAttribute('toggle-target');
    const element = document.querySelector(target);
    if (element) {
      element.classList.toggle('active');
    }
  });
});

document.querySelectorAll('#drawer__nav router-link').forEach(link => {
  link.addEventListener('click', () => {
    link.closest('#drawer').classList.remove('active');
    document.querySelector('.toggle-btn[toggle-target="#drawer"]').classList.remove('active');
  });
});
