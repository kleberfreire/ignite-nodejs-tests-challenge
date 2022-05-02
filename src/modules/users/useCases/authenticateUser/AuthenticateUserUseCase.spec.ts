import { InMemoryUsersRepository } from "./../../repositories/in-memory/InMemoryUsersRepository";

let userRepository: InMemoryUsersRepository;
describe("Authenticate test", () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository();
  });
  it("should return a user", () => {});
});
