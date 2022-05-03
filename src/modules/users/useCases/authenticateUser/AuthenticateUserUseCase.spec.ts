import { AppError } from "./../../../../shared/errors/AppError";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { InMemoryUsersRepository } from "./../../repositories/in-memory/InMemoryUsersRepository";
import { hash } from "bcryptjs";
let userRepository: InMemoryUsersRepository;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe("Authenticate test", () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository();
    authenticateUserUseCase = new AuthenticateUserUseCase(userRepository);
  });

  it("should be able to create a new token", async () => {
    const user = {
      name: "test1",
      email: "teste1@gmail.com",
      password: "123456",
    };

    await userRepository.create({
      name: user.name,
      email: user.email,
      password: await hash(user.password, 8),
    });

    const token = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(token).toHaveProperty("token");
  });

  it("should not be able to  create a new token with password incorrect", async () => {
    const user = {
      name: "test2",
      email: "teste2@gmail.com",
      password: "2234567",
    };

    await userRepository.create({
      name: user.name,
      email: user.email,
      password: await hash(user.password, 8),
    });

    expect(async () => {
      await authenticateUserUseCase.execute({
        email: user.email,
        password: "123123",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it("should not be able to  create a new token with email incorrect", async () => {
    const user = {
      name: "test2",
      email: "teste2@gmail.com",
      password: "2234567",
    };

    await userRepository.create({
      name: user.name,
      email: user.email,
      password: await hash(user.password, 8),
    });

    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "error@gmail.com",
        password: user.password,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
