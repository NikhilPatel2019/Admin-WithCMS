import { Link } from 'react-router-dom';

const AdminHome = () => {
    return (
        <div>
            <Link to='/models'>
                <h1>Model</h1>
            </Link>
            {/* <Link to='/data'>
                <h1>Data</h1>
            </Link> */}
        </div>
    )
}

export default AdminHome;