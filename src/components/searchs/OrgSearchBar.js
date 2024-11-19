import styles from './OrgSearchBar.module.css';
import './OrgSearchBar.css';
import { useEffect, useState } from 'react';
import { Button, Input, Select, Space, Typography, message } from 'antd';
import ContextContents from '../ContextContents';
import getFetch from '../../utils/getFetch';
import convertYearData from '../../utils/convertYearData';
import convertOrgData from '../../utils/convertOrgData';
import convertDeptData from '../../utils/convertDeptData';

function OrgSearchBar(props) {
  // 콤보박스 설정을 위한 자료
  const [yearInfo, setYearInfo] = useState([]);
  const [orgInfo, setOrgInfo] = useState([]);
  const [deptInfo, setDeptInfo] = useState([]);
  // 선택된 조직
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedOrgId, setSelectedOrgId] = useState(null);
  const [selectedDeptNo, setSelectedDeptNo] = useState(null);
  const [selectedEmpName, setSelectedEmpName] = useState(null);
  // 조회 건수 설정 - 조회 완료 후 건수 뷰를 위해 사용
  const [count, setCount] = useState(0);

  // ----------------------------------------------------------------
  // 년도 정보 설정
  useEffect(() => {
    getFetch('years', fullfilledYearData);
  }, []);

  function fullfilledYearData(data) {
    const years = convertYearData(data);
    setYearInfo(years.info);
    setSelectedYear(years.selected);
  }

  // ----------------------------------------------------------------
  // 사업부 정보 설정
  useEffect(() => {
    getFetch('orgs', fullfilledOrgData);
  }, []);

  function fullfilledOrgData(data) {
    const orgs = convertOrgData(data);
    setOrgInfo(orgs.info);
    setSelectedOrgId(orgs.selected);
  }

  // ----------------------------------------------------------------
  // 조직 정보 설정
  useEffect(() => {
    getFetch('depts', fullfilledDeptData);
  }, [selectedOrgId]);

  function fullfilledDeptData(data) {
    const depts = convertDeptData(data);
    const rows = depts.info.filter(
      (dept) => dept.p_rel === 'all' || dept.p_rel === selectedOrgId
    );
    setDeptInfo(rows);
    setSelectedDeptNo(depts.selected);
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.onSearch({
      year: selectedYear,
      orgId: selectedOrgId === 'orgAll' ? null : selectedOrgId,
      deptNo: selectedDeptNo === 'deptAll' ? null : selectedDeptNo,
      empName: selectedEmpName,
      setRowCount: (rowCount) => {
        setCount(rowCount);
        if (rowCount > 1) {
          message.info(`${rowCount}건의 자료가 조회되었습니다.`);
        } else {
          message.info('검색된 자료가 없습니다.');
        }
      },
    });
  }

  function handleExcel(event) {
    event.preventDefault();
    if (props.onExcel()) {
      message.info('Excel 출력이 완료되었습니다.');
    } else {
      alert('Excel 출력에 실패했습니다.');
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <Typography.Text
        style={{ fontSize: '1.4em' }}
        >▶{props.title}</Typography.Text>
      </div>
      <div className={styles.count}>
        <Typography.Text
        style={{ fontSize: '1.4em' }}
        >▶총 {count}건</Typography.Text>
      </div>
      <ContextContents contents={props.contents} />
      <div className={`${styles.search} search-div`}>
        <form onSubmit={handleSubmit}>
          <Space className={styles.space}>
            <Typography.Text
            style={{ fontSize: '1.4em' }}
            >
              년도:
            </Typography.Text>
            <Select
              id="year"
              name="biz_year"
              size="small"
              className="select-box"
              style={{ width: '100%' }}
              options={yearInfo.map((info) => ({
                value: info.year,
                label: info.label,
              }))}
              value={selectedYear}
              onChange={(value) => {
                setSelectedYear(value);
              }}
            />
            <Typography.Text
              style={{ fontSize: '1.4em' }}
            >사업부:
            </Typography.Text>
            <Select
              id="group"
              name="org_group"
              size="small"
              style={{ width: '100%' }}
              options={orgInfo.map((info) => ({
                value: info.org_id,
                label: info.org_name,
              }))}
              value={selectedOrgId}
              onChange={(value) => {
                setSelectedOrgId(value);
                setSelectedDeptNo(null);
              }}
            />
            <Typography.Text
              style={{ fontSize: '1.4em' }}
            >조직:
            </Typography.Text>
            <Select
              id="dept"
              name="org_dept"
              size="small"
              style={{ width: '100%' }}
              options={deptInfo.map((info) => ({
                value: info.dept_no,
                label: info.dept_name,
              }))}
              value={selectedDeptNo}
              onChange={(value) => {
                setSelectedDeptNo(value);
              }}
            />
            <Typography.Text
              style={{ fontSize: '1.4em' }}
              >성명:
              </Typography.Text>
            <Input
              id="emp_name"
              name="org_emp_name"
              size="small"
              style={{ width: '100%' }}
              value={selectedEmpName}
              onChange={(event) => {
                setSelectedEmpName(event.currentTarget.value);
              }}
            />
            <div className="btn">
            <Button type="primary" htmlType="submit" size="small" shape="round"> 
              Search
            </Button>
            <Button size="small" onClick={handleExcel} shape="round">
              Excel
            </Button>
            </div>
          </Space>
        </form>
      </div>
    </div>
  );
}

export default OrgSearchBar;
