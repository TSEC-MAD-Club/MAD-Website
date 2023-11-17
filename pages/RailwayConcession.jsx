import React from 'react';
import RailwayConcessionList from '../components/RailwayConcession/RailwayConcessionList';
import RailwaySidebar from '../components/Sidebar/RailwaySidebar.jsx';

const RailwayConcession = () => {
  const statusBoxStyle = {
    backgroundColor: 'var(--primary-5)',
    padding: '8px',
    borderRadius: '4px',
    fontSize: '14px',
    color: 'var(--primary-2)',
    width: '7%',
    height: '4rem',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 'auto',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '2rem', height: '100vh', marginRight: '3rem', overflow: 'hidden' }}>
      <RailwaySidebar />
      <div style={{ padding: '16px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '3rem', marginBottom: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '30px', fontWeight: 'bold' }}>Railway Concessions</h1>
            <p style={{ fontSize: '16px', marginBottom: '16px', color: 'var(--primary-2)' }}>Create a Note about something for the students</p>
          </div>
          <div style={statusBoxStyle}>
            Pending <span style={{ fontWeight: 'bold', fontSize: '16' }}>54</span>
          </div>
        </div>
        <RailwayConcessionList />
      </div>
    </div>
  );
};

export default RailwayConcession;
