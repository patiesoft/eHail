import { getSection } from "./sections";
/**
 * Generates the indexes of the questions in the course according to the sections
 * they are in.
 * @param {Course} course - The course to search in
 * @returns {Void}
 */
const generateIndexesForQuestionsInSections = (course) => {
  let index = 0;
  course.questions.forEach((question) => {
    const sectionId = question.meta.sections[0];
    question.id = index + 1;
    const section = getSection({ course, sectionId });

    if (
      section.questionIndexRange == null ||
      section.questionIndexRange.length === 0
    ) {
      section.questionIndexRange = [index, index];
    }
    section.questionIndexRange[1]++;
    index++;
  });
};

export { generateIndexesForQuestionsInSections };
