import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";
import { AppError } from "./../../../../shared/errors/AppError";

import { InMemoryUsersRepository } from "./../../repositories/in-memory/InMemoryUsersRepository";
import { hash } from "bcryptjs";

let userRepository: InMemoryUsersRepository;
let showUserProfileUseCase: ShowUserProfileUseCase;

describe("Show user profile", () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository();
    showUserProfileUseCase = new ShowUserProfileUseCase(userRepository);
  });

  it("should be able to show user profile", async () => {
    const user = await userRepository.create({
      name: "test1",
      email: "teste1@gmail.com",
      password: await hash("123456", 8),
    });

    const userProfile = await showUserProfileUseCase.execute(user.id);
    expect(userProfile).toHaveProperty("id");
  });

  it("should not be able to show user profile with id incorrect", async () => {
    const user = await userRepository.create({
      name: "test1",
      email: "teste1@gmail.com",
      password: await hash("123456", 8),
    });

    expect(async () => {
      await showUserProfileUseCase.execute("id error");
    }).rejects.toBeInstanceOf(AppError);
  });
});
