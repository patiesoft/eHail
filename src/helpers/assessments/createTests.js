/**
 * @fileoverview This is a module for tests. In this module functions
 * to create and manipulate tests will be found.
 *
 * @author Tech Transcendents
 * @author Phathizwe Vilakazi <patiesoft@gmail.com>
 */

import _ from "lodash";
import { randomizeVariables } from "test-setter-engine";
import { reduce } from "ramda";

const createTests = async ({ descriptions, questions, numberOfTests, numberOfTestsVersions, studentDetailsList }) => {
  const tests = [];
  if (studentDetailsList != null) {
    for (let i = 0; i < studentDetailsList.length; i++) {
      const { studentId, name, surname } = studentDetailsList[i];
      const test = {
        ...descriptions,
        studentId,
        testId: i + 1,
        name,
        surname,
        questions: [],
      };

      test.questions = reduce(
        (acc, question) => {
          const newQuestion = { ...question };
          newQuestion.variables = randomizeVariables(question.variables);
          acc.push(newQuestion);
          return acc;
        },
        [],
        questions
      );
      tests.push(test);
    }
    return tests;
  }
  if (numberOfTests !== null) {
    for (let i = 1; i <= numberOfTests; i++) {
      const test = {
        ...descriptions,
        testId: i,
        questions: [],
      };

      test.questions = reduce(
        (acc, question) => {
          const newQuestion = { ...question };
          newQuestion.variables = randomizeVariables(question.variables);
          acc.push(newQuestion);
          return acc;
        },
        [],
        questions
      );
      tests.push(test);
    }
    return tests;
  }
};
/**
 * @param {Object} param0
 * @property {string} description -
 * @property {array} questions - This are the questions on
 * which the tests are to be made of
 * @property {number} numberOfTests -This is the number of tests to make
 * @property {array} descriptions - This is a list of describing attributes of a test
 * @returns
 */
const createTests2 = async ({ descriptions, questions, numberOfTests, numberOfTestsVersions, studentDetailsList }) => {
  try {
    const tests = [];
    if (numberOfTests == null && studentDetailsList == null)
      throw new Error("Cannot have both list of student details and number of students undefined");
    if (numberOfTests != null && studentDetailsList != null)
      throw new Error("Cannot have both list of student details and number of students set");
    if (numberOfTests != null) {
      for (let i = 0; i < numberOfTests; ) {
        const test = { ...descriptions, testId: i + 1, questions: [] };
        for (let j = 0; j < questions.length; ) {
          const question = questions[j];
          const questionClone = _.cloneDeep(question);
          Object.entries(questionClone.variables).forEach((entry) => {
            const [key, value] = entry;
            const variableValue = selectVariableValue({ variable: value });
            questionClone.variables[key].value = variableValue;
          });
          test.questions.push(questionClone);
          j += 1;
        }
        tests.push(test);
        i += 1;
      }
      return tests;
    }
    if (studentDetailsList != null) {
      for (let i = 0; i < studentDetailsList.length; ) {
        const { studentId, name, surname } = studentDetailsList[i];
        const test = {
          ...descriptions,
          studentId,
          testId: i,
          name,
          surname,
          questions: [],
        };
        for (let j = 0; j < questions.length; ) {
          const question = questions[j];
          const questionClone = _.cloneDeep(question);
          Object.entries(questionClone.variables).forEach((entry) => {
            const [key, value] = entry;
            const variableValue = selectVariableValue({ variable: value });
            questionClone.variables[key].value = variableValue;
          });
          test.questions.push(questionClone);
          j += 1;
        }
        tests.push(test);
        i += 1;
      }
      return tests;
    }
    return null;
  } catch (Error) {
    return Error;
  }
};

export default createTests;
