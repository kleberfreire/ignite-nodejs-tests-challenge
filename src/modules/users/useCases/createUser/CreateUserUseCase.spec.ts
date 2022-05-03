import { CreateUserUseCase } from "./CreateUserUseCase";
import { AppError } from "./../../../../shared/errors/AppError";

import { InMemoryUsersRepository } from "./../../repositories/in-memory/InMemoryUsersRepository";

let userRepository: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe("Create user", () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(userRepository);
  });

  it("should be able to create a new user", async () => {
    const user = {
      email: "test@gmail.com",
      name: "test1",
      password: "123456",
    };

    const newUser = await createUserUseCase.execute(user);

    expect(newUser).toHaveProperty("id");
  });

  it("Should not be able to create a user with email exists", async () => {
    const user1 = {
      email: "test@gmail.com",
      name: "user1",
      password: "123456",
    };

    const user2 = {
      email: "test@gmail.com",
      name: "user2",
      password: "123456",
    };

    await createUserUseCase.execute(user1);

    expect(async () => {
      await createUserUseCase.execute(user2);
    }).rejects.toBeInstanceOf(AppError);
  });
});
