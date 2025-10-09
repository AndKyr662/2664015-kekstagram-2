const checkLength = function (string, maxLength) {
  return string.length <= maxLength;
};

const checkPolydrome = function (string) {
  string = string.toLowerCase().replaceAll(' ','');
  let result = true;
  for (let i = 1; i < string.length / 2; i++) {
    if (string.at(i - 1) !== string.at(-i)) {
      result = false;
      break;
    }
  }
  return result;
};

const extractNumbers = function (string) {
  string = String(string);
  string = string.replaceAll(' ','');
  let result = '';
  for (let i = 0; i < string.length; i++) {
    if (string[i] <= 9) {
      result += string[i];
    }
  }
  return result ? Number(result) : NaN;
};


