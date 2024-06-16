import { faker, Faker } from "@faker-js/faker";
import type { User } from "../types";
import { password } from "bun";

export default class Helper {
  public static userData: User;

  public static async getRandomUser(): Promise<User> {
    const { person, internet, date }: Faker = faker;
    const sex: string = person.sex();
    const firstname: string = person.firstName();
    const lastname: string = person.lastName();
    const birthday: Date = date.birthdate({ mode: "year" });
    const result: User = {
      firstname,
      lastname,
      sex,
      id: this.getId(),
      email: internet.email({ firstName: firstname, lastName: lastname }),
      password: await password.hash(internet.password({ length: 30 })),
      age: Math.abs(new Date().getFullYear() - birthday.getFullYear()),
      birthday: birthday.toUTCString(),
    };

    this.setUser(result);
    return this.getUser();
  }

  public static getStaticFile(filename: string): string {
    return import.meta.dirname.replace(
      "src/utils",
      `public/${filename === "/" ? "index" : filename}.html`
    );
  }

  public static setUser(user: User): void {
    this.userData = user;
  }

  public static getUser(): User {
    return this.userData;
  }

  public static async getBody(): Promise<User> {
    this.userData = {
      ...this.userData,
      id: this.getId(),
      age: parseInt(String(this.userData.age)),
      password: await password.hash(this.userData.password),
    };
    return this.userData;
  }

  public static getId(): string {
    return faker.string.uuid().slice(0, 8);
  }
}
