function load(filename) {
  console.log({filename});
  const data = require(`raw!./resp/${filename}`);
  let result;
  try {
    result = JSON.parse(data);
  } catch (err) {
    result = data;
  }
  return result;
}

export default load;
