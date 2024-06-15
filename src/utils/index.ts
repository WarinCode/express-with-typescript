import { faker, Faker } from "@faker-js/faker";
import type { User } from "../types";
import { password } from "bun";

export default class Helper {
  public static async getRandomUser(): Promise<User> {
    const { person, internet, date, string }: Faker = faker;
    const sex: string = person.sex();
    const firstname: string = person.firstName();
    const lastname: string = person.lastName();
    const birthday: Date = date.birthdate({ mode: "year" });

    return {
      firstname,
      lastname,
      sex,
      id: string.uuid().slice(0, 8),
      email: internet.email({ firstName: firstname, lastName: lastname }),
      password: await password.hash(internet.password({ length: 30 })),
      age: Math.abs(new Date().getFullYear() - birthday.getFullYear()),
      birthday: birthday.toUTCString(),
    };
  }

  public static getStaticFile(filename: string): string {
    return import.meta.dirname.replace(
      "src/utils",
      `public/${filename === "/" ? "index" : filename}.html`
    );
  }
}