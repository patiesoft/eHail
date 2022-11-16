export default (file) => {
  const reader = new FileReader();
  reader.readAsText(file);
  return reader.onload = async (res) => {
    if (/\.json$/.test(file.name)) {
      const file = JSON.parse(res.target.result);
      return file;
    }
    throw new Error('Invalid file type');
  };
};
