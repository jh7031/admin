function convertYearData(data) {
  if (data.length > 0) {
    return { info: data, selected: new Date().getFullYear() };
  } else {
    return { info: [], selected: null };
  }
}

export default convertYearData;
