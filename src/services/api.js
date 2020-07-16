import md5 from 'crypto-js/md5';
import { saveToLocalStorage, loadFromLocalStorage } from './localStorage';

const URL = 'https://opentdb.com/';
const ENDPOINT_TOKEN = 'api_token.php?command=request';
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

export const getQuestions = () => {
  const token = loadFromLocalStorage('token');

  const QUESTIONS = fetch(`${URL}${ENDPOINT_QUEST}${token}`)
    .then((resp) => resp.json().then((json) => {
      if (resp.ok) {
        return Promise.resolve(json);
      }
      return Promise.reject(json);
    }));
  return QUESTIONS;
};
