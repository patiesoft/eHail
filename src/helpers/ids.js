/**
 * @param {String} id - The id to be split
 * @returns {Array<Integer>} - Returns an array of the digits making up the id
 */
const createIdList = (id) => id.split("-");

/**
 * Returns all the ids associated question. These are the sectionId and
 * the questionId
 * @param {Question} question
 * @returns {Object} - Returns an object with the following properties:
 * @property {string} questionId - The questionId
 * @property {string} sectionId - The sectionId
 */
const getIdsFromQuestion = (question) => {
  const regex = /([0-9-]+)-([0-9]+)/;
  const result = question.id.match(regex);
  return {
    sectionId: result[1],
    questionId: question.id,
  };
};

export { createIdList, getIdsFromQuestion };
