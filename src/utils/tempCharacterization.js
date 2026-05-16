// function to characterize temperature as 'cold', 'moderate', or 'hot'
const tempCharacterization = (temp) => {
    if (temp < 50) {
    return 'cold';
  } else if (temp >= 50 && temp < 80) {
    return 'moderate';
  } else {
    return 'hot';
  }
};

module.exports = tempCharacterization;