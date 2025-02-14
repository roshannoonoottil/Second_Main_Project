import { useSelector } from 'react-redux';
import { RootState } from '../Redux/store'; // Adjust the path based on your folder structure

const MyComponent = () => {
    // Get the entire auth state
   // const authState = useSelector((state: RootState) => state);

    // Or get specific values
    const isAuthenticated = useSelector((state: RootState) => state.isAuthenticated);
    const user = useSelector((state: RootState) => state.user);
    const admin = useSelector((state: RootState) => state.admin);

    return (
        <div>
            <h1>User Info</h1>
            <p>Authenticated: {isAuthenticated ? "Yes" : "No"}</p>
            <p>User Name: {user.userName}</p>
            <p>Admin Name: {admin.userName}</p>
            
            
        </div>
    );
};

export default MyComponent;
