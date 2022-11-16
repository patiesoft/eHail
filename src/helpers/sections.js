import { createIdList } from "./ids";
/**
 * This function is used to find and return the section with id = section id from
 * course.
 * @param {object} payload
 * @property {string} sectionId - The sectionId
 * @property {string} courseId - The courseId
 * @returns {Section|false} - Returns the section with the given sectionId from the
 * course with the given courseId.
 */
const getSection = ({ course, sectionId }) => {
  const sectionIdList = createIdList(sectionId);
  let section;
  let sections = course.sections;
  let subId = "";
  for (let i = 0; i < sectionIdList.length; i++) {
    subId = subId === "" ? sectionIdList[i] : subId + "-" + sectionIdList[i];
    section = findSection({
      sections,
      subId,
      index: sectionIdList[i] - 1,
    });
    if (!section) {
      return false;
    }
    sections = section.sections;
  }
  return section;
};

const findSection = ({ sections, index, subId }) => {
  if (parseInt(index) < sections.length) {
    const section = sections[index];
    if (section.id === subId) return section;
  }
  const section = binarySearch({ sectionId: subId, sections });
  return section;
};

const compareIds = (id1, id2) => {
  const id1List = createIdList(id1);
  const id2List = createIdList(id2);
  if (id1List.join("") > id2List.join("")) return 1;
  if (id1List.join("") === id2List.join("")) return 0;
  if (id1List.join("") < id2List.join("")) return 1;
};

const binarySearch = ({ sections, sectionId }) => {
  const halfIndex = Math.floor(sections.length / 2);
  if (sections.length === 0) return false;
  if (sections.length === 1) {
    if (compareIds(sections[0].id, sectionId) === 0) {
      return sections[0];
    }
    return false;
  }
  if (compareIds(sections[halfIndex].id, sectionId) === 0) {
    return sections[halfIndex];
  }
  if (compareIds(sections[halfIndex].id, sectionId) > 0) {
    return binarySearch({ sections: sections.slice(halfIndex), sectionId });
  }
  if (compareIds(sections[halfIndex].id, sectionId) < 0) {
    return binarySearch({ sections: sections.slice(0, halfIndex), sectionId });
  }
};

export { getSection };
