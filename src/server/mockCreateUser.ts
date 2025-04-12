"use server";

interface UserDTO {
    id: number;
    name: string;
}

// will be executed on the server
const mockCreateUser = async (user: UserDTO) => {
    console.log(user);
};

export default mockCreateUser;
