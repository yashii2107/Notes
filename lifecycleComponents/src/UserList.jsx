import React, {Component} from "react";

const UserCard = ({ user }) => {
    return (
      <div key={user.id} className="max-w-xs mx-auto bg-white rounded-lg shadow-md overflow-hidden my-4">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
          <p className="text-gray-500">{user.username}</p>
          <p className="mt-2 text-gray-600">{user.email}</p>
  
          <div className="mt-4">
            <h3 className="text-sm font-semibold text-gray-600">Address</h3>
            <p className="text-gray-500">
              {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}
            </p>
          </div>
  
          <div className="mt-4">
            <h3 className="text-sm font-semibold text-gray-600">Geo Coordinates</h3>
            <p className="text-gray-500">
              Latitude: {user.address.geo.lat}, Longitude: {user.address.geo.lng}
            </p>
          </div>
        </div>
      </div>
    );
  };


class UserList extends Component{
    constructor(props){
        super(props);
        this.state = {
            users: [],
            isLoading: true,
            error: null
        };
    }
    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then((response)=> response.json())
        .then((data)=>{
            this.setState(
                {
                    users: data,
                    isLoading: false
                }
            );

        })
        .catch((error)=>{
            this.setState({
                error: 'Failed to fetch users',
                isLoading: false
            });
        });

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.users !== this.state.users) {
          console.log('Users data updated');
        }
      }

      componentWillUnmount() {
        console.log('UserList component is unmounting');
      }
      render() {
        const { isLoading, users, error } = this.state;
    
        if (isLoading) {
          return <p>Loading...</p>;
        }
    
        if (error) {
          return <p>{error}</p>;
        }
        return (
            <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-6">User Cards</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </div>
          );
    }
}
export default UserList