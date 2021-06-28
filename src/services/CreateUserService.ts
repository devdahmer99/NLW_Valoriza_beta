import {getCustomRepository} from  "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IUserRequest {
  name:string;
  email:string;
  admin?:boolean;
}

class CreateUserService {
    static execute(arg0: { name: any; email: any; admin: any; }) {
      throw new Error("Method not implemented.");
    }
    async execute({name, email, admin} : IUserRequest) {
      const usersRepository = getCustomRepository(UsersRepositories);
      if(!email) {
        throw new Error("Email Incorret");
      }

      const userAlreadyExistis = await usersRepository.findOne({
        email
      });

      if(userAlreadyExistis) {
        throw new Error("User Already Existis");
      }

      const user = usersRepository.create({
        name, email, admin
      })

      await usersRepository.save(user)

      return user;
    }
}

export {CreateUserService};