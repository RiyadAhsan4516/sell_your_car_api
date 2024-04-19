import { Test, TestingModule, TestingModuleBuilder } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UsersService } from "./users.service";
import { User } from "./user.entity";

describe("AuthService", () => {
  let service: AuthService;

  // BEFORE EACH SETS UP ALL THE DECLARATIONS AND DEPENDENCY INJECTION, BEFORE WE START TESTING
  beforeEach(async () => {
    // Create a fake copy of the module, auth.service depends on
    const fakeUsersService: Partial<UsersService> = {
      getOne: (id: number) => Promise.resolve({} as User),
      create: (email: never, password: never) => Promise.resolve({ message: "user created" }),
      getMany: (email: string)=> Promise.resolve([] as User[])
    };

    // Create a module of the auth.service
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService
        }
      ]
    }).compile();

    service = module.get<AuthService>(AuthService);
  });


  // THESE ARE THE ACTUAL TESTS. WE TEST USING THE IT FUNCTIONS
  it("can create an instance of auth service", async () => {
    expect(service).toBeDefined();
  });

  // NOW CREATE YOUR OWN TESTS
  it("Creates a new user and returns a message", async()=>{
    await service.signUp("riyad@gmail.com", "helloWorld")
  })

});
