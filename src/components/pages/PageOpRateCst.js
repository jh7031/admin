/**
 * 손익관리 > 가동율현황
 */
import React, { useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import { gridStyle } from '../../styles/gridStyle';
import OrgSearchBar from '../searchs/OrgSearchBar';

function PageOpRateCst(props) {
  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState([]); // Set rowData to Array of Objects, one Object per Row
  const columnDefs = [
    {
      headerName: '이름',
      field: 'name',
      width: 80,
      colSpan: (params) =>
        params.data.name === '합계' || params.data.name === '총계' ? 3 : 1,
    },
    { headerName: '등급', field: 'job_grade', width: 150 },
    { headerName: '년차', field: 'years_sum', width: 80 },
    { headerName: '1월', field: 'mon1', type: 'rightAligned', width: 75 },
    { headerName: '2월', field: 'mon2', type: 'rightAligned', width: 75 },
    { headerName: '3월', field: 'mon3', type: 'rightAligned', width: 75 },
    { headerName: '4월', field: 'mon4', type: 'rightAligned', width: 75 },
    { headerName: '5월', field: 'mon5', type: 'rightAligned', width: 75 },
    { headerName: '6월', field: 'mon6', type: 'rightAligned', width: 75 },
    { headerName: '7월', field: 'mon7', type: 'rightAligned', width: 75 },
    { headerName: '8월', field: 'mon8', type: 'rightAligned', width: 75 },
    { headerName: '9월', field: 'mon9', type: 'rightAligned', width: 75 },
    { headerName: '10월', field: 'mon10', type: 'rightAligned', width: 75 },
    { headerName: '11월', field: 'mon11', type: 'rightAligned', width: 75 },
    { headerName: '12월', field: 'mon12', type: 'rightAligned', width: 80 },
    { headerName: '합계', field: 'total', type: 'rightAligned', width: 80 },
    {
      headerName: '현가동율',
      field: 'cur_rate_per',
      type: 'rightAligned',
      width: 90,
    },
    {
      headerName: '년가동율',
      field: 'year_rate_per',
      type: 'rightAligned',
      width: 90,
    },
  ];

  const gridHeight = 30;
  const contents = (
    <div style={{ float: 'right' }}>
      <label>{'[ '}</label>
      <label style={{ color: 'Blue' }}>신규입사자</label>
      <span>{' | '}</span>
      <label style={{ color: 'cyan' }}>휴직자</label>
      <span>{' | '}</span>
      <label style={{ color: 'red' }}>퇴사자</label>
      <span>{' ]'}</span>
    </div>
  );

  function handleSearch(searchInfo) {
    // 비동기 통신, promise 반환
    fetch(process.env.REACT_APP_HOST + 'opratecsts', { method: 'GET' })
      .then((res) => {
        return res.json(); // json으로 받을 것을 명시
      })
      .then((data) => {
        if (data) {
          const rows = data.map((row) => {
            return {
              ...row,
              cur_rate_per: row.cur_rate + '%',
              year_rate_per: row.year_rate + '%',
            };
          });

          setRowData(rows);
          searchInfo.setRowCount(rows.length);
        } else {
          setRowData([]);
          searchInfo.setRowCount(0);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleExcel() {
    return true;
  }

  return (
    <>
      <OrgSearchBar
        title="가동률현황"
        contents={contents}
        onSearch={handleSearch}
        onExcel={handleExcel}
      />

      {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
      <div className="ag-theme-alpine" style={gridStyle}>
        <AgGridReact
          ref={gridRef} // Ref for accessing Grid's API
          columnDefs={columnDefs} // Column Defs for Columns
          headerHeight={gridHeight}
          rowHeight={gridHeight}
          rowData={rowData} // Row Data for Rows
        />
      </div>
    </>
  );
}

export default PageOpRateCst;
