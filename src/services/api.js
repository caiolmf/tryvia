import md5 from 'crypto-js/md5';
import { saveToLocalStorage, loadFromLocalStorage } from './localStorage';

const URL = 'https://opentdb.com/';
const ENDPOINT_TOKEN = 'api_token.php?command=request';
const ENDPOINT_CATEGORIES = 'api_category.php';
const GRAVATAR = 'https://www.gravatar.com/avatar/';
const ENDPOINT_QUEST = 'api.php?amount=5&token=';

export const getToken = () => {
  const TOKEN = fetch(`${URL}${ENDPOINT_TOKEN}`)
    .then((resp) => resp.json().then((json) => {
      if (resp.ok) {
        saveToLocalStorage('token', json.token);
        return Promise.resolve(json);
      }
      return Promise.reject(json);
    }));
  return TOKEN;
};

export const getGravatar = (email) => {
  const hashEmail = md5(email.trim().replace(' ', '').toLowerCase()).toString();
  const gravatar = `${GRAVATAR}${hashEmail}`;

  return gravatar;
};

export const getQuestions = (settings) => {
  const token = loadFromLocalStorage('token');
  const { category, type, difficulty } = settings;

  const selectedCategory = (category === 'any') ? '' : `&category=${category}`;
  const selectedType = (type === 'any') ? '' : `&type=${type}`;
  const selectedDifficulty = (difficulty === 'any') ? '' : `&difficulty=${difficulty}`;

  const QUESTIONS = fetch(
    `${URL}${ENDPOINT_QUEST}${token}${selectedCategory}${selectedDifficulty}${selectedType}`,
  )
    .then((resp) => resp.json().then((json) => {
      if (resp.ok) {
        return Promise.resolve(json);
      }
      return Promise.reject(json);
    }));
  return QUESTIONS;
};

export const getCategories = () => {
  const CATEGORIES = fetch(`${URL}${ENDPOINT_CATEGORIES}`)
    .then((resp) => resp.json().then((json) => {
      if (resp.ok) {
        return Promise.resolve(json);
      }
      return Promise.reject(json);
    }));

  return CATEGORIES;
};
