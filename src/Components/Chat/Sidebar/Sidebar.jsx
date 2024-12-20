import { FaPaperPlane, FaImage, FaSmile, FaHome, FaCog } from 'react-icons/fa';
import './sidebar.css';
export default function Sidebar() {
    
    return (
       <>
       <div className="d-flex h-100 bg-dark text-white overflow-hidden" style={{ height: '100vh' }}>
  <div
    className="d-flex flex-column"
    style={{
      width: '240px',
      transition: 'all 0.3s ease',
      backgroundColor: 'rgb(26, 45, 77)',
      boxShadow: '2px 0px 10px rgba(0, 0, 0, 0.2)',
      borderRadius: '0 20px 20px 0',
      position: 'relative',
    }}
    id="sidebar"
  >
    <div
      className="d-flex justify-content-center align-items-center p-3 mt-4"
      style={{
        color: '#fff',
        fontSize: '24px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
      }}
    >
      Pandamonium
    </div>

    <div className="d-flex justify-content-center align-items-center p-3 mt-4">
      <button
        onClick={() => window.location.href = '/'}
        className="btn btn-light w-100 rounded-pill shadow-sm"
        style={{
          fontSize: '18px',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          backgroundColor: 'transparent',
          color: '#fff',
          transition: 'all 0.3s ease',
        }}
      >
        <FaHome className="me-2" />
        Home
      </button>
    </div>

    <div className="flex-grow-1 bg-dark" />
  </div>

  <button
    onClick={() => {
      const sidebar = document.getElementById('sidebar');
      const pandaBtn = document.getElementById('pandaBtn');
      const toggleBtn = document.getElementById('toggleSidebarBtn');

      sidebar.style.width = '0px';
      pandaBtn.style.display = 'none';
      toggleBtn.style.display = 'flex';
    }}
    id="pandaBtn"
    className="inline-flex items-center justify-center rounded-full text-sm focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 select-none border border-input shadow-sm hover:bg-accent hover:text-accent-foreground active:bg-accent active:text-accent-foreground mt-page-md absolute z-20 shrink-0 transition-all duration-500 self-end bg-background/30 h-16 w-16 p-2 -mr-page-md translate-x-full"
    style={{
      position: 'absolute',
      top: '-32px',
      left: '50%',
      transform: 'translateX(-50%)',
      cursor: 'pointer',
      display: 'inline-flex',
      width: '64px',
      height: '64px',
      background: 'transparent',
    }}
  >
    <img
      src="/src/assets/animal.png"
      alt="Red Panda"
      style={{
        width: '100%',
        height: '100%',
        transform: 'rotate(15deg)',
        transition: 'all 0.5s ease',
        animation: 'bounce 2s infinite',
      }}
    />
  </button>

  <div
    className="d-flex justify-content-center align-items-center position-fixed bottom-0 start-0 p-4"
    style={{
      zIndex: 10,
      transform: 'translateX(-50%)',
      transition: 'all 0.5s ease',
      left: 'calc(240px + 50%)',
      display: 'none',
    }}
    id="toggleSidebarBtn"
  >
    <button
      onClick={() => {
        const sidebar = document.getElementById('sidebar');
        const pandaBtn = document.getElementById('pandaBtn');
        const toggleBtn = document.getElementById('toggleSidebarBtn');

        sidebar.style.width = '240px';
        pandaBtn.style.display = 'inline-flex';
        toggleBtn.style.display = 'none';
      }}
      className="btn btn-primary rounded-circle"
      style={{
        width: '50px',
        height: '50px',
        transition: 'all 0.3s ease',
      }}
    >
      <i className="fas fa-chevron-right"></i>
    </button>
  </div>
</div>

    </>
    )
}