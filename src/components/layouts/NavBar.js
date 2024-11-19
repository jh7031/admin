import '../../App.css';
import styles from './NavBar.module.css';
import React, { useState } from 'react';
import { Menu } from 'antd';

const items = [
  {
    label: '인사관리',
    key: 't_emp_mng',
    children: [
      {
        type: 'group',
        label: '인사카드',
        children: [{ label: '인터뷰관리', key: 'emp_interview_mng' }],
      },
      {
        type: 'group',
        label: '외주관리',
        children: [{ label: '프리랜서관리', key: 'freelancer_mng' }],
      },
      {
        type: 'group',
        label: '근태관리',
        children: [
          { label: '출/퇴근관리', key: 'go_leave_work_mng' },
          { label: '근태관리-누적', key: 'gl_work_sum_mng' },
        ],
      },
      {
        label: '결제선관리',
        key: 'pay_line_mng',
      },
    ],
  },
  {
    label: '프로젝트관리',
    key: 't_pjt_mng',
    children: [
      {
        label: '프로젝트관리',
        key: 'pjt_mng',
        children: [
          { label: 'BNS 지원현황관리', key: 'bns_sourc_cst_mng' }, // cst: current situation
          { label: 'Sourcing현황', key: 'sourcing_cst' },
          { label: '프로젝트관리', key: 'project_mng' },
        ],
      },
      {
        label: '기술현황관리',
        key: 'skill_cst_mng',
        children: [{ label: '직원 SKILL SET 조회', key: 'emp_skillset_view' }],
      },
    ],
  },
  {
    label: '사이트관리',
    key: 't_site_mng',
    children: [
      { label: '영업관리', key: 'sales_mng' },
      { label: '이슈등록관리', key: 'issue_mng' },
    ],
  },
  {
    label: '손익관리',
    key: 't_pfandloss_mng',
    children: [
      { label: '월별 팀 손익', key: 'mon_team_pfandloss' }, // pfandloss: profit and loss
      { label: '월별 프로젝트 손익', key: 'mon_prj_pfandloss' },
      { label: '프로젝트 손익', key: 'prj_pfandloss' },
      { label: '가동률현황', key: 'op_rate_cst' }, // cst: current situation
    ],
  },
  {
    label: '마스터관리',
    key: 't_master_mng',
    children: [
      {
        label: '고객사관리',
        key: 'rel_company_mng',
      },
      {
        label: 'TO-DO관리',
        key: 'todo_mng',
      },
    ],
  },
];

function NavBar(props) {
  const [current, setCurrent] = useState(null);

  return (
    <div className={styles.nav}>
      <div className={styles.menu}>
      <Menu
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
        onClick={(event) => {
          setCurrent(event.key);
          props.onRoute(event.key);
        }}
      />
      </div>
    </div>
  );
}

export default NavBar;
