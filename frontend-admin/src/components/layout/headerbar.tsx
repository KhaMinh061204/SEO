import { Button, Layout, Switch, message } from 'antd';
import useConfigStore from '../../store/config';
import { post } from '../../api/api';
const { Header } = Layout;

const Headerbar = (props: { colorBgContainer: string }) => {
  const setAlgorithm = useConfigStore(state => state.setAlgorithm)
  const handleLogout = async() => {
    await post('/account/logout', {}); // Đường dẫn API logout
    message.success('Đăng xuất thành công!');

    localStorage.removeItem('token');
    window.location.href = '/login';
  }
  return (
    <Header title='CeeCine Administrator' style={{ padding: 0, background: props.colorBgContainer }}>
      <div style={{ display: 'flex', alignItems: 'center', height: '100%', padding: "0 20px", justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="/src/assets/logo@2x copy.png" alt="CeeCine Logo" style={{ width: 40, height: 40 }} />
          <h2>CeeCine Administrator</h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Switch checkedChildren="Light" unCheckedChildren="Dark" defaultChecked onChange={(checked) => setAlgorithm(checked ? 'default' : 'dark')} />
          <p style={{ marginRight: 10 }}>GĐ Kha Minh</p>
          <img src="https://scontent.fsgn5-14.fna.fbcdn.net/v/t39.30808-1/470189796_1329970211331124_2139760179877886212_n.jpg?stp=dst-jpg_s480x480_tt6&_nc_cat=101&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeG6bziSE9h8wkIImTWjzzXYSTkGILzjc_xJOQYgvONz_HNmoalw00i_3oCJvht4ouvpc8F18e6b2t4eC1nzReZm&_nc_ohc=Ak5V8Ig4Pl4Q7kNvgGt-sF4&_nc_zt=24&_nc_ht=scontent.fsgn5-14.fna&_nc_gid=AI8b42z4TbL3H-FN431HbBS&oh=00_AYDFNsRREez4M65WqpLG5AAre1l9KI_xGbkdlomUuMcQAA&oe=67687461" alt="avatar" style={{ width: 40, height: 40 }} />
          <Button type="primary" onClick={handleLogout}>Logout</Button>
        </div>
      </div>
    </Header>
  )
}

export default Headerbar
