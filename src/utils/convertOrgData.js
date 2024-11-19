function convertOrgData(data) {
  if (data.length > 1) {
    return {
      info: [{ org_id: 'orgAll', org_name: '전체' }, ...data],
      selected: 'orgAll',
    };
  } else if (data.length === 1) {
    return { info: data, selected: data[0].org_id };
  } else {
    return { info: [], selected: null };
  }
}

export default convertOrgData;
