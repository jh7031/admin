function convertDeptData(data) {
  console.log('dept:', data);
  if (data.length > 1) {
    return {
      info: [{ dept_no: 'deptAll', dept_name: '전체', p_rel: 'all' }, ...data],
      selected: 'deptAll',
    };
  } else if (data.length === 1) {
    return { info: data, selected: data[0].dept_no };
  } else {
    return { info: [], selected: null };
  }
}

export default convertDeptData;
