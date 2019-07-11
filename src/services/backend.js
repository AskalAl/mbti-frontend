import { questionsEndpoint, usersEndpoint } from '../constants';

export const getQuestions = async () => {
  const response = await fetch(questionsEndpoint);
  if (!response.ok) throw Error(response.statusText);
  return response.json();
};

export const postAnswers = async (answers, email) => {
  const options = {
    body: JSON.stringify({ answers, email }),
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
  };

  const response = await fetch(usersEndpoint, options);
  if (!response.ok) throw Error(response.statusText);
  return response.json();
};
